#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const inputArg = process.argv.find(value => value.startsWith('--input='));
if (!inputArg) throw new Error('Pass --input=path/to/batch.json');

const inputPath = path.resolve(inputArg.slice('--input='.length));
const websiteDir = path.resolve(process.env.WEBSITE_DIR || 'website');
const batch = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const worker = String(batch.worker || '').replace(/[^a-z0-9_-]/gi, '');
if (!worker || !['individuals', 'periods'].includes(batch.kind) || !Array.isArray(batch.items)) {
  throw new Error('Batch requires worker, kind, and an items array');
}

const progressDir = path.join(websiteDir, 'codex-backfill-progress');
const progressPath = path.join(progressDir, `${worker}.json`);
fs.mkdirSync(progressDir, { recursive: true });
const progress = fs.existsSync(progressPath)
  ? JSON.parse(fs.readFileSync(progressPath, 'utf8'))
  : { version: 1, worker, kind: batch.kind, completed: [], batches: [] };
const completed = new Set(progress.completed || []);
const now = new Date().toISOString();

function writeAtomic(filePath, value) {
  const temporary = `${filePath}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
  fs.renameSync(temporary, filePath);
}

let applied = 0;
if (batch.kind === 'individuals') {
  const byDate = new Map();
  for (const item of batch.items) {
    const date = String(item.date || '');
    const eventId = String(item.eventId || '');
    const checkpointKey = `${date}:${eventId}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !eventId || completed.has(checkpointKey)) continue;
    if (!byDate.has(date)) byDate.set(date, []);
    byDate.get(date).push({ ...item, checkpointKey });
  }
  for (const [date, items] of byDate) {
    const reportPath = path.join(websiteDir, `${date}.json`);
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const changes = [...(report.newFiles || []), ...(report.modifiedFiles || []), ...(report.deletedFiles || [])];
    for (const item of items) {
      const change = changes.find(candidate => candidate.eventId === item.eventId);
      if (!change) throw new Error(`No change ${item.eventId} exists in ${date}`);
      const summary = item.summary || {};
      if (!summary.headline || !summary.summary || !summary.adminImpact || !summary.category) {
        throw new Error(`Incomplete individual summary for ${date}:${item.eventId}`);
      }
      const summaryText = `${summary.headline} ${summary.summary} ${summary.adminImpact}`;
      const genericHeadline = /^(?:updates|cleanup|minor fixes|fix broken links|typo fix|formatting (?:issue|change)|ms\.date|metadata|more cleanup|revisions|fixing bookmark|acrolinx(?: 2)?|spelling checks|2605|update .+\.md|[\w.-]+: (?:ca changes|acrolinx|polishing))$/i.test(String(summary.headline).trim());
      const sourceLikeSummary = /^(?:<!--|>|:::|#{1,6}\s|[-*]\s|ms\.date:|\+\+|title:|\[[^\]]+\]:)|^(?:he )?relevant administrator guidance was clarified\.?$|^updates [\w.-]+:|^applies (?:the recorded documentation update|editorial spelling and terminology corrections) to |^updates the .+ conditional access or compliance guidance as part of /i.test(String(summary.summary).trim());
      const genericImpact = /^(?:follow|use) the stated (?:administrator guidance|configuration, role, or navigation guidance|requirements and navigation)(?: for this scenario| when administering this feature)?\.?$|^use the updated documentation for this scenario\.?$/i.test(String(summary.adminImpact).trim());
      if (genericHeadline || sourceLikeSummary || genericImpact || /documentation updated$|\.md (?:change|exact edit|specific edit)|\+\+ (?:b\/|\/dev\/null)|\b(?:patch|diff)\b|apply the documented change where relevant|review its recorded diff for the exact guidance changed|review the updated documentation before changing related configuration|local (?:documentation )?patch|recorded local|stored patch|recorded diff|exact patch evidence|consult the recorded diff|recorded (?:local )?documentation patch|received (?:review |code-review )?(?:edits|documentation edits)|documentation maintenance|article (?:was )?updated|documentation receives an update|article refreshes intune documentation|use the updated documentation for the affected configuration or procedure|main to release branch/i.test(summaryText)) {
        throw new Error(`Generic individual summary rejected for ${date}:${item.eventId}`);
      }
      change.englishSummary = {
        category: String(summary.category).slice(0, 180),
        headline: String(summary.headline).slice(0, 180),
        summary: String(summary.summary).slice(0, 700),
        adminImpact: String(summary.adminImpact).slice(0, 420),
        generatedBy: 'codex-one-time-backfill',
        model: batch.model || 'gpt-5.6-terra',
        reasoningEffort: batch.reasoningEffort || 'medium',
        generatedAt: now
      };
      completed.add(item.checkpointKey);
      applied += 1;
    }
    writeAtomic(reportPath, report);
  }
} else {
  const storePath = path.join(websiteDir, 'period-summaries.json');
  const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));
  for (const item of batch.items) {
    const periodKind = String(item.periodKind || '');
    const key = String(item.key || '');
    const checkpointKey = `${periodKind}:${key}`;
    if (completed.has(checkpointKey)) continue;
    const collection = periodKind === 'day' ? store.days : periodKind === 'week' ? store.weeks : periodKind === 'month' ? store.months : null;
    if (!collection || !collection[key]) throw new Error(`Unknown period ${checkpointKey}`);
    const summary = item.summary || {};
    if (!summary.headline || !summary.overview || !summary.adminImpact || !Array.isArray(summary.keyChanges) || !summary.keyChanges.length) {
      throw new Error(`Incomplete period summary for ${checkpointKey}`);
    }
    collection[key] = {
      headline: String(summary.headline).slice(0, 180),
      overview: String(summary.overview).slice(0, 1400),
      adminImpact: String(summary.adminImpact).slice(0, 800),
      keyChanges: summary.keyChanges.slice(0, 5).map(change => ({
        title: String(change.title || '').slice(0, 180),
        detail: String(change.detail || '').slice(0, 520),
        product: String(change.product || '').slice(0, 100),
        sourceId: String(change.sourceId || '').slice(0, 180)
      })),
      generatedBy: 'codex-one-time-backfill',
      model: batch.model || 'gpt-5.6-terra',
      reasoningEffort: batch.reasoningEffort || 'xhigh',
      generatedAt: now
    };
    completed.add(checkpointKey);
    applied += 1;
  }
  store.generatedAt = now;
  store.generator = { model: batch.model || 'gpt-5.6-terra', reasoningEffort: batch.reasoningEffort || 'xhigh', mode: 'codex-one-time-backfill' };
  writeAtomic(storePath, store);
}

progress.completed = [...completed].sort();
progress.updatedAt = now;
progress.batches = [...new Set([...(progress.batches || []), path.relative(process.cwd(), inputPath)])];
writeAtomic(progressPath, progress);
console.log(`Applied ${applied} ${batch.kind} summaries for ${worker}; ${progress.completed.length} checkpoint(s) complete.`);

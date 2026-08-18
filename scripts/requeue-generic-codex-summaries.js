#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const websiteDir = path.resolve(process.env.WEBSITE_DIR || 'website');
const batchArg = process.argv.find(value => value.startsWith('--batch='));
const explicitKeys = new Set();
if (batchArg) {
  const batch = JSON.parse(fs.readFileSync(path.resolve(batchArg.slice('--batch='.length)), 'utf8'));
  for (const item of batch.items || []) explicitKeys.add(`${item.date}:${item.eventId}`);
}
const generic = /documentation updated$|\.md (?:change|exact edit|specific edit)|\+\+ (?:b\/|\/dev\/null)|\b(?:patch|diff)\b|apply the documented change where relevant|review its recorded diff for the exact guidance changed|review the updated documentation before changing related configuration|local (?:documentation )?patch|recorded local|stored patch|recorded diff|exact patch evidence|consult the recorded diff|recorded (?:local )?documentation patch|received (?:review |code-review )?(?:edits|documentation edits)|documentation maintenance|article (?:was )?updated|documentation receives an update|article refreshes intune documentation|use the updated documentation for the affected configuration or procedure|main to release branch/i;
const genericHeadline = /^(?:updates|cleanup|minor fixes|fix broken links|typo fix|formatting (?:issue|change)|ms\.date|metadata|more cleanup|revisions|fixing bookmark|acrolinx(?: 2)?|spelling checks|2605|update .+\.md|[\w.-]+: (?:ca changes|acrolinx|polishing))$/i;
const sourceLikeSummary = /^(?:<!--|>|:::|#{1,6}\s|[-*]\s|ms\.date:|\+\+|title:|\[[^\]]+\]:)|^(?:he )?relevant administrator guidance was clarified\.?$|^updates [\w.-]+:|^applies (?:the recorded documentation update|editorial spelling and terminology corrections) to |^updates the .+ conditional access or compliance guidance as part of /i;
const genericImpact = /^(?:follow|use) the stated (?:administrator guidance|configuration, role, or navigation guidance|requirements and navigation)(?: for this scenario| when administering this feature)?\.?$|^use the updated documentation for this scenario\.?$/i;
const requeuedByWorker = new Map();
let requeued = 0;

function atomic(filePath, value) {
  const temporary = `${filePath}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
  fs.renameSync(temporary, filePath);
}

for (const filename of fs.readdirSync(websiteDir).filter(value => /^2026-\d\d-\d\d\.json$/.test(value)).sort()) {
  const date = filename.slice(0, 10);
  const reportPath = path.join(websiteDir, filename);
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const changes = [...(report.newFiles || []), ...(report.modifiedFiles || []), ...(report.deletedFiles || [])];
  let changed = false;
  for (const change of changes) {
    const summary = change.englishSummary;
    if (summary?.generatedBy !== 'codex-one-time-backfill') continue;
    const isGeneric = explicitKeys.has(`${date}:${change.eventId}`)
      || generic.test(`${summary.headline} ${summary.summary} ${summary.adminImpact}`)
      || genericHeadline.test(String(summary.headline).trim())
      || sourceLikeSummary.test(String(summary.summary).trim())
      || genericImpact.test(String(summary.adminImpact).trim());
    if (!isGeneric) continue;
    const verb = change.status === 'added' ? 'Added' : change.status === 'removed' ? 'Removed' : 'Updated';
    change.englishSummary = {
      category: 'Doc update',
      headline: String(change.commitMessage || `${verb} ${change.filename.split('/').pop()}`).slice(0, 180),
      summary: `${verb} Microsoft Intune documentation in ${change.filename}.`,
      adminImpact: 'Review the underlying documentation change to determine whether it affects tenant configuration or rollout plans.',
      generatedBy: 'fallback'
    };
    const worker = date <= '2026-04-30' ? 'individuals-early' : 'individuals-late';
    if (!requeuedByWorker.has(worker)) requeuedByWorker.set(worker, new Set());
    requeuedByWorker.get(worker).add(`${date}:${change.eventId}`);
    requeued += 1;
    changed = true;
  }
  if (changed) atomic(reportPath, report);
}

for (const [worker, keys] of requeuedByWorker) {
  const progressPath = path.join(websiteDir, 'codex-backfill-progress', `${worker}.json`);
  const progress = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
  progress.completed = (progress.completed || []).filter(key => !keys.has(key));
  progress.updatedAt = new Date().toISOString();
  progress.requeuedGeneric = Number(progress.requeuedGeneric || 0) + keys.size;
  atomic(progressPath, progress);
}

console.log(`Requeued ${requeued} summaries for evidence-backed rewriting.`);

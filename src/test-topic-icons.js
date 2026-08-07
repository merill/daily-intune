const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { TOPIC_ICONS, topicIcon, topicIconPath } = require('./topic-icons');

const CURRENT_TOPIC_SLUGS = [
  'app-management',
  'device-configuration',
  'device-enrollment',
  'device-security',
  'compliance',
  'endpoint-analytics',
  'device-updates',
  'tenant-administration',
  'windows',
  'android',
  'apple',
  'linux',
  'fundamentals',
  'troubleshooting',
  'developer',
  'general'
];

test('every current topic has a locally stored SVG mapping', () => {
  assert.deepEqual(Object.keys(TOPIC_ICONS), CURRENT_TOPIC_SLUGS);
  assert.equal(new Set(Object.values(TOPIC_ICONS).map(mapping => mapping.file)).size, CURRENT_TOPIC_SLUGS.length);
  assert.equal(new Set(Object.values(TOPIC_ICONS).map(mapping => mapping.sourcePath)).size, CURRENT_TOPIC_SLUGS.length);
  for (const slug of CURRENT_TOPIC_SLUGS) {
    const mapping = topicIcon(slug);
    const asset = path.resolve(__dirname, '..', 'assets', 'site', 'topics', mapping.file);
    assert.equal(path.extname(mapping.file), '.svg');
    assert.ok(fs.existsSync(asset), `${slug} asset should exist`);
    assert.match(fs.readFileSync(asset, 'utf8'), /^<svg\b/);
  }
});

test('unknown topic slugs use the general icon', () => {
  assert.equal(topicIcon('not-yet-classified'), TOPIC_ICONS.general);
  assert.equal(topicIconPath('not-yet-classified'), '/assets/topics/general.svg');
});

test('device security uses the local security icon', () => {
  const mapping = topicIcon('device-security');
  assert.equal(mapping.file, 'device-security.svg');
  assert.equal(mapping.sourceName, 'Security Baselines');
  assert.equal(mapping.match, 'closest');
});

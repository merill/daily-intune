const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { PRODUCT_ICONS, productIcon, productIconPath } = require('./product-icons');

const CURRENT_PRODUCT_SLUGS = [
  'intune',
  'windows-autopilot',
  'configuration-manager',
  'intune-suite',
  'endpoint-privilege-management',
  'remote-help',
  'advanced-analytics',
  'cloud-pki',
  'enterprise-app-management',
  'security-copilot'
];

test('every current product has a locally stored SVG mapping', () => {
  assert.deepEqual(Object.keys(PRODUCT_ICONS), CURRENT_PRODUCT_SLUGS);
  for (const slug of CURRENT_PRODUCT_SLUGS) {
    const mapping = productIcon(slug);
    const asset = path.resolve(__dirname, '..', 'assets', 'site', 'products', mapping.file);
    assert.equal(path.extname(mapping.file), '.svg');
    assert.ok(fs.existsSync(asset), `${slug} asset should exist`);
    assert.match(fs.readFileSync(asset, 'utf8'), /^<svg\b/);
  }
});

test('unknown product slugs use the Intune icon', () => {
  assert.equal(productIcon('not-yet-classified'), PRODUCT_ICONS.intune);
  assert.equal(productIconPath('not-yet-classified'), '/assets/products/intune.svg');
});

test('Microsoft Intune uses the upstream product mark', () => {
  const mapping = productIcon('intune');
  assert.equal(mapping.sourceName, 'Microsoft Intune');
  assert.equal(mapping.match, 'exact');
});

test('Windows Autopilot uses the Automanaged VM service icon', () => {
  const mapping = productIcon('windows-autopilot');
  assert.equal(mapping.sourceName, 'Automanaged VM');
  assert.equal(mapping.sourcePath, 'compute/02112-icon-service-Automanaged-VM.svg');
});

test('Configuration Manager uses the OSConfig service icon', () => {
  const mapping = productIcon('configuration-manager');
  assert.equal(mapping.sourceName, 'OSConfig');
  assert.equal(mapping.sourcePath, 'other/03365-icon-service-OSConfig.svg');
});

test('Intune Suite shares the default Microsoft Intune logo', () => {
  const mapping = productIcon('intune-suite');
  assert.equal(mapping.file, 'intune.svg');
  assert.equal(mapping.sourceName, 'Microsoft Intune');
  assert.equal(mapping.sourcePath, 'intune/Microsoft-intune.svg');
  assert.equal(mapping.match, 'shared');
});

test('Endpoint Privilege Management uses the Application Security Groups icon', () => {
  const mapping = productIcon('endpoint-privilege-management');
  assert.equal(mapping.sourceName, 'Application Security Groups');
  assert.equal(mapping.sourcePath, 'security/10244-icon-service-Application-Security-Groups.svg');
});

test('Cloud PKI uses the light blue Certificate icon', () => {
  const mapping = productIcon('cloud-pki');
  assert.equal(mapping.sourceName, 'Certificate');
  assert.equal(mapping.sourcePath, 'Microsoft/light-blue-Certificate.svg');
});

const PRODUCT_ICON_BASE_PATH = '/assets/products';

const SOURCE = Object.freeze({
  repository: 'https://github.com/DanielBradley1/msicons',
  revision: '3d57443ed4445be9465ee2fee6a6ce6fd02cf90c'
});

const PRODUCT_ICONS = Object.freeze({
  intune: icon('intune.svg', 'Microsoft Intune', 'intune/Microsoft-intune.svg', 'exact'),
  'windows-autopilot': icon('autopilot.svg', 'Automanaged VM', 'compute/02112-icon-service-Automanaged-VM.svg', 'closest'),
  'configuration-manager': icon('configuration-manager.svg', 'Managed Desktop', 'management-governance/10311-icon-service-Managed-Desktop.svg', 'closest'),
  'intune-suite': icon('intune-suite.svg', 'Devices', 'intune/10332-icon-service-Devices.svg', 'closest'),
  'endpoint-privilege-management': icon('epm.svg', 'Entra Privileged Identity Management', 'identity/02251-icon-service-Entra-Privileged-Identity-Management.svg', 'closest'),
  'remote-help': icon('remote-help.svg', 'Help and Support', 'general/10013-icon-service-Help-and-Support.svg', 'closest'),
  'advanced-analytics': icon('advanced-analytics.svg', 'Log Analytics Workspaces', 'analytics/00009-icon-service-Log-Analytics-Workspaces.svg', 'closest'),
  'cloud-pki': icon('cloud-pki.svg', 'App Service Certificates', 'app-services/00049-icon-service-App-Service-Certificates.svg', 'closest'),
  'enterprise-app-management': icon('enterprise-app-management.svg', 'Managed Applications Center', 'management-governance/10313-icon-service-Managed-Applications-Center.svg', 'closest'),
  'security-copilot': icon('copilot.svg', 'Copilot color', 'fabric/copilot_color.svg', 'closest')
});

function icon(file, sourceName, sourcePath, match) {
  return Object.freeze({ file, sourceName, sourcePath, match });
}

function productIcon(slug) {
  return PRODUCT_ICONS[String(slug || '').toLowerCase()] || PRODUCT_ICONS.intune;
}

function productIconPath(slug) {
  return `${PRODUCT_ICON_BASE_PATH}/${productIcon(slug).file}`;
}

module.exports = {
  SOURCE,
  PRODUCT_ICONS,
  PRODUCT_ICON_BASE_PATH,
  productIcon,
  productIconPath
};

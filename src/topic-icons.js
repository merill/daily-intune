const TOPIC_ICON_BASE_PATH = '/assets/topics';

const SOURCE = Object.freeze({
  repository: 'https://github.com/DanielBradley1/msicons',
  revision: '3d57443ed4445be9465ee2fee6a6ce6fd02cf90c'
});

const TOPIC_ICONS = Object.freeze({
  'app-management': icon('app-management.svg', 'Client Apps', 'intune/10331-icon-service-Client-Apps.svg', 'exact'),
  'device-configuration': icon('device-configuration.svg', 'Device Configuration', 'intune/10338-icon-service-Device-Configuration.svg', 'exact'),
  'device-enrollment': icon('device-enrollment.svg', 'Device Enrollment', 'intune/10337-icon-service-Device-Enrollment.svg', 'exact'),
  'device-security': icon('device-security.svg', 'Security Baselines', 'intune/10336-icon-service-Security-Baselines.svg', 'closest'),
  compliance: icon('compliance.svg', 'Device Compliance', 'intune/10333-icon-service-Device-Compliance.svg', 'exact'),
  'endpoint-analytics': icon('endpoint-analytics.svg', 'Endpoint Analytics', 'analytics/00562-icon-service-Endpoint-Analytics.svg', 'exact'),
  'device-updates': icon('device-updates.svg', 'Software Updates', 'intune/10335-icon-service-Software-Updates.svg', 'exact'),
  'tenant-administration': icon('tenant-administration.svg', 'Entra Identity Roles and Administrators', 'intune/10340-icon-service-Entra-Identity-Roles-and-Administrators.svg', 'closest'),
  windows: icon('windows.svg', 'Device Security Windows', 'intune/00399-icon-service-Device-Security-Windows.svg', 'closest'),
  android: icon('android.svg', 'Device Security Google', 'intune/00399-icon-service-Device-Security-Google.svg', 'closest'),
  apple: icon('apple.svg', 'Device Security Apple', 'intune/00399-icon-service-Device-Security-Apple.svg', 'closest'),
  linux: icon('linux.svg', 'Azure Linux', 'new-icons/03645-icon-service-Azure-Linux.svg', 'closest'),
  fundamentals: icon('fundamentals.svg', 'Guide', 'general/10810-icon-service-Guide.svg', 'closest'),
  troubleshooting: icon('troubleshooting.svg', 'Troubleshoot', 'general/10341-icon-service-Troubleshoot.svg', 'exact'),
  developer: icon('developer.svg', 'Code', 'general/10787-icon-service-Code.svg', 'closest'),
  general: icon('general.svg', 'Information', 'general/10005-icon-service-Information.svg', 'closest')
});

function icon(file, sourceName, sourcePath, match) {
  return Object.freeze({ file, sourceName, sourcePath, match });
}

function topicIcon(slug) {
  return TOPIC_ICONS[String(slug || '').toLowerCase()] || TOPIC_ICONS.general;
}

function topicIconPath(slug) {
  return `${TOPIC_ICON_BASE_PATH}/${topicIcon(slug).file}`;
}

module.exports = {
  SOURCE,
  TOPIC_ICONS,
  TOPIC_ICON_BASE_PATH,
  topicIcon,
  topicIconPath
};

// Product configuration for Daily Intune News.
//
// CommonJS rather than JSON because the classification rules are RegExps.
// Everything the generator needs that is specific to Intune lives here; the code
// in src/ is product-neutral and reads from this file.

module.exports = {
  site: {
    name: 'Daily Intune News',
    host: 'daily.intune.admin.news',
    url: 'https://daily.intune.admin.news',
    description: 'A readable record of what changed across Microsoft Intune documentation and Message Center.',
    productName: 'Microsoft Intune',
    audience: 'Microsoft Intune administrators'
  },

  brand: {
    wordmark: 'Daily Intune News',
    ogAlt: 'Daily Intune News \u2014 Microsoft Intune change intelligence',
    themeStorageKey: 'intune-news-theme',
    logo: 'intune-news-icon-64.png',
    extraCss: "",
    emailEyebrow: 'Daily Intune News',
    tokenStorageKey: 'intune-news-github-token'
  },

  discord: {
    botName: 'Intune Scout'
  },

  // Prompt fragments. The instructions themselves are product-neutral and live
  // in the code; only the subject and the openers to avoid differ.
  ai: {
    schemaPrefix: 'intune',
    impactBoost: /autopilot|app protection|endpoint privilege|remote help|cloud pki|compliance|settings catalog|device enrollment/
  },

  // How the generator reaches the documentation clone, and how far back it
  // renders a page per change rather than linking to the full-page diff.
  build: {
    docsCloneDir: 'memdocs',
    detailDays: 14
  },

  links: {
    // Utility icons in the header. Each icon must exist in assets/site/ui.
    related: []
  },

  analytics: {
    piqoSite: 'fmqjf1u7'
  },

  messageCenter: {
    servicePattern: /\bIntune\b/i
  },

  taxonomy: {
    products: [
    { slug: 'intune', name: 'Microsoft Intune', short: 'Intune', learn: 'https://learn.microsoft.com/en-us/intune/' },
    { slug: 'windows-autopilot', name: 'Windows Autopilot', short: 'Windows Autopilot', learn: 'https://learn.microsoft.com/en-us/autopilot/' },
    { slug: 'configuration-manager', name: 'Microsoft Configuration Manager', short: 'Configuration Manager', learn: 'https://learn.microsoft.com/en-us/intune/configmgr/' },
    { slug: 'intune-suite', name: 'Microsoft Intune Suite', short: 'Intune Suite', learn: 'https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/intune-add-ons' },
    { slug: 'endpoint-privilege-management', name: 'Endpoint Privilege Management', short: 'Endpoint Privilege Management', learn: 'https://learn.microsoft.com/en-us/intune/intune-service/protect/epm-overview' },
    { slug: 'remote-help', name: 'Microsoft Intune Remote Help', short: 'Remote Help', learn: 'https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/remote-help' },
    { slug: 'advanced-analytics', name: 'Microsoft Intune Advanced Analytics', short: 'Advanced Analytics', learn: 'https://learn.microsoft.com/en-us/intune/analytics/advanced-endpoint-analytics' },
    { slug: 'cloud-pki', name: 'Microsoft Cloud PKI', short: 'Cloud PKI', learn: 'https://learn.microsoft.com/en-us/intune/intune-service/protect/microsoft-cloud-pki-overview' },
    { slug: 'enterprise-app-management', name: 'Enterprise App Management', short: 'Enterprise App Management', learn: 'https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-enterprise-app-management' },
    { slug: 'security-copilot', name: 'Microsoft Security Copilot in Intune', short: 'Security Copilot', learn: 'https://learn.microsoft.com/en-us/intune/intune-service/copilot/security-copilot' }
    ],
    defaultProduct: 'intune',

    topics: [
    { slug: 'app-management', name: 'App management' },
    { slug: 'device-configuration', name: 'Device configuration' },
    { slug: 'device-enrollment', name: 'Device enrollment' },
    { slug: 'device-security', name: 'Device security' },
    { slug: 'compliance', name: 'Compliance' },
    { slug: 'endpoint-analytics', name: 'Endpoint analytics' },
    { slug: 'device-updates', name: 'Device updates' },
    { slug: 'tenant-administration', name: 'Tenant administration' },
    { slug: 'windows', name: 'Windows' },
    { slug: 'android', name: 'Android' },
    { slug: 'apple', name: 'Apple' },
    { slug: 'linux', name: 'Linux' },
    { slug: 'fundamentals', name: 'Fundamentals' },
    { slug: 'troubleshooting', name: 'Troubleshooting' },
    { slug: 'developer', name: 'Developer' },
    { slug: 'general', name: 'General' }
    ],
    defaultTopic: 'general',

    stopwords: 'microsoft intune documentation docs update updated updates change changes new for with from into about that this your their has have will are and the how use using overview configure configuration guide learn overview support service services preview',

    searchAliases: {
      mdm: 'mobile device management',
      mam: 'mobile application management',
      epm: 'endpoint privilege management',
      wufb: 'windows update for business',
      laps: 'local administrator password solution',
      autopilot: 'windows autopilot'
    }
  },

  classify: {
    products: [
      { slug: 'windows-autopilot', match: /(^|\/)autopilot\/|windows autopilot|device preparation/ },
      { slug: 'configuration-manager', match: /(^|\/)configmgr\/|configuration manager|\bconfigmgr\b|co-management/ },
      { slug: 'endpoint-privilege-management', match: /(^|\/)epm\/|endpoint privilege management|elevation rules?/ },
      { slug: 'remote-help', match: /(^|\/)remote-help\/|remote help/ },
      { slug: 'advanced-analytics', match: /(^|\/)advanced-analytics\/|advanced analytics/ },
      { slug: 'cloud-pki', match: /(^|\/)cloud-pki\/|cloud pki/ },
      { slug: 'enterprise-app-management', match: /enterprise app management|enterprise app catalog/ },
      { slug: 'security-copilot', match: /(^|\/)copilot\/|security copilot|copilot in intune/ },
      { slug: 'intune-suite', match: /intune suite|intune add-ons?|advanced endpoint analytics/ }
    ],

    topics: [
      { slug: 'app-management', match: /(^|\/)app-management\/|(^|\/)apps?\/|app protection|managed apps?|win32 app|mobile application management/ },
      { slug: 'device-enrollment', match: /(^|\/)device-enrollment\/|(^|\/)autopilot\/|enroll|enrollment|provisioning package/ },
      { slug: 'device-security', match: /(^|\/)device-security\/|(^|\/)protect\/|endpoint security|antivirus|firewall|attack surface|privilege/ },
      { slug: 'compliance', match: /compliance|conditional access/ },
      { slug: 'endpoint-analytics', match: /(^|\/)endpoint-analytics\/|(^|\/)advanced-analytics\/|endpoint analytics|analytics|report|monitor/ },
      { slug: 'device-updates', match: /(^|\/)device-updates\/|windows update|feature update|quality update|driver update/ },
      { slug: 'tenant-administration', match: /(^|\/)governance\/|tenant admin|role-based access|\brbac\b|scope tag|audit log/ },
      { slug: 'android', match: /android|aosp/ },
      { slug: 'apple', match: /\bios\b|ipados|macos|apple|iphone|ipad/ },
      { slug: 'linux', match: /\blinux\b|ubuntu|red hat/ },
      { slug: 'windows', match: /windows|surface hub/ },
      { slug: 'device-configuration', match: /(^|\/)device-configuration\/|configuration profile|settings catalog|administrative template|policy csp/ },
      { slug: 'fundamentals', match: /fundamental|what is|overview|concept/ },
      { slug: 'troubleshooting', match: /troubleshoot|error|diagnos|remediat/ },
      { slug: 'developer', match: /(^|\/)developer\/|developer|graph api|sdk|powershell|code sample/ }
    ]
  }
};

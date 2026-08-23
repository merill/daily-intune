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
    // Icon beside the About page kicker.
    aboutIcon: '/assets/ui/intune-news-icon-64.png',
    // UI assets copied on top of the set the generator always copies.
    uiAssets: ['intune-news-icon-64.png', 'envelope-open.svg'],
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
    subject: 'Intune',
    // Headline openers the model must avoid, on top of the neutral ones the
    // prompt always forbids.
    forbiddenOpeners: ['Microsoft Intune documentation', 'Intune documentation'],
    impactBoost: /autopilot|app protection|endpoint privilege|remote help|cloud pki|compliance|settings catalog|device enrollment/
  },

  // Which repository paths become articles on Microsoft Learn, how a path maps
  // to its public URL, and how a path maps to a report heading. `learnRoutes`
  // and `areas.rules` are ordered: first match wins, and $1, $2, ... carry the
  // captured groups into the template.
  // Identity written into persisted state and into published records. This is
  // not prose: change one of these and the code stops recognising what it wrote
  // before — re-emitting every event, or re-sending a broadcast that already
  // went out — so a product's values are fixed for the life of the site.
  identity: {
    docEventPrefix: 'intune-docs',
    batchEventPrefix: 'intune-news',
    // The double-send guard for the daily email. Kit is re-listed by this marker
    // before a broadcast is created.
    kitMarkerPrefix: 'daily-intune-news'
  },

  docs: {
    learnRootUrl: 'https://learn.microsoft.com/en-us/intune/',
    trackedPaths: /^(intune|autopilot)\//,
    learnRoutes: [
      { match: /^(.*)\.md$/, path: '$1' }
    ],
    areas: {
      // memdocs paths are already Learn paths, so nothing is stripped.
      stripPrefix: null,
      rules: [
        { match: /^(autopilot)\/([^/]+)\/.*$/, name: '$1/$2' },
        { match: /^autopilot(?:\/|$)/, name: 'Windows Autopilot' },
        { match: /^(intune)\/([^/]+)\/.*$/, name: '$1/$2' },
        { match: /^intune(?:\/|$)/, name: 'Microsoft Intune' }
      ],
      fallback: 'General Intune documentation'
    }
  },

  // How the generator reaches the documentation clone, and how far back it
  // renders a page per change rather than linking to the full-page diff.
  build: {
    docsCloneDir: 'memdocs',
    detailDays: 14
  },

  links: {
    // Utility icons in the header. Each icon must exist in assets/site/ui.
    related: [],

    // Product links appended to the footer navigation.
    footer: [
      { url: 'https://intune.chat', label: 'Intune.Chat podcast' }
    ],

    // Extra entries under "Stay current" in the About sidebar. A product with
    // nothing beyond the daily email leaves this empty.
    stayCurrent: [],

    // The "Follow the project" list in the About sidebar.
    followProject: [
      { url: 'https://intune.chat', label: 'Intune.Chat podcast' }
    ]
  },

  // Page prose. The generator holds the markup; every product-specific
  // sentence lives here.
  copy: {
    rssFeedLabel: 'Subscribe to the Daily Intune News RSS feed',
    messageCenterHeading: 'Intune in Message Center',

    landing: {
      heading: 'Keep up with Microsoft Intune',
      blurb: 'Daily highlights from Microsoft Learn and Message Center.'
    },

    directory: {
      productsLede: 'Follow changes across Intune, Windows Autopilot, Configuration Manager, and the Intune Suite.',
      topicsLede: 'Use topics to follow app management, enrollment, configuration, security, analytics, updates, and supported platforms.'
    },

    search: {
      inputLabel: 'Search Intune changes',
      placeholder: 'Try Autopilot, settings catalog, or app protection\u2026'
    },

    compare: {
      pageTitle: 'Compare an Intune Learn page',
      lede: 'Paste an Intune article URL. This page finds the source in MicrosoftDocs/memdocs, loads its latest two revisions from GitHub, and builds a visual and Markdown diff entirely in your browser.',
      placeholderUrl: 'https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune',
      mapping: '<code>/en-us/intune/intune-service/example</code> maps to <code>intune/intune-service/example.md</code> in <a href="https://github.com/MicrosoftDocs/memdocs" target="_blank" rel="noopener noreferrer">MicrosoftDocs/memdocs</a>.'
    },

    dailyEmail: {
      eyebrow: 'Daily Intune.Admin.News',
      intro: 'Get a concise summary of the latest Microsoft Intune updates delivered straight to your inbox.'
    },

    detail: {
      adminHeading: 'What Intune admins need to know',
      adminImpactLabel: 'For Intune administrators',
      summaryLabel: 'Editorial summary',
      summaryDisclosure: 'This summary was assembled from the tracked documentation change. Verify important details in the full Microsoft Learn article.'
    },

    footer: {
      featureBlurb: 'Everyone loves using Maester to track their Microsoft Intune and Microsoft 365 tenant security configuration. Maester Cloud turns those daily results into a continuous security record, with 5+ years of history, drift detection, and alerts when your posture changes.',
      tagline: 'Independent change tracking for Microsoft Intune administrators.'
    },

    about: {
      heading: 'Built for the die-hard Microsoft Intune community.',
      lede: 'This site is dedicated to the people who want to know what changed in Microsoft Intune\u2014not just what the documentation says today. It is built by <a href="https://merill.net">Merill Fernando</a> for Intune admins, architects, developers, and fellow device-management enthusiasts.',
      whyItExists: [
        'Microsoft Intune moves quickly. Documentation pages, guidance, previews, and service announcements change every day, but those changes can be difficult to spot once a page has been updated.',
        'Daily Intune News keeps a readable record of those changes so you can catch up by day, week, month, product, or topic\u2014and then open the source material when something matters to you.'
      ],
      howItWorks: [
        'A scheduled workflow watches the public Microsoft Intune documentation, records additions and updates, and brings in relevant Microsoft 365 Message Center announcements.',
        'Plain-English summaries make the daily changes easier to scan. Every documentation item keeps the readable change and Markdown diff available, so the source evidence is always close at hand.'
      ],
      emailEyebrow: 'Automated when Intune changes',
      emailBody: 'Receive the concise Day in brief summary with links to the full evidence. Emails are sent only on days with meaningful Microsoft Intune documentation or Message Center updates, so quiet days stay quiet.',
      // About sections this product runs and another may not. An empty list is
      // how a product opts out; the generator renders whatever is declared.
      extraSections: [],
      community: [
        'This is an independent community project, not a Microsoft product or service. It is built in the open for people who care deeply about endpoint management and want a calmer way to keep up with constant change.'
      ],
      quote: 'For the Intune fans who read release notes for fun, notice the small changes, and help everyone else understand why they matter.',
      bio: '<a href="https://merill.net">Merill Fernando</a> builds tools and writes about Microsoft Intune and Microsoft 365 for the endpoint-management community.'
    }
  },

  analytics: {
    piqoSite: 'fmqjf1u7'
  },

  messageCenter: {
    servicePattern: /\bIntune\b/i
  },

  taxonomy: {
    products: [
    { slug: 'intune', name: 'Microsoft Intune', short: 'Intune', icon: { sourceName: 'Microsoft Intune', sourcePath: 'intune/Microsoft-intune.svg', match: 'exact' }, learn: 'https://learn.microsoft.com/en-us/intune/' },
    { slug: 'windows-autopilot', name: 'Windows Autopilot', short: 'Windows Autopilot', icon: { file: 'autopilot.svg', sourceName: 'Automanaged VM', sourcePath: 'compute/02112-icon-service-Automanaged-VM.svg', match: 'closest' }, learn: 'https://learn.microsoft.com/en-us/autopilot/' },
    { slug: 'configuration-manager', name: 'Microsoft Configuration Manager', short: 'Configuration Manager', icon: { sourceName: 'OSConfig', sourcePath: 'other/03365-icon-service-OSConfig.svg', match: 'closest' }, learn: 'https://learn.microsoft.com/en-us/intune/configmgr/' },
    { slug: 'intune-suite', name: 'Microsoft Intune Suite', short: 'Intune Suite', icon: { file: 'intune.svg', sourceName: 'Microsoft Intune', sourcePath: 'intune/Microsoft-intune.svg', match: 'shared' }, learn: 'https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/intune-add-ons' },
    { slug: 'endpoint-privilege-management', name: 'Endpoint Privilege Management', short: 'Endpoint Privilege Management', icon: { file: 'epm.svg', sourceName: 'Application Security Groups', sourcePath: 'security/10244-icon-service-Application-Security-Groups.svg', match: 'closest' }, learn: 'https://learn.microsoft.com/en-us/intune/intune-service/protect/epm-overview' },
    { slug: 'remote-help', name: 'Microsoft Intune Remote Help', short: 'Remote Help', icon: { sourceName: 'Help and Support', sourcePath: 'general/10013-icon-service-Help-and-Support.svg', match: 'closest' }, learn: 'https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/remote-help' },
    { slug: 'advanced-analytics', name: 'Microsoft Intune Advanced Analytics', short: 'Advanced Analytics', icon: { sourceName: 'Log Analytics Workspaces', sourcePath: 'analytics/00009-icon-service-Log-Analytics-Workspaces.svg', match: 'closest' }, learn: 'https://learn.microsoft.com/en-us/intune/analytics/advanced-endpoint-analytics' },
    { slug: 'cloud-pki', name: 'Microsoft Cloud PKI', short: 'Cloud PKI', icon: { sourceName: 'Certificate', sourcePath: 'Microsoft/light-blue-Certificate.svg', match: 'closest' }, learn: 'https://learn.microsoft.com/en-us/intune/intune-service/protect/microsoft-cloud-pki-overview' },
    { slug: 'enterprise-app-management', name: 'Enterprise App Management', short: 'Enterprise App Management', icon: { sourceName: 'Managed Applications Center', sourcePath: 'management-governance/10313-icon-service-Managed-Applications-Center.svg', match: 'closest' }, learn: 'https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-enterprise-app-management' },
    { slug: 'security-copilot', name: 'Microsoft Security Copilot in Intune', short: 'Security Copilot', icon: { file: 'copilot.svg', sourceName: 'Copilot color', sourcePath: 'fabric/copilot_color.svg', match: 'closest' }, learn: 'https://learn.microsoft.com/en-us/intune/intune-service/copilot/security-copilot' }
    ],
    defaultProduct: 'intune',

    topics: [
    { slug: 'app-management', name: 'App management', icon: { sourceName: 'Client Apps', sourcePath: 'intune/10331-icon-service-Client-Apps.svg', match: 'exact' } },
    { slug: 'device-configuration', name: 'Device configuration', icon: { sourceName: 'Device Configuration', sourcePath: 'intune/10338-icon-service-Device-Configuration.svg', match: 'exact' } },
    { slug: 'device-enrollment', name: 'Device enrollment', icon: { sourceName: 'Device Enrollment', sourcePath: 'intune/10337-icon-service-Device-Enrollment.svg', match: 'exact' } },
    { slug: 'device-security', name: 'Device security', icon: { sourceName: 'Security Baselines', sourcePath: 'intune/10336-icon-service-Security-Baselines.svg', match: 'closest' } },
    { slug: 'compliance', name: 'Compliance', icon: { sourceName: 'Device Compliance', sourcePath: 'intune/10333-icon-service-Device-Compliance.svg', match: 'exact' } },
    { slug: 'endpoint-analytics', name: 'Endpoint analytics', icon: { sourceName: 'Endpoint Analytics', sourcePath: 'analytics/00562-icon-service-Endpoint-Analytics.svg', match: 'exact' } },
    { slug: 'device-updates', name: 'Device updates', icon: { sourceName: 'Software Updates', sourcePath: 'intune/10335-icon-service-Software-Updates.svg', match: 'exact' } },
    { slug: 'tenant-administration', name: 'Tenant administration', icon: { sourceName: 'Intune Identity Roles and Administrators', sourcePath: 'intune/10340-icon-service-Intune-Identity-Roles-and-Administrators.svg', match: 'closest' } },
    { slug: 'windows', name: 'Windows', icon: { sourceName: 'Device Security Windows', sourcePath: 'intune/00399-icon-service-Device-Security-Windows.svg', match: 'closest' } },
    { slug: 'android', name: 'Android', icon: { sourceName: 'Device Security Google', sourcePath: 'intune/00399-icon-service-Device-Security-Google.svg', match: 'closest' } },
    { slug: 'apple', name: 'Apple', icon: { sourceName: 'Device Security Apple', sourcePath: 'intune/00399-icon-service-Device-Security-Apple.svg', match: 'closest' } },
    { slug: 'linux', name: 'Linux', icon: { sourceName: 'Azure Linux', sourcePath: 'new-icons/03645-icon-service-Azure-Linux.svg', match: 'closest' } },
    { slug: 'fundamentals', name: 'Fundamentals', icon: { sourceName: 'Guide', sourcePath: 'general/10810-icon-service-Guide.svg', match: 'closest' } },
    { slug: 'troubleshooting', name: 'Troubleshooting', icon: { sourceName: 'Troubleshoot', sourcePath: 'general/10341-icon-service-Troubleshoot.svg', match: 'exact' } },
    { slug: 'developer', name: 'Developer', icon: { sourceName: 'Code', sourcePath: 'general/10787-icon-service-Code.svg', match: 'closest' } },
    { slug: 'general', name: 'General', icon: { sourceName: 'Information', sourcePath: 'general/10005-icon-service-Information.svg', match: 'closest' } }
    ],
    defaultTopic: 'general',

    // Where the SVGs under assets/site were taken from, pinned so the set can be
    // resynced against the same revision it was drawn from.
    iconSource: {
      repository: 'https://github.com/DanielBradley1/msicons',
      revision: '3d57443ed4445be9465ee2fee6a6ce6fd02cf90c'
    },

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

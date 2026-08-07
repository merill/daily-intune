# Topic icon sources

The SVG files used for topic categories were copied without modification from
[DanielBradley1/msicons](https://github.com/DanielBradley1/msicons) at commit
`3d57443ed4445be9465ee2fee6a6ce6fd02cf90c` on 7 August 2026.

The selection follows the category vocabulary used by the Devices pillar in the
[Microsoft Zero Trust Workshop](https://zerotrust.microsoft.com/): managed
devices, enrollment, configuration, apps, compliance, security, updates,
analytics, and administration each receive a distinct visual marker.

The upstream repository did not include a license file at that revision. These
assets are Microsoft product and Azure service marks collected by that project;
review Microsoft trademark and asset-use requirements before redistributing
them outside this site.

| Local file | Upstream icon | Upstream path | Match |
| --- | --- | --- | --- |
| `app-management.svg` | Client Apps | `msicons/public/icons/intune/10331-icon-service-Client-Apps.svg` | Exact |
| `device-configuration.svg` | Device Configuration | `msicons/public/icons/intune/10338-icon-service-Device-Configuration.svg` | Exact |
| `device-enrollment.svg` | Device Enrollment | `msicons/public/icons/intune/10337-icon-service-Device-Enrollment.svg` | Exact |
| `device-security.svg` | Security Baselines | `msicons/public/icons/intune/10336-icon-service-Security-Baselines.svg` | Closest available |
| `compliance.svg` | Device Compliance | `msicons/public/icons/intune/10333-icon-service-Device-Compliance.svg` | Exact |
| `endpoint-analytics.svg` | Endpoint Analytics | `msicons/public/icons/analytics/00562-icon-service-Endpoint-Analytics.svg` | Exact |
| `device-updates.svg` | Software Updates | `msicons/public/icons/intune/10335-icon-service-Software-Updates.svg` | Exact |
| `tenant-administration.svg` | Entra Identity Roles and Administrators | `msicons/public/icons/intune/10340-icon-service-Entra-Identity-Roles-and-Administrators.svg` | Closest available |
| `windows.svg` | Device Security Windows | `msicons/public/icons/intune/00399-icon-service-Device-Security-Windows.svg` | Closest available |
| `android.svg` | Device Security Google | `msicons/public/icons/intune/00399-icon-service-Device-Security-Google.svg` | Closest available |
| `apple.svg` | Device Security Apple | `msicons/public/icons/intune/00399-icon-service-Device-Security-Apple.svg` | Closest available |
| `linux.svg` | Azure Linux | `msicons/public/icons/new-icons/03645-icon-service-Azure-Linux.svg` | Closest available |
| `fundamentals.svg` | Guide | `msicons/public/icons/general/10810-icon-service-Guide.svg` | Closest available |
| `troubleshooting.svg` | Troubleshoot | `msicons/public/icons/general/10341-icon-service-Troubleshoot.svg` | Exact |
| `developer.svg` | Code | `msicons/public/icons/general/10787-icon-service-Code.svg` | Closest available |
| `general.svg` | Information | `msicons/public/icons/general/10005-icon-service-Information.svg` | Closest available |

The reusable source mapping, including upstream icon names and paths, is in
`src/topic-icons.js`.

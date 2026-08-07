# Microsoft Intune Documentation Change Monitor

An automated GitHub Actions workflow that monitors the [Microsoft Intune documentation repository](https://github.com/MicrosoftDocs/memdocs) and sends daily email summaries of documentation changes.

## 🚀 Features

- **📅 Four-hour Monitoring**: Refreshes at six UTC slots and reconciles the daily subscriber email from 8:15 AM onward
- **🗞️ Subscriber Email**: Concise Kit broadcasts for confirmed subscribers, with links to the full daily evidence
- **🔍 Smart Analysis**: Categorizes changes into new files, modifications, and deletions
- **💡 Change Summaries**: Provides detailed summaries of what changed in each modified file
- **📊 Visual Reports**: Clean, responsive HTML reports with statistics and direct GitHub links
- **📁 Archive**: Saves historical reports as GitHub Actions artifacts
- **✨ Plain-English Digest**: Uses the OpenAI Responses API to explain the day's material changes for Intune administrators

## 📋 What You Get

### Subscriber Email Includes:
1. **Daily headline and overview**: A concise explanation of the meaningful Intune changes
2. **Key changes**: The most important updates with product and topic context
3. **Source links**: Direct links to the corresponding evidence on Daily.Intune.Admin.News
4. **Account-level compliance**: Kit's default template supplies the unsubscribe link and sender details

### Sample Report Structure:
```
Microsoft Intune daily update — [date]

[Daily headline]
[Concise overview]

Key changes
├── [Product · Topic] [Change headline]
│   └── [What changed and why it matters]
└── [Additional material changes]

View all updates for [date] →
```

## ⚙️ Setup Instructions

### 1. **Repository Setup**
```bash
# Clone this repository
git clone https://github.com/yourusername/daily-intune.git
cd daily-intune

# Install dependencies
npm ci
```

### 2. **Configure Secrets**
Go to your repository settings → Secrets and variables → Actions, and add:

- **`OPENAI_API_KEY`**: OpenAI project API key used to generate per-diff and grouped plain-English summaries
- **`DISCORD_INTUNE_SCOUT_WEBHOOK_URL`**: Shared Intune Scout incoming webhook for the Discord channel that receives both documentation and Message Center updates
- **`KIT_API_KEY`**: Kit v4 API key for the dedicated Daily.Intune.Admin.News account; configure it before enabling scheduled reconciliation
- **`KIT_SENDER_EMAIL`**: Optional override for the broadcast sender; omit it to use the verified Kit account default
- **`HEALTHCHECKS_PING_URL`**: Private Healthchecks.io ping URL for detecting scheduled runs that never start or finish

Add these repository secrets for the public inline subscription form configuration:

- **`KIT_DAILY_FORM_UID`**: The public `data-uid` from Kit's JavaScript form embed
- **`KIT_DAILY_FORM_EMBED_SRC`**: The HTTPS `src` URL from Kit's JavaScript form embed; only Kit or ConvertKit hosts are accepted by the site generator

The workflow defaults to `gpt-5.6-luna` with `xhigh` reasoning and three concurrent per-diff requests. Every material diff receives its own English summary. When a report contains multiple diffs, one additional Luna request groups related changes into a daily digest. You can override `OPENAI_SUMMARY_MODEL`, `OPENAI_SUMMARY_REASONING_EFFORT`, and `OPENAI_SUMMARY_CONCURRENCY`, or disable AI generation with `OPENAI_SUMMARY_ENABLED=false`. Deterministic fallbacks keep report generation, Discord delivery, and email working if OpenAI is unavailable.

### Discord setup

1. Create the target text channel in your Discord server.
2. Open **Edit Channel → Integrations → Webhooks** and create one webhook named `Intune Scout`.
3. Store its URL in this repository as the Actions secret `DISCORD_INTUNE_SCOUT_WEBHOOK_URL`.
4. Store the same URL under the same secret name in the Message Center repository. GitHub secrets are repository-scoped, but both values point to the single Discord webhook.
5. Run the workflow manually. Documentation changes are combined into one daily summary; Message Center posts retain their own archive and classification format.

Both publishers override the webhook name to `Intune Scout` but omit `avatar_url`, so Discord uses the image configured directly on the shared webhook. Set `DISCORD_INTUNE_SCOUT_NAME` to change the name, or set `DISCORD_INTUNE_SCOUT_AVATAR_URL` to a publicly accessible image URL only when you intentionally want a per-message avatar override.

Discord messages disable all automatic mentions, retry rate limits and transient errors, and persist delivery IDs in `website/discord-state.json` so workflow reruns do not repost the same daily summary. Set `DISCORD_ENABLED=false` to disable delivery or `DISCORD_DRY_RUN=true` to build the queue without sending it.

The documentation notification contains the grouped English digest and one link to the canonical `https://daily.intune.admin.news/day/YYYY-MM-DD/` daily page. It does not post separate cards for each documentation diff.

### Kit (formerly ConvertKit) daily email setup

The public daily list is intentionally separate from the human-curated weekly Intune.Admin.News newsletter. Every successful scheduled refresh calls the separate `daily-kit-broadcast.yml` workflow. Before 08:15 UTC it verifies the previous delivery without creating today's broadcast; at and after 08:15 it reconciles today's report. The later 12:15, 16:15, and 20:15 runs therefore recover an email missed because an earlier Actions run was delayed, dropped, or failed.

1. Create a dedicated Kit Newsletter account, set its business details and timezone, and complete Kit's sending approval. Kit's [new-account checklist](https://help.kit.com/en/articles/14005977-how-to-set-up-your-new-kit-account-a-complete-checklist) shows the current navigation.
2. In **Settings → Email**, add and confirm `updates@daily.intune.admin.news` as the default sending address. The API publisher omits `email_address`, allowing Kit to use this verified default. Set `KIT_SENDER_EMAIL` only if you intentionally need another sending address that is already verified in the same Kit account.
3. In **Settings → Email → Verified Sending Domains**, add `daily.intune.admin.news`, publish the DNS records Kit displays, and click **Validate**. This establishes SPF, DKIM, and DMARC alignment; see Kit's [verified sending domain guide](https://help.kit.com/en/articles/2502558-verify-your-domain-to-optimize-your-deliverability).
4. Configure the account's default Classic or HTML email template with the required unsubscribe link and physical address. The publisher deliberately uses the account default template.
5. Go to **Audience growth → Landing Pages & Forms → + New → Form**, create an inline form, and keep double opt-in enabled by leaving **Auto-confirm new subscribers** unchecked. Customize the confirmation email and success/redirect behavior, then **Save & Publish**. Kit recommends the [JavaScript form embed](https://help.kit.com/en/articles/2502640-the-kit-form-builder).
6. Open **Embed → JavaScript** and copy the script tag's `data-uid` into the `KIT_DAILY_FORM_UID` Actions secret and its HTTPS `src` into `KIT_DAILY_FORM_EMBED_SRC`.
7. In **Settings → Developer → V4 Keys**, select **Add a new key**, name it `daily-intune-github-actions`, and copy it immediately. Save it as the `KIT_API_KEY` Actions secret. V3 keys are not compatible with this publisher; see Kit's [V4 authentication guide](https://developers.kit.com/api-reference/authentication).
8. Test the form, success message, confirmation email, and final opt-in with seed subscribers in Outlook and Gmail. Confirm those subscribers appear as confirmed in Kit before testing a broadcast.
9. Open **Actions → Publish Daily Kit Broadcast → Run workflow**, select a report date, enable **Create a Kit draft without scheduling or sending it**, and inspect/test-send the draft in Kit. Delete that test draft before rerunning draft mode for the same date.
10. Run the workflow once with draft mode disabled only when the verified domain, default sender, template, unsubscribe details, and seed subscribers are ready.

`node scripts/publish-kit-broadcast.js --date YYYY-MM-DD` publishes a saved daily report manually. `node scripts/publish-kit-broadcast.js --auto` runs the same-day reconciliation used by Actions. Set `KIT_DRY_RUN=true` to render and validate a manual payload without contacting Kit. Without `KIT_API_KEY`, manual mode exits successfully after reporting that Kit is not configured; automatic reconciliation fails so the missing production configuration is visible.

For a manual format test, the workflow creates an unscheduled draft in Kit, where you can use Kit's preview or test-send controls for a single recipient. Drafts use a separate `daily-intune-news:YYYY-MM-DD:draft` marker, so they never prevent the real daily broadcast for that date. Draft runs do not update Healthchecks.io; a successful non-draft manual run records the day's production completion.

The publisher uses the combined daily editorial brief, including relevant Message Center items, and falls back to the documentation digest when necessary. It sends only when the selected day contains changes, schedules delivery five minutes ahead, and targets all confirmed subscribers in the dedicated account by omitting `subscriber_filter`, which Kit documents as the all-subscribers default. The Kit workflow serializes all runs and checks an internal `daily-intune-news:YYYY-MM-DD` marker across every cursor-paginated result page before creating a broadcast. After an ambiguous transient POST failure it re-lists broadcasts before retrying, so a broadcast that Kit accepted despite a lost response is not created again.

Later reconciliations query Kit's delivery stats. `completed` verifies success; `scheduled` and `sending` remain healthy for 30 minutes after `send_at`; overdue or unexpected states fail the workflow and report failure to Healthchecks.io. The first run after midnight also verifies the previous UTC day. If that day had meaningful changes but never received a marker, the workflow reports the missed window but does not send stale mail.

### 3. **External heartbeat setup**

1. Create a Healthchecks.io check named `Daily.Intune.Admin.News scheduled pipeline`.
2. Use cron schedule `15 0,4,8,12,16,20 * * *`, timezone `UTC`, and a two-hour grace period.
3. Enable the desired email notification integration.
4. Save the check's private ping URL as the repository secret `HEALTHCHECKS_PING_URL`.

Scheduled runs send `/start`, success, and `/fail` signals. Non-draft manual Kit runs send the same signals, allowing a successful manual recovery to mark the check healthy; draft smoke tests deliberately remain silent. If GitHub Actions never starts a scheduled run, Healthchecks.io alerts after the grace period. Heartbeat request failures do not block content or email publishing.

### 4. **Customize (Optional)**
Edit `.github/workflows/daily-docs-monitor.yml` to:
- Change the four-hour schedule (currently 00:15 through 20:15 UTC)
- Change the 08:15 UTC automatic email cutoff

## 🕒 Optimal Timing

Analysis of 838 merge commits in `MicrosoftDocs/memdocs` from May through early August 2026 found recurring publish/sync cycles around 07:30, 12:30, 17:30, and 22:30 UTC. The 07:30 cycle consistently includes the late Pacific-day changes and its repository sync normally completes by approximately 07:38 UTC.

- **Chosen schedule**: 00:15, 04:15, 08:15, 12:15, 16:15, and 20:15 UTC
- **Why**: Captures each recurring publish/sync cycle soon after it settles while retaining 08:15 UTC as the complete daily email slot
- **Visitor display**: The generated site converts refresh timestamps and daily-page dates to the reader's local timezone in the browser

## 🧪 Testing

Test the monitor manually:
```bash
# Unit tests do not call OpenAI, Discord, or Kit
npm test

# End-to-end local monitor run without Discord publishing
DISCORD_DRY_RUN=true LOCAL_REPO_PATH=/path/to/memdocs npm start
```

Build and preview the static Intune.Admin.News Daily site locally:

```bash
MC_DATA_PATH=../mc/@data npm run build:site
npm run preview:site
```

Open `http://127.0.0.1:4173/`. The generated site uses `daily.intune.admin.news` as its canonical host and includes indexable day, week, month, product, topic, documentation-change, and Message Center pages. Recent documentation details lead with readable context and a formatted comparison, with the raw Markdown patch available as a secondary view.

The generated `/compare/` page is a fully client-side documentation source explorer. Paste a configured public documentation URL to map it to its GitHub repository, load the file's latest two revisions through GitHub's public REST API, and render visual and Markdown diffs in the browser. Public use requires no credentials and normally makes three API requests per comparison. GitHub limits unauthenticated requests by IP; an optional read-only token can be saved in browser-local storage for a higher limit. Tracked reports retain the change commit and its first parent, so links from `/changes/` pages use `/compare/?url=…&base=…&head=…&view=diff` to open the complete diff at the exact revisions represented by that change.

To compare two exact revisions, add `base=<older-commit-sha>&head=<newer-commit-sha>` to the compare URL. A historical link that only has `head` resolves its first parent through GitHub before loading the file. When neither parameter is present, the client compares the latest two commits that changed the file.

Documentation sources are declared in `assets/site/diff-config.js`. Each source maps a public site path to a GitHub repository path:

```js
window.DOC_DIFF_CONFIG = {
  sources: [{
    id: 'example-docs',
    label: 'Example Docs',
    siteUrl: 'https://docs.example.com/guide/',
    stripLocale: true,
    repositoryUrl: 'https://github.com/example/docs',
    repositoryPathPrefix: 'content',
    defaultBranch: 'main',
    fileExtension: '.md'
  }]
};
```

`siteUrl` supplies both the allowed HTTPS host and the public path prefix. With `stripLocale`, a leading segment such as `en-us` is ignored while mapping. The example maps `https://docs.example.com/en-us/guide/start` to `content/start.md`. Include every supported source in the `sources` array.

The checked-in static list currently covers Microsoft Intune, Azure, .NET, PowerShell, Microsoft 365, Microsoft Intune, Microsoft Fabric, Dynamics 365, SQL, Microsoft Graph, Visual Studio, ASP.NET Core, and Windows Server. Sources are matched in array order, so narrower routes belong before broad ones. An optional `query` object can select variants such as Microsoft Graph beta, and `pathAliases` can describe individual Learn-to-repository path exceptions without changing the client code.

Message Center ingestion includes a post when either its service list or title contains the standalone word `Intune` (case-insensitive). Set `MC_DATA_PATH` to the Message Center repository's `@data` directory when building locally; the GitHub workflow clones that repository automatically.

Or trigger the GitHub Action manually:
1. Go to Actions tab in your repository
2. Select "Daily Intune Docs Monitor"
3. Click "Run workflow"

## 📁 File Structure

```
daily-intune/
├── .github/workflows/
│   ├── daily-docs-monitor.yml    # Generate and publish the daily site/report
│   └── daily-kit-broadcast.yml   # Send at most one Kit broadcast per report date
├── src/
│   └── monitor-docs.js           # Main monitoring script  
├── reports/                      # Generated reports (local)
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🛠️ How It Works

1. **GitHub Actions Trigger**: Runs every four hours at `:15`
2. **Fetch New Events**: Continues from a persisted documentation commit cursor and Message Center version map
3. **Filter Files**: Focuses on `.md` files in the `docs/` directory
4. **Analyze Changes**: Categorizes file modifications and asks Luna for one English summary per material diff
5. **Refresh Briefs**: Regenerates the affected Luna-xhigh day, week, and month brief only when source content changed
6. **Publish**: Merges events into cumulative UTC-day JSON, rebuilds the static site, and posts an incremental Discord update
7. **Reconcile Subscriber Brief**: Every scheduled website workflow verifies Kit delivery; the first successful run at or after 08:15 UTC schedules a concise, deduplicated broadcast when the day contains meaningful updates
8. **Archive**: Saves the report as a GitHub Actions artifact and publishes the static output

## 🔧 Configuration Options

### Workflow Variables (in `daily-docs-monitor.yml`):
- `cron`: Six UTC refresh slots; all verify Kit and the 08:15-or-later slots can create today's subscriber broadcast
- `OPENAI_PERIOD_SUMMARY_DAILY_BUDGET_USD`: Shared UTC-day Luna-xhigh guardrail (currently `$0.25`)

### Script Configuration (in `monitor-docs.js`):
- `targetRepo`: Repository to monitor (currently `MicrosoftDocs/memdocs`)
- File filtering rules (currently `.md` files in `docs/` directory)
- Email formatting and styling
- Change summary algorithms

## 📧 Subscriber Email Delivery

Kit publishes a richly formatted summary on the first successful reconciliation at or after 08:15 UTC. Later same-day runs safely retry, delivery status is verified, and days without meaningful updates remain silent. Healthchecks.io reports scheduled-pipeline failures; Microsoft Graph email sending is not used.


## 📈 Monitoring & Troubleshooting

### GitHub Actions Logs:
- View run history in the Actions tab
- Each run shows detailed logs of the monitoring process
- Failed runs will show specific error messages
- Healthchecks.io alerts when the scheduled pipeline does not report success within two hours of a UTC slot

### Common Issues:
1. **Subscriber email not sending**: Check the Kit API key, verified sending domain, and broadcast logs
2. **No changes detected**: Verify repository access and date range
3. **Rate limiting**: GitHub API has rate limits; monitor uses authentication to increase limits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details


---

**🤖 Automated with ❤️ for the Microsoft Intune community**

# 🚀 Quick Start Guide

## Step 1: Get Your GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. **Important**: Set expiration to **90 days or less** (Microsoft's enterprise policy requirement)
4. Select scopes: `public_repo` (for reading public repositories)
5. Copy the generated token

## Step 2: Configure Secrets in GitHub

Go to your repository Settings → Secrets and variables → Actions:

Add these secrets:
- `OPENAI_API_KEY`: Your OpenAI project API key for generating per-diff and grouped English summaries
- `DISCORD_INTUNE_SCOUT_WEBHOOK_URL`: Shared Intune Scout incoming webhook for the Discord Intune updates channel. Store the same URL under this secret name in the Message Center repository.
- `KIT_API_KEY`: Kit (formerly ConvertKit) v4 API key for daily subscriber broadcasts
- `KIT_SENDER_EMAIL`: Optional verified-sender override; omit it to use Kit's account default
- `KIT_DAILY_FORM_UID`: Public `data-uid` value from the Kit form's JavaScript embed
- `KIT_DAILY_FORM_EMBED_SRC`: Public HTTPS `src` value from the Kit form's JavaScript embed
- `HEALTHCHECKS_PING_URL`: Private Healthchecks.io ping URL for the scheduled pipeline check

The workflow uses the OpenAI Responses API with `gpt-5.6-luna` and `xhigh` reasoning. It summarizes every diff separately and makes one additional grouping request when multiple diffs are detected. If the key is missing or an API request fails, the site, JSON, Discord feed, and email use deterministic fallback text.

## Step 3: Test Locally (Optional)
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your tokens
# GITHUB_TOKEN=your_token_here
# etc.

# Run a test
npm test
```

## Step 4: Enable the Workflow
The GitHub Action refreshes every four hours. Every scheduled run reconciles Kit: runs before 08:15 UTC verify recent delivery, while the 08:15 and later runs safely create or deduplicate the current UTC day's subscriber summary. You can also:
- Go to Actions tab → "Daily Intune Docs Monitor" → "Run workflow" to test manually
- Check the logs to ensure everything is working
- Check Kit for the scheduled subscriber broadcast

Configure the Healthchecks.io check with cron `15 0,4,8,12,16,20 * * *`, timezone `UTC`, and a two-hour grace period. Enable an email notification before relying on it for outage detection. Scheduled runs and non-draft manual Kit runs report health; draft smoke tests do not.

## ⚡ Quick Tips
- The first run might take a few minutes to set up
- Reports are saved as GitHub Actions artifacts for 30 days
- You can modify the schedule in `.github/workflows/daily-docs-monitor.yml`
- Scheduled subscriber reconciliation requires `KIT_API_KEY`; use draft mode for the initial delivery smoke test

## 🔧 Troubleshooting
- **No subscriber email?** Check the Kit broadcast log, API key, and verified sending domain
- **Action failed?** Check the Actions tab for detailed error logs
- **Rate limits?** The GitHub token provides higher rate limits for API calls
- **Token lifetime error?** Microsoft requires tokens to be 90 days or less for their repositories

Ready to monitor Microsoft Intune docs changes! 🎉

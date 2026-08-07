# Historical backfill

`generate-historical-data.js` converts the local `MicrosoftDocs/memdocs` Git history into daily source reports and deterministic day, week, and month briefs. It records quiet calendar days too, so the archive has continuous date coverage.

```bash
node scripts/generate-historical-data.js \
  --repo=/Users/merill/github/memdocs \
  --start=2026-01-01 \
  --end=2026-08-07 \
  --website=website

npm run build:site
```

Arguments:

- `--repo`: local `memdocs` checkout
- `--start` and `--end`: inclusive dates in `YYYY-MM-DD` format
- `--website`: output directory for source reports and the static site

The backfill reads Git locally and does not require an OpenAI API key. Each generated brief is marked `deterministic-backfill`; scheduled monitoring can use AI summaries when `OPENAI_API_KEY` is configured.

# Gaurav-Portfolio

Personal portfolio site — [gauravkanere.link](https://gauravkanere.link)

A static site , deployed to AWS S3 + CloudFront via a GitHub Actions pipeline.

## Structure

```
├── .github/workflows/deploy.yml   # CI/CD: push to main -> S3 -> CloudFront invalidation
├── index.html                     # page shell — structure only, no content
├── content.js                     # all page data (profile, skills, projects, experience, education)
├── app.js                         # reads content.js, renders the DOM
├── styles.css                     # all styling
├── .gitignore
└── README.md
```

Content and markup are deliberately separated: every project, bullet, tag,
and link on the page lives in `content.js` as plain data. Adding a project
or fixing a line means editing `content.js` — never `index.html` or `app.js`.

## Stack

- HTML / CSS / JavaScript — no framework, no build step, no dependencies
- **AWS S3** — static file hosting (private bucket, not public)
- **AWS CloudFront** — CDN in front of S3, serves the site over HTTPS
- **GitHub Actions** — deploys automatically on every push to `main`

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which:

1. Checks out the repo
2. Authenticates to AWS using an IAM user scoped to only this bucket and
   this CloudFront distribution
3. Syncs the site files to S3 (`aws s3 sync --delete`)
4. Invalidates the CloudFront cache so changes go live immediately

### Required GitHub Secrets

| Secret | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `AWS_REGION` | Region the S3 bucket lives in |
| `S3_BUCKET` | S3 bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |

The IAM user backing these keys is scoped to exactly:
`s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` on the bucket, and
`cloudfront:CreateInvalidation` on the distribution — nothing broader.

### Infra (created manually, not via this repo)

The S3 bucket, CloudFront distribution, ACM certificate, and Route 53
DNS record are provisioned once, outside this repository. This repo only
contains the site and the deploy pipeline — not the infrastructure that
receives it.

## Local development

No build step — open `index.html` directly in a browser, or serve the
folder with any static file server, to preview changes before pushing.

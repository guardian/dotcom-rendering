# @guardian/ab-testing-notification-lambda

This directory contains a scheduled AWS Lambda function responsible for checking AB testing expiry dates and notifying the relevant teams when tests are about to expire and after they have expired.

## How it works

When the deployment lambda is invoked, it performs the following steps:

1. Reads the AB test definitions from the config
2. Checks the expiry date of all "active" tests (those marked as "ON")
3. Sends emails to test owners where the tests are close to expiry or which have already expired

## Local Development

Get `frontend` credentials from Janus.

install dependencies:

```bash
 pnpm install
```

Call the `run.ts` script, (be sure to announce you're using the CODE stage in the semaphore chat channel):

```bash
 STAGE=CODE node src/run.ts
```

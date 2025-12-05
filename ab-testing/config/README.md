# @guardian/ab-testing-config

A/B test definitions and configuration for Guardian digital platforms.

## Purpose

This package provides centralized A/B test configuration, validation and build scripts for ab testing on theguardian.com and associated platforms.

## Scripts

-   `pnpm build` - Generate distribution artifacts (`dist/mvts.json`, `dist/ab-tests.json`)
-   `pnpm validate` - Validate test configuration
-   `pnpm test` - Run unit tests

## Usage

Other packages can import active tests:

```typescript
import { activeABtests, allABTests } from "@guardian/ab-testing-config";
```

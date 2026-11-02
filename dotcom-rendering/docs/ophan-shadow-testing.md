# Ophan shadow testing

DCR can opt into the shared-input comparison from [Ophan PR #8523](https://github.com/guardian/ophan/pull/8523).
Normal tracking starts first. A sampled candidate calculates output from the same
browser observations; only the installed tracker sends normal analytics.

The integration is disabled unless the Frontend-provided
`window.guardian.config.switches.ophanShadowTesting` is exactly `true`.
The switch is not provisioned by this PR. Apps do not use this integration.

DCR pins the manifest, candidate base and diagnostic endpoint in
`src/client/ophan/shadow.ts`. Those hosting paths are proposed and must be agreed
and provisioned before activation. The baseline label comes automatically from
DCR's pinned TrackerJS dependency. Ophan's remote manifest controls the candidate
build, sample rate, enablement and expiry, so candidate changes need no DCR release.
The manifest is read on each activation; changes affect new page loads.

Before enabling:

- Release the Ophan implementation and upgrade DCR's normal NPM dependency. The
  current 5.2.0 package has no shadow API; the optional capability check keeps it
  usable without a copied runtime, type assertion or unpublished dependency pin.
- Agree and provision the fixed URLs, CDN CORS/JavaScript MIME headers, cache policy
  and any Frontend/edge CSP changes. Deploy Ophan's diagnostic endpoint separately.
- Provision the Frontend switch, agree consent handling and a performance budget,
  then measure full DCR on slower devices before a small production sample.

This hook does not await configuration or candidate loading. Concurrent Ophan
callers start shadow testing only once; synchronous startup failures are logged
without preventing normal tracking. Sampling, comparisons, expiry and diagnostics
belong to TrackerJS/Ophan, including best-effort cumulative reports outside the
normal event pipeline.

Local checks from `dotcom-rendering/`:

```sh
pnpm test:ci src/client/ophan/ophan.test.ts
pnpm tsc
pnpm exec eslint src/client/ophan/ophan.ts src/client/ophan/shadow.ts src/client/ophan/ophan.test.ts
```

# Ophan shadow testing

This adds the Dotcom integration for [Ophan's shadow testing](https://github.com/guardian/ophan/pull/8523).
It runs the full candidate tracker alongside the installed version and compares
pageview counts and query parameters, including the initial pageview. Candidate
analytics requests are captured. Only normal tracking enters the event pipeline.

When `window.guardian.config.switches.ophanShadowTesting` is true and the package
supports the API, DCR calls `startShadowFromConfig(config, () => ophan.init('ng'))`
before normal initialisation. The library samples locally first. The local cap is
1%, so other pages initialise immediately without a shadow config request.

Selected pages allow 200 ms in total for config and candidate loading. If ready,
the candidate gets its own config/storage copies before normal init, and receives
that same init call through the API hook. There is no saved-call history or replay.
On timeout, failure or cancellation, normal tracking starts once without a test.
Late candidates cannot activate. Concurrent `getOphan` callers share startup and
wait for tracking to initialise before recording events. Apps skip this integration.

The trade-off is delayed tracking on sampled pages. A reader leaving during that
wait may be missed. Caching should help but cannot be assumed. The candidate also
adds CPU and memory work, with its own listeners, probes and attention timers. Its
wrapper shares the DOM and main thread, so performance and side effects still need
checking on Dotcom, including slower devices. Attention isn't compared.

DCR fixes the URLs, sample cap and wait budget in `src/client/ophan/shadow.ts`.
Ophan's config selects the build and expiry, and can reduce sampling or turn it off.
It cannot exceed the local cap or extend the wait. Config is read only on locally
selected pages, once per activation, so updates apply to new page loads.

The installed TrackerJS 5.2.0 doesn't support this API. Until the matching package
is released and installed, the capability check falls back to immediate normal
init. The baseline build comes from the dependency version. Hosting paths are
proposed and unprovisioned. Activation also needs the Tracker endpoint, Frontend
switch, CDN caching/CSP/consent review and an agreed performance budget.

Run the integration tests and types from `dotcom-rendering/`:

```sh
pnpm test:ci src/client/ophan/ophan.test.ts
pnpm tsc
```

[The Ophan guide](https://github.com/guardian/ophan/blob/codex/tracker-shared-input/tracker-js/SHARED-INPUT-SHADOW.md)
explains matching, reporting and limits. Diagnostics go to Ophan's separate endpoint,
outside Slab and BigLoader. The integration remains off for review.

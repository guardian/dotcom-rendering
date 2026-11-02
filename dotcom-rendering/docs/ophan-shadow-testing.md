# Ophan shadow testing

This adds the Dotcom integration for [Ophan's shadow testing](https://github.com/guardian/ophan/pull/8523).
The aim is to compare a candidate TrackerJS release with the installed version on
sampled page loads. Both use the same browser observations, and normal analytics
are sent once.

Normal tracking starts first. If the Frontend-provided
`window.guardian.config.switches.ophanShadowTesting` is `true`, DCR calls the shadow
API once for the page. It does not wait for the candidate to load. Startup errors
are logged without preventing normal tracking, and Apps skip this integration.

The current TrackerJS 5.2.0 package does not have this API. The optional check keeps
it working until the Ophan implementation is released and the NPM dependency is
upgraded. The baseline version comes from that dependency, so it changes as part
of the normal upgrade.

DCR fixes the config URL, candidate location and reporting endpoint in
`src/client/ophan/shadow.ts`. Those hosting paths are proposed and have not been
provisioned. Ophan's JSON config controls the candidate build, sampling and expiry.
This allows later candidates to be tested without another DCR change. Config is
read once per activation, so updates apply to new page loads.

Before enabling, we still need the package upgrade, hosting, Tracker endpoint and
Frontend switch. We also need to agree CDN headers and caching, any CSP changes,
consent handling and a performance budget. The local checks are useful evidence,
but full DCR still needs measuring on slower devices.

Run the integration tests and type check from `dotcom-rendering/`:

```sh
pnpm test:ci src/client/ophan/ophan.test.ts
pnpm tsc
```

[The Ophan guide](https://github.com/guardian/ophan/blob/codex/tracker-shared-input/tracker-js/SHARED-INPUT-SHADOW.md)
explains comparison and reporting. Ophan owns that behaviour, including the
separate diagnostic endpoint and its cumulative reports.

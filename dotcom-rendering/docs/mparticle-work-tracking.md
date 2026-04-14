# mParticle Paid Media Integration - Work Tracking

> **Main design doc:** [mparticle-paid-media-integration.md](./mparticle-paid-media-integration.md)  
> **Frontend Asana task:** [Frontend task](https://app.asana.com/1/1210045093164357/project/1213134855566811/task/1213702578213622)  
> **Backend Asana task:** [Backend task](https://app.asana.com/0/0/1213430985786431)  
> **Connection Asana task:** [Connection task](https://app.asana.com/0/0/1213430985786437)

## Status snapshot (as of 2026-04-09)

| Repo                           | Status                                                                                                                                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `dotcom-rendering` (this repo) | ✅ [PR open](https://github.com/guardian/dotcom-rendering/pull/15581) — updated for all-users scope, fingerprint cookies, optional auth |
| `frontend` (Scala)             | ⏳ Needs switch + URL injection (new hostname: `mparticle-consent.guardianapis.com`)                                                    |
| `csnx` (`@guardian/libs`)      | ✅ [PR #2347 merged](https://github.com/guardian/csnx/pull/2347) — `@guardian/libs` bumped to 31.0.0 in DCR                             |
| backend (`mparticle-api`)      | ⏳ Draft - needs deployment to CODE; dedicated lambda planned for `mparticle-consent.guardianapis.com`                                  |

## Tasks

### 1. Open the DCR pull request

-   [x] **Status:** PR opened - https://github.com/guardian/dotcom-rendering/pull/15581
-   [x] **PR description:** Written — code is final, all 12 tests pass, description includes flow diagrams and links to design + tracking docs

**Files changed in this branch:**

| Action   | File                                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| Created  | [src/client/mparticle/mparticle-consent.ts](../src/client/mparticle/mparticle-consent.ts)                           |
| Created  | [src/client/mparticle/mparticleConsentApi.ts](../src/client/mparticle/mparticleConsentApi.ts)                       |
| Created  | [src/client/mparticle/cookies/mparticleConsentSynced.ts](../src/client/mparticle/cookies/mparticleConsentSynced.ts) |
| Created  | [src/client/mparticle/mparticle-consent.test.ts](../src/client/mparticle/mparticle-consent.test.ts)                 |
| Modified | [src/client/main.web.ts](../src/client/main.web.ts) - startup entry, switch-gated                                   |
| Modified | [src/model/guardian.ts](../src/model/guardian.ts) - `mparticleApiUrl?: string` in `config.page`                     |
| Modified | [fixtures/config.js](../fixtures/config.js) - `mparticleApiUrl: 'https://mparticle-consent.guardianapis.com'`       |

**Why it's safe to merge before other tasks:** The feature is entirely gated behind `window.guardian.config.switches.mparticleConsentSync`. That switch is not currently sent by the backend, so the block in `main.web.ts` is never entered on any real environment. There is zero risk of the feature running before everything else is ready.

**PR description to write (once code is final):** Summarise: feature is behind `switches.mparticleConsentSync` (off by default); code is complete and all 8 tests pass; links to [docs/mparticle-paid-media-integration.md](./mparticle-paid-media-integration.md) for design and [docs/mparticle-work-tracking.md](./mparticle-work-tracking.md) for remaining work across other repos.

### 2. Confirm Sourcepoint vendor ID with Data Privacy / MRR

-   [x] **Status:** Done — vendor ID `62470f577e1e3605d5bc0b8a` confirmed from Sourcepoint API (2026-03-27); key name `'mparticle'` agreed and used in csnx PR #2347

**Why this is critical — runtime throw, not just a TypeScript error:**

The `getConsentFor` function from `@guardian/libs` does a registry lookup at runtime:

```js
// @guardian/libs/getConsentFor.js (actual source)
const getConsentFor = (vendor, consent) => {
	const sourcepointIds = VendorIDs[vendor];
	if (typeof sourcepointIds === 'undefined' || sourcepointIds.length === 0) {
		throw new Error(
			`Vendor '${vendor}' not found, or with no Sourcepoint ID…`,
		);
	}
	// …
};
```

The current `'mparticle' as VendorName` cast only silences the TypeScript compiler. At runtime, calling `getConsentFor('mparticle', state)` will **throw** because `'mparticle'` is not in the `VendorIDs` registry. This means the feature **cannot safely be switched on** until both Sourcepoint and `@guardian/libs` are updated.

**The Sourcepoint vendor ID is also needed before the `csnx` PR (task 3) can be written.** The `VendorIDs` entry must map the vendor name to its real Sourcepoint ID — that ID comes from the Sourcepoint dashboard configuration which Data Privacy owns.

### 3. Add the confirmed vendor to `VendorIDs` in `@guardian/libs` (`csnx` repo)

-   [x] **Status:** Done — [PR #2347 merged](https://github.com/guardian/csnx/pull/2347)

`mparticle: ['62470f577e1e3605d5bc0b8a']` added to `TCFV2VendorIDs` in `vendors.ts`. `'mparticle'` is now a valid `VendorName`. Changeset is `minor`.

### 3a. Bump `@guardian/libs` in DCR and remove `as VendorName` cast

-   [x] **Status:** Done — bumped to `@guardian/libs@31.0.0`; `as VendorName` cast removed; `signalStatus: 'ready'` added to `YoutubeAtom.test.tsx`; all tests pass

**What:**

1. Run `pnpm update @guardian/libs` (or equivalent) in `dotcom-rendering/` to pick up the new minor version that includes `mparticle` in `VendorIDs`.
2. Remove the `as VendorName` cast and both TODO comments from [src/client/mparticle/mparticle-consent.ts](../src/client/mparticle/mparticle-consent.ts):

```ts
// Change this:
export const MPARTICLE_CONSENT_PURPOSE = 'mparticle' as VendorName;

// To this:
export const MPARTICLE_CONSENT_PURPOSE: VendorName = 'mparticle';
```

3. Remove the `import type { VendorName }` line if it is no longer needed (it will still be needed for the type annotation above, so keep it).

This unblocks the runtime safety of the feature — until this is done, `getConsentFor('mparticle', state)` will continue to throw at runtime.

### 4. Add the `mparticleConsentSync` switch in `frontend` (Scala)

-   [ ] **Status:** Not started

**What:** In the Scala `frontend` (theguardian.com) repo, add a new feature switch named `mparticleConsentSync`. Default value: `OFF` (i.e. `false`).

**Why:** `main.web.ts` reads `window.guardian.config.switches.mparticleConsentSync` to decide whether to register the startup task at all:

```ts
// src/client/main.web.ts
if (window.guardian.config.switches.mparticleConsentSync) {
	void startup(
		'mparticleConsentSync',
		() =>
			import(
				/* webpackMode: 'eager' */ './mparticle/mparticle-consent'
			).then(({ syncMparticleConsent }) => syncMparticleConsent()),
		{ priority: 'critical' },
	);
}
```

The Scala `Switches` model is the canonical source. If the key is absent, `window.guardian.config.switches.mparticleConsentSync` is `undefined`, which is falsy - so the feature safely does nothing. The Scala PR is only needed to make the switch togglable in the switch dashboard without a code deploy.

### 5. Inject `mparticleApiUrl` in the page config response (`frontend` Scala)

-   [ ] **Status:** Not started

**What:** In the Scala `frontend` repo, add `mparticleApiUrl` to the config object returned in page render responses so it appears in `window.guardian.config.page`.

**Why:** The API module reads the base URL from config:

```ts
// src/client/mparticle/mparticleConsentApi.ts
const baseUrl = window.guardian.config.page.mparticleApiUrl;
if (!baseUrl) throw new Error('mparticleApiUrl is not defined');
```

The `mparticleApiUrl` field is already declared in the DCR type model:

```ts
// src/model/guardian.ts  (already modified)
mparticleApiUrl?: string;
```

**URLs by environment:**

| Environment | URL                                               |
| ----------- | ------------------------------------------------- |
| PROD        | `https://mparticle-consent.guardianapis.com`      |
| CODE        | `https://mparticle-consent-code.guardianapis.com` |

The local dev fixture already has the PROD URL hardcoded for development purposes:

```js
// fixtures/config.js
mparticleApiUrl: 'https://mparticle-consent.guardianapis.com',
```

### 6. Deploy the backend endpoint to CODE

-   [ ] **Status:** Not started (backend team owns this)

**What:** The `PATCH /consents/{browserId}` endpoint in the `mparticle-api` handler needs to be deployed to the CODE environment.

**Why:** End-to-end manual testing from the browser is not possible before the endpoint exists. The endpoint validates:

-   `browserId` - path param, URL-encoded browser ID (`bwid` cookie value)
-   `consented` - boolean in body
-   `pageViewId` - string in body (must be camelCase `pageViewId` - confirmed aligned with frontend)

**Note for backend team:** There is a bug in the current draft: `this.getNow().getMilliseconds()` returns only the 0–999 ms component, not a Unix timestamp. It should be `this.getNow().getTime()`.

**Ref:** `handlers/mparticle-api/src/routers/http/consentsUpdateHandler.ts` in the backend repo.

### 7. End-to-end manual testing

-   [ ] **Status:** Blocked on tasks 2, 3, 4, 5, 6

**Prerequisites before testing:**

-   Task 2 done: Sourcepoint vendor ID confirmed, Sourcepoint dashboard updated
-   Task 3 done: `@guardian/libs` bumped with new `VendorIDs` entry
-   Task 4 done: switch exists in Scala frontend
-   Task 5 done: `mparticleApiUrl` is injected by Scala frontend
-   Task 6 done: `PATCH /consents/{browserId}` is live on CODE

**How to test locally against CODE backend:**

1. Enable the switch in your local override file:

```js
// fixtures/switch-overrides.js
mparticleConsentSync: true,
```

2. Override the URL to point at CODE:

```js
// fixtures/config-overrides.js
mparticleApiUrl: 'https://mparticle-consent-code.guardianapis.com',
```

3. Start the dev server, open a page, open DevTools → Network tab, filter by `consents`.

4. On first page load you should see a `PATCH /consents/<bwid>` request with:

    - For anonymous users: no `Authorization` header, body `{ "consented": true/false, "pageViewId": "..." }`, response `200`
    - For signed-in users: `Authorization: Bearer <token>` header, same body, response `200`

5. Reload the page — the request should **not** fire again (`gu_mparticle_last_synced` fingerprint matches).

6. Delete the `gu_mparticle_last_synced` cookie and reload — the request **should** fire again.

7. Delete `gu_mparticle_last_synced`. Sign in (while consent is already set). On the next page load the fingerprint changes from `anonymous:…` to `signed-in:…` — the request fires again, this time with a Bearer token.

8. Open the Sourcepoint privacy modal, change a consent setting, close — the request **should** fire again (fingerprint changes).

Full manual testing guide also in the [main design doc](./mparticle-paid-media-integration.md).

### 8. Enable the switch in CODE, then PROD

-   [ ] **Status:** Blocked on task 7

**What:** Once manual testing passes, enable `mparticleConsentSync` in the Scala switch dashboard (not a code change - just a toggle).

**Order:**

1. Enable in CODE - monitor logs, check mParticle dashboard for incoming events
2. Enable in PROD - same monitoring

### 9. (Follow-up) Remove `as VendorName` cast after `csnx` PR

-   [x] **Status:** Done — completed as part of task 3a

**What:** Once `mparticle` is in `VendorIDs` and `@guardian/libs` is bumped in DCR, remove the cast from [src/client/mparticle/mparticle-consent.ts](../src/client/mparticle/mparticle-consent.ts):

```ts
// Before (current workaround):
export const MPARTICLE_CONSENT_PURPOSE = 'mparticle' as VendorName;

// After:
export const MPARTICLE_CONSENT_PURPOSE: VendorName = 'mparticle';
// (or whatever the agreed GDPR purpose name turns out to be)
```

Also delete the two TODO comments above it.

## Context for picking this up

If you are resuming this work from scratch, here is the minimal context:

-   **What was built:** A new client-side module (`src/client/mparticle/`) that hooks into the existing `onConsentChange` pub/sub from `@guardian/libs`. When any user's GDPR consent state is read (anonymous or signed-in), it calls `PATCH <mparticleApiUrl>/consents/<browserId>`. If the user is signed in, a Bearer token is also attached so the backend can immediately link the record to the user's `identity_id`. For anonymous users, the consent is recorded against `bwid` for overnight identity resolution in the data lake.
-   **Rate-limiting approach:** Instead of a time-based TTL, a **fingerprint cookie** (`gu_mparticle_last_synced`, persistent 1 year) stores the last successfully PATCHed state as a string like `"anonymous:false"` or `"signed-in:true"`. A call is only made when the current state differs from the stored fingerprint. A second session-scoped cookie (`gu_mparticle_session_attempted`) caps retries to once per session on API failure.
-   **The code is complete and all 12 tests pass.** The only thing preventing it from running in production is that `switches.mparticleConsentSync` is not yet emitted by the Scala frontend (tasks 4 and 5).
-   **The main design doc is at:** [docs/mparticle-paid-media-integration.md](./mparticle-paid-media-integration.md) — it contains architecture diagrams, flow diagrams, the full test specification, VendorIDs explanation, and a manual testing guide.
-   **Key files to read first:** [src/client/mparticle/mparticle-consent.ts](../src/client/mparticle/mparticle-consent.ts), [src/client/mparticle/mparticleConsentApi.ts](../src/client/mparticle/mparticleConsentApi.ts), [src/client/mparticle/cookies/mparticleConsentSynced.ts](../src/client/mparticle/cookies/mparticleConsentSynced.ts).
-   **Temporary workaround resolved:** The `as VendorName` cast has been removed. `@guardian/libs` is now at 31.0.0 with `mparticle` in `VendorIDs`. `getConsentFor('mparticle', state)` is now runtime-safe.
-   **Known backend bug (not frontend):** `getNow().getMilliseconds()` should be `getNow().getTime()` in `consentsUpdateHandler.ts`.
-   **New hostname agreed:** `mparticle-consent.guardianapis.com` (dedicated lambda for consent writes, separate from other mparticle-api routes).

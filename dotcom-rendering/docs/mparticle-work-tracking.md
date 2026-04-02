# mParticle Paid Media Integration - Work Tracking

> **Main design doc:** [mparticle-paid-media-integration.md](./mparticle-paid-media-integration.md)  
> **Frontend Asana task:** [Frontend task](https://app.asana.com/1/1210045093164357/project/1213134855566811/task/1213702578213622)  
> **Backend Asana task:** [Backend task](https://app.asana.com/0/0/1213430985786431)  
> **Connection Asana task:** [Connection task](https://app.asana.com/0/0/1213430985786437)

## Status snapshot (as of 2026-03-24)

| Repo                           | Status                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `dotcom-rendering` (this repo) | ✅ [PR open](https://github.com/guardian/dotcom-rendering/pull/15581) - pending PR description + review |
| `frontend` (Scala)             | ⏳ Needs switch + URL injection                                                                         |
| `csnx` (`@guardian/libs`)      | ⏳ Needs `mparticle` added to `VendorIDs`                                                               |
| backend (`mparticle-api`)      | ⏳ Draft - needs deployment to CODE                                                                     |

## Tasks

### 1. Open the DCR pull request

-   [x] **Status:** PR opened - https://github.com/guardian/dotcom-rendering/pull/15581
-   [ ] **PR description:** Not written yet - waiting for code to reach final state before writing it

**Files changed in this branch:**

| Action | File |
|||
| Created | [src/client/mparticle/mparticle-consent.ts](../src/client/mparticle/mparticle-consent.ts) |
| Created | [src/client/mparticle/mparticleConsentApi.ts](../src/client/mparticle/mparticleConsentApi.ts) |
| Created | [src/client/mparticle/cookies/mparticleConsentSynced.ts](../src/client/mparticle/cookies/mparticleConsentSynced.ts) |
| Created | [src/client/mparticle/mparticle-consent.test.ts](../src/client/mparticle/mparticle-consent.test.ts) |
| Modified | [src/client/main.web.ts](../src/client/main.web.ts) - startup entry, switch-gated |
| Modified | [src/model/guardian.ts](../src/model/guardian.ts) - `mparticleApiUrl?: string` in `config.page` |
| Modified | [fixtures/config.js](../fixtures/config.js) - `mparticleApiUrl: 'https://mparticle-api.guardianapis.com'` |

**Why it's safe to merge before other tasks:** The feature is entirely gated behind `window.guardian.config.switches.mparticleConsentSync`. That switch is not currently sent by the backend, so the block in `main.web.ts` is never entered on any real environment. There is zero risk of the feature running before everything else is ready.

**PR description to write (once code is final):** Summarise: feature is behind `switches.mparticleConsentSync` (off by default); code is complete and all 8 tests pass; links to [docs/mparticle-paid-media-integration.md](./mparticle-paid-media-integration.md) for design and [docs/mparticle-work-tracking.md](./mparticle-work-tracking.md) for remaining work across other repos.

### 2. Add `mparticle` to `VendorIDs` in `@guardian/libs` (`csnx` repo)

-   [ ] **Status:** Not started

**What:** Open a PR in the [`csnx` repository](https://github.com/guardian/csnx) to add `mparticle` to the `VendorIDs` registry. This is the map from vendor name string to IAB TCF ID that `@guardian/libs` exports. `VendorName` is a strict union type derived from the keys of this registry.

**Why:** `getConsentFor(vendorName, state)` from `@guardian/libs` requires VendorName. `'mparticle'` is not yet in the registry. Currently the code uses a temporary workaround:

```ts
// src/client/mparticle/mparticle-consent.ts
export const MPARTICLE_CONSENT_PURPOSE = 'mparticle' as VendorName;
```

**What to confirm first:** The exact GDPR purpose name to use (not necessarily `'mparticle'`) - needs sign-off from Data Privacy / MRR. The TODOs in the file make this explicit:

```ts
// TODO: confirm the exact GDPR purpose name with Data Privacy / MRR.
// TODO: 'mparticle' must also be added to VendorIDs in @guardian/libs (csnx repo)
// before this cast can be removed.
```

**After the `csnx` PR lands and `@guardian/libs` is bumped in DCR:**
Remove the `as VendorName` cast from [src/client/mparticle/mparticle-consent.ts](../src/client/mparticle/mparticle-consent.ts) and delete both TODO comments.

### 3. Add the `mparticleConsentSync` switch in `frontend` (Scala)

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

### 4. Inject `mparticleApiUrl` in the page config response (`frontend` Scala)

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

| Environment | URL |
|||
| PROD | `https://mparticle-api.guardianapis.com` |
| CODE | `https://mparticle-api.code.dev-guardianapis.com` |

The local dev fixture already has the PROD URL hardcoded for development purposes:

```js
// fixtures/config.js
mparticleApiUrl: 'https://mparticle-api.guardianapis.com',
```

### 5. Deploy the backend endpoint to CODE

-   [ ] **Status:** Not started (backend team owns this)

**What:** The `PATCH /consents/{browserId}` endpoint in the `mparticle-api` handler needs to be deployed to the CODE environment.

**Why:** End-to-end manual testing from the browser is not possible before the endpoint exists. The endpoint validates:

-   `browserId` - path param, URL-encoded browser ID (`bwid` cookie value)
-   `consented` - boolean in body
-   `pageViewId` - string in body (must be camelCase `pageViewId` - confirmed aligned with frontend)

**Note for backend team:** There is a bug in the current draft: `this.getNow().getMilliseconds()` returns only the 0–999 ms component, not a Unix timestamp. It should be `this.getNow().getTime()`.

**Ref:** `handlers/mparticle-api/src/routers/http/consentsUpdateHandler.ts` in the backend repo.

### 6. End-to-end manual testing

-   [ ] **Status:** Blocked on tasks 3, 4, 5

**Prerequisites before testing:**

-   Task 3 done: switch exists in Scala frontend
-   Task 4 done: `mparticleApiUrl` is injected by Scala frontend
-   Task 5 done: `PATCH /consents/{browserId}` is live on CODE

**How to test locally against CODE backend:**

1. Enable the switch in your local override file:

```js
// fixtures/switch-overrides.js
mparticleConsentSync: true,
```

2. Override the URL to point at CODE (or leave as PROD if CODE isn't available):

```js
// fixtures/config-overrides.js
mparticleApiUrl: 'https://mparticle-api.code.dev-guardianapis.com',
```

3. Start the dev server, open a page, open DevTools → Network tab, filter by `consents`.

4. Sign in with a Guardian account that has a `bwid` cookie.

5. On first page load you should see a `PATCH /consents/<bwid>` request with:

    - `Authorization: Bearer <token>` header
    - Body: `{ "consented": true/false, "pageViewId": "..." }`
    - Response: `200`

6. Reload the page within 30 minutes - the request should **not** fire again (staleness cookie `gu_mparticle_consent_synced` suppresses it).

7. Delete the `gu_mparticle_consent_synced` cookie and reload - the request **should** fire again.

8. Open the Sourcepoint privacy modal, change a consent setting, close - the request **should** fire again (cookie is renewed each sync).

Full manual testing guide also in the [main design doc](./mparticle-paid-media-integration.md).

### 7. Enable the switch in CODE, then PROD

-   [ ] **Status:** Blocked on task 6

**What:** Once manual testing passes, enable `mparticleConsentSync` in the Scala switch dashboard (not a code change - just a toggle).

**Order:**

1. Enable in CODE - monitor logs, check mParticle dashboard for incoming events
2. Enable in PROD - same monitoring

### 8. (Follow-up) Remove `as VendorName` cast after `csnx` PR

-   [ ] **Status:** Blocked on task 2

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

-   **What was built:** A new client-side module (`src/client/mparticle/`) that hooks into the existing `onConsentChange` pub/sub from `@guardian/libs`. When a signed-in user's GDPR consent state is read, it calls `PATCH <mparticleApiUrl>/consents/<browserId>` with a Bearer-authed fetch to notify the backend. A staleness cookie (`gu_mparticle_consent_synced`, 30 min TTL) prevents hammering.
-   **The code is complete and all tests pass.** The only thing preventing it from running in production is that `switches.mparticleConsentSync` is not yet emitted by the Scala frontend (tasks 3 and 4).
-   **The main design doc is at:** [docs/mparticle-paid-media-integration.md](./mparticle-paid-media-integration.md) - it contains architecture diagrams, flow diagrams, the full test specification, VendorIDs explanation, and a manual testing guide.
-   **Key files to read first:** [src/client/mparticle/mparticle-consent.ts](../src/client/mparticle/mparticle-consent.ts), [src/client/mparticle/mparticleConsentApi.ts](../src/client/mparticle/mparticleConsentApi.ts), [src/client/mparticle/cookies/mparticleConsentSynced.ts](../src/client/mparticle/cookies/mparticleConsentSynced.ts).
-   **Known temporary workaround:** `'mparticle' as VendorName` in `mparticle-consent.ts` - see task 2 above.
-   **Known backend bug (not frontend):** `getNow().getMilliseconds()` should be `getNow().getTime()` in `consentsUpdateHandler.ts`.

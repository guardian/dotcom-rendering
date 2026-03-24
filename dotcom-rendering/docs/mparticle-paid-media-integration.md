# mParticle – Paid Media Integration (Frontend)

> **Task:** [Frontend task](https://app.asana.com/1/1210045093164357/project/1213134855566811/task/1213702578213622)  
> **Related tasks:** [Backend task](https://app.asana.com/0/0/1213430985786431) | [Connection task](https://app.asana.com/0/0/1213430985786437)

## Overview

MRR (Marketing Reader Revenue) want to connect mParticle to Meta (Facebook Ads) and Google Ads audiences. To legally send user data to those platforms, mParticle must hold a record of the user's current consent state under GDPR.

The browser is the source of truth for consent (via Sourcepoint / our CMP). When a **signed-in user**'s consent state is relevant to the paid-media use-case (i.e. on sign-in, on new session, or when they change their consent), dotcom-rendering must call a new backend endpoint so that mParticle can be updated with the current browser-consent record.

## Why dotcom-rendering?

dotcom-rendering is the primary front-end renderer for theguardian.com. It already:

-   Boots and owns the CMP lifecycle via [`bootCmp.ts`](../src/client/bootCmp.ts)
-   Reads the `bwid` cookie (browser ID) and passes it to analytics/CMP contexts
-   Manages user authentication state via [`lib/identity.ts`](../src/lib/identity.ts) (`getAuthStatus`, `isUserLoggedIn`)
-   Makes authenticated API calls to backend services (see the `userBenefitsApi` pattern in [`client/userFeatures/`](../src/client/userFeatures/))
-   Hooks into the startup pipeline via [`client/main.web.ts`](../src/client/main.web.ts) and the `startup()` scheduler

All of these primitives already exist and are reusable. The mParticle sync is a new, independent task that fits naturally alongside `userFeatures`.

## Scope of frontend work

The frontend is **only** responsible for:

1. Detecting the right moment to call the API (sign-in, new session, or consent change for a signed-in user).
2. Reading the current consent state for the specific purpose needed.
3. Reading the `bwid` cookie (browser ID) and the `pageViewId`.
4. Calling `PATCH /consents/{browserId}` on the new backend endpoint with the appropriate payload.

The frontend does **not** write to mParticle directly. That is the backend's responsibility.

## API contract (Frontend → Backend)

```
PATCH https://mparticle-api.guardianapis.com/consents/{browserId}
Authorization: Bearer <access-token>
X-GU-IS-OAUTH: true
Content-Type: application/json

{
  "consented": true | false,
  "pageviewId": "<ophan pageViewId>"
}
```

-   `browserId` – the value of the `bwid` cookie (string). This is the identifier that mParticle stores in the `other_id_2` / `Other ID 2` user identity field.
-   `consented` – boolean reflecting whether the user has consented to the relevant GDPR purpose.
-   `pageviewId` – taken from `window.guardian.config.ophan.pageViewId`. Useful as an audit trail / evidence of the user's choice.

Authentication follows the same pattern as `userBenefitsApi`: attach `Authorization: Bearer <access_token>` and `X-GU-IS-OAUTH: true` from `getOptionsHeaders(signedInAuthStatus)` in [`lib/identity.ts`](../src/lib/identity.ts).

## When to call the API

The spec says: **when a user signs in**, **when a signed-in user starts a new session**, or **when a signed-in user changes their consents**.

Practically, the cleanest mapping onto the existing architecture is:

| Trigger | Mechanism |
|||
| User signs in / new session | Already handled by the `userFeatures` refresh gate. Mirror the same "needs refreshing?" staleness-cookie approach (see below). |
| Consent changes | `onConsentChange` callback from `@guardian/libs`, but _only_ when the user is signed in. |

### Avoiding API hammering

`onConsentChange` fires **every time** consent is read from the browser (i.e. on every page view), not only when the user actively changes something. Calling the mParticle API on every page view would overwhelm the endpoint.

The solution (mirroring `userBenefitsApi`) is a **staleness cookie**:

-   After a successful call, set a short-lived cookie (e.g. `gu_mparticle_consent_synced`, expiry ~30 minutes or per-session).
-   On `onConsentChange`, only make the API call if:
    1. The user is signed in (`isUserLoggedIn()`), AND
    2. The staleness cookie is absent (i.e. this is a new session / first visit since sign-in / consent update).

For genuine in-session consent _changes_ (user opens the privacy modal and toggles), the CMP emits a second `onConsentChange` call after the new choice is saved. We can distinguish this from the initial page-load read by comparing the consent state to what was stored at the last sync (or simply by clearing the staleness cookie when the CMP modal is dismissed with a new choice – the CMP already emits a different event for this, if needed).

The simplest acceptable implementation: use the same cookie-expiry approach as `userBenefitsDataNeedsRefreshing()`, with a short TTL so it re-syncs at least once per session.

## Which consent to send

> **TBC with MRR/Data Privacy team** – the exact GDPR purpose name must be confirmed.

The consent framework uses named "purposes". Our Braze integration, for example, uses the purpose `'braze'` (see [`lib/braze/hasRequiredConsents.ts`](../src/lib/braze/hasRequiredConsents.ts)):

```ts
import { getConsentFor, onConsentChange } from '@guardian/libs';

onConsentChange((state) => {
	const consented = getConsentFor('braze', state);
	// ...
});
```

The mParticle integration will follow the same pattern, substituting the correct purpose key (likely something like `'personalisedAdvertising'` or a new dedicated purpose – to be confirmed).

## Implementation plan

### 1. New API client module

Create `src/client/mparticle/mparticleConsentApi.ts` (analogous to `userBenefitsApi.ts`):

```ts
import { getOptionsHeaders, type SignedIn } from '../../lib/identity';

export const syncConsentToMparticle = async (
	signedInAuthStatus: SignedIn,
	browserId: string,
	consented: boolean,
	pageviewId: string,
): Promise<void> => {
	const baseUrl = window.guardian.config.page.mparticleApiUrl;
	if (!baseUrl) throw new Error('mparticleApiUrl is not defined');

	const url = `${baseUrl}/consents/${encodeURIComponent(browserId)}`;
	const response = await fetch(url, {
		method: 'PATCH',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			...getOptionsHeaders(signedInAuthStatus).headers,
		},
		body: JSON.stringify({ consented, pageviewId }),
	});

	if (!response.ok) {
		throw new Error(
			`mParticle consent sync failed: ${response.statusText}`,
		);
	}
};
```

### 2. Staleness cookie

Create `src/client/mparticle/cookies/mparticleConsentSynced.ts`:

```ts
import { getCookie, setCookie } from '@guardian/libs';

const COOKIE_NAME = 'gu_mparticle_consent_synced';
// Re-sync at most once per 30 minutes (adjust based on session definition)
const EXPIRY_MINUTES = 30;

export const mparticleConsentNeedsSync = (): boolean =>
	!getCookie({ name: COOKIE_NAME });

export const markMparticleConsentSynced = (): void => {
	const expiryMs = Date.now() + EXPIRY_MINUTES * 60 * 1000;
	setCookie({
		name: COOKIE_NAME,
		value: String(expiryMs),
		daysToLive: EXPIRY_MINUTES / (60 * 24),
	});
};
```

### 3. Orchestration module

Create `src/client/mparticle/mparticle-consent.ts`:

```ts
import { onConsentChange, getConsentFor, getCookie } from '@guardian/libs';
import { getAuthStatus } from '../../lib/identity';
import { syncConsentToMparticle } from './mparticleConsentApi';
import {
	mparticleConsentNeedsSync,
	markMparticleConsentSynced,
} from './cookies/mparticleConsentSynced';

const MPARTICLE_CONSENT_PURPOSE = 'TODO_CONFIRM_PURPOSE_NAME';

export const syncMparticleConsent = (): void => {
	onConsentChange(async (state) => {
		if (!mparticleConsentNeedsSync()) return;

		const authStatus = await getAuthStatus();
		if (authStatus.kind !== 'SignedIn') return;

		const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
		if (!browserId) return;

		const pageviewId = window.guardian.config.ophan.pageViewId;
		const consented = getConsentFor(MPARTICLE_CONSENT_PURPOSE, state);

		await syncConsentToMparticle(
			authStatus,
			browserId,
			consented,
			pageviewId,
		);
		markMparticleConsentSynced();
	});
};
```

### 4. Wire into the startup pipeline

In [`src/client/main.web.ts`](../src/client/main.web.ts), add alongside the `userFeatures` startup entry:

```ts
void startup(
	'mparticleConsentSync',
	() =>
		import('./mparticle/mparticle-consent').then(
			({ syncMparticleConsent }) => syncMparticleConsent(),
		),
	{ priority: 'critical' },
);
```

Using `priority: 'critical'` ensures it runs alongside CMP boot and user features, not after lazy-loaded features.

### 5. Add `mparticleApiUrl` to the page config

In [`src/model/guardian.ts`](../src/model/guardian.ts), add to the `config.page` interface:

```ts
mparticleApiUrl?: string;
```

The URL value (`https://mparticle-api.guardianapis.com`) will be injected server-side by the rendering layer, as `userBenefitsApiUrl` already is.

### 6. Feature switch

Add a switch `mparticleConsentSync` to the `Switches` interface in [`src/types/config.ts`](../src/types/config.ts) (or rely on the existing free-form `[key: string]: boolean | undefined` index signature), and guard the startup call:

```ts
if (window.guardian.config.switches.mparticleConsentSync) {
    void startup('mparticleConsentSync', ...);
}
```

This allows the feature to be toggled via the existing switch infrastructure without a code deploy.

## Files to create / modify

| Action | File |
|||
| **Create** | `src/client/mparticle/mparticleConsentApi.ts` |
| **Create** | `src/client/mparticle/cookies/mparticleConsentSynced.ts` |
| **Create** | `src/client/mparticle/mparticle-consent.ts` |
| **Create** | `src/client/mparticle/mparticle-consent.test.ts` |
| **Modify** | `src/client/main.web.ts` – add startup entry |
| **Modify** | `src/model/guardian.ts` – add `mparticleApiUrl` to `config.page` |
| **Modify** | `src/types/config.ts` – add `mparticleConsentSync` switch (optional, or rely on index signature) |

## Tests

Mirror the test approach in [`src/client/userFeatures/user-features.test.ts`](../src/client/userFeatures/user-features.test.ts):

-   Mock `@guardian/libs` (`onConsentChange`, `getConsentFor`, `getCookie`)
-   Mock `../../lib/identity` (`getAuthStatus`)
-   Mock the `fetch` global
-   Assert: when user is signed out → no fetch call
-   Assert: when `mparticleConsentNeedsSync()` is false → no fetch call
-   Assert: when signed in and needs sync → fetch called with correct URL, method, headers, and body
-   Assert: after successful sync, `markMparticleConsentSynced()` is called (cookie is set)
-   Assert: on `fetch` failure → error is thrown (so it surfaces in Sentry)

## Key architectural decisions and their rationale

### Why not call on every `onConsentChange`?

`onConsentChange` from `@guardian/libs` fires on every page load (not only when the user actively changes their consent). Calling the mParticle API on every page load would produce an enormous volume of requests, likely hitting rate limits and causing unnecessary load on the backend infrastructure. The staleness-cookie approach, already proven for `userBenefitsApi`, limits calls to once per session.

### Why signed-in users only?

The mParticle profile that matters for paid-media audiences is the **main profile**, keyed on `identity_id`. Anonymous "dangling tentacle" profiles are eventually merged into the main profile by mParticle's IDSync. Writing consent to an anonymous profile is unreliable because the same browser ID may be associated with multiple mParticle profiles (see the identity resolution notes in the overview). The backend resolves this using the identity ID from the auth token, not the browser ID alone.

### Why pass `browserId` in the URL path (not as a claim)?

The backend cannot derive the browser ID from the auth token – it only knows the identity ID. The browser ID is needed so the backend can write the consent to the corresponding mParticle "Lite" profile (browser-keyed) for users who have not yet triggered identity resolution. Sending it explicitly in the URL is clean and auditable.

### Why `PATCH`?

The operation is idempotent – it is setting a known state, not appending an event. `PATCH` is the correct HTTP verb for a partial update to a resource, and the backend spec agrees.

### Why reuse `getOptionsHeaders` / Bearer token auth?

This is the same auth pattern used by `userBenefitsApi` and is the established standard for DCR → support-service-lambdas communication. It means the backend can verify the caller's identity_id from the JWT, which is essential for associating the consent record with the right mParticle profile.

### Why add `mparticleApiUrl` to `window.guardian.config.page`?

The URL is environment-specific (different for CODE, PROD, and DEV). Injecting it server-side, just like `userBenefitsApiUrl`, avoids hardcoding per-environment values in the front-end bundle and keeps the pattern consistent.

## Open questions (frontend-relevant)

| Question | Status |
|||
| Which exact GDPR purpose name should be used with `getConsentFor()`? | **Needs confirmation from Data Privacy / MRR** |
| What should the staleness cookie TTL be? (session-length vs. fixed minutes) | To agree with backend/MRR |
| Should the call also be made on `apps` rendering target (`main.apps.ts`)? | Likely no – scoped to web for now |
| Should failures be silently swallowed or surfaced to Sentry? | Recommend surfacing via existing Sentry integration |
| Does the switch need to be in the `Switches` type definition (fully typed) or is the index signature sufficient? | Low priority, can use index signature and revisit |

## Relationship to other work

-   **Backend:** Creates the `PATCH /consents/{browserId}` endpoint on `mparticle-api.guardianapis.com`, handles mParticle writes, user auth, and rate limiting concerns (SQS queue, secondary data store). Frontend only consumes it.
-   **Connection mParticle → Meta/Google:** Configured entirely within mParticle and the ad-platform UIs. No DCR work needed.
-   **Backfill (TBC):** A separate data-engineering concern. No DCR work needed.

## Reference: existing patterns used

| Pattern | Source in this repo |
|||
| `onConsentChange` usage | [`src/lib/braze/hasRequiredConsents.ts`](../src/lib/braze/hasRequiredConsents.ts) |
| Authenticated API call | [`src/client/userFeatures/userBenefitsApi.ts`](../src/client/userFeatures/userBenefitsApi.ts) |
| Staleness cookie | [`src/client/userFeatures/cookies/userBenefitsExpiry.ts`](../src/client/userFeatures/cookies/userBenefitsExpiry.ts) |
| `isUserLoggedIn` / `getAuthStatus` | [`src/lib/identity.ts`](../src/lib/identity.ts) |
| `bwid` cookie read | [`src/client/bootCmp.ts`](../src/client/bootCmp.ts) |
| `pageViewId` | `window.guardian.config.ophan.pageViewId` |
| Startup wiring | [`src/client/main.web.ts`](../src/client/main.web.ts) |
| Per-page config URL injection | [`src/model/guardian.ts`](../src/model/guardian.ts) (`config.page.userBenefitsApiUrl`) |

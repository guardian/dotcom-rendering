# Braze Banners System

The **Braze Banners System** is a unified framework within Dotcom Rendering (DCR) for integrating [Braze Banners](https://www.braze.com/docs/developer_guide/banners/) - a channel designed for persistent, inline, and personalized messaging.

This system is owned by the **Value** team and serves as the standard implementation for in-article messaging powered by Braze.

## Context & Motivation

### What are Braze Banners?

Unlike "In-App Messages" (overlays) or "Content Cards" (feeds), Banners are designed to sit natively within the page layout. They allow marketing and product teams to dynamically personalize content based on real-time user eligibility and behavior without requiring code deployment for every campaign change.

### Why replace the old implementation?

Previously, we often relied on custom implementations of Content Cards or hardcoded logic to achieve similar effects. The generic Banners product solves several key issues:

1.  **Efficiency**: Marketing teams can design and launch banners using Braze's drag-and-drop editor creating a "natural" experience without ongoing developer assistance.
2.  **Persistency**: Banners are designed to be "always-on" and non-intrusive, updating automatically at the start of sessions.
3.  **Dynamic Personalization**: Through the `iframe` architecture, banners can be personalized (Liquid logic) and refreshed without re-deploying DCR.

## Architecture

The system is encapsulated primarily in `BrazeBannersSystem.tsx` and interacts with the Global Braze SDK.

### 1. Placements

We map DCR-specific slots to Braze Placement IDs. This abstraction allows us to change the underlying ID without refactoring the components.

| DCR Placement ID                             | Description                                                         |
| :------------------------------------------- | :------------------------------------------------------------------ |
| `BrazeBannersSystemPlacementId.EndOfArticle` | Appears at the bottom of the article body (Epic slot).              |
| `BrazeBannersSystemPlacementId.Banner`       | Appears fixed at the bottom of the viewport (Sticky Bottom Banner). |

### 2. Display Logic (`canShowBrazeBannersSystem`)

Before a banner is requested or shown, the system performs rigorous checks to ensure suitability. A banner is **suppressed** if:

-   The Braze SDK is not initialized.
-   The content type is `Interactive` (for End of Article slots).
-   Reader Revenue is explicitly hidden (e.g., paid content, sensitive pieces).
-   Specific tag exclusions apply (e.g., the Taylor Report logic).

### 3. Rendering & Safety

Banners are delivered as HTML/CSS payloads injected into an `iframe` (or shadow DOM equivalent context managed by the SDK) to ensure style isolation.

#### The CSS Checker

Because Braze injects styles dynamically, there is a risk of campaigns targeting elements that don't exist, or DCR markup changing and breaking banner styles.
The system includes a **CSS Checker** (`runCssCheckerOnBrazeBanner`) which:

-   Parses the banner's HTML/CSS.
-   Validates that every CSS selector matches at least one element.
-   Logs warnings to the console (in development) if "dead" selectors are found.

This ensures we catch broken campaign creatives early in the QA process.

### 4. Rate Limiting (`refreshBanners`)

Braze enforces a "Token Bucket" algorithm for refreshing banners (re-checking eligibility):

-   Users start with a bucket of tokens (e.g., 5).
-   Tokens refill over time (e.g., 1 every 3 minutes).
-   The `refreshBanners()` function handles the request and creates a race condition with a timeout to ensure DCR simply proceeds if the network request hangs, preventing the page from feeling sluggish.

## Communication Protocol

The banner runs in an isolated environment but often needs to interact with DCR (e.g., to check if the user is signed in or to upgrade them). We use a `postMessage` protocol for this bridge.

### Supported Message Types

The banner can send the following messages to the host page:

-   `BRAZE_BANNERS_SYSTEM:GET_AUTH_STATUS`: Asks if the user is `SignedIn` or `SignedOut`.
-   `BRAZE_BANNERS_SYSTEM:GET_EMAIL_ADDRESS`: Requests the user's email address (if signed in).
-   `BRAZE_BANNERS_SYSTEM:NEWSLETTER_SUBSCRIBE`: Triggers a subscription to a specific newsletter ID.
-   `BRAZE_BANNERS_SYSTEM:DISMISS_BANNER`: Removes the banner from the DOM (e.g., user clicked "Close").
-   `BRAZE_BANNERS_SYSTEM:GET_SETTINGS_PROPERTY_VALUE`: Retrieve specific key-value pairs configured in the Braze Campaign settings.

## Usage for Developers

To add the Braze Banners System to a new slot:

1.  **Define the Placement**: Add a new member to the `BrazeBannersSystemPlacementId` enum.
2.  **Configure the Candidate**: In the message picker config (e.g., `SlotBodyEnd.importable.tsx`), use `buildBrazeBannersSystemConfig` to create a candidate.
3.  **Add to Message Picker**: Ensure the new candidate is included in `pickMessage` for that slot.

```typescript
// Example: Adding to a new slot
const brazeCandidate = buildBrazeBannersSystemConfig(
	braze,
	idApiUrl,
	contentType,
	shouldHideReaderRevenue,
	tags,
);
```

## Troubleshooting & Logging

The system uses a dedicated logger `[BrazeBannersSystem]`.

-   **Development**: Logs are visible in the console on `localhost` and `r.thegulocal.com`.
-   **Production**: Logs are suppressed to keep the console clean, but critical errors may still appear with the prefix.

---

**Value Team**
_Last Updated: February 2026_

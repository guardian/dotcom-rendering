# Braze Banners System

The **Braze Banners System** is a unified framework within Dotcom Rendering (DCR) for integrating [Braze Banners](https://www.braze.com/docs/developer_guide/banners/) - a channel designed for persistent, inline, and personalized messaging.

This system is owned by the **Value** team and serves as the replacement for the legacy "Hybrid" setup (custom In-App Messages and `braze-components`).

## Context: The "Braze Channels" Upgrade

This system is part of a strategic shift from a **Hybrid setup** to a **Native setup** (Braze Banners).

As we transition to the **Braze Banners System**, the legacy **Hybrid setup** (In-App Messaging system alongside the `braze-components` library) will be deprecated soon.

This new approach relies on **Braze Banner templates** created directly in the Braze Dashboard - a joint effort between the **CRM**, **Design**, and **Development** teams. This collaborative workflow ensures design consistency while empowering CRM to self-serve.

### Motivation

| Metric          | Legacy Hybrid Setup                          | New Braze Banners System                       |
| :-------------- | :------------------------------------------- | :--------------------------------------------- |
| **Build Time**  | 5–6 hours (Design + Liquid logic + QA)       | < 1 hour                                       |
| **Tooling**     | Manual Storybook templates & Key-Value pairs | Braze Drag-and-Drop Editor & CMS               |
| **Agility**     | dependency on engineering for new formats    | Self-serve to standard Design System templates |
| **Consistency** | Fragmented logic                             | Shared logic across Web & App                  |

### Goals

1.  **Increase Supporter Value**: Enable highly personalized, cross-platform journeys (leveraging CDP data).
2.  **Improve Agility**: Reduce campaign build time significantly.
3.  **Expand Formats**: Move beyond just "Epic" and "Banner" to potential new slots (Sidebar, Menubar) in the future.

## Architecture

The system is encapsulated primarily in `BrazeBannersSystem.tsx` and interacts with the Global Braze SDK.

### 1. Placements

We map DCR-specific slots to Braze Placement IDs. This abstraction allows us to change the underlying ID without refactoring the components.

| DCR Placement ID                             | Description                                                         |
| :------------------------------------------- | :------------------------------------------------------------------ |
| `BrazeBannersSystemPlacementId.EndOfArticle` | Appears at the bottom of the article body (Epic slot).              |
| `BrazeBannersSystemPlacementId.Banner`       | Appears fixed at the bottom of the viewport (Sticky Bottom Banner). |

### 2. Concurrency & Slot Priority

To ensure retrocompatibility during the migration phase, the `brazeBannersSystem` is inserted **before** the current implementations (`braze-components`). If a Native Banner is available, it takes precedence over legacy Braze campaigns or Reader Revenue messages.

**End of Article Slot:**

1.  **`brazeBannersSystem`** (New Native Banner)
2.  `brazeEpic` (Legacy Custom Component)
3.  `readerRevenueEpic` (Support asks)

**Sticky Bottom Banner Slot:**

1.  `CMP` (Privacy/Consent - Always Top Priority)
2.  `signInGate` (Auxia)
3.  **`brazeBannersSystem`** (New Native Banner)
4.  `brazeBanner` (Legacy Custom Component)
5.  `readerRevenue` (Support asks)

### 3. Display Logic (`canShowBrazeBannersSystem`)

Before a banner is requested or shown, the system performs strict checks:

-   **SDK Initialization**: Braze must be loaded.
-   **Content Type**: Suppressed on `Interactive` articles (for Epics).
-   **Commercial Rules**: Suppressed if Reader Revenue is hidden (e.g., paid content, sensitive pieces).
-   **Tag Exclusions**: Specific logic like the generic `suppressForTaylorReport`.

### 4. Safety & Mitigations

Since Braze injects HTML/CSS dynamically, we employ several layers of safety:

#### A. The CSS Checker

Because marketing teams have styling flexibility, there is a risk of campaigns targeting elements that no longer exist in DCR. The system includes a runtime **CSS Checker** (`runCssCheckerOnBrazeBanner`) which:

-   Parses the banner's HTML/CSS.
-   Validates that every CSS selector matches at least one element.
-   Logs warnings (in development) if "dead" selectors are found.
    This ensures broken creatives are caught during the QA process before launch.

#### B. JavaScript Isolation

Banners are rendered inside an `iframe` (or Braze-managed shadow DOM context) to sandbox execution.

-   _Risk_: Advanced interaction requiring JS.
-   _Mitigation_: We establish a trust chain. Strict templates created by Design Systems are used.
-   _Security_: Cross-origin access is blocked; communication happens solely via the `postMessage` protocol.

### 5. Rate Limiting (`refreshBanners`)

Braze enforces a "Token Bucket" algorithm for refreshing banners (re-checking eligibility):

-   **Capacity**: 5 tokens per session.
-   **Refill**: 1 token every 3 minutes.
-   **Implementation**: The `refreshBanners()` function creates a race condition with a timeout. If the network is slow or tokens are empty, DCR proceeds without blocking the render.

### 6. Wrapper Mode & Styling

To support more complex designs while maintaining consistency, the system supports a **"Wrapper Mode"**.

-   **Enabled via**: `wrapperModeEnabled` (Boolean) Key-Value pair.
-   **Behavior**: When enabled, DCR applies specific styles to the **container** holding the Braze iframe, including:
    -   `max-height: 65svh` (prevents banners from taking over the full screen).
    -   `border-top: 1px solid black` (provides visual separation).
    -   Dynamic Background Color (see below).

#### Automatic Color Contrast

When providing a background color in Wrapper Mode, DCR automatically calculates the optimal foreground (text/icon) color to ensure accessibility standards are met.

-   **Input**: `wrapperModeBackgroundColor` (Hex string).
-   **Algorithm**: Calculates perceived brightness using the formula `(r * 299 + g * 587 + b * 114) / 1000`.
-   **Result**: If brightness > 128, the foreground is **Black**. Otherwise, it is **White**.

### 7. Configuration (Key-Value Pairs)

The system automatically reads specific Key-Value pairs from the Braze Campaign to configure the banner wrapper.

| Key                          | Type    | Description                                                                                |
| :--------------------------- | :------ | :----------------------------------------------------------------------------------------- |
| `minHeight`                  | String  | Sets the CSS `min-height` of the container (e.g., "300px") to minimize layout shift (CLS). |
| `wrapperModeEnabled`         | Boolean | Activates Wrapper Mode (see above).                                                        |
| `wrapperModeBackgroundColor` | String  | Sets the background color of the wrapper and triggers the auto-contrast calculation.       |

_Custom keys can also be retrieved by the banner creative using the `BRAZE_BANNERS_SYSTEM:GET_SETTINGS_PROPERTY_VALUE` message._

## Communication Protocol

The banner uses a `postMessage` protocol to interact with the host DCR page.

### Supported Message Types

| Message Type                                       | Function                                        |
| :------------------------------------------------- | :---------------------------------------------- |
| `BRAZE_BANNERS_SYSTEM:GET_AUTH_STATUS`             | Checks if user is `SignedIn`.                   |
| `BRAZE_BANNERS_SYSTEM:GET_EMAIL_ADDRESS`           | Requests email (if signed in).                  |
| `BRAZE_BANNERS_SYSTEM:NEWSLETTER_SUBSCRIBE`        | Subscribes to a newsletter ID.                  |
| `BRAZE_BANNERS_SYSTEM:DISMISS_BANNER`              | Removes the banner from the DOM.                |
| `BRAZE_BANNERS_SYSTEM:GET_SETTINGS_PROPERTY_VALUE` | Reads Key-Value pairs from the Campaign config. |

## Usage for Developers

To add the Braze Banners System to a new slot:

1.  **Define the Placement**: Add a new member to the `BrazeBannersSystemPlacementId` enum.
2.  **Configure the Candidate**: Use `buildBrazeBannersSystemConfig` to create a candidate in the Message Picker.
3.  **Set Priority**: Ensure it is placed correctly in the `pickMessage` candidate list (typically before legacy implementations).

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

## Migration & Future Steps

-   **Phase 1 (Current)**: Hybrid state. `brazeBannersSystem` runs alongside `braze-components`.
-   **Phase 2**: Master template creation (Newsletter, Epic, App Download).
-   **Phase 3**: Deprecation of `braze-components` once all Canvases are migrated to Braze Banners.

---

**Value Team**
_Last Updated: February 2026_

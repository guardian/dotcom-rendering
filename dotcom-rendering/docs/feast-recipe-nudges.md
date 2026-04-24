# Feast Recipe Nudges

> **In one sentence:** Small, well-timed prompts on Guardian recipe pages that invite readers to cook the same recipe inside the Feast app - appearing naturally in the moment when a reader is most likely to want it.

These components contextually promote the [Guardian Feast app](https://www.theguardian.com/food/feast-app), with the dual goal of driving new app installs and helping existing Supporter Plus subscribers discover a benefit they may not know they already have.

---

## Background and motivation

Guardian recipe articles sit at the natural intersection of editorial content
and the Feast app's value proposition. A reader cooking from a recipe on the
web is already the ideal Feast user - Cook Mode keeps the screen on hands-free,
ingredient unit conversion is automatic, and saved collections mean the recipe
stays findable forever.

The nudges were introduced to exploit this moment of intent: the reader is
actively engaged with a recipe, not passively browsing. Targeting is therefore
contextual (recipe article + scroll depth) rather than demographic.

There are two distinct audiences:

| Audience                             | What the nudge offers                                                            |
| ------------------------------------ | -------------------------------------------------------------------------------- |
| **Supporter Plus / HVS subscribers** | Awareness that Feast is already included in their package                        |
| **US non-subscribers**               | A 14-day free trial with unit-conversion copy relevant to US cooking conventions |
| **All other readers**                | A 14-day free trial with the full feature pitch                                  |

---

## Components

There are two complementary components. They are **mutually exclusive by
viewport** - at any given screen size exactly one is visible, never both.

```
Viewport          Component shown
──────────────    ──────────────────────────────────────────
< 1300px (wide)   FeastContextualNudge  (inline, in the article flow)
≥ 1300px (wide)   FeastRecipeNudge      (sticky, in the 220px left-column gutter)
```

### `FeastContextualNudge`

**File:** `src/components/FeastContextualNudge.tsx`
**Island:** `src/components/FeastContextualNudge.island.tsx`

A dismissable card injected inline into the article body, immediately after
the `SubheadingBlockElement` that opens each recipe section. At `from.wide` it
is `display: none` - the sticky left-col card takes over at that width.

**Copy variants** (chosen by the island based on subscription state and edition):

-   `hvsSubscriber` - "Your supporter package includes Feast"
-   `usNonSubscriber` - "Cook this recipe with the Feast app" (US unit conversion angle)
-   `default` - "Cook this recipe with the Feast app" (general)

**Dismiss behaviour:** A single dismissal persists in `localStorage` for 30
days (`gu.feast-nudge.dismissed`). Subsequent visits within that window skip
rendering entirely, so the island renders nothing without any visible layout
shift.

**Compact mode:** The first recipe section in a multi-recipe article shows the
full heading + body + CTAs. All subsequent recipe sections show only the CTAs
(`compact={true}`), avoiding repetitive marketing copy on long articles.

**Accessibility:** The container is an `<aside>` with
`aria-label="Get the Feast app"`. The dismiss button has its own
`aria-label="Dismiss Feast app nudge"`.

---

### `FeastRecipeNudge`

**File:** `src/components/FeastRecipeNudge.tsx`
**Island:** `src/components/FeastRecipeNudge.island.tsx`

A sticky left-column card that appears in the 220px gutter to the left of the
article body at `from.wide`. It is `display: none` on narrower viewports.

The component directly mirrors the pattern used by `ProductCardLeftCol` on
[The Filter](https://www.theguardian.com/thefilter) product-review articles:

```
┌─────────────────────────────────────────────────────┐
│  <div css={recipeContentContainerStyles}>           │  position: relative
│  ┌──────────────────────────────────────────────┐   │
│  │ <div css={recipeLeftColContainerStyles}>     │   │  position: absolute
│  │   left: -240px; height: 100%; width: 220px   │   │  (mirrors LeftColProductCardContainer)
│  │  ┌────────────────────────────────────────┐  │   │
│  │  │ FeastRecipeNudge                       │  │   │  position: sticky; top: 8px
│  │  │  • Feast logo + "FEAST" label          │  │   │
│  │  │  • Recipe name (from subheading)       │  │   │
│  │  │  • "Open in Cook Mode"  [primary CTA]  │  │   │
│  │  │  • "Save to My Feast"   [secondary CTA]│  │   │
│  │  └────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────┘   │
│  FeastContextualNudge (hidden at this width)        │
│  recipe body content (ingredients, method steps…)   │
└─────────────────────────────────────────────────────┘
```

The sticky card follows the reader as they scroll through the recipe section.
When the section ends (its `position: relative` parent leaves the viewport),
the card scrolls away naturally - no JavaScript required. Each recipe section
gets its own independent instance.

The recipe name shown in the card is extracted from the
`SubheadingBlockElement.html` field using a lightweight `stripHtmlTags` helper
exported from `FeastRecipeNudge.tsx`.

**No dismiss button.** The left-col card is ambient context, not a call to
action that the reader needs to dismiss. The inline nudge (`FeastContextualNudge`)
handles dismissal for narrower screens.

---

## A/B test

Both components are gated behind the `FeastContextualNudge` A/B test
(`src/experiments/tests/feast-contextual-nudge.ts`):

```
id:       FeastContextualNudge
variants: control | variant
split:    50 / 50
expiry:   2027-01-01
```

Users in the `variant` bucket see the nudges; users in `control` see nothing
extra. The island components use `useAB().api.isUserInVariant(...)` - if the
hook returns `undefined` (e.g. Storybook, SSR) the island does not render.

> **⚠️ Before merging to production:** change `useState(true)` → `useState(false)`
> in both island files. The `true` default is a dev-only shortcut so the
> component is visible in Storybook and local dev without needing to be placed
> into the AB test variant.

---

## Dark mode

Both components support dark mode through two complementary mechanisms:

1. **`[data-color-scheme='dark'] &`** - targets Storybook's explicit dark
   decorator. Both `light` and `dark` selectors are declared inside the same
   Emotion `css` block, with `light` first so `dark` wins the cascade when
   both ancestor attributes are present simultaneously (a Storybook-specific
   edge case).

2. **`@media (prefers-color-scheme: dark)`** - targets the OS-level preference
   in production. Applied only when `darkModeAvailable={true}` is passed (via
   `useConfig().darkModeAvailable` in the island), so Labs pages and other
   designs that opt out of dark mode are not affected.

---

## Button colours and the `globalLinkStyles` problem

Guardian article bodies apply `color: var(--article-link-text)` to every `<a>`
element that lacks `data-ignore="global-link-styling"`. On Lifestyle-pillar
articles (where all recipe content lives) this resolves to `#7D0068` (magenta).

Source's `Button` / `LinkButton` render as `<a>` or `<button>` tags and accept
a `theme` prop that sets colours via CSS custom properties. However, the
article-body rule has higher specificity `(0,1,1)` - type selector `a` + `:not()`
attribute - than Source's class-based theming `(0,1,0)`.

Both solutions applied:

-   **`theme` prop** (not `cssOverrides`) - overrides at the CSS custom property
    level, bypassing pillar inheritance.
-   **`data-ignore="global-link-styling"`** on every `<LinkButton>` - causes
    the article-body rule to skip those elements entirely via the `:not()` selector
    it already uses.

---

## Adjust deep links

All CTAs use Adjust `go.link` deep links, built by the shared `buildAppLink`
helper in each component:

```ts
https://guardian-feast.go.link/p0nQT?utm_medium=...&utm_campaign=...
```

**How they work:**

-   Users **with** the Feast app installed are taken directly into the app at the
    relevant screen (Cook Mode, saved recipes, etc.).
-   Users **without** the app are redirected to the App Store (iOS) or Play Store
    (Android) - the appropriate store is resolved by Adjust based on the User-Agent.
-   On desktop browsers where no app is installed, Adjust falls back to a
    configurable web URL (currently the Feast landing page).

**Current UTM parameters:**

| Parameter      | Value                                                   |
| -------------- | ------------------------------------------------------- |
| `utm_medium`   | `ACQUISITIONS_NUDGE`                                    |
| `utm_source`   | `GUARDIAN_WEB`                                          |
| `utm_campaign` | CTA-specific string, e.g. `FeastNudge_Default_CookMode` |
| `utm_content`  | The article `pageId`                                    |

---

## What still needs to be done

### 1. Per-recipe deep link values (highest priority)

Currently every CTA on a given article points to the same Adjust link,
regardless of which recipe the reader is viewing. Adjust supports a
`deep_link_value` parameter that routes the user to a specific piece of content
inside the app:

```
https://guardian-feast.go.link/p0nQT?deep_link_value=<FEAST_RECIPE_ID>&...
```

The `buildAppLink` function in both components already has a comment marking
where this parameter should be added. What is needed:

-   The Feast team to expose a recipe identifier (a Feast-internal ID or a
    canonical URL slug) from the `frontend` backend, attached to each
    `SubheadingBlockElement` or via a new article-level field.
-   `ArticleRenderer` (or the island) to pass that ID down to both components.
-   `buildAppLink` to accept an optional `recipeId` parameter and append
    `deep_link_value` when present.

Until then, users are taken to the Feast app's home screen or the App Store,
not to the specific recipe.

### 2. Revert the dev-only render flag before merging

In both island files, `useState(true)` must be changed to `useState(false)`:

```ts
// FeastContextualNudge.island.tsx and FeastRecipeNudge.island.tsx
const [shouldRender, setShouldRender] = useState(false); // ← change from true
```

The `useEffect` will then correctly gate rendering on the AB test bucket check.

### 3. Adjust link token verification

The `go.link` subdomain and link token (`p0nQT`) need to be confirmed with the
Feast/Growth engineering teams as the correct production values. If they differ
per environment (staging vs. production), `buildAppLink` should read the token
from a config value rather than hardcoding it.

### 4. Adjust deferred deep linking (new installs)

When a user taps a CTA and does **not** have the app installed, they are sent
to the App Store. After installing, a standard Adjust deep link does **not**
automatically open the recipe - the user lands on the app's home screen.

[Adjust's deferred deep linking](https://help.adjust.com/en/article/deep-links#deferred-deep-linking)
solves this: Adjust stores the `deep_link_value` during the App Store redirect
and passes it into the app on first launch. This requires:

-   Confirming deferred deep linking is enabled on the Feast app's Adjust
    dashboard.
-   No code changes in DCR - this is purely an app + Adjust configuration concern.

### 5. Dismiss persistence across devices

The current 30-day dismissal is stored in `localStorage`, so it is
browser-local. A reader who dismisses on mobile will see the nudge again on
desktop. For a fully consistent experience, dismissal state could be persisted
server-side against the user's Guardian identity (if signed in), following the
same pattern used by other acquisition messaging in DCR.

### 6. Analytics / ophan tracking

The nudge components currently do not fire any Ophan component events on
impression or CTA click. Adding `submitComponentEvent` calls (impression on
mount, click on CTA interaction) would make the A/B test results measurable
in the Guardian's standard acquisition reporting.

### 7. `FeastRecipeNudge` compact / subsequent-recipe variant

`FeastContextualNudge` has a `compact` prop that suppresses heading and body
copy on the 2nd, 3rd, … recipe sections of a multi-recipe article, so
marketing copy is not repeated. `FeastRecipeNudge` (the sticky left-col card)
does not yet have an equivalent - every instance shows the full card. For
articles with many recipes this is fine (each card shows a different recipe
name), but a smaller card variant may be desirable if the recipe name alone is
sufficient context.

### 8. Accessibility audit

Both components need a formal accessibility review:

-   Keyboard navigation through the CTAs in the left-col card.
-   Focus management when `FeastContextualNudge` is dismissed (focus should
    return to a sensible element).
-   Screen reader announcement of the dismissal result.
-   Colour-contrast ratios in dark mode verified against WCAG 2.1 AA.

---

## File map

```
src/components/
  FeastContextualNudge.tsx          Pure render component (inline card)
  FeastContextualNudge.island.tsx   AB gate, dismiss logic, subscriber detection
  FeastContextualNudge.stories.tsx  Storybook stories (light + dark variants)
  FeastRecipeNudge.tsx              Pure render component (sticky left-col card)
                                    Also exports recipeContentContainerStyles,
                                    recipeLeftColContainerStyles, stripHtmlTags
  FeastRecipeNudge.island.tsx       AB gate wrapper
  FeastRecipeNudge.stories.tsx      Storybook stories (light + dark variants)

src/experiments/tests/
  feast-contextual-nudge.ts         AB test definition

src/experiments/
  ab-tests.ts                       feastContextualNudge registered here

src/lib/
  ArticleRenderer.tsx               Injects both nudges after each
                                    SubheadingBlockElement on Recipe articles
```

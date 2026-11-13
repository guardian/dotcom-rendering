# Premium puzzles access: plan and decisions

Status: phases 0 to 4 are implemented. `frontend` computes the premium flag
(only as a hint, see D3) and serves the access endpoint, which relays the
question to the Puzzles API access endpoint
(`GET /v1/game/{puzzleId}/access/{date}`). Until that endpoint is deployed to a
stage, `frontend` cannot get an answer and every check there counts as failed
(D5). What is still to verify on CODE is in section 8.

This document records the plan for gating premium puzzles on the Puzzle Page,
every decision taken along the way, and the reasoning behind each one.

The work started as one large pull request (#17190) and was delivered as a
series of smaller ones: the A/B test (#17244), the contract field (#17245), the
modal helpers (#17246), the modal (#17247), the access logic (#17248) and the
wiring into the Puzzle Page layout (#17250), followed by this document.

## 1. Goal

- The last 7 days, counting today, are free for everyone: with today being the
  9th, the 3rd to the 9th are free and the 2nd is already premium.
- Older puzzles ("premium puzzles") need a Supporter Plus or Digital Pack
  (All-access digital) subscription.
- Readers without access must not get the game board. They see a modal asking
  them to subscribe.
- Readers with a subscription must get the fastest possible experience.
- We must not penalise a paying reader for a failure on our side.

## 2. What is already done (phase 0)

- `src/components/UnlockPremiumPuzzlesModal.tsx`: the modal, extracted from
  `PuzzlePageLayout.tsx` so it can be reused on other pages.
    - Props: `returnToArchivePath` (a path only), `idUrl`, and optional
      `returnUrl`, `title`, `subtitle`, `benefits`, `cssOverrides`. `returnUrl`
      defaults to the URL of the page the modal is shown on (see below).
    - Absolutely positioned: the parent must have `position: relative`.
    - On small screens it is a bottom sheet: it sticks to the bottom of the
      screen (`position: sticky`) while the covered content is in view, and
      stops at the end of it so the page footer shows below. The logo, hero,
      title and benefits scroll inside it, the buttons stay in view. Its
      height is capped to the room left under the page header
      (`getModalMaxHeight`), so the buttons are on screen when the page loads.
      When the room under the header is smaller than the smallest sheet
      (`shouldFlowWithPage`, for example a small phone in landscape) it is no
      longer sticky: it sits at the top of the covered content with its natural
      height and the reader scrolls the page to reach the buttons.
    - The hero image is a decorative PNG (`alt=""`) served by the image CDN
      (`i.guim.co.uk`) shown 556 px wide with the design's 185/69 aspect ratio.
    - Both the "Subscribe" and the "sign in" links carry the current page as
      `returnUrl`: a full `https` URL (origin and path, no query or hash) read
      from `window.location` after mounting. Support and Identity ignore any
      other return URL, so on a page not served over `https` (for example
      `localhost`) the parameter is left out.
- `src/lib/premiumPuzzlesUrls.ts` (with tests): builds the Subscribe URL
  `<support>/?source=puzzles&returnUrl=<encoded https URL>`, the sign in URL
  `<idUrl>/signin?returnUrl=<encoded https URL>` and the return URL itself
  (`getCurrentPageUrl`).
    - Support redirects `/` to `/{region}/contribute` and keeps the query string
      (checked with `HEAD` requests on PROD and CODE), so the region is left to
      Support and the page does not need to know it.
    - The Support origin is derived from `config.idUrl` by replacing the
      `profile.` subdomain with `support.`, with a fallback to
      `https://support.theguardian.com`.
    - No `/uk` segment: the Support site resolves the region itself.
    - Paths are validated as same-site (start with `/`, never `//`) to avoid
      open redirects.
- `src/components/UnlockPremiumPuzzlesModal.stories.tsx`: Storybook stories.

## 3. Facts that constrain the design

Found by reading `dotcom-rendering` and the `frontend` repository.

1. **The Puzzle Page HTML is cached and shared.** In `frontend`,
   `getPuzzlePage` calls the renderer with `CacheTime.Default` (60 seconds)
   and wraps the result in `Cached(...)`. There is no per-reader handling.
2. **The team's existing rule is that cached HTML never contains reader
   data.** `frontend/docs/puzzle-page.md` states that the `/game` request is
   anonymous so cached HTML never contains another reader's identity.
3. **The established pattern for reader-specific data** is an uncached
   endpoint (`NoCache`, `Authorization` header, CORS) called from the browser
   via `config.page.ajaxUrl`. Puzzle progress (`puzzlesProgress()`) works this
   way. Two constraints apply to that host. Query parameters are stripped by
   the CDN in CODE and PROD, so the puzzles archive data routes use path
   parameters. And only the routes listed in the AJAX server block of
   `router.conf` (in `guardian/platform`) reach `frontend`.
4. **DCR does not fetch data while rendering this page.** The `/PuzzlePage`
   handler receives a JSON `POST` from `frontend` and only reads the body.
5. **`PuzzleIframe` already waits for the reader's identity** before setting
   the iframe `src` (`getAuthStatus`), and re-evaluates on auth state changes.
6. **The user benefits API returns `{ benefits: string[] }`.** DCR only
   recognises `hideSupportMessaging`, `adFree` and `allowRejectAll`, and
   already persists them as cookies (`GU_AF1` for ad-free, valid 30 days,
   refreshed by `src/client/userFeatures`). A helper
   `adFreeDataIsPresent(isSignedIn)` exists.
7. **No "all-access" or puzzles-specific benefit is known** in either repo.
8. **The frontend computes "today" in Europe/London** (`LocalDate.now(ZoneId.of("Europe/London"))`).

## 4. Decisions and justifications

### D1. Split the problem into a puzzle-level question and a reader-level question

- Puzzle-level ("is this puzzle free?") depends only on the puzzle date.
  It is safe in cached HTML, so it ships as a flag in the payload.
- Reader-level ("does this reader have access?") is only asked for premium
  puzzles, through an uncached endpoint.

Why: fact 1 and 2 forbid per-reader data in the HTML, and this keeps the
common case (free puzzles) fast and request-free.

### D2. The 7-day rule is computed by the backend, never the browser

Why: if the browser computed it, changing the computer clock would unlock
every puzzle. Server-side, the reader cannot influence the result.

- Reference timezone is **Europe/London** for everyone (confirmed). A reader
  elsewhere can see a puzzle as free or locked slightly differently from their
  local day. Accepted: it is consistent for all readers.
- Because the HTML is cached for 60 seconds, around midnight in London a page
  can keep the previous classification for up to a minute. Accepted.
- The rule should live in one place. Preferred source is the puzzles API
  `/game` response (already called by `frontend`, anonymously and cached),
  otherwise `frontend` computes it from the date. DCR must not duplicate it.

### D3. Soft paywall is accepted

For premium puzzles the `gameUrl` stays in the cached HTML, so anyone reading
the page source can find it.

Why accepted: the purpose is to give performance to paying readers and try to
convert non-paying ones, not to enforce hard access control. The hard option
(endpoint returns `gameUrl` only when entitled) would make the board slower for
subscribers, which contradicts the main priority.

### D4. No new browser storage; use the existing ad-free cookie as a hint

The hint for "probably a subscriber" is: signed in AND the `adFree` benefit
present (`GU_AF1`, via `adFreeDataIsPresent`).

Why:

- Supporter Plus and above already include "ad-free reading on all your
  devices", so the ad-free benefit very closely matches the set of readers who
  should have access.
- It needs no new cookie, no new `localStorage`, and no change to the shared
  Gateway or `frontend` code that mirrors `user-features.ts`, which would need
  slow cross-team approval.
- It is only a hint. The puzzles API is always the authority.

### D5. Assume access on API failure or timeout, but only with evidence

If the access request fails or is slow:

- Signed in AND `adFree` evidence present: **assume access** (keep or load the
  board).
- Anything else (signed out, or signed in without `adFree`): **block** (show
  the modal).

Why: we must not penalise a paying reader for our own failure, but the
assumption must be backed by evidence that they are a logged-in paying reader,
otherwise a failure would unlock everything for everyone.

### D6. Stale hint is acceptable in both directions

- A lapsed subscriber may see the board briefly, then the modal.
- A new subscriber may wait for one API round trip.

Why: a reader whose subscription just ended will not go straight back to a
premium puzzle, and even if they do, access ends within minutes. The cost of
either error is small and short-lived.

### D7. Rendering is client-side, so the result is the same with or without HTML cache

The decision is made in the browser after hydration, so a cache hit or miss
does not change the behaviour.

### D8. Premium puzzles render no ads and no comments

Ads are not rendered at all when `instance.requiresSubscription` is true
(`renderAds` in `PuzzlePageLayout.tsx`). Comments are already permanently off
on the Puzzle Page; if they are ever enabled they must also stay off for
premium puzzles.

Why:

- A reader with access is a subscriber, so ad-free. A reader without access
  only sees the modal, and ads behind its overlay can be seen badly and cannot
  be clicked.
- It is decided from a property of the puzzle, so the cached HTML still holds
  nothing about the reader (D1).
- Not rendering the slots is better than hiding them afterwards: no ad is
  requested and then hidden, so no unseen impressions are generated.
- Accepted cost: a subscriber whose ad-free benefit is out of date sees no ads
  either, which is what they paid for.

### D9. Everything is behind the `puzzles-new-hub-v3` A/B test

The modal and everything that depends on it only have an effect for readers in
the `variant` group of `puzzles-new-hub-v3`, and only when `puzzles-new-hub-v1`
and `puzzles-new-hub-v2` are also on (the tiers are cumulative: v2 needs v1, v3
needs v1 and v2). Outside it, every puzzle behaves as a
free one, whatever `frontend` sends in `instance.requiresSubscription`: the
game loads at once, no access request is made and ads are rendered as usual.

Why:

- It lets the feature be rolled out, measured and rolled back without a deploy
  (set the test's `audienceSize` to `0 / 100`, or its `status` to `"OFF"`),
  like the v1 and v2 tiers.
- `frontend` can send the flag to every reader. The A/B decision is made in the
  layout, from `config.serverSideABTests`, so `frontend` does not need to know
  about the test.
- In local development every tier is on, like for v1 and v2, so the modal can be
  seen without opting in.

The test is defined in `ab-testing/config/abTests.ts` (type `server`, deployed
to Fastly) and read through `isPuzzlesHubV3Enabled`.

## 5. Target behaviour

The table below applies to readers in `puzzles-new-hub-v3` (D9).

| Puzzle             | Reader                      | Result                                                                                                                 |
| ------------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Free (last 7 days) | Anyone                      | Board immediately, no modal, no endpoint call                                                                          |
| Premium            | Signed out                  | Modal immediately, no board, no API call (no session means no subscription)                                            |
| Premium            | Signed in, `adFree` present | Board immediately, access check in the background. If "no access": unmount the board, show the modal                   |
| Premium            | Signed in, no `adFree`      | Neutral placeholder with the board's height (no modal, no game). Ask the API. Access: load the board. No access: modal |

API failure or timeout on the "signed in, `adFree` present" row: keep the board
(D5). On the "signed in, no `adFree`" row: show the modal (D5).

Notes:

- When access is denied, the modal sits over a placeholder, never over the
  real board.
- Re-evaluate when the auth state changes (for example after the reader signs
  in from the modal's link).

## 6. Plan

### Phase 1: contract and mock (no `frontend` changes) - done

1. Optional field `instance.requiresSubscription` added to
   `PuzzlePageInstance` (`src/types/puzzlePage.ts`) and to the validation
   (`src/model/validate.puzzlePage.ts`). Absent means free, so nothing is
   blocked until the backend sends it. The name is a working name, to agree
   with the backend.
2. The flag and the access endpoint were first mocked by the DCR dev server.
   The mocks were removed once `frontend` implemented the real thing (phase 4).

### Phase 2: control island - done

4. `src/components/PuzzleAccessGate.island.tsx` wraps `PuzzleIframe` and the
   modal and implements the table in section 5 and the failure rule in D5.
   The decision itself is the pure function `getPuzzleAccessView` in
   `src/lib/puzzleAccess.ts`.
5. The island is what `PuzzlePageLayout.tsx` now renders in the body area, so
   the access check runs in parallel with the wait `PuzzleIframe` already does
   for the reader's identity.
6. The modal is rendered by the gate, over an empty box with the game's
   height (never over the real board).
7. The gate re-evaluates when the auth state changes. A check result only
   counts for the auth state it was fetched for.

### Phase 3: tests - done

8. Unit tests for the decision function (every row, failure with and without
   evidence), the access client (granted, denied, non-2xx, invalid body,
   network error, timeout, missing puzzle id or date, and that the id and date
   go in the path and never in a query string) and the gate component. The
   contract field has validation tests.

### Phase 4: real contract in `frontend` - done

9. The premium flag is computed by `frontend` from the puzzle date
   (`PuzzlesAccessPolicy`, Europe/London, the last 7 days counting today are free) and
   sent as `instance.requiresSubscription` only when `true`.
10. `GET /puzzles-and-games/access/<id>/<YYYY-MM-DD>`
    (`PuzzlesAccessController`, path parameters because query parameters are
    stripped by the CDN, see R5) follows the progress endpoints' conventions:
    `NoCache` and CORS. It rejects a missing `Authorization` header (401) and a
    malformed id or date (400) without calling anything, then forwards the
    reader's `Authorization` header to the Puzzles API
    (`GET /v1/game/{puzzleId}/access/{date}`) and answers
    `{ "hasAccess": boolean }`. Any other outcome, including a 401, 403 or 404
    from the Puzzles API, a timeout or an invalid body, is a 503, never a
    "denied": this page treats any non-2xx answer as a failed check (D5).
11. The Puzzles API owns the rule and is the authority. It finds the puzzle from
    its id (the date only picks the catalogue month) and decides from the
    puzzle's own publish date, so a wrong date is a 404 and never a free
    puzzle. `frontend`'s flag (`PuzzlesAccessPolicy`) is only a hint that lets
    free puzzles and signed out readers resolve with no request at all. This
    repository sends the puzzle's date (`instance.puzzleDate`) with its id.

## 7. Implementation notes and local testing

- **Endpoint:** `GET <ajaxUrl>/puzzles-and-games/access/<id>/<YYYY-MM-DD>`
  with the reader's `Authorization` header, answering `{ "hasAccess": boolean }`.
  The id and the date are path parameters, each URL encoded, and never a query
  string (see R5).
  The path and shape are constants in `src/lib/puzzleAccess.ts`. The puzzle id
  is `instance.progressIdentity.puzzleId` and the date is
  `instance.puzzleDate`; if either is missing the check counts as failed and
  nothing is requested. Both are sent together because the Puzzles API finds
  the puzzle from its id and uses the date only to pick the catalogue month.
- **Timeout:** `PUZZLE_ACCESS_TIMEOUT_MS` is 3000 ms (an initial value, easy to
  tune). A timeout counts as a failed check (D5).
- **The hint is strict:** it is the presence of the `GU_AF1` cookie
  (`getAdFreeCookie()`), together with being signed in. It deliberately does
  not use `adFreeDataIsPresent`, which also returns `true` when a signed in
  reader's benefits data is merely out of date, and so is too generous to count
  as evidence.
- **Local testing:** the flag comes from `frontend`, so any puzzle outside
  the last 7 days (counting today) is premium with no setup. Signed out readers see the modal straight
  away. Signed in readers are checked against the access endpoint. Where the
  Puzzles API endpoint is not deployed (or `frontend` is not pointed at a stage
  that has it), the check fails with a 503 and they are judged by the ad-free
  hint alone (D5).

## 8. Dependencies and open items

- The Puzzles API access endpoint (`GET /v1/game/{puzzleId}/access/{date}`,
  answering `{ "isPremium": boolean, "hasAccess": boolean }`) that `frontend`
  forwards to, deployed to CODE and then PROD before `frontend` is.
- A route for `access/<puzzleId>/<date>` in the AJAX server block of
  `router.conf` (`guardian/platform`): add `access/[^/]+/[^/]+$` to the puzzle
  JSON APIs location. `dotcom:platform` and `dotcom:router` are not
  auto-deployed, so deploy the platform first and the router after it.
- Deploy order: Puzzles API (CODE, then PROD), then `platform` and `router`,
  then DCR, then `frontend`. DCR goes before `frontend` because the check
  needs the puzzle's date, which the old `frontend` ignores and the new one
  requires (without it, `frontend` answers 400, a failed check).
- Check in CODE that the token the browser sends is the access token Benefits
  API accepts, and measure the end to end latency of the access check
  (browser, `frontend`, Puzzles API, Benefits API), including cold starts.
- Check in CODE the cases that nothing here proves: a free puzzle, a premium
  puzzle with a subscriber, a premium puzzle without a subscription, a signed
  out reader, the Benefits API failing, two different signed in readers asking
  about the same puzzle, and a request without `Authorization`. The last two
  confirm that no response is shared between readers, which this change never
  relies on the CDN for.
- Confirm `requiresSubscription` as the final field name.
- Whether the ad-free benefit matches the entitlement closely enough in
  practice. To check by looking at the real `benefits` array for Supporter
  Plus and Digital Pack test accounts (URL in `config.page.userBenefitsApiUrl`).
- Destination and `returnUrl` behaviour of the modal's "sign in" link (see R3 in
  section 11).
- A request timeout value for the access check (D5 needs a "slow" threshold).

## 9. Out of scope

- Hard enforcement of access (see D3).
- Any new cookie, `localStorage` or tracking. None is planned. Adding any
  needs explicit approval first.
- Changes to shared Guardian libraries or to the Gateway and `frontend` copies
  of the user benefits cookie logic.
- Crosswords (see section 10).

## 10. Crosswords: not in this change

This change only covers the Puzzle Page (`PuzzlePageLayout`). Crosswords are
not gated yet. The investigation below is kept for the follow-up.

**How crosswords differ**

- They are articles rendered by `CrosswordLayout` (`ArticleDeprecated`), not by
  the Puzzle Page. The board is a `CrosswordElement` block, built by
  `buildCrosswordBlock` and drawn by the `CrosswordComponent` island, so a gate
  has to wrap that island instead of an iframe.
- The island gets the whole crossword in its props (grid, clues and, once
  published, the solutions). Hiding the board does not hide the content, so
  this is a weaker soft paywall than the Puzzle Page's, where only a game URL is
  in the HTML. D3 (soft paywall accepted) needs to be confirmed for crosswords.
- They have real comments (`showComments`) and ads inside the island, which
  would both have to be off for premium crosswords.
- `frontend` serves them with a shared 60s cache (`CacheTime.Crosswords`), through
  DCR or, when the `DCRCrosswords` switch is off, through a legacy Scala
  template that DCR does not control and that a gate would not cover.

**What it would take**

- DCR: generalise `PuzzleAccessGate` so the "board" is a parameter, add a gate
  for `CrosswordComponent`, carry the flag on the crossword element from
  `buildCrosswordBlock` (already DCR code, combined with
  `isPuzzlesHubV3Enabled`), and update `CrosswordLayout` (positioned container
  for the modal, no ads, no comments). The puzzle id for the access check is
  already defined by the progress adapter: `guardian-crossword-<type>-<number>`.
- `frontend`: compute `requiresSubscription` from `crossword.date` with
  `PuzzlesAccessPolicy` and send it as an optional field. The model is the
  shared article model, and DCR's article schema is not strict, so `frontend`
  can ship it first. DCR needs its type and generated schema updated.
- Without any A/B test nothing changes, as for the Puzzle Page: the flag is
  combined with the v3 check before it reaches the element, so the island
  renders exactly as today and no access request is made.

**Open questions**

- Does the 7 day rule apply to every crossword series? The progress adapter
  skips `everyman`, `special` and `speedy` (the Puzzles API has no type for
  them); they would be treated as free.
- The puzzle date is `crossword.date` (a UTC date, like the progress identity).
  Around midnight the 7 day boundary can be off by an hour.
- v2 plans to migrate crosswords to the Puzzle Page template. Since v3 needs v2,
  the existing gate would then cover them and gating `CrosswordLayout` would be
  transitional. Is there a date for that migration?

## 11. Review feedback (PR #17190 and the pull requests it was split into)

Tracking of the review comments on the DCR pull requests. Status: `open` (not
started), `decision needed` (blocked on a choice), `accepted` (no code change, with
the reason recorded), `done`. Update this table as
each one is dealt with, and reply on the pull request when it is.

| #   | From               | Where                                                  | Summary                                                                              | Verdict                   | Status   |
| --- | ------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------- | -------- |
| R1  | Daniel             | `PuzzlePageLayout.tsx` (`mainStyles`)                  | The overlay and modal can sit above the expanded navigation                          | Valid                     | done     |
| R2  | Daniel             | `PuzzleAccessGate.island.tsx`                          | Ad-free cookie can update after the auth check, locking subscribers out until reload | Valid, partly             | accepted |
| R3  | Gustavo            | `premiumPuzzlesUrls.ts` (`getPremiumPuzzlesSignInUrl`) | The "sign in" link has no return URL                                                 | Valid                     | done     |
| R4  | Gustavo            | `premiumPuzzlesModalLayout.ts` (`getModalMaxHeight`)   | The 320px minimum can exceed the room under the header on mobile                     | Valid for short viewports | done     |
| R5  | Reviewer on #17248 | `puzzleAccess.ts` (URL of the access check)            | The response might be cached, and query parameters are stripped by the CDN           | Valid                     | open     |

### R1. Stacking context for the modal

`position: relative` does not create a stacking context. The overlay and modal
use `z-index` (`lightbox`, `sign-in-gate`) that therefore compete in the root
stacking context, so they can cover the expanded navigation and intercept clicks
where the menu overlaps the content.

Proposed fix: add `isolation: isolate` to `mainStyles` so their stacking is
contained in `<main>`.

Verified and fixed. Reproduced with the real header and the real modal (the
expanded navigation is CSS only): before the change 67 of 68 menu links on
desktop, and 13 of 13 on mobile, were covered by elements inside `<main>`; after
adding `isolation: isolate` all of them are clickable, the overlay still covers
only the page content and the menu is drawn above the modal. The check was run
in headless Chrome against the page rendered by the DCR dev server, with the
modal mounted by hand because the dev asset server was not serving the client
bundles at the time.

### R2. Ad-free cookie refreshed after the gate has decided

Status: accepted, no code change.

Problem: `PuzzleAccessGate` reads the ad-free cookie (`GU_AF1`) only when the auth
state changes. The user benefits refresh can set the cookie later, so a
subscriber whose cookies are missing or expired (first visit on a device, or
after 30 days) can see the modal until they reload. This is visible wherever the
access check fails, because then the cookie is the only evidence of access (D5,
D6).

Why it is accepted: with the Puzzles API access endpoint in place, `frontend`
answers `hasAccess` and that answer is authoritative. A signed in reader without
the cookie sees the empty box (never the modal) until the answer arrives, and
`hasAccess: true` then shows the board without a reload. The cookie only matters
when the check fails.

Caveats:

- On a stage where the Puzzles API endpoint is not deployed yet, `frontend`
  answers 503 and the problem is real there.
- If the endpoint fails or takes more than 3 seconds, D5 applies: without the
  cookie the reader gets the modal, even a subscriber. This is deliberate, so a
  failure on our side never unlocks everything, and it only affects subscribers
  with missing cookies during an endpoint failure.

Findings from the investigation: `src/client/userFeatures/user-features.ts` has no
completion signal. `refresh()` is started once at page startup (`main.web.ts`),
nothing keeps its promise, no event is dispatched, and calls are not shared, so a
second caller would send a second request. The cookie is only refreshed when the
expiry cookie `gu_user_benefits_expiry` is missing or past. The module is shared
with the ads startup (`priority: 'critical'`) and its `persistResponse` is
mirrored in `frontend` and Gateway.

Options that were considered and not taken, in case the caveats start to matter:

- A. The gate calls `refresh()` itself when the reader is signed in, has no
  ad-free cookie and the benefits data needs refreshing, then re-reads the
  cookie. No change to shared code, one duplicate benefits request in that case.
- B. Make `refresh()` share one in-flight promise (and optionally dispatch an
  event). No duplicate request, but it changes a shared module (section 9).
- C. Poll the cookie in the gate. New, timer based behaviour.

### R3. Return URL on the "sign in" link

`getPremiumPuzzlesSignInUrl(idUrl)` sent an existing subscriber to Identity with
no way back, so they lost their route to the puzzle. This also closes the open
item in section 8.

Done: both the Subscribe link (Support renamed its parameter from `returnTo` to
`returnUrl` and now needs a full `https` URL on the Guardian domain, URL
encoded) and the sign in link take the current page URL as `returnUrl`. It is
built by `getCurrentPageUrl` from `window.location`, so the host matches the
environment. `getPathFromUrl` and the `returnFromSubscribeToPath` prop are gone,
which also removes a change from `PuzzlePageLayout.tsx`.

To verify in CODE (a rejected `returnUrl` is ignored silently): subscribe and
check the thank-you button reads "Return to Puzzles & games" and links back to
the puzzle, and sign in and check you land on the puzzle.

### R4. Minimum height of the mobile bottom sheet

Status: done. The "flow with the page" mode below is the answer to this
comment, and it is the agreed final behaviour.

Answer to the review: the comment is right for short screens. The 320px minimum
could leave the buttons below the fold (32px on a 320x480 phone, 185px on a
600x360 one). Tested on 9 screen sizes in headless Chrome. Removing the minimum
is not the fix, because the footer is about 200 to 219px high and would be
clipped. Instead, when the room under the header is smaller than the minimum
sheet, the modal stops being a sticky bottom sheet and flows with the page (see
Fix), so nothing is cut and the buttons are reachable by scrolling. Taller
screens are unchanged.

Problem: `getModalMaxHeight` returns `max(320, min(70% of the screen, room under
the header))`, so when the room under the header is under 320px the minimum
wins. A sticky element cannot leave its container, and the container starts
below the header, so the bottom of the sheet, with the buttons, started below the
fold until the reader scrolled.

Measured in headless Chrome with the real header and the real modal, on the
bottom sheet layout (width under 660px), before the change. Room is the space
between the end of the header and the bottom of the screen:

| Screen  | Room | Sheet height | Buttons visible on load |
| ------- | ---- | ------------ | ----------------------- |
| 375x812 | 592  | 568          | yes                     |
| 390x844 | 624  | 591          | yes                     |
| 360x640 | 448  | 448          | yes                     |
| 375x667 | 447  | 447          | yes                     |
| 320x568 | 376  | 376          | yes                     |
| 360x520 | 328  | 328          | yes                     |
| 320x480 | 288  | 320          | no, 32px below          |
| 600x360 | 135  | 320          | no, 185px below         |

Removing the minimum would not help: the footer (buttons and footnote) is about
200 to 219px high, so with a strict cap, as in the 600x360 case (room 135px), the
sheet would be shorter than its own footer and the buttons would be clipped.

Fix: a "flow with the page" mode for screens too short for the sheet.

- `shouldFlowWithPage` (`src/lib/premiumPuzzlesModalLayout.ts`) is true when the
  room under the header is smaller than the minimum sheet height (320px). It uses
  the real header position, so an extra banner at the top of the page is taken
  into account.
- The modal's effect, which already measures the room, sets the data attribute
  `data-flow-with-page` on the container, and re-evaluates it on resize and
  rotation.
- With the attribute, the CSS makes the sheet `position: static` with no maximum
  height, puts it at the top of the covered content, lets the body flow (no inner
  scroll) and drops the footer shadow. The reader scrolls the page to reach the
  buttons.
- Everything else is unchanged: on taller screens the sheet is still the sticky
  bottom sheet.

Verified in headless Chrome: the 6 taller sizes above are unchanged (sticky, buttons
visible on load); at 320x480, 600x360 and 568x320 the mode is on, the sheet is at
the top of the content with its natural height, and scrolling the page brings the
buttons into view and they are clickable. Rotating 360x640 to 640x360 and back
switches the mode on and off.

Caveats:

- On the shortest screens the buttons are not visible on load, but a page scroll
  away. That is the intended trade-off of this mode.
- The room depends on the header height, 192 to 225px on the test page. To check
  on a real mobile page in CODE.

### R5. Query parameters are stripped by the CDN, and the router

A reviewer asked whether the response of the access endpoint might be cached,
and pointed out that the puzzles archive calendar sends the puzzle id as a path
parameter because query parameters are stripped by the CDN in CODE and PROD
(`PuzzlesArchiveCalendar.island.tsx`, from the fix in #16835).

What was found:

- The first version sent `?puzzleId=<id>&date=<date>`. If the CDN strips them,
  `frontend` receives a request with no id and answers 400, which this page
  treats as a failed check (D5). It fails safely, but the feature would not
  work.
- The progress endpoint, which the first version was modelled on, takes no
  parameters, so it was never a precedent for query parameters on that host.
  The comment in the code saying the host "avoids the page CDN cache" was not
  proven either, and was removed.
- The AJAX server block of `router.conf` (`guardian/platform`) only forwards the
  routes it lists to `frontend` (`progress` and the archive data routes), so a
  new route needs an entry there.

Decision:

- Keep `GET`, and move the id and the date to the path:
  `<ajaxUrl>/puzzles-and-games/access/<id>/<date>`, each URL encoded. This
  matches the archive data routes and the Puzzles API route
  (`/v1/game/{puzzleId}/access/{date}`). Done in this repository and in
  `frontend`.
- Add `access/[^/]+/[^/]+$` to the puzzle JSON APIs location in `router.conf`
  (see section 8). Not done until that pull request is merged and deployed.
- Caching: the endpoint answers `no-store` and requires an `Authorization`
  header, and nothing in this change relies on the CDN for correctness. How the
  CDN treats this route was not checked, so it is on the CODE list in section 8
  (two different readers asking about the same puzzle, and a request without
  `Authorization`).
- Considered and not chosen: a `POST` with the id and the date in the body, sent
  to the page's own origin like `progress/save`. It cannot be cached, does not
  depend on query strings, and needs no router entry, because the general
  `/puzzles-and-games` rule already covers every method on that origin. `GET` was
  kept because it reads more naturally, and the reviewer accepted it with the
  router entry. The change would be small if the CODE checks showed a problem
  with caching.

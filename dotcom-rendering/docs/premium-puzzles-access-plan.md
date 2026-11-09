# Premium puzzles access: plan and decisions

Status: phases 0 to 4 are implemented. `frontend` computes the premium flag and
serves the access endpoint (on the same branch name as this work), which for now
always answers 503 because the Puzzles API has no access endpoint yet.

This document records the plan for gating premium puzzles on the Puzzle Page,
every decision taken along the way, and the reasoning behind each one.

## 1. Goal

- Puzzles from today back to 7 days ago are free for everyone.
- Older puzzles ("premium puzzles") need a Supporter Plus or Digital Pack
  (All-access digital) subscription.
- Readers without access must not get the game board. They see a modal asking
  them to subscribe.
- Readers with a subscription must get the fastest possible experience.
- We must not penalise a paying reader for a failure on our side.

## 2. What is already done (phase 0)

- `src/components/UnlockPremiumPuzzlesModal.tsx`: the modal, extracted from
  `PuzzlePageLayout.tsx` so it can be reused on other pages.
    - Props: `returnFromSubscribeToPath`, `returnToArchivePath` (both paths
      only), `idUrl`, and optional `title`, `subtitle`, `benefits`,
      `cssOverrides`.
    - Absolutely positioned: the parent must have `position: relative`.
    - On small screens it is a bottom sheet: it sticks to the bottom of the
      screen (`position: sticky`) while the covered content is in view, and
      stops at the end of it so the page footer shows below. The logo, hero,
      title and benefits scroll inside it, the buttons stay in view. Its
      height is capped to the room left under the page header
      (`getModalMaxHeight`), so the buttons are on screen when the page loads.
    - The hero image is a decorative PNG (`alt=""`) served by the image CDN
      (`i.guim.co.uk`) shown 556 px wide with the design's 185/69 aspect ratio.
    - The "sign in" link goes to `<idUrl>/signin` with no `returnUrl`, because it
      is unknown whether the profile site accepts a bare path.
- `src/lib/premiumPuzzlesUrls.ts` (with tests): builds the Subscribe URL
  `<support>/?source=puzzles&returnTo=<path>`.
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
   via `config.page.ajaxUrl`, which avoids the page CDN cache. Puzzle progress
   (`puzzlesProgress()`) works this way.
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

## 5. Target behaviour

| Puzzle               | Reader                      | Result                                                                                                                 |
| -------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Free (within 7 days) | Anyone                      | Board immediately, no modal, no endpoint call                                                                          |
| Premium              | Signed out                  | Modal immediately, no board, no API call (no session means no subscription)                                            |
| Premium              | Signed in, `adFree` present | Board immediately, access check in the background. If "no access": unmount the board, show the modal                   |
| Premium              | Signed in, no `adFree`      | Neutral placeholder with the board's height (no modal, no game). Ask the API. Access: load the board. No access: modal |

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
   network error, timeout, missing puzzle id) and the gate component. The
   contract field has validation tests.

### Phase 4: real contract in `frontend` - done

9. The premium flag is computed by `frontend` from the puzzle date
   (`PuzzlesAccessPolicy`, Europe/London, today back to 7 days ago is free) and
   sent as `instance.requiresSubscription` only when `true`.
10. `GET /puzzles-and-games/access?puzzleId=<id>` (`PuzzlesAccessController`)
    exists with the progress endpoints' conventions: `NoCache` and CORS. For now
    it always answers 503 and does not call the Puzzles API, because that API
    has no access endpoint yet. This page treats any non-2xx answer as a failed
    check (D5).
11. When the Puzzles API endpoint exists (proposed contract:
    `GET /access?puzzleId=` answering `{ "hasAccess": boolean }`), `frontend`
    forwards the reader's `Authorization` header to it and answers
    `{ "hasAccess": boolean }`. Nothing changes in this repository.

## 7. Implementation notes and local testing

- **Endpoint (proposed contract):** `GET <ajaxUrl>/puzzles-and-games/access?puzzleId=<id>`
  with the reader's `Authorization` header, answering `{ "hasAccess": boolean }`.
  The path and shape are constants in `src/lib/puzzleAccess.ts` and still have
  to be agreed with the backend. The puzzle id is
  `instance.progressIdentity.puzzleId`; if it is missing the check counts as
  failed.
- **Timeout:** `PUZZLE_ACCESS_TIMEOUT_MS` is 3000 ms (an initial value, easy to
  tune). A timeout counts as a failed check (D5).
- **The hint is strict:** it is the presence of the `GU_AF1` cookie
  (`getAdFreeCookie()`), together with being signed in. It deliberately does
  not use `adFreeDataIsPresent`, which also returns `true` when a signed in
  reader's benefits data is merely out of date, and so is too generous to count
  as evidence.
- **Local testing:** the flag comes from `frontend`, so any puzzle older than
  7 days is premium with no setup. Signed out readers see the modal straight
  away. Signed in readers get 503 from the access endpoint for now, so they are
  judged by the ad-free hint alone (D5).

## 8. Dependencies and open items

- The Puzzles API access endpoint (`GET /access?puzzleId=`, answering
  `{ "hasAccess": boolean }`) that `frontend` forwards to.
- Confirm `requiresSubscription` as the final field name.
- Whether the ad-free benefit matches the entitlement closely enough in
  practice. To check by looking at the real `benefits` array for Supporter
  Plus and Digital Pack test accounts (URL in `config.page.userBenefitsApiUrl`).
- Destination and `returnUrl` behaviour of the modal's "sign in" link.
- A request timeout value for the access check (D5 needs a "slow" threshold).

## 9. Out of scope

- Hard enforcement of access (see D3).
- Any new cookie, `localStorage` or tracking. None is planned. Adding any
  needs explicit approval first.
- Changes to shared Guardian libraries or to the Gateway and `frontend` copies
  of the user benefits cookie logic.

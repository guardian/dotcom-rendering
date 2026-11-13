# Article HTML snapshots

This opt-in integration suite POSTs the six articles shared with
`src/model/validate.test.ts` to an already-running renderer and snapshots its
HTML response and response headers. It does not start a server or execute the returned scripts.
Hosted-content fixtures are not included.

To test a renderer behind an internal load balancer, first set up an SSH tunnel
through a host that can reach that load balancer. Forward a local port to the
load balancer's HTTPS port, then point `ARTICLE_TEST_URL` at the tunnel on
`localhost`, including the renderer endpoint path. For example, with local port
443 forwarded:

```sh
export ARTICLE_TEST_URL='https://localhost/Interactive'
```

Certificate validation is expressly disabled for this suite to support testing
through these tunnels: the load balancer's certificate will not match
`localhost`. Use only tunnels and endpoints you trust.

Run from `dotcom-rendering/`:

```sh
ARTICLE_TEST_URL='http://localhost:9000/Article' npm run test:article-html
```

The URL is the full POST endpoint; no path is appended. Optional headers are a
JSON object of strings:

```sh
ARTICLE_TEST_URL='https://your-renderer.example/Article' \
ARTICLE_TEST_HEADERS='{"X-Gu-Target-Group":"ecs"}' \
npm run test:article-html
```

The request content type is always `application/json`. Keep credentials out of
committed files. Requests run sequentially with a 15-second timeout, require
HTTP 200 and `Content-Type: text/html`, and reject redirects.

HTTPS requests deliberately ignore certificate verification errors, including
self-signed, expired, and hostname-mismatched certificates. This applies only to
this suite's request agent, not global TLS settings. Use trusted test endpoints:
the server's identity is not verified.

## Creating and updating baselines

Create the initial baseline against your chosen reference deployment:

```sh
ARTICLE_TEST_URL='http://localhost:9000/Article' \
npm run test:article-html -- --updateSnapshot
```

Jest writes separate HTML and response-header snapshots for each article into
`__snapshots__/article-html.integration.ts.snap` beside the suite. Review and
commit this file. Use the same explicit update command for intentional changes.
Ordinary runs fail for missing or changed snapshots, including outside CI.

The `*.integration.ts` filename is deliberately outside the usual Jest
`*.test.*` pattern. Neither `npm test` nor `test:ci` runs this HTTP suite.
Only the dedicated configuration selects it.

## Ignoring volatile fields

Response headers are compared with lowercase, sorted names, preserving repeated
values and their order. `ignoredResponseHeaders` in `ignore-rules.ts` masks
`date` (the response clock) and `etag` (a hash of HTML containing runtime clocks).
Masked headers remain in the snapshot, so their removal is still detected.
`x-gu-backend-app-target-group` is excluded entirely from snapshots. When the
request includes `X-Gu-Target-Group`, the response must contain
`x-gu-backend-app-target-group` with exactly that value; a missing or mismatched
value fails the test. Without the request header, no target-group assertion is
made. Header names are case-insensitive; values are compared exactly.
All other response headers are compared.
Add header names to this list only when their values are intentionally variable.
Review snapshots before committing, particularly if an endpoint returns cookies
or other sensitive headers.

`ignore-rules.ts` masks the hash in the `DCR commit hash ...` HTML comment,
retaining the comment and checking that it is present. Other comments and hashes
in page content or scripts remain compared.
It also masks runtime clock values in island JSON `props`:
`serverTime` on `OnwardsUpper` and `KeyEventsCarousel`, and `now` on `RelativeTime`.
Article publication dates and all other properties remain compared.
The liveblog-only selectors explicitly allow no matches on other article types.
Without rules the response is compared verbatim, including significant whitespace,
CSS, and scripts. Additional narrowly targeted rules can be added, for example:

```ts
export const ignoreRules: readonly IgnoreRule[] = [
	{ kind: 'text', selector: '#rendered-at' },
	{
		kind: 'attribute',
		selector: 'meta[name="rendered-at"]',
		attribute: 'content',
	},
	{
		kind: 'json',
		selector: 'script#page-data',
		paths: [
			['config', 'renderedAt'],
			['events', '0', 'timestamp'],
		],
	},
];
```

These replace values with `[IGNORED]`, retaining the element, attribute, or JSON
property. JSON rules apply to valid JSON text, not JavaScript assignments.
Set `attribute: 'props'` on a JSON rule to read and mask JSON stored in an HTML
attribute rather than element text.
Text rules require leaf elements so that they cannot hide child markup.
Selectors must match in every article unless a JSON rule explicitly sets
`allowNoMatches: true`; missing attributes, JSON paths, invalid
selectors, and invalid JSON fail rather than silently skipping a rule.
Array indexes in JSON paths are strings.

With rules enabled, JSDOM parses and serializes the HTML without running scripts
or loading resources. This canonicalizes HTML syntax, but does not pretty-print,
collapse text whitespace, or broadly remove dates. Embedded JSON selected by a
rule is reserialized. Review updated snapshots whenever the ignore list changes.

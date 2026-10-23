import type { IgnoreRule } from './support';

export const ignoredResponseHeaders: readonly string[] = ['date', 'etag'];

export const ignoreRules: readonly IgnoreRule[] = [
	{
		kind: 'comment',
		pattern: /(?<=^\s*DCR commit hash )[a-f0-9]{40}(?=\s*$)/,
	},
	{
		kind: 'json',
		selector: 'gu-island[name="OnwardsUpper"]',
		attribute: 'props',
		paths: [['serverTime']],
	},
	{
		kind: 'json',
		selector: 'gu-island[name="KeyEventsCarousel"]',
		attribute: 'props',
		paths: [['serverTime']],
		allowNoMatches: true,
	},
	{
		kind: 'json',
		selector: 'gu-island[name="RelativeTime"]',
		attribute: 'props',
		paths: [['now']],
		allowNoMatches: true,
	},
];

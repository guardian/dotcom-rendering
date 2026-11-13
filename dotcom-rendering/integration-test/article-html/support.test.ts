/**
 * @jest-environment node
 */

import { Agent } from 'node:https';
import type * as NodeFetch from 'node-fetch';
import fetch, { Response } from 'node-fetch';
import { Standard } from '../../fixtures/generated/fe-articles/Standard';
import { ignoreRules } from './ignore-rules';
import {
	normalizeHeaders,
	normalizeHtml,
	postArticle,
	readRequestConfig,
} from './support';

jest.mock('node-fetch', () => ({
	...jest.requireActual<typeof NodeFetch>('node-fetch'),
	__esModule: true,
	default: jest.fn(),
}));

describe('article HTML request configuration', () => {
	it('requires an explicit HTTP(S) URL', () => {
		expect(() => readRequestConfig({})).toThrow('ARTICLE_TEST_URL');
		expect(() =>
			readRequestConfig({ ARTICLE_TEST_URL: 'file:///tmp/article.html' }),
		).toThrow('HTTP or HTTPS');
		expect(() =>
			readRequestConfig({ ARTICLE_TEST_URL: 'not a URL' }),
		).toThrow();
	});

	it.each(['null', '[]', '"headers"', '{"Authorization":123}'])(
		'rejects non-string header objects: %s',
		(headers) => {
			expect(() =>
				readRequestConfig({
					ARTICLE_TEST_URL: 'http://localhost:9000/Article',
					ARTICLE_TEST_HEADERS: headers,
				}),
			).toThrow('ARTICLE_TEST_HEADERS');
		},
	);

	it('rejects malformed header JSON', () => {
		expect(() =>
			readRequestConfig({
				ARTICLE_TEST_URL: 'http://localhost:9000/Article',
				ARTICLE_TEST_HEADERS: '{',
			}),
		).toThrow(SyntaxError);
	});

	it('accepts routing headers while enforcing JSON content type', () => {
		const config = readRequestConfig({
			ARTICLE_TEST_URL: 'https://example.com/Article?edition=UK',
			ARTICLE_TEST_HEADERS:
				'{"X-Gu-Target-Group":"ecs","content-type":"text/plain"}',
		});
		expect(config.url.href).toBe('https://example.com/Article?edition=UK');
		expect(config.headers.get('X-Gu-Target-Group')).toBe('ecs');
		expect(config.headers.get('Content-Type')).toBe('application/json');
	});
});

describe('posting articles', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		jest.mocked(fetch).mockReset();
	});

	const config = readRequestConfig({
		ARTICLE_TEST_URL: 'http://localhost:9000/Article',
		ARTICLE_TEST_HEADERS: '{"X-Gu-Target-Group":"ecs"}',
	});

	it('posts the complete article and returns the HTML unchanged', async () => {
		const html = '<!doctype html><p>Article</p>';
		const fetchMock = jest.mocked(fetch).mockResolvedValue(
			new Response(html, {
				headers: {
					'content-type': 'text/html; charset=utf-8',
					'x-gu-backend-app-target-group': 'ecs',
				},
			}),
		);
		await expect(postArticle(Standard, config)).resolves.toEqual({
			html,
			headers: {
				'content-type': ['text/html; charset=utf-8'],
				'x-gu-backend-app-target-group': ['ecs'],
			},
		});
		expect(fetchMock).toHaveBeenCalledWith(config.url, {
			method: 'POST',
			headers: Object.fromEntries(config.headers),
			body: JSON.stringify(Standard),
			redirect: 'error',
			signal: expect.any(AbortSignal),
			agent: undefined,
		});
	});

	it.each([undefined, 'ec2', 'ecs, ec2'])(
		'rejects a missing or mismatched response target group: %s',
		async (targetGroup) => {
			jest.mocked(fetch).mockResolvedValue(
				new Response('<p>Article</p>', {
					headers: {
						'content-type': 'text/html',
						...(targetGroup === undefined
							? {}
							: { 'X-Gu-Backend-App-Target-Group': targetGroup }),
					},
				}),
			);
			await expect(postArticle(Standard, config)).rejects.toThrow(
				'Expected x-gu-backend-app-target-group to match X-Gu-Target-Group "ecs"',
			);
		},
	);

	it('matches target group header names case-insensitively', async () => {
		jest.mocked(fetch).mockResolvedValue(
			new Response('<p>Article</p>', {
				headers: {
					'Content-Type': 'text/html',
					'X-Gu-Backend-App-Target-Group': 'ec2',
				},
			}),
		);
		await expect(
			postArticle(
				Standard,
				readRequestConfig({
					ARTICLE_TEST_URL: 'http://localhost/Article',
					ARTICLE_TEST_HEADERS: '{"x-gu-target-group":"ec2"}',
				}),
			),
		).resolves.toHaveProperty('html', '<p>Article</p>');
	});

	it('disables certificate verification only on its HTTPS agent and cleans it up', async () => {
		const fetchMock = jest.mocked(fetch).mockResolvedValue(
			new Response('<p>Article</p>', {
				headers: { 'content-type': 'text/html' },
			}),
		);
		const destroy = jest.spyOn(Agent.prototype, 'destroy');
		await postArticle(
			Standard,
			readRequestConfig({
				ARTICLE_TEST_URL: 'https://localhost/Article',
			}),
		);
		expect(fetchMock.mock.calls[0]?.[1]?.agent).toEqual(
			expect.objectContaining({
				options: expect.objectContaining({ rejectUnauthorized: false }),
			}),
		);
		expect(destroy).toHaveBeenCalledTimes(1);
	});

	it('rejects HTTP errors with a bounded response excerpt', async () => {
		jest.mocked(fetch).mockResolvedValue(
			new Response('Renderer failed', { status: 500 }),
		);
		await expect(postArticle(Standard, config)).rejects.toThrow(
			'Expected HTTP 200, received 500: Renderer failed',
		);
	});

	it('rejects non-HTML responses', async () => {
		jest.mocked(fetch).mockResolvedValue(
			new Response('{}', {
				headers: { 'content-type': 'application/json' },
			}),
		);
		await expect(postArticle(Standard, config)).rejects.toThrow(
			'Content-Type text/html',
		);
	});

	it('rejects empty HTML', async () => {
		jest.mocked(fetch).mockResolvedValue(
			new Response('  ', { headers: { 'content-type': 'text/html' } }),
		);
		await expect(postArticle(Standard, config)).rejects.toThrow(
			'empty HTML',
		);
	});

	it('propagates network and timeout failures', async () => {
		const error = new Error('Request timed out');
		jest.mocked(fetch).mockRejectedValue(error);
		await expect(postArticle(Standard, config)).rejects.toBe(error);
	});
});

describe('normalizing response headers', () => {
	it('canonicalizes header names and order without changing values or duplicates', () => {
		expect(
			normalizeHeaders(
				{
					'X-Gu-Backend-App': ['interactive-rendering'],
					'Set-Cookie': ['first=1', 'second=2'],
					'Content-Type': ['text/html'],
				},
				[],
			),
		).toEqual({
			'content-type': ['text/html'],
			'set-cookie': ['first=1', 'second=2'],
			'x-gu-backend-app': ['interactive-rendering'],
		});
		expect(
			Object.keys(normalizeHeaders({ Zebra: ['z'], Alpha: ['a'] }, [])),
		).toEqual(['alpha', 'zebra']);
	});

	it('masks only explicitly ignored values, retaining header presence', () => {
		const headers = {
			date: ['Tue, 20 Oct 2026 10:23:18 GMT'],
			etag: ['W/"first"'],
			'x-gu-backend-app': ['interactive-rendering'],
		};
		const normalized = normalizeHeaders(headers, ['Date', 'ETag']);
		expect(normalized).toEqual({
			date: ['[IGNORED]'],
			etag: ['[IGNORED]'],
			'x-gu-backend-app': ['interactive-rendering'],
		});
		expect(
			normalizeHeaders(
				{
					...headers,
					date: ['later'],
					etag: ['W/"second"'],
				},
				['date', 'etag'],
			),
		).toEqual(normalized);
		expect(
			normalizeHeaders(
				{
					...headers,
					'x-gu-backend-app': ['article-rendering'],
				},
				['date', 'etag'],
			),
		).not.toEqual(normalized);
		expect(
			normalizeHeaders(
				{
					etag: headers.etag,
					'x-gu-backend-app': ['interactive-rendering'],
				},
				['date', 'etag'],
			),
		).not.toEqual(normalized);
		expect(headers.etag).toEqual(['W/"first"']);
	});

	it('excludes the target group header entirely regardless of case or value', () => {
		const otherHeaders = { 'content-type': ['text/html'] };
		for (const name of [
			'x-gu-backend-app-target-group',
			'X-Gu-Backend-App-Target-Group',
		]) {
			expect(
				normalizeHeaders({ ...otherHeaders, [name]: ['ecs'] }, []),
			).toEqual(normalizeHeaders(otherHeaders, []));
		}
	});
});

describe('normalizing article HTML', () => {
	const html =
		'<!DOCTYPE html><html><head></head><body>' +
		'<time id="generated" datetime="2026-10-20">Today</time>' +
		'<p>Published 2024-01-01  <strong>unchanged</strong></p>' +
		'<script id="data" type="application/json">' +
		'{"config":{"timestamp":123,"title":"Article"},"events":[{"at":456}]}' +
		'</script></body></html>';

	it('preserves the exact response with no ignore rules', () => {
		expect(normalizeHtml(html, [])).toBe(html);
	});

	it('masks only the DCR hash inside comments, preserving other comments and content', () => {
		const rule = ignoreRules.filter((item) => item.kind === 'comment');
		const makeHtml = (hash: string) =>
			`<!-- DCR commit hash ${hash} --><!-- Keep this comment -->` +
			`<p>DCR commit hash ${'a'.repeat(40)}</p>` +
			`<script>const hash = "${'a'.repeat(40)}";</script>`;
		const normalized = normalizeHtml(makeHtml('a'.repeat(40)), rule);
		expect(normalized).toBe(normalizeHtml(makeHtml('b'.repeat(40)), rule));
		expect(normalized).toContain('<!-- DCR commit hash [IGNORED] -->');
		expect(normalized).toContain('<!-- Keep this comment -->');
		expect(normalized).toContain(
			`<p>DCR commit hash ${'a'.repeat(40)}</p>`,
		);
		expect(normalized).toContain(`const hash = "${'a'.repeat(40)}";`);
		expect(() => normalizeHtml('<p>No hash comment</p>', rule)).toThrow(
			'matched no comments',
		);
	});

	it('ignores runtime island clocks while preserving article dates and other props', () => {
		const makeHtml = (clock: number) =>
			`<!-- DCR commit hash ${'a'.repeat(40)} -->` +
			`<gu-island name="OnwardsUpper" props='{"serverTime":${clock},"title":"Article"}'></gu-island>` +
			`<gu-island name="KeyEventsCarousel" props='{"serverTime":${clock},"events":[{"timestamp":123}]}'></gu-island>` +
			`<gu-island name="RelativeTime" props='{"now":${clock},"then":456,"editionId":"UK"}'><time datetime="2021-02-19">19 Feb 2021</time></gu-island>`;
		const normalized = normalizeHtml(makeHtml(1000), ignoreRules);
		expect(normalized).toBe(normalizeHtml(makeHtml(61000), ignoreRules));
		expect(normalized).toContain(
			'&quot;serverTime&quot;:&quot;[IGNORED]&quot;',
		);
		expect(normalized).toContain('&quot;now&quot;:&quot;[IGNORED]&quot;');
		expect(normalized).toContain('&quot;then&quot;:456');
		expect(normalized).toContain('&quot;timestamp&quot;:123');
		expect(normalized).toContain(
			'<time datetime="2021-02-19">19 Feb 2021</time>',
		);
		expect(
			normalizeHtml(
				makeHtml(1000).replace('Article', 'Changed'),
				ignoreRules,
			),
		).not.toBe(normalized);
		expect(
			normalizeHtml(
				makeHtml(1000).replace('"then":456', '"then":789'),
				ignoreRules,
			),
		).not.toBe(normalized);
	});

	it('allows liveblog-only islands to be absent without making all selectors optional', () => {
		const standard = `<!-- DCR commit hash ${'a'.repeat(40)} --><gu-island name="OnwardsUpper" props='{"serverTime":1000}'></gu-island>`;
		expect(() => normalizeHtml(standard, ignoreRules)).not.toThrow();
		expect(() => normalizeHtml('<p>No islands</p>', ignoreRules)).toThrow(
			'matched no comments',
		);
	});

	it('rejects missing or invalid JSON attributes and missing clock properties', () => {
		for (const attributes of [
			'',
			'props="invalid"',
			`props='{"other":123}'`,
		]) {
			expect(() =>
				normalizeHtml(
					`<gu-island name="OnwardsUpper" ${attributes}></gu-island>`,
					ignoreRules,
				),
			).toThrow();
		}
	});

	it('masks only configured text, attributes, and nested JSON fields', () => {
		expect(
			normalizeHtml(html, [
				{ kind: 'text', selector: '#generated' },
				{
					kind: 'attribute',
					selector: '#generated',
					attribute: 'datetime',
				},
				{
					kind: 'json',
					selector: '#data',
					paths: [
						['config', 'timestamp'],
						['events', '0', 'at'],
					],
				},
			]),
		).toBe(
			html
				.replace(
					'datetime="2026-10-20">Today',
					'datetime="[IGNORED]">[IGNORED]',
				)
				.replace('"timestamp":123', '"timestamp":"[IGNORED]"')
				.replace('"at":456', '"at":"[IGNORED]"'),
		);
	});

	it('masks every matching element', () => {
		expect(
			normalizeHtml('<p>One</p><p>Two</p>', [
				{ kind: 'text', selector: 'p' },
			]),
		).toContain('<p>[IGNORED]</p><p>[IGNORED]</p>');
	});

	it('fails for unmatched or invalid selectors', () => {
		expect(() =>
			normalizeHtml(html, [{ kind: 'text', selector: '#missing' }]),
		).toThrow('matched no elements');
		expect(() =>
			normalizeHtml(html, [{ kind: 'text', selector: '[' }]),
		).toThrow();
	});

	it('does not silently hide child markup', () => {
		expect(() =>
			normalizeHtml(html, [{ kind: 'text', selector: 'p' }]),
		).toThrow('leaf elements');
	});

	it('fails for missing attributes', () => {
		expect(() =>
			normalizeHtml(html, [
				{
					kind: 'attribute',
					selector: '#generated',
					attribute: 'missing',
				},
			]),
		).toThrow('Missing attribute');
	});

	it.each([
		{ paths: [['config', 'missing']] },
		{ paths: [['config', 'timestamp', 'missing']] },
		{ paths: [['toString']] },
		{ paths: [[]] },
		{ paths: [] },
	])('rejects missing or empty JSON paths: $paths', ({ paths }) => {
		expect(() =>
			normalizeHtml(html, [{ kind: 'json', selector: '#data', paths }]),
		).toThrow();
	});

	it('fails for invalid embedded JSON', () => {
		expect(() =>
			normalizeHtml('<script id="data">window.config = {};</script>', [
				{ kind: 'json', selector: '#data', paths: [['timestamp']] },
			]),
		).toThrow(SyntaxError);
	});

	it('does not execute scripts or allow JSON to introduce closing script tags', () => {
		const output = normalizeHtml(
			'<script>throw new Error("Must not execute")</script>' +
				'<script id="data">{"timestamp":1,"text":"\\u003c/script>"}</script>',
			[{ kind: 'json', selector: '#data', paths: [['timestamp']] }],
		);
		expect(output).toContain('"text":"\\u003c/script>"');
	});
});

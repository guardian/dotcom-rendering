import { Agent } from 'node:https';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import type { FEArticle } from '../../src/frontend/feArticle';

export type IgnoreRule =
	| { kind: 'comment'; pattern: RegExp }
	| { selector: string; kind: 'text' }
	| { selector: string; kind: 'attribute'; attribute: string }
	| {
			selector: string;
			kind: 'json';
			paths: readonly (readonly string[])[];
			attribute?: string;
			allowNoMatches?: boolean;
	  };

const placeholder = '[IGNORED]';
const requestTimeoutMs = 15000;
const targetGroupResponseHeader = 'x-gu-backend-app-target-group';

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null;

type RequestConfig = {
	url: URL;
	headers: Headers;
};

type ArticleResponse = {
	html: string;
	headers: Record<string, string[]>;
};

export const normalizeHeaders = (
	headers: Record<string, string[]>,
	ignoredHeaders: readonly string[],
): Record<string, string[]> => {
	const ignored = new Set(ignoredHeaders.map((name) => name.toLowerCase()));
	const normalized: Record<string, string[]> = {};
	for (const [name, values] of Object.entries(headers)) {
		const key = name.toLowerCase();
		if (key === targetGroupResponseHeader) continue;
		normalized[key] = ignored.has(key) ? [placeholder] : [...values];
	}
	return Object.fromEntries(
		Object.entries(normalized).sort(([a], [b]) => a.localeCompare(b)),
	);
};

export const readRequestConfig = (env: NodeJS.ProcessEnv): RequestConfig => {
	if (!env.ARTICLE_TEST_URL) {
		throw new Error(
			'ARTICLE_TEST_URL must contain the full HTTP(S) POST URL',
		);
	}
	const url = new URL(env.ARTICLE_TEST_URL);
	if (url.protocol !== 'http:' && url.protocol !== 'https:') {
		throw new Error('ARTICLE_TEST_URL must use HTTP or HTTPS');
	}
	const headers = new Headers({ Accept: 'text/html' });
	if (env.ARTICLE_TEST_HEADERS !== undefined) {
		const values: unknown = JSON.parse(env.ARTICLE_TEST_HEADERS);
		if (!isRecord(values) || Array.isArray(values)) {
			throw new Error(
				'ARTICLE_TEST_HEADERS must be a JSON object of strings',
			);
		}
		for (const [key, value] of Object.entries(values)) {
			if (typeof value !== 'string') {
				throw new Error(
					`ARTICLE_TEST_HEADERS value for "${key}" must be a string`,
				);
			}
			headers.set(key, value);
		}
	}
	headers.set('Content-Type', 'application/json');
	return { url, headers };
};

export const postArticle = async (
	article: FEArticle,
	config: RequestConfig,
): Promise<ArticleResponse> => {
	const agent =
		config.url.protocol === 'https:'
			? new Agent({ rejectUnauthorized: false })
			: undefined;
	try {
		const response = await fetch(config.url, {
			method: 'POST',
			headers: Object.fromEntries(config.headers),
			body: JSON.stringify(article),
			redirect: 'error',
			signal: AbortSignal.timeout(requestTimeoutMs),
			agent,
		});
		const html = await response.text();
		if (response.status !== 200) {
			throw new Error(
				`Expected HTTP 200, received ${response.status}: ${html.slice(0, 500)}`,
			);
		}
		if (
			!/^text\/html(?:;|$)/i.test(
				response.headers.get('content-type') ?? '',
			)
		) {
			throw new Error(
				'Expected an HTML response with Content-Type text/html',
			);
		}
		if (!html.trim()) {
			throw new Error('Received an empty HTML response');
		}
		const requestedTargetGroup = config.headers.get('X-Gu-Target-Group');
		if (requestedTargetGroup !== null) {
			const actualTargetGroup = response.headers.get(
				targetGroupResponseHeader,
			);
			if (actualTargetGroup !== requestedTargetGroup) {
				throw new Error(
					`Expected ${targetGroupResponseHeader} to match X-Gu-Target-Group "${requestedTargetGroup}", received ${JSON.stringify(actualTargetGroup)}`,
				);
			}
		}
		return { html, headers: response.headers.raw() };
	} finally {
		agent?.destroy();
	}
};

const maskJsonPath = (json: unknown, path: readonly string[]): void => {
	if (path.length === 0) {
		throw new Error('JSON ignore paths must not be empty');
	}
	let parent = json;
	for (const [index, key] of path.entries()) {
		if (!isRecord(parent) || !Object.hasOwn(parent, key)) {
			throw new Error(`JSON ignore path not found: ${path.join('.')}`);
		}
		if (index === path.length - 1) {
			parent[key] = placeholder;
		} else {
			parent = parent[key];
		}
	}
};

export const normalizeHtml = (
	html: string,
	rules: readonly IgnoreRule[],
): string => {
	if (rules.length === 0) return html;
	// Default JSDOM options neither execute scripts nor load external resources.
	const dom = new JSDOM(html);
	try {
		for (const rule of rules) {
			if (rule.kind === 'comment') {
				const comments = dom.window.document.createTreeWalker(
					dom.window.document,
					dom.window.NodeFilter.SHOW_COMMENT,
				);
				let matched = false;
				let comment = comments.nextNode();
				while (comment) {
					comment.nodeValue = (comment.nodeValue ?? '').replace(
						rule.pattern,
						() => {
							matched = true;
							return placeholder;
						},
					);
					comment = comments.nextNode();
				}
				if (!matched) {
					throw new Error(
						`HTML comment ignore pattern matched no comments: ${rule.pattern}`,
					);
				}
				continue;
			}
			const elements = dom.window.document.querySelectorAll(
				rule.selector,
			);
			if (
				elements.length === 0 &&
				!(rule.kind === 'json' && rule.allowNoMatches)
			) {
				throw new Error(
					`HTML ignore selector matched no elements: ${rule.selector}`,
				);
			}
			for (const element of elements) {
				switch (rule.kind) {
					case 'text':
						if (element.childElementCount > 0) {
							throw new Error(
								`Text ignore rules must target leaf elements: ${rule.selector}`,
							);
						}
						element.textContent = placeholder;
						break;
					case 'attribute':
						if (!element.hasAttribute(rule.attribute)) {
							throw new Error(
								`Missing attribute "${rule.attribute}" on ${rule.selector}`,
							);
						}
						element.setAttribute(rule.attribute, placeholder);
						break;
					case 'json': {
						if (rule.paths.length === 0) {
							throw new Error(
								'JSON ignore rules must specify at least one path',
							);
						}
						const source = rule.attribute
							? element.getAttribute(rule.attribute)
							: element.textContent;
						if (source === null) {
							throw new Error(
								`Missing JSON attribute "${rule.attribute}" on ${rule.selector}`,
							);
						}
						const json: unknown = JSON.parse(source);
						for (const path of rule.paths) maskJsonPath(json, path);
						if (rule.attribute) {
							element.setAttribute(
								rule.attribute,
								JSON.stringify(json),
							);
						} else {
							element.textContent = JSON.stringify(json).replace(
								/</g,
								'\\u003c',
							);
						}
						break;
					}
				}
			}
		}
		return dom.serialize();
	} finally {
		dom.window.close();
	}
};

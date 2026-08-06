import { JSDOM } from 'jsdom';
import { isSkimlink } from '../lib/affiliateLinksUtils';
import { isGuardianLink } from '../lib/isGuardianLink';
import type { FEElement } from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';

/** Only ever used to mint `<template>` elements, so can be shared across calls */
const { document } = new JSDOM('').window;

const mergeRel = (existing: string | null, additions: string[]): string => {
	const tokens = new Set(
		(existing ?? '').split(/\s+/).filter((token) => token !== ''),
	);
	for (const token of additions) tokens.add(token);
	return [...tokens].join(' ');
};

/**
 * Adds `target="_blank"` and a safe `rel` to every non-Guardian anchor.
 *
 * We parse into a `<template>` rather than a `<div>` because the template
 * parsing context does not apply foster parenting, so fragments such as
 * `<td>x</td>` survive the round trip intact. This matches `parseHtml`, which
 * uses `JSDOM.fragment`, so we see the same tree the component will.
 *
 * The input string is returned untouched when nothing needs changing, so that
 * paragraphs without external links are never re-serialised.
 */
export const openExternalLinksInNewTab = (html: string): string => {
	if (!html.includes('<a')) return html;

	const template = document.createElement('template');
	template.innerHTML = html;

	let changed = false;

	for (const anchor of template.content.querySelectorAll('a[href]')) {
		const href = anchor.getAttribute('href') ?? '';
		if (isGuardianLink(href)) continue;

		anchor.setAttribute('target', '_blank');
		anchor.setAttribute(
			'rel',
			mergeRel(
				anchor.getAttribute('rel'),
				/**
				 * Affiliate links must have the rel attribute set to "sponsored"
				 * @see https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
				 */
				isSkimlink(href)
					? ['sponsored', 'noreferrer', 'noopener']
					: ['noreferrer', 'noopener'],
			),
		);

		changed = true;
	}

	return changed ? template.innerHTML : html;
};

/** The shapes in which caption html reaches us, across all element types */
type CaptionBearing = {
	caption?: string;
	captionText?: string;
	data?: { caption?: string };
	images?: CaptionBearing[];
	witnessTypeData?: CaptionBearing;
};

/**
 * Captions are held in a handful of differently named fields depending on the
 * element, and are rendered as html by `Caption` (via `dangerouslySetInnerHTML`)
 * and by `CaptionText`, so anchors within them need the same treatment as body
 * text.
 *
 * Images nest a caption under `data`, multi-images nest whole image elements,
 * and witness elements nest theirs under `witnessTypeData`, so we recurse into
 * each of those too.
 */
const enhanceCaptions = <T>(element: T): T => {
	/* The union of elements is far too heterogeneous to narrow usefully here, so
	we walk the shape structurally. Both casts are safe because we only ever
	swap strings for strings, never changing the shape of an element. */
	const node = element as CaptionBearing;
	let enhanced = node;

	if (typeof node.caption === 'string') {
		const caption = openExternalLinksInNewTab(node.caption);
		if (caption !== node.caption) enhanced = { ...enhanced, caption };
	}

	if (typeof node.captionText === 'string') {
		const captionText = openExternalLinksInNewTab(node.captionText);
		if (captionText !== node.captionText) {
			enhanced = { ...enhanced, captionText };
		}
	}

	if (typeof node.data?.caption === 'string') {
		const caption = openExternalLinksInNewTab(node.data.caption);
		if (caption !== node.data.caption) {
			enhanced = { ...enhanced, data: { ...node.data, caption } };
		}
	}

	if (node.images) {
		const images = node.images.map(enhanceCaptions);
		if (images.some((image, index) => image !== node.images?.[index])) {
			enhanced = { ...enhanced, images };
		}
	}

	if (node.witnessTypeData) {
		const witnessTypeData = enhanceCaptions(node.witnessTypeData);
		if (witnessTypeData !== node.witnessTypeData) {
			enhanced = { ...enhanced, witnessTypeData };
		}
	}

	return enhanced as T;
};

/**
 * On articles carrying the affiliate disclaimer, external in-body links open in
 * a new tab so that readers don’t lose their place in the article.
 *
 * Unlike `enhanceDisclaimer` this is deliberately *not* gated on `isNested` — we
 * want it to apply to nested bodies too, such as key takeaways, Q&As, mini
 * profiles, timelines and products.
 */
export const enhanceExternalLinks =
	(hasAffiliateLinksDisclaimer: boolean, renderingTarget: RenderingTarget) =>
	(elements: FEElement[]): FEElement[] => {
		/* Apps intercept link taps natively, where target="_blank" may open a
		window the webview has no handler for, so we limit this to the web. */
		if (!hasAffiliateLinksDisclaimer || renderingTarget !== 'Web') {
			return elements;
		}

		return elements.map<FEElement>((element) => {
			switch (element._type) {
				case 'model.dotcomrendering.pageElements.TextBlockElement':
				case 'model.dotcomrendering.pageElements.BlockquoteBlockElement': {
					const html = openExternalLinksInNewTab(element.html);
					return html === element.html
						? element
						: { ...element, html };
				}
				default:
					return enhanceCaptions(element);
			}
		});
	};

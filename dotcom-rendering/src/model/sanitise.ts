import type { Config } from 'dompurify';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('');
// @ts-ignore -- Close enough types: DOMWindow is missing "self" from Window
const DOMPurify = createDOMPurify(window);

type Opts = Config & {
	RETURN_DOM_FRAGMENT?: false | undefined;
	RETURN_DOM?: false | undefined;
};

export const sanitiseHTML = (html: string, opts: Opts = {}): string =>
	DOMPurify.sanitize(html, opts);

export const stripHTML = (s: string): string =>
	DOMPurify.sanitize(s, { ALLOWED_TAGS: [] });

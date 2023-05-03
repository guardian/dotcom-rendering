import { JSDOM } from 'jsdom';

export const parseHtml = (html: string): DocumentFragment =>
	JSDOM.fragment(html);

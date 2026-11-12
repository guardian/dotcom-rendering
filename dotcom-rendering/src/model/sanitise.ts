import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

export const stripHTML = (s: string): string =>
	DOMPurify.sanitize(s, { ALLOWED_TAGS: [] });

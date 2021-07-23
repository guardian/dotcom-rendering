import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

export const sanitiseHTML = (html: string, opts?: any): string =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	DOMPurify.sanitize(html, opts);

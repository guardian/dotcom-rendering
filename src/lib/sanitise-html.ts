import sanitiszeHtml from 'sanitize-html';

export const sanitise = (html: string, options: {} = {}): string =>
	sanitiszeHtml(html, options);

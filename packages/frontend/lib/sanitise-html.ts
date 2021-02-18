import sanitiszeHtml from 'sanitize-html';

export const sanitise = (html: string, options: { [key: string]: any } = {}): string =>
    sanitiszeHtml(html, options);

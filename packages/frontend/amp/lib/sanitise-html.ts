import sanitiszeHtml from 'sanitize-html';

export const sanitise = (html: string): string => sanitiszeHtml(html);

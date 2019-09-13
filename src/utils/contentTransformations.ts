export const transform = (html: string): string => html.replace(/•/g, '<span class="bullet">•</span>');

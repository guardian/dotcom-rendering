export const transform = (html: string): string => html ? html.replace(/•/g, '<span class="bullet">•</span>') : '';

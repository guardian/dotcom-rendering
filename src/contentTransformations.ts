export const transform = (html: string): string => html
    ?.replace(/•/g, '<span class="bullet">•</span>')
    ?.replace(new RegExp(/\<h2\>\* \* \*\<\/h2\>/, 'g'), '<hr class="section-rule"/>')
;

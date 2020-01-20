const stripTags = (html: string, prefix: string, suffix: string) => {
    return html.slice(prefix.length, html.length - suffix.length);
};

export const unwrapHtml = (
    prefix: string,
    suffix: string,
    html: string,
): { unwrappedHtml: string; willUnwrap: boolean } => {
    const willUnwrap = html.startsWith(prefix) && html.endsWith(suffix);

    const unwrappedHtml = willUnwrap ? stripTags(html, prefix, suffix) : html;

    return { unwrappedHtml, willUnwrap };
};

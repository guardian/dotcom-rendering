import { joinUrl } from '@root/src/web/lib/joinUrl';

export const getCommentCount = async (ajaxUrl: string, shortUrl: string) => {
    const url = joinUrl([
        ajaxUrl,
        `discussion/comment-counts.json?shortUrls=${shortUrl}`,
    ]);
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(
            json =>
                (json &&
                    json.counts &&
                    json.counts[0] &&
                    json.counts[0].count) ||
                0,
        )
        .catch(error => {
            window.guardian.modules.sentry.reportError(error, 'comment-count');
        });
};

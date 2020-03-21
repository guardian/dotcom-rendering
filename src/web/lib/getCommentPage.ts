import { joinUrl } from '@root/src/web/lib/joinUrl';

// An example /context response
// {
//     status: 'ok',
//     commentId: 3519111,
//     commentAncestorId: 3519111,
//     discussionKey: '/p/27y27',
//     discussionWebUrl:
//         'https://www.theguardian.com/commentisfree/cifamerica/2009/may/14/washington-post-torture-libel',
//     discussionApiUrl:
//         'https://discussion.guardianapis.com/discussion-api/discussion//p/27y27?orderBy=oldest&pageSize=20&page=1',
//     orderBy: 'oldest',
//     pageSize: 20,
//     page: 1,
// };

export const getCommentPage = async (
    ajaxUrl: string,
    commentId: string,
): Promise<number> => {
    const url = joinUrl([ajaxUrl, 'comment', commentId, 'context']);
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(json => json.page)
        .catch(error => {
            window.guardian.modules.sentry.reportError(
                error,
                'get-comment-page',
            );
        });
};

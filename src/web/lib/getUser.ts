import { joinUrl } from '@root/src/web/lib/joinUrl';

export const getUser = async (ajaxUrl: string): Promise<UserProfile> => {
    const url = joinUrl([ajaxUrl, 'profile/me']);
    return fetch(url, {
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw Error(
                    response.statusText ||
                        `getUser | An api call returned HTTP status ${response.status}`,
                );
            }
            return response;
        })
        .then(response => response.json())
        .then(json => json.userProfile)
        .catch(error => {
            window.guardian.modules.sentry.reportError(error, 'get-user');
        });
};

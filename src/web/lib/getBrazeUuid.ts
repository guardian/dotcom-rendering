import { joinUrl } from '@root/src/web/lib/joinUrl';

export const getBrazeUuid = async (ajaxUrl: string): Promise<string> => {
    const url = joinUrl([ajaxUrl, 'user/me']);
    return fetch(url, {
        credentials: 'include',
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(
                    response.statusText ||
                        `getBrazeUuid | An api call returned HTTP status ${response.status}`,
                );
            }
            return response;
        })
        .then((response) => response.json())
        .then((json) => json.user.privateFields.brazeUuid)
        .catch((error) => {
            window.guardian.modules.sentry.reportError(error, 'getBrazeUuid');
        });
};

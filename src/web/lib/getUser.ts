import { joinUrl } from '@root/src/web/lib/joinUrl';
import { stringList } from 'aws-sdk/clients/datapipeline';

export const getUser = async (ajaxUrl: string): Promise<UserProfile> => {
    const url = joinUrl([ajaxUrl, 'profile/me']);
    return fetch(url, {
        credentials: 'include',
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(
                    response.statusText ||
                        `getUser | An api call returned HTTP status ${response.status}`,
                );
            }
            return response;
        })
        .then((response) => response.json())
        .then((json) => json.userProfile)
        .catch((error) => {
            window.guardian.modules.sentry.reportError(error, 'get-user');
        });
};

export const getBrazeUuid = async (ajaxUrl: string): Promise<string> => {
    console.log('AjaxURL:');
    console.log(ajaxUrl);

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

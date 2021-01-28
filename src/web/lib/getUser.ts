import { joinUrl } from '@root/src/lib/joinUrl';
import { callApi } from '@root/src/web/lib/api';

export const getUser = async (ajaxUrl: string): Promise<UserProfile> => {
	const url = joinUrl([ajaxUrl, 'profile/me']);
	return callApi(url, {
		credentials: 'include',
	})
		.then((json) => json.userProfile)
		.catch((error) => {
			window.guardian.modules.sentry.reportError(error, 'get-user');
		});
};

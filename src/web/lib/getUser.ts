import { joinUrl } from '@root/src/lib/joinUrl';
import { callApi } from '@root/src/web/lib/api';

export const getUser = async (ajaxUrl: string): Promise<UserProfile | void> => {
	const url = joinUrl([ajaxUrl, 'profile/me']);
	return callApi(url, {
		credentials: 'include',
	})
		.catch((error) => {
			window.guardian.modules.sentry.reportError(error, 'get-user');
		})
		.then((json: { userProfile: UserProfile }) => json.userProfile)
		.catch((error) => {
			window.guardian.modules.sentry.reportError(error, 'get-user');
		});
};

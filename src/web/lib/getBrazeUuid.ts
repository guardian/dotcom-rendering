import { joinUrl } from '@root/src/lib/joinUrl';
import { callApi } from '@root/src/web/lib/api';

export const getBrazeUuid = async (ajaxUrl: string): Promise<string | void> => {
	const url = joinUrl([ajaxUrl, 'user/me']);
	return callApi(url, {
		credentials: 'include',
	})
		.then(
			(json: {
				user?: {
					privateFields?: {
						brazeUuid?: string;
					};
				};
			}) =>
				json.user &&
				json.user.privateFields &&
				json.user.privateFields.brazeUuid,
		)
		.catch((error) => {
			window.guardian.modules.sentry.reportError(error, 'getBrazeUuid');
		});
};

import { joinUrl } from '@root/src/lib/joinUrl';

function checkForErrors(response: Response) {
	if (!response.ok) {
		throw Error(
			response.statusText ||
				`getUser | An api call returned HTTP status ${response.status}`,
		);
	}
	return response;
}

const callApi = (url: string) => {
	return fetch(url, {
		credentials: 'include',
	})
		.then(checkForErrors)
		.then((response) => response.json());
};

export const getUser = async (ajaxUrl: string): Promise<UserProfile | void> => {
	const url = joinUrl([ajaxUrl, 'profile/me']);
	return callApi(url)
		.catch((error) => {
			window.guardian.modules.sentry.reportError(error, 'get-user');
		})
		.then((json: { userProfile: UserProfile }) => json.userProfile)
		.catch((error) => {
			window.guardian.modules.sentry.reportError(error, 'get-user');
		});
};

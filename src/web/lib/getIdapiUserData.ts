import { joinUrl } from '@root/src/lib/joinUrl';

export interface IdApiUserData {
	user?: {
		primaryEmailAddress?: string;
		privateFields?: {
			brazeUuid?: string;
		};
	};
}

function checkForErrors(response: Response) {
	if (!response.ok) {
		throw Error(
			response.statusText ||
				`getIdApiUserData | An api call returned HTTP status ${response.status}`,
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

const cache: { [url: string]: Promise<IdApiUserData> } = {};

export const getIdApiUserData = (ajaxUrl: string): Promise<IdApiUserData> => {
	if (!(ajaxUrl in cache)) {
		const url = joinUrl([ajaxUrl, 'user/me']);
		const response = callApi(url);
		cache[ajaxUrl] = response;
	}
	return cache[ajaxUrl];
};

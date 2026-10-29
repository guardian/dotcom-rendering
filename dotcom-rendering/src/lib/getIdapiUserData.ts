import { joinUrl } from '@guardian/libs';

export interface IdApiUserData {
	user?: {
		primaryEmailAddress?: string;
		privateFields?: {
			brazeUuid?: string;
		};
	};
}

export interface IdApiUserIdentifiers {
	id: string;
	brazeUuid: string;
	puzzleId: string;
	googleTagId: string;
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

const cache: {
	idapiUserMeResponse?: Promise<IdApiUserData>;
	idapiUserIdentifiersResponse?: Promise<IdApiUserIdentifiers>;
} = {};

export const getIdApiUserData = (ajaxUrl: string): Promise<IdApiUserData> => {
	if (!cache.idapiUserMeResponse) {
		const url = joinUrl(ajaxUrl, 'user/me');
		cache.idapiUserMeResponse = callApi(url);
	}
	return cache.idapiUserMeResponse;
};

export const getIdapiUserIdentifiers = (
	ajaxUrl: string,
	{ cacheResponse = true }: { cacheResponse?: boolean } = {},
): Promise<IdApiUserIdentifiers> => {
	// Auth-reactive consumers must not reuse identifiers from a previous session.
	if (!cacheResponse) {
		return callApi(joinUrl(ajaxUrl, 'user/me/identifiers'));
	}
	if (!cache.idapiUserIdentifiersResponse) {
		const url = joinUrl(ajaxUrl, 'user/me/identifiers');
		cache.idapiUserIdentifiersResponse = callApi(url);
	}
	return cache.idapiUserIdentifiersResponse;
};

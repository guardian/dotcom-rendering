import { joinUrl } from '@root/src/lib/joinUrl';
import { callApi } from '@root/src/web/lib/api';

export interface IdApiUserData {
	user?: {
		primaryEmailAddress?: string;
		privateFields?: {
			brazeUuid?: string;
		};
	};
}

const cache: { [url: string]: Promise<IdApiUserData> } = {};

export const getIdApiUserData = (ajaxUrl: string): Promise<IdApiUserData> => {
	if (!(ajaxUrl in cache)) {
		const url = joinUrl([ajaxUrl, 'user/me']);
		const response = callApi(url, {
			credentials: 'include',
		});
		cache[ajaxUrl] = response;
	}
	return cache[ajaxUrl];
};

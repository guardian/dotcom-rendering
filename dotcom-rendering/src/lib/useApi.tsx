import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';

function checkForErrors(response: Response) {
	if (!response.ok) {
		throw Error(
			response.statusText ||
				`useApi | An api call returned HTTP status ${response.status}`,
		);
	}
	return response;
}

const fetcher = (init?: RequestInit) => (url: string) =>
	fetch(url, init)
		.then(checkForErrors)
		.then((res) => res.json());

interface ApiResponse<T> {
	loading: boolean;
	data?: T;
	error?: Error;
}

/**
 * @description
 * A custom hook to make a GET request using the given url using the SWR lib (https://swr.vercel.app/)
 * returns { loading, error, data }
 * @param {String} url - The url to fetch
 * @param {SWRConfiguration} options - The SWR config object - https://swr.vercel.app/docs/api#options
 * @param {RequestInit} init - The fetch init object - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
 * */
export const useApi = <T,>(
	url?: string,
	options?: SWRConfiguration,
	init?: RequestInit,
): ApiResponse<T> => {
	const { data, error } = useSWR(url, fetcher(init), options);

	return {
		data,
		error,
		loading: !!url && !error && !data,
	};
};

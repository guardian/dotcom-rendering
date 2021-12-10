import useSWR, { SWRConfiguration } from 'swr';
import { Fetcher } from 'swr/dist/types';

function checkForErrors(response: Response) {
	if (!response.ok) {
		throw Error(
			response.statusText ||
				`useApi | An api call returned HTTP status ${response.status}`,
		);
	}
	return response;
}

const fetcher = (url: string, init?: RequestInit) =>
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
 * @param {SWRConfiguration} options - The SWR config object - https://swr.vercel.app/docs/options
 * @param {RequestInit} init - The fetch init object - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
 * */
export const useApi = <T,>(
	url: string,
	options?: SWRConfiguration,
	init?: RequestInit,
): ApiResponse<T> => {
	const fetcherWithInit =
		(init?: RequestInit): Fetcher<T> =>
		(url: string) =>
			fetcher(url, init);
	const { data, error } = useSWR(url, fetcherWithInit(init), options);

	return {
		data,
		error,
		loading: !error && !data,
	};
};

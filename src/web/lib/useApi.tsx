import useSWR, { SWRConfiguration } from 'swr';

function checkForErrors(response: Response) {
	if (!response.ok) {
		throw Error(
			response.statusText ||
				`useApi | An api call returned HTTP status ${response.status}`,
		);
	}
	return response;
}

const fetcher = (url: string) =>
	fetch(url)
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
 * */
export const useApi = <T,>(
	url: string,
	options?: SWRConfiguration,
): ApiResponse<T> => {
	const { data, error } = useSWR(url, fetcher, options);

	return {
		data,
		error,
		loading: !error && !data,
	};
};

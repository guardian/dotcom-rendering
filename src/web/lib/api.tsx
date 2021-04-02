import useSWR from 'swr';

type Options = {
	pollInterval?: number;
};

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
 * A custom hook to make a GET request using the given url
 * returning { loading, error, data }
 * @param {String} url - The url to fetch
 * @param {Object} options
 * @param {Number} options.pollInterval - If supplied, the api will be polled at this interval
 * */
export const useApi = <T,>(url: string, options?: Options): ApiResponse<T> => {
	const { data, error } = useSWR(url, fetcher, {
		refreshInterval: options?.pollInterval,
	});

	return {
		data,
		error,
		loading: !error && !data,
	};
};

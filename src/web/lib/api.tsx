import { useState, useEffect, useRef } from 'react';

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

const callApi = (url: string) => {
	return fetch(url)
		.then(checkForErrors)
		.then((response) => response.json());
};

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
	const [request, setRequest] = useState<{
		loading: boolean;
		data?: T;
		error?: Error;
	}>({
		loading: true,
	});

	const alreadyFetched = useRef<boolean>(false);
	const pollRef = useRef<number | undefined>();

	useEffect(() => {
		const handleData = (data: T) => {
			setRequest({
				data,
				loading: false,
			});
		};

		const handleError = (error: Error) => {
			setRequest({
				error,
				loading: false,
			});
		};

		const poll = (delay: number) => {
			// We use window.setTimeout so we're sure to get a number back (and not the NodeJS.Timeout type)
			const timeoutId = window.setTimeout(() => {
				callApi(url)
					.then(handleData)
					.then(() => {
						// If successfull, enqueue the next poll
						poll(delay);
					})
					.catch(handleError);
			}, delay);
			pollRef.current = timeoutId;
		};

		if (alreadyFetched.current === false) {
			callApi(url).then(handleData).catch(handleError);
			alreadyFetched.current = true;
		}

		if (options?.pollInterval) {
			const delay = options.pollInterval;
			poll(delay);
			return () => {
				if (pollRef.current) {
					clearTimeout(pollRef.current);
					pollRef.current = undefined;
				}
			};
		}
	}, [url, options]);

	return request;
};

import { useState, useEffect, useRef } from 'react';

type FetchOptions = {
	method?:
		| 'GET'
		| 'HEAD'
		| 'POST'
		| 'PUT'
		| 'DELETE'
		| 'CONNECT'
		| 'OPTIONS'
		| 'TRACE'
		| 'PATCH';
	headers?: {
		'Content-Type':
			| 'text/plain'
			| 'multipart/form-data'
			| 'application/json'
			| 'application/x-www-form-urlencoded';
	};
	body?: string;
	credentials?: 'omit' | 'include' | 'same-origin';
};

interface Options extends FetchOptions {
	pollInterval?: number;
}

function checkForErrors(response: Response) {
	if (!response.ok) {
		throw Error(
			response.statusText ||
				`useApi | An api call returned HTTP status ${response.status}`,
		);
	}
	return response;
}

const callApi = (url: string, fetchOptions?: FetchOptions) => {
	return fetch(url, fetchOptions)
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
 * @param {Number} options.method - If supplied, the api will be called using this value
 * @param {Number} options.headers - If supplied, the api will be called using this value
 * @param {Number} options.body - If supplied, the api will be called using this value
 * @param {Number} options.credentials - If supplied, the api will be called using this value
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
		const fetchOptions = {
			method: options?.method || 'GET',
			credentials: options?.credentials,
			headers: options?.headers,
			body: options?.body,
		};

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
				callApi(url, fetchOptions)
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
			callApi(url, fetchOptions).then(handleData).catch(handleError);
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

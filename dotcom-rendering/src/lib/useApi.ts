import { isUndefined } from '@guardian/libs';
import { useMemo } from 'react';
import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import type { Result } from './result';

function checkForErrors(response: Response) {
	if (!response.ok) {
		throw Error(
			response.statusText ||
				`useApi | An api call returned HTTP status ${response.status}`,
		);
	}
	return response;
}

/** **NOTE:** no parsing is done on the response, the type is merely asserted */
const fetcher =
	<T>(init?: RequestInit) =>
	(url: string): Promise<T> =>
		fetch(url, init)
			.then(checkForErrors)
			.then((res) => res.json());

type ApiResponse<T, E> = {
	loading: boolean;
	data?: T;
	error?: E;
};

/**
 * A custom hook to make a GET request using the given url using the SWR lib (https://swr.vercel.app/).
 *
 * @template T assert the expected response type
 * @template E assert the potential error type
 * @param {string} url - The API endpoint. Falsy values will prevent any network requests
 * @param {SWRConfiguration<Data,Err>} options - The SWR config object - https://swr.vercel.app/docs/api#options
 * @param {RequestInit} init - The fetch init object - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
 * @returns {ApiResponse<Data, Err>}
 * */
export const useApi = <Data = unknown, Err = Error>(
	url: string = '',
	options?: SWRConfiguration<Data, Err>,
	init?: RequestInit,
): ApiResponse<Data, Err> => {
	const { data, error } = useSWR<Data, Err>(url, fetcher(init), options);

	return {
		data,
		error,
		loading: !!url && isUndefined(error) && isUndefined(data),
	};
};

const fetcherWithParse =
	<Data>(parse: (json: unknown) => Result<string, Data>) =>
	(url: string): Promise<Data> =>
		fetch(url)
			.then((res) => res.json())
			.then(parse)
			.then((result) => {
				if (!result.ok) {
					throw new Error(result.error);
				} else {
					return result.value;
				}
			})
			.catch(() => {
				throw new Error('Failed to fetch match header json');
			});

/**
 * A custom hook to make a GET request using the given url using the SWR lib (https://swr.vercel.app/).
 *
 * @template Data assert the expected response type
 * @template Err assert the potential error type
 * @param {Url} url - The API endpoint. Falsy values will prevent any network requests
 * @param {(json: unknown) => Result<string, Data>} parse - A function that takes the raw json response and returns a Result with the type safe parsed data or an error message
 * @param {SWRConfiguration<Data,Err>} options - The SWR config object - https://swr.vercel.app/docs/api#options
 * @returns {ApiResponse<Data, Err>}
 * */
export const useApiWithParse = <Data, Err = Error>(
	url: string,
	parse: (json: unknown) => Result<string, Data>,
	options?: SWRConfiguration<Data, Err>,
): ApiResponse<Data, Err> => {
	const fetchData = useMemo(() => fetcherWithParse(parse), [parse]);

	const { data, error } = useSWR<Data, Err>(url, fetchData, options);

	return {
		data,
		error,
		loading: !!url && isUndefined(error) && isUndefined(data),
	};
};

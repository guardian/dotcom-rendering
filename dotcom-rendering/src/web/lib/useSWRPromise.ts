import type { Fetcher } from 'swr';
import useSWRImmutable from 'swr/immutable';

/**
 * We created this as a wrapper to get a promise from SWR.
 * This was to prevent a complete refactor of the existing braze code,
 * which expected a promise.
 *
 * Uses an [immutable SWR under the hood][doc].
 *
 * [doc]: https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
 *
 * @deprecated prefer refactoring the code to use SWR natively
 */
export const useSWRPromise = <Data extends unknown, Key extends string>(
	key: Key,
	fetcher: Fetcher<Data, Key>,
): Promise<Data> => {
	let resolver: (value: Data | PromiseLike<Data>) => void;
	let rejecter: (reason?: string) => void;
	const promise: Promise<Data> = new Promise((resolve, reject) => {
		resolver = resolve;
		rejecter = reject;
	});

	useSWRImmutable(key, fetcher, {
		onSuccess: (data: Data) => {
			resolver(data);
		},
		onError: () => {
			rejecter('Failed to fetch with SWR');
		},
	});

	return promise;
};

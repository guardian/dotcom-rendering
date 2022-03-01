import { BrazeMessagesInterface } from '@guardian/braze-components';
import useSWRImmutable from 'swr/immutable';
import { buildBrazeMessages } from './braze/buildBrazeMessages';

/**
 * Returns a promise that resolves to the BrazeMessagesInterface.
 * This hook ensures we only run buildBrazeMessages once via the use of SWR,
 * which [is set to immutable][doc].
 *
 * Ideally, we’ll refactor Braze code to use SWR directly, and stop relying
 * on the requirement for it to be a promise.
 *
 * [doc]: https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
 */
export const useBraze = (idApiUrl: string): Promise<BrazeMessagesInterface> => {
	let resolver: (
		value: BrazeMessagesInterface | PromiseLike<BrazeMessagesInterface>,
	) => void;
	let rejecter: (reason?: string) => void;

	const promise: Promise<BrazeMessagesInterface> = new Promise(
		(resolve, reject) => {
			resolver = resolve;
			rejecter = reject;
		},
	);

	useSWRImmutable('braze-message', () => buildBrazeMessages(idApiUrl), {
		onSuccess: (data: BrazeMessagesInterface) => {
			resolver(data);
		},
		onError: () => {
			rejecter('Failed to run buildBrazeMessages');
		},
	});

	return promise;
};

import type { BrazeMessagesInterface } from '@guardian/braze-components';
import { NullBrazeMessages } from '@guardian/braze-components/logic';
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
export const useBraze = (
	idApiUrl: string,
): { brazeMessages: BrazeMessagesInterface | undefined } => {
	const { data: brazeMessages, error } = useSWRImmutable(
		'braze-message',
		() => buildBrazeMessages(idApiUrl),
	);

	if (error) {
		return { brazeMessages: new NullBrazeMessages() };
	}

	return { brazeMessages };
};

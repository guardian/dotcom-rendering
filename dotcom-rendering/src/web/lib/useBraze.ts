import type { BrazeMessagesInterface } from '@guardian/braze-components';
import { NullBrazeMessages } from '@guardian/braze-components/logic';
import useSWRImmutable from 'swr/immutable';
import { buildBrazeMessages } from './braze/buildBrazeMessages';

/**
 * Returns brazeMessages as BrazeMessagesInterface
 *
 * We're using useSWRImmutable to ensure this call is only made once
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

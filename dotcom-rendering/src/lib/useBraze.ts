import type {
	BrazeCardsInterface,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import {
	NullBrazeCards,
	NullBrazeMessages,
} from '@guardian/braze-components/logic';
import useSWRImmutable from 'swr/immutable';
import { buildBrazeMessaging } from './braze/buildBrazeMessaging';
import { useSignedInStatus } from './useSignedInStatus';

/**
 * Returns brazeMessaging as BrazeMessagesInterface and BrazeCardsInterface
 *
 * BrazeMessages is used to show single-impression messages (like ad impressions).
 * In contrast, BrazeCards can provide persistent user notifications.
 *
 * We're using useSWRImmutable to ensure this call is only made once
 * [doc]: https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
 */
export const useBraze = (
	idApiUrl: string,
): {
	brazeMessages: BrazeMessagesInterface | undefined;
	brazeCards: BrazeCardsInterface | undefined;
} => {
	const signedInStatus = useSignedInStatus();

	const { data, error } = useSWRImmutable(
		signedInStatus !== 'Pending' ? 'braze-message' : null,
		() => buildBrazeMessaging(idApiUrl, signedInStatus === 'SignedIn'),
	);

	if (error) {
		return {
			brazeMessages: new NullBrazeMessages(),
			brazeCards: new NullBrazeCards(),
		};
	}

	return {
		brazeMessages: data?.brazeMessages,
		brazeCards: data?.brazeCards,
	};
};

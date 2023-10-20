import type {
	BrazeCardsInterface,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import {
	NullBrazeCards,
	NullBrazeMessages,
} from '@guardian/braze-components/logic';
import useSWRImmutable from 'swr/immutable';
import type { RenderingTarget } from '../types/renderingTarget';
import { buildBrazeMessaging } from './braze/buildBrazeMessaging';
import { useAuthStatus } from './useAuthStatus';

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
	renderingTarget: RenderingTarget,
): {
	brazeMessages: BrazeMessagesInterface | undefined;
	brazeCards: BrazeCardsInterface | undefined;
} => {
	const authStatus = useAuthStatus();
	const isSignedIn =
		authStatus.kind === 'SignedInWithOkta' ||
		authStatus.kind === 'SignedInWithCookies';

	const { data, error } = useSWRImmutable(
		authStatus.kind !== 'Pending' ? 'braze-message' : null,
		() => buildBrazeMessaging(idApiUrl, isSignedIn, renderingTarget),
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

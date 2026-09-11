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
import type { BrazeInstance } from './braze/initialiseBraze';
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
	braze: BrazeInstance | null;
	/**
	 * Whether the underlying `buildBrazeMessaging` fetch (SDK init + the
	 * Banners System `requestBannersRefresh` call — see
	 * `buildBrazeMessaging.ts`) is still in flight. `false` once it has
	 * settled, whether that's with a usable `braze` instance or with
	 * `error`/a null `braze`. Consumers that need to know whether Braze has
	 * had a real chance to return banner data (as opposed to just not having
	 * one) — e.g. to avoid mistaking "not loaded yet" for "no banner" —
	 * should check this rather than relying on `braze` being non-null.
	 */
	isLoading: boolean;
} => {
	const authStatus = useAuthStatus();
	const isSignedIn = authStatus.kind === 'SignedIn';

	const { data, error } = useSWRImmutable(
		authStatus.kind !== 'Pending' ? 'braze-message' : null,
		() => buildBrazeMessaging(idApiUrl, isSignedIn, renderingTarget),
	);

	// SWR 1.x doesn't expose an `isLoading` flag directly, so derive it: once
	// the fetch settles, either `data` or `error` is populated.
	const isLoading = data === undefined && error === undefined;

	if (error) {
		return {
			brazeMessages: new NullBrazeMessages(),
			brazeCards: new NullBrazeCards(),
			braze: null,
			isLoading,
		};
	}

	return {
		brazeMessages: data?.brazeMessages,
		brazeCards: data?.brazeCards,
		braze: data?.braze ? data?.braze : null,
		isLoading,
	};
};

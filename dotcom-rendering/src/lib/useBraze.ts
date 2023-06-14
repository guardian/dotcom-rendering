import type {
	BrazeCardsInterface,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import {
	NullBrazeCards,
	NullBrazeMessages,
} from '@guardian/braze-components/logic';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { buildBrazeMessaging } from './braze/buildBrazeMessaging';
import { useIsSignedIn } from './useIsSignedIn';

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
	log?: boolean | undefined,
): {
	brazeMessages: BrazeMessagesInterface | undefined;
	brazeCards: BrazeCardsInterface | undefined;
} => {

	const isSignedIn = useIsSignedIn()

	if (log) {console.log("use braze is signed in", isSignedIn)}


	const { data, error } = useSWRImmutable(isSignedIn !== 'Pending' ? 'braze-message' : null, () => 
		buildBrazeMessaging(idApiUrl, isSignedIn === 'SignedIn'),
	);
	if (log) 
		{console.log("data from swrimmutable is ", data)
		console.log("error from swrimmutable is ", error)}

	if (error) {
		return {
			brazeMessages: new NullBrazeMessages(),
			brazeCards: new NullBrazeCards(),
		};
	}

return {
	brazeMessages: data?.brazeMessages,
	brazeCards: data?.brazeCards,}

};



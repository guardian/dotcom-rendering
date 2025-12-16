import { useEffect, useState } from 'react';
import { getOptionsHeaders } from './identity';
import {
	clearSubscriptionCache,
	getCachedSubscriptions,
	setCachedSubscriptions,
	shouldInvalidateCache,
} from './newsletterSubscriptionCache';
import { useAuthStatus } from './useAuthStatus';

interface NewsletterSubscriptionResponse {
	result: {
		subscriptions: Array<{
			listId: string;
		}>;
	};
}

/**
 * A hook to check if a user is subscribed to a specific newsletter.
 */
export const useNewsletterSubscription = (
	newsletterId: number,
	idApiUrl: string | undefined,
): boolean | undefined => {
	const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(
		undefined,
	);

	const authStatus = useAuthStatus();

	useEffect(() => {
		// Wait for auth to be determined

		if (authStatus.kind === 'Pending') {
			setIsSubscribed(undefined);
			return;
		}

		// User is not signed in
		if (authStatus.kind === 'SignedOut') {
			setIsSubscribed(false);
			clearSubscriptionCache();
			return;
		}

		// No API URL available
		if (idApiUrl === undefined || idApiUrl === '') {
			setIsSubscribed(false);
			return;
		}

		// At this point: authStatus.kind === 'SignedIn'

		// Checking cache first
		const cachedData = getCachedSubscriptions();
		const currentUserId = authStatus.idToken.claims.sub;

		if (cachedData && !shouldInvalidateCache(cachedData, currentUserId)) {
			const isUserSubscribed = cachedData.listIds.includes(newsletterId);
			setIsSubscribed(isUserSubscribed);
			return;
		}

		const fetchNewsletters = async () => {
			try {
				const options = getOptionsHeaders(authStatus);
				const response = await fetch(
					`${idApiUrl}/users/me/newsletters`,
					{
						method: 'GET',
						credentials: 'include',
						...options,
						headers: {
							...options.headers,
						},
					},
				);

				if (!response.ok) {
					console.error('Failed to fetch user newsletters');
					setIsSubscribed(false);
					return;
				}

				const data =
					(await response.json()) as NewsletterSubscriptionResponse;
				const newsletters = data.result.subscriptions;
				const listIds = newsletters.map((n) => Number(n.listId));

				setCachedSubscriptions(listIds, currentUserId);

				const isUserSubscribed = listIds.includes(newsletterId);

				setIsSubscribed(isUserSubscribed);
			} catch (error) {
				const message = `Error fetching newsletters: ${String(error)}`;
				window.guardian.modules.sentry.reportError(
					new Error(message, { cause: error }),
					'errors-fetching-newsletters',
				);
				setIsSubscribed(false);
			}
		};

		void fetchNewsletters();
	}, [authStatus, newsletterId, idApiUrl]);

	return isSubscribed;
};

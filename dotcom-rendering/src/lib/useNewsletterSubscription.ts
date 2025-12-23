import { useEffect, useState } from 'react';
import {
	clearSubscriptionCache,
	fetchNewsletterSubscriptions,
	getCachedSubscriptions,
	shouldInvalidateCache,
} from './newsletterSubscriptionCache';
import { useAuthStatus } from './useAuthStatus';

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
			const listIds = await fetchNewsletterSubscriptions(
				idApiUrl,
				currentUserId,
				authStatus,
			);

			if (listIds === null) {
				const message = 'Failed to fetch newsletter subscriptions';
				window.guardian.modules.sentry.reportError(
					new Error(message),
					'errors-fetching-newsletters',
				);
				setIsSubscribed(false);
				return;
			}

			const isUserSubscribed = listIds.includes(newsletterId);
			setIsSubscribed(isUserSubscribed);
		};

		void fetchNewsletters();
	}, [authStatus, newsletterId, idApiUrl]);

	return isSubscribed;
};

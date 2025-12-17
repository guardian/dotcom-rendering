import { useEffect, useState } from 'react';
import { getOptionsHeaders } from './identity';
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
 *
 * @param newsletterId
 * @param idApiUrl
 * @param shouldCheckSubscription - Feature flag to enable/disable subscription check. When false, returns false immediately.
 */
export const useNewsletterSubscription = (
	newsletterId: number,
	idApiUrl: string | undefined,
	shouldCheckSubscription: boolean = true,
): boolean | undefined => {
	const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(
		undefined,
	);

	const authStatus = useAuthStatus();

	useEffect(() => {
		// Feature flag is disabled - skip subscription check
		if (!shouldCheckSubscription) {
			setIsSubscribed(false);
			return;
		}

		// Wait for auth to be determined
		if (authStatus.kind === 'Pending') {
			setIsSubscribed(undefined);
			return;
		}

		// User is not signed in
		if (authStatus.kind === 'SignedOut') {
			setIsSubscribed(false);
			return;
		}

		// No API URL available
		if (idApiUrl === undefined || idApiUrl === '') {
			setIsSubscribed(false);
			return;
		}

		// At this point: authStatus.kind === 'SignedIn'

		// User is signed in, fetch their newsletters
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

				const data: NewsletterSubscriptionResponse =
					await response.json();

				const newsletters = data.result?.subscriptions ?? [];

				// If newsletter exists in the subscriptions array, user is subscribed
				const isUserSubscribed = newsletters.some(
					(n) => Number(n.listId) === newsletterId,
				);

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
	}, [authStatus, newsletterId, idApiUrl, shouldCheckSubscription]);

	return isSubscribed;
};

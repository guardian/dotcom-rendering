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
				const origin = window.location.origin;
				const response = await fetch(
					`${idApiUrl}/users/me/newsletters`,
					{
						method: 'GET',
						credentials: 'include',
						...options,
						headers: {
							...options.headers,
							Origin: origin,
							Referer: origin,
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
				console.error('Error fetching newsletters:', error);
				setIsSubscribed(false);
			}
		};

		void fetchNewsletters();
	}, [authStatus, newsletterId, idApiUrl]);

	return isSubscribed;
};

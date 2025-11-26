import { useEffect, useState } from 'react';
import { getOptionsHeaders } from './identity';
import { useAuthStatus } from './useAuthStatus';

interface UserNewsletter {
	listId: number;
	subscribed: boolean;
}

interface NewsletterSubscriptionResponse {
	result?: {
		subscriptions: UserNewsletter[];
	};
}

/**
 * A hook to check if a user is subscribed to a specific newsletter.
 */
export const useNewsletterSubscription = (
	newsletterId: string,
	idApiUrl: string,
): boolean | undefined => {
	const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(
		undefined,
	);
	const authStatus = useAuthStatus();

	useEffect(() => {
		if (authStatus.kind === 'Pending') {
			setIsSubscribed(undefined);
			return;
		}

		if (authStatus.kind === 'SignedOut') {
			setIsSubscribed(false);
			return;
		}

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

				const data: NewsletterSubscriptionResponse | UserNewsletter[] =
					await response.json();

				const newsletters = Array.isArray(data)
					? data
					: data.result?.subscriptions ?? [];

				const newsletter = newsletters.find(
					(n) => n.listId.toString() === newsletterId,
				);
				setIsSubscribed(newsletter?.subscribed ?? false);
			} catch (error) {
				console.error('Error fetching newsletters:', error);
				setIsSubscribed(false);
			}
		};

		void fetchNewsletters();
	}, [authStatus, newsletterId, idApiUrl]);

	return isSubscribed;
};

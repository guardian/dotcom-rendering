import { storage } from '@guardian/libs';
import type { SignedIn } from './identity';
import { getOptionsHeaders } from './identity';

const CACHE_KEY = 'gu.newsletter.subscriptions';
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

interface NewsletterSubscriptionCache {
	listIds: number[];
	timestamp: number;
	userId: string;
}

export const getCachedSubscriptions =
	(): NewsletterSubscriptionCache | null => {
		try {
			const cached = storage.session.get(CACHE_KEY);
			if (!cached || typeof cached !== 'string') return null;

			const parsed = JSON.parse(cached) as NewsletterSubscriptionCache;

			const now = Date.now();
			if (now - parsed.timestamp > CACHE_DURATION_MS) {
				storage.session.remove(CACHE_KEY);
				return null;
			}

			return parsed;
		} catch (error) {
			storage.session.remove(CACHE_KEY);
			return null;
		}
	};

export const setCachedSubscriptions = (
	listIds: number[],
	userId: string,
): void => {
	try {
		const cache: NewsletterSubscriptionCache = {
			listIds,
			timestamp: Date.now(),
			userId,
		};
		storage.session.set(CACHE_KEY, JSON.stringify(cache));
	} catch (error) {
		// Silent failure - cache update is not critical
	}
};

export const clearSubscriptionCache = (): void => {
	storage.session.remove(CACHE_KEY);
};

export const shouldInvalidateCache = (
	cache: NewsletterSubscriptionCache,
	currentUserId?: string,
): boolean => {
	if (!currentUserId || cache.userId !== currentUserId) {
		return true;
	}
	return false;
};

export interface NewsletterSubscriptionResponse {
	result: {
		subscriptions: Array<{
			listId: string;
		}>;
	};
}

/**
 * Fetches newsletter subscriptions from the Identity API and updates the cache.
 */
export const fetchNewsletterSubscriptions = async (
	idApiUrl: string,
	userId: string,
	authStatus: SignedIn,
): Promise<number[] | null> => {
	try {
		const options = getOptionsHeaders(authStatus);
		const response = await fetch(`${idApiUrl}/users/me/newsletters`, {
			method: 'GET',
			credentials: 'include',
			...options,
		});

		if (!response.ok) {
			return null;
		}

		const data = (await response.json()) as NewsletterSubscriptionResponse;
		const newsletters = data.result.subscriptions;
		const listIds = newsletters.map((n) => Number(n.listId));

		setCachedSubscriptions(listIds, userId);
		return listIds;
	} catch (error) {
		return null;
	}
};

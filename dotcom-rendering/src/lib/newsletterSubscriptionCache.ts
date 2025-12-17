import { storage } from '@guardian/libs';

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

export const addNewsletterToCache = (
	newsletterId: number,
	userId: string,
): void => {
	try {
		const cachedData = getCachedSubscriptions();

		if (cachedData && !shouldInvalidateCache(cachedData, userId)) {
			if (!cachedData.listIds.includes(newsletterId)) {
				const updatedListIds = [...cachedData.listIds, newsletterId];
				setCachedSubscriptions(updatedListIds, userId);
			}
		} else {
			// No valid cache exists, create a new one with just this newsletter
			setCachedSubscriptions([newsletterId], userId);
		}
	} catch (error) {
		// Silent failure - cache update is not critical
	}
};

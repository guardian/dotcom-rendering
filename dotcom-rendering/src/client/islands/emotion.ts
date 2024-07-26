import type { EmotionCache } from '@emotion/cache';
import createCache from '@emotion/cache';
import { isUndefined } from '@guardian/libs';

/**
 * Emotion Cache
 *
 * Emotion uses a cache to avoid having to re-calculate the same CSS multiple times,
 * We want to re-use this cache between islands to avoid duplicate work or
 * conflicts between caches.
 *
 * We need to keep this cache available for any islands added to the page after the
 * initial page load (e.g with liveblogs), so we store it on window.guardian
 */
export const getEmotionCache = (): EmotionCache => {
	if (isUndefined(window.guardian.emotionCache)) {
		const key = 'dcr';
		const emotionCache = createCache({ key });
		window.guardian.emotionCache = emotionCache;
		return emotionCache;
	} else {
		return window.guardian.emotionCache;
	}
};

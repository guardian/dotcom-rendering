import type { EmotionCache } from '@emotion/cache';
import type {
	CMP,
	ConsentState,
	OnConsentChangeCallback,
	VendorName,
} from '@guardian/consent-manager';
import type ophan from '@guardian/ophan-tracker-js';
import type { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/types';
import type { google } from './src/components/YoutubeAtom/ima';
import type { DailyArticleHistory } from './src/lib/dailyArticleCount';
import type { ReaderRevenueDevUtils } from './src/lib/readerRevenueDevUtils';
import type { Guardian } from './src/model/guardian';
import type { LiveUpdateType } from './src/types/liveBlog';

declare global {
	/* ~ Here, declare things that go in the global namespace, or augment
	 *~ existing declarations in the global namespace
	 */
	interface Window {
		guardian: Guardian & {
			mustardCut: boolean;
			onPolyfilled: () => void;
			/**
			 * **Do not edit this property**
			 *
			 * While there is no contract in place,
			 * it’s being used all over the shop
			 * and without documentation or communication
			 *
			 * e.g. https://github.com/search?q=org%3Aguardian+window.guardian.queue&type=code
			 */
			queue: Array<() => void>;
			// Olly N 10/01/2022:
			// The 'emotionCache' property would better live as a singleton package/chunk, but we're currently limited
			// by having multiple entrypoints in webpack, meaning we can't guarantee singleton behavior
			emotionCache?: EmotionCache;
			ophan?: typeof ophan;
			readerRevenue: ReaderRevenueDevUtils;
			weeklyArticleCount: WeeklyArticleHistory | undefined;
			dailyArticleCount: DailyArticleHistory | undefined;
		};
		guCmpHotFix: {
			initialised?: boolean;
			cmp: CMP;
			onConsentChange: (fn: OnConsentChangeCallback) => void;
			getConsentFor: (
				vendor: VendorName,
				consent: ConsentState,
			) => boolean;
		};
		mockLiveUpdate: (data: LiveUpdateType) => void;
		google?: typeof google;
		YT?: typeof YT;
		onYouTubeIframeAPIReady?: () => void;
	}
}
/* ~ this line is required as per TypeScript's global-modifying-module.d.ts instructions */
export {};

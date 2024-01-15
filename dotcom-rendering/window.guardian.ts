import type { EmotionCache } from '@emotion/cache';
import type {
	Callback,
	CMP,
	ConsentState,
	VendorName,
} from '@guardian/consent-management-platform/dist/types';
import type { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import type { OphanRecordFunction } from './src/client/ophan/ophan';
import type { google } from './src/components/YoutubeAtom/ima';
import type { ImaManager } from './src/components/YoutubeAtom/YoutubeAtomPlayer';
import type { DailyArticleHistory } from './src/lib/dailyArticleCount';
import type { ReaderRevenueDevUtils } from './src/lib/readerRevenueDevUtils';
import type { Guardian } from './src/model/guardian';

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
			ophan?: {
				setEventEmitter: () => void; // We don't currently have a custom eventEmitter on DCR - like 'mediator' in Frontend.
				trackComponentAttention: (
					name: string,
					el: Element,
					visiblityThreshold: number,
				) => void;
				record: OphanRecordFunction;
				viewId: string;
				pageViewId: string;
			};
			// TODO expose as type from Automat client lib
			automat: {
				react: any;
				emotionReact: any;
				emotionReactJsxRuntime: any;
			};
			readerRevenue: ReaderRevenueDevUtils;
			weeklyArticleCount: WeeklyArticleHistory | undefined;
			dailyArticleCount: DailyArticleHistory | undefined;
		};
		GoogleAnalyticsObject: string;
		ga: UniversalAnalytics.ga | null;
		/**
		 * ES6 module import, possibly polyfilled depending on the current
		 * browser. There are three categories:
		 *
		 * 1. Full support out of the box
		 * 2. ES6 module support but not dynamic modules
		 * 3. No module support
		 *
		 * This gives support across all 3 cases.
		 */
		guardianPolyfilledImport: (url: string) => Promise<any>; // can't be nested beyond top level
		guCmpHotFix: {
			initialised?: boolean;
			cmp: CMP;
			onConsentChange: (fn: Callback) => void;
			getConsentFor: (
				vendor: VendorName,
				consent: ConsentState,
			) => boolean;
		};
		mockLiveUpdate: (data: LiveUpdateType) => void;
		google?: typeof google;
		YT?: {
			ImaManager: typeof ImaManager;
		};
		onYouTubeIframeAPIReady?: () => void;
	}
}
/* ~ this line is required as per TypeScript's global-modifying-module.d.ts instructions */
export {};

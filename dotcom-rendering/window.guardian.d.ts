import type {
	Callback,
	CMP,
	ConsentState,
	VendorName,
} from '@guardian/consent-management-platform/dist/types';
import type { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import type { WindowGuardianConfig } from './src/model/window-guardian';
import type { OphanRecordFunction } from './src/web/browser/ophan/ophan';
import type { DailyArticleHistory } from './src/web/lib/dailyArticleCount';
import type { ReaderRevenueDevUtils } from './src/web/lib/readerRevenueDevUtils';

declare global {
	/* ~ Here, declare things that go in the global namespace, or augment
	 *~ existing declarations in the global namespace
	 */
	interface Window {
		guardian: {
			mustardCut: boolean;
			polyfilled: boolean;
			onPolyfilled: () => void;
			queue: Array<() => void>;
			config: WindowGuardianConfig;
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
			modules: {
				sentry: {
					reportError: (error: Error, feature: string) => void;
				};
			};
			// TODO expose as type from Automat client lib
			automat: {
				react: any;
				emotionReact: any;
				emotionReactJsxRuntime: any;
			};
			readerRevenue: ReaderRevenueDevUtils;
			gaPath: string;
			weeklyArticleCount: WeeklyArticleHistory | undefined;
			dailyArticleCount: DailyArticleHistory | undefined;
			GAData: GADataType;
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
		Cypress: any; // for checking if running within cypress
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
	}
}
/* ~ this line is required as per TypeScript's global-modifying-module.d.ts instructions */
export {};

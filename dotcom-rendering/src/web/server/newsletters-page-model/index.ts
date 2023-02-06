import type {
	ConfigNotOnSimplePage,
	DCRNewslettersPageType,
	FENewslettersPageType,
} from '../../../types/newslettersPage';
import { STATIC_CONFIG, TEST_NEWSLETTERS_PAGE_DATA } from './defaultData';

const SIMPLE_PAGE_CONFIG_DEFAULTS: ConfigNotOnSimplePage = {
	isPaidContent: false,
	shortUrlId: '',
	keywordIds: '',
	shouldHideReaderRevenue: true,
	showRelatedContent: false,
	webPublicationDate: undefined,
	dcrCouldRender: true,
};

export const buildNewslettersPageModel = (
	pageRequestData: FENewslettersPageType,
): DCRNewslettersPageType => ({
	...pageRequestData,
	config: {
		...pageRequestData.config,
		...SIMPLE_PAGE_CONFIG_DEFAULTS,
	},
});

export const provideTestNewslettersPageModel = (): DCRNewslettersPageType => ({
	...TEST_NEWSLETTERS_PAGE_DATA,
	config: STATIC_CONFIG,
});

import type {
	DCRNewslettersPageType,
	FENewslettersPageType,
} from '../../../types/newslettersPage';
import { STATIC_CONFIG, TEST_NEWSLETTERS_PAGE_DATA } from './defaultData';

export const buildNewslettersPageModel = (
	pageRequestData: FENewslettersPageType,
): DCRNewslettersPageType => ({
	...pageRequestData,
	config: {
		...STATIC_CONFIG,
		...pageRequestData.config,
	},
});

export const provideTestNewslettersPageModel = (): DCRNewslettersPageType => ({
	...TEST_NEWSLETTERS_PAGE_DATA,
	config: {
		...STATIC_CONFIG,
		...TEST_NEWSLETTERS_PAGE_DATA.config,
	},
});

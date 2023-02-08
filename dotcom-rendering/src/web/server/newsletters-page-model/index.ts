import type {
	DCRNewslettersPageType,
	FENewslettersPageType,
} from '../../../types/newslettersPage';
import { TEST_NEWSLETTERS_PAGE_DATA } from './defaultData';

export const buildNewslettersPageModel = (
	pageRequestData: FENewslettersPageType,
): DCRNewslettersPageType => ({
	...pageRequestData,
});

export const provideTestNewslettersPageModel = (): DCRNewslettersPageType => ({
	...TEST_NEWSLETTERS_PAGE_DATA,
});

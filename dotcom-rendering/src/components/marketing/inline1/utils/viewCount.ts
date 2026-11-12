import { storage } from '@guardian/libs';
import type { Inline1View } from '@guardian/support-dotcom-components/dist/shared/types/targeting/inline1';

/**
 * We record views of the inline1 components in an array in local storage.
 * This data is sent (by the commercial bundle) to SDC, where it's used to
 * limit the number of views per browser.
 */

const localStorageKey = 'gu.inline1.views';
const maxEntries = 50;

const getInline1Views = (): Inline1View[] => {
	const item = storage.local.get(localStorageKey);
	if (Array.isArray(item)) {
		return item as Inline1View[];
	}
	return [];
};

const recordInline1View = (testName: string, date: Date = new Date()): void => {
	const newView: Inline1View = { testName, timestamp: date.getTime() };
	const views = [newView, ...getInline1Views()].slice(0, maxEntries);
	storage.local.set(localStorageKey, views);
};

export { recordInline1View, getInline1Views };

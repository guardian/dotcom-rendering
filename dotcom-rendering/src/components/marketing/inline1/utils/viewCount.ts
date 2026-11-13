import { storage } from '@guardian/libs';
import type { MessageViewLog } from '@guardian/support-dotcom-components/dist/shared/types';

/**
 * We record views of the inline1 components in an array in local storage.
 * This data is sent (by the commercial bundle) to SDC, where it's used to
 * limit the number of views per browser.
 */

const localStorageKey = 'gu.inline1.views';
const maxEntries = 50;

const isMessageView = (item: unknown): item is MessageViewLog[number] =>
	typeof item === 'object' &&
	item !== null &&
	'testId' in item &&
	typeof item.testId === 'string' &&
	'date' in item &&
	typeof item.date === 'number';

const getInline1Views = (): MessageViewLog => {
	const item = storage.local.get(localStorageKey);
	if (Array.isArray(item)) {
		return item.filter(isMessageView);
	}
	return [];
};

const recordInline1View = (testId: string, date: Date = new Date()): void => {
	const views: MessageViewLog = [
		{ testId, date: date.getTime() },
		...getInline1Views(),
	].slice(0, maxEntries);
	storage.local.set(localStorageKey, views);
};

export { recordInline1View, getInline1Views };

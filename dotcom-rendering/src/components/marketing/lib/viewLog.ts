/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/shared/src/lib/viewLog.ts
 */

/**
 * We log epic views in this local storage item.
 * This is used to limit the number of epics a browser sees in a period of time.
 */
import { storage } from '@guardian/libs';

const viewLogKey = 'gu.contributions.views';

const maxLogEntries = 50;

interface EpicView {
	date: number;
	testId: string;
}
export type EpicViewLog = EpicView[];

/**
 * Return the entire viewLog.
 */
export const getEpicViewLog = (): EpicViewLog | undefined => {
	const item = storage.local.get(viewLogKey);
	if (Array.isArray(item)) {
		return item as EpicView[];
	}
	return undefined;
};

/**
 * Add a new entry to the viewLog.
 * The number of entries is limited to the number in maxLogEntries.
 */
export const logEpicView = (testId: string): void => {
	const viewLog = getEpicViewLog() ?? [];

	const newView = {
		date: new Date().getTime(),
		testId,
	};

	const newValue = [...viewLog, newView].slice(-maxLogEntries);

	storage.local.set(viewLogKey, newValue);
};

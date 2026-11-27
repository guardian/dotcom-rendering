import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo } from 'react';
import {
	createCrosswordAdapter,
	type CrosswordIdentityData,
	handleCrosswordProgressChange,
} from './adapters/crossword';
import { reportPuzzleProgress } from './reporter';

/**
 * How long to wait after the last change before reporting `in-progress`.
 * Every letter is a change, and each report is a request.
 */
export const IN_PROGRESS_DEBOUNCE_MS = 3000;

/**
 * Returns the handler for the crossword component's `onProgressChange` prop.
 *
 * `in-progress` is debounced. `completed` and `not-started` are reported
 * straight away and replace any `in-progress` still waiting, so an older
 * state can never be sent after a newer one.
 */
export const useCrosswordProgressReporting = (
	data: CrosswordIdentityData,
): ((change: unknown) => void) => {
	const { number, date, crosswordType } = data;

	const adapter = useMemo(
		() => createCrosswordAdapter({ number, date, crosswordType }),
		[number, date, crosswordType],
	);

	const reportLater = useMemo(
		() =>
			debounce((event: Parameters<typeof reportPuzzleProgress>[0]) => {
				void reportPuzzleProgress(event);
			}, IN_PROGRESS_DEBOUNCE_MS),
		[],
	);

	// Report what is still waiting when the reader leaves the crossword.
	useEffect(() => () => reportLater.flush(), [reportLater]);

	return useCallback(
		(change: unknown) => {
			const event = handleCrosswordProgressChange(adapter, change);
			if (event === null) return;

			if (event.gameStatus === 'in-progress') {
				reportLater(event);
			} else {
				reportLater.cancel();
				void reportPuzzleProgress(event);
			}
		},
		[adapter, reportLater],
	);
};

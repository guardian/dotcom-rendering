import { Participations } from '@guardian/ab-core';
import { OphanABEvent, OphanABPayload } from '@guardian/libs';
import { getOphanRecordFunction } from '../../../web/browser/ophan/ophan';
import {
	getParticipationsFromLocalStorage,
	setParticipationsInLocalStorage,
} from './ab-localstorage';

/**
 * Occasionally we may want to track long-running behavior of browsers in a certain test,
 * without adding new browsers to the test bucket. We cannot rely on the GU_mvt_id bucketing alone to do this.
 * You can use this method to show the gate based on local storage participation key ("gu.ab._participations") instead.
 *
 * After the cut off date users without the local storage participation key won't see the gate at all.
 *
 * Caveats - There will be natural churn of users to account for. Users can manually delete localStorage at any time.
 * Some browsers also automatically delete local storage after some time.
 * Notably: ITP in Safari since iOS and iPadOS 13.4, Safari 13.1 on macOS @see https://webkit.org/tracking-prevention/#intelligent-tracking-prevention-itp
 *
 */
export const setParticipations = (
	currentTestParticipation: Participations,
): void => {
	// sets participation under local storage key: 'gu.ab._participations'
	setParticipationsInLocalStorage(currentTestParticipation);
};

export const abTestPayload = (
	testId: string,
	variantName: string,
): OphanABPayload => {
	const records: { [key: string]: OphanABEvent } = {};
	{
		records[`ab${testId} - AbBucketed`] = {
			variantName,
			complete: false,
		};
	}

	return { abTestRegister: records };
};

// Put this LAST in any row of canRun boolean functions so we don't set the flag unless all other criteria are true
export const setOrUseParticipations = (
	setParticipationsFlag: boolean, // If setParticipationsFlag is true, will set flag and run test, else will run based on flag
	abTestId: string,
	variantId: string, // IMPORTANT: Can only be used for single variant AB Tests!
): boolean => {
	const participations = getParticipationsFromLocalStorage();
	const ophanRecord = getOphanRecordFunction();

	if (setParticipationsFlag) {
		// check if participation already exists
		if (participations[abTestId]?.variant === variantId) return true;

		// else set add participation to local storage
		setParticipations({
			...participations,
			[abTestId]: {
				variant: variantId,
			},
		});

		ophanRecord(abTestPayload(abTestId, variantId));

		return true; // test will be run
	} else {
		// if the test participation exists in localstorage, run the test
		return participations[abTestId]?.variant === variantId;
	}
};

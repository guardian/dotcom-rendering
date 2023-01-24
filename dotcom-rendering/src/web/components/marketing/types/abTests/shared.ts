// import { OphanComponentType, OphanProduct } from '../ophan';
// import { purchaseInfoProduct, purchaseInfoUser } from '../purchaseInfo';

import {OphanComponentType, OphanProduct} from "@guardian/libs";

export type TestStatus = 'Live' | 'Draft' | 'Archived';

export interface Variant {
	name: string;
}
export interface Test<V extends Variant> {
	name: string;
	status: TestStatus;
	variants: V[];
	controlProportionSettings?: ControlProportionSettings;
	audienceOffset?: number;
	audience?: number;
	deviceType?: DeviceType;
	signedInStatus?: SignedInStatus;
}

export interface ControlProportionSettings {
	proportion: number;
	offset: number;
}

export type UserCohort =
	| 'AllExistingSupporters'
	| 'AllNonSupporters'
	| 'Everyone'
	| 'PostAskPauseSingleContributors';

export type SignedInStatus = 'SignedIn' | 'SignedOut' | 'All';

export interface ArticlesViewedSettings {
	minViews: number;
	maxViews?: number;
	periodInWeeks: number;
	tagId?: string;
}

/**
 * Targeting tests are for experimenting with targeting rules.
 * It is not a message test and should not affect what the user sees once they're in a test.
 * But we do need to carry the test/variant names through in the tracking.
 */
export interface TargetingAbTest {
	testName: string;
	variantName: string;
}

export type TestTracking = {
	abTestName: string;
	abTestVariant: string;
	campaignCode: string;
	campaignId?: string;
	componentType: OphanComponentType;
	products?: OphanProduct[];
	labels?: string[];
	targetingAbTest?: TargetingAbTest;
};

export type DeviceType = 'Mobile' | 'Desktop' | 'All';

// export interface PurchaseInfoTest {
// 	userType: purchaseInfoUser[];
// 	product: purchaseInfoProduct[];
// }

import { ABTest } from '@guardian/ab-core';
import { abTestTest } from './tests/ab-test-test';
import { signInGateMainVariant } from './tests/sign-in-gate-main-variant';
import { signInGateMainControl } from './tests/sign-in-gate-main-control';
import {
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
} from './tests/newsletter-merch-unit-test';
import { spacefinderOkr1FilterNearby } from './tests/spacefinder-okr-1-filter-nearby';
import { spacefinderOkr2ImagesLoaded } from './tests/spacefinder-okr-2-images-loaded';
import { spacefinderOkr3RichLinks } from './tests/spacefinder-okr-3-rich-links';

// keep in sync with ab-tests in frontend
// https://github.com/guardian/frontend/tree/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.ts
export const tests: ABTest[] = [
	abTestTest,
	signInGateMainVariant,
	signInGateMainControl,
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
	spacefinderOkr1FilterNearby,
	spacefinderOkr2ImagesLoaded,
	spacefinderOkr3RichLinks,
];

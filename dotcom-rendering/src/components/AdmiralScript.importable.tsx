import { isInUsa } from '@guardian/commercial-core/geo/geo-utils';
import type { Admiral, AdmiralEvent } from '@guardian/commercial-core/types';
import { cmp, getCookie, log } from '@guardian/libs';
import { useEffect } from 'react';
import { useAB } from '../lib/useAB';

/**
 * Fetches AB test variant name for Admiral, as there are two variants
 */
const getAdmiralAbTestVariant = (
	ab: ReturnType<typeof useAB> | undefined,
): string | undefined => {
	if (ab?.api.isUserInVariant('AdmiralAdblockRecovery', 'variant-detect')) {
		return 'variant-detect';
	}
	if (ab?.api.isUserInVariant('AdmiralAdblockRecovery', 'variant-recover')) {
		return 'variant-recover';
	}
	if (ab?.api.isUserInVariant('AdmiralAdblockRecovery', 'control')) {
		return 'control';
	}
	return undefined;
};

/**
 * Sends component events to Ophan with the componentType of `AD_BLOCK_RECOVERY`
 * as well as sending the AB test participation
 *
 * @param ab - The AB test API from useAB hook
 * @param overrides allows overriding / setting values for `action` and `value`
 */
const recordAdmiralOphanEvent = (
	ab: ReturnType<typeof useAB> | undefined,
	{
		action,
		value,
	}: {
		action: 'INSERT' | 'DETECT' | 'VIEW' | 'CLOSE';
		value?: string;
	},
) => {
	const abTestVariant = getAdmiralAbTestVariant(ab);

	window.guardian.ophan?.record({
		componentEvent: {
			component: {
				componentType: 'AD_BLOCK_RECOVERY',
				id: 'admiral-adblock-recovery',
			},
			action,
			...(value && { value }),
			...(abTestVariant && {
				abTest: {
					name: 'AdmiralAdblockRecovery',
					variant: abTestVariant,
				},
			}),
		},
	});
};

// Admiral event types
type MeasureDetectedEvent = {
	adblocking: boolean;
	whitelisted: boolean;
	subscribed: boolean;
};

type CandidateShownEvent = {
	candidateID: string;
	variantID?: string;
	candidateGroups: string[];
};

type CandidateDismissedEvent = {
	candidateID: string;
	candidateGroups: string[];
};

// Admiral event handlers
const handleMeasureDetectedEvent = (
	ab: ReturnType<typeof useAB> | undefined,
	event: AdmiralEvent,
): void => {
	const isMeasureDetectedEvent = (
		e: AdmiralEvent,
	): e is MeasureDetectedEvent =>
		typeof e === 'object' &&
		'adblocking' in e &&
		'whitelisted' in e &&
		'subscribed' in e;

	if (isMeasureDetectedEvent(event)) {
		if (event.adblocking) {
			log(
				'commercial',
				'🛡️ Admiral - user has an adblocker and it is enabled',
			);
			recordAdmiralOphanEvent(ab, { action: 'DETECT', value: 'blocked' });
		}
		if (event.whitelisted) {
			log(
				'commercial',
				'🛡️ Admiral - user has seen Engage and subsequently disabled their adblocker',
			);
			recordAdmiralOphanEvent(ab, {
				action: 'DETECT',
				value: 'whitelisted',
			});
		}
		if (event.subscribed) {
			log(
				'commercial',
				'🛡️ Admiral - user has an active subscription to a transact plan',
			);
		}
	} else {
		log(
			'commercial',
			`🛡️ Admiral - Event is not of expected format of measure.detected ${JSON.stringify(
				event,
			)}`,
		);
	}
};

const handleCandidateShownEvent = (
	ab: ReturnType<typeof useAB> | undefined,
	event: AdmiralEvent,
): void => {
	const isCandidateShownEvent = (e: AdmiralEvent): e is CandidateShownEvent =>
		typeof e === 'object' &&
		'candidateID' in e &&
		'variantID' in e &&
		'candidateGroups' in e;

	if (isCandidateShownEvent(event)) {
		log(
			'commercial',
			`🛡️ Admiral - Launching candidate ${event.candidateID}`,
		);
		recordAdmiralOphanEvent(ab, {
			action: 'VIEW',
			value: event.candidateID,
		});
	} else {
		log(
			'commercial',
			`🛡️ Admiral - Event is not of expected format of candidate.shown ${JSON.stringify(
				event,
			)}`,
		);
	}
};

const handleCandidateDismissedEvent = (
	ab: ReturnType<typeof useAB> | undefined,
	event: AdmiralEvent,
): void => {
	const isCandidateDismissedEvent = (
		e: AdmiralEvent,
	): e is CandidateDismissedEvent =>
		typeof e === 'object' && 'candidateID' in e && 'candidateGroups' in e;

	if (isCandidateDismissedEvent(event)) {
		log(
			'commercial',
			`🛡️ Admiral - Candidate ${event.candidateID} was dismissed`,
		);
		recordAdmiralOphanEvent(ab, {
			action: 'CLOSE',
			value: event.candidateID,
		});
	} else {
		log(
			'commercial',
			`🛡️ Admiral - Event is not of expected format of candidate.dismissed ${JSON.stringify(
				event,
			)}`,
		);
	}
};

const setUpAdmiralEventLogger = (
	admiral: Admiral,
	ab: ReturnType<typeof useAB> | undefined,
): void => {
	admiral('after', 'measure.detected', function (event) {
		handleMeasureDetectedEvent(ab, event);
	});

	admiral('after', 'candidate.shown', function (event) {
		handleCandidateShownEvent(ab, event);
	});

	admiral('after', 'candidate.dismissed', function (event) {
		handleCandidateDismissedEvent(ab, event);
	});
};

// Check if Commercial has already initialized Admiral (bootstrap loaded, not just stub)
const isComHandlingAdmiral = (): boolean => {
	// If window.admiral exists and has been initialized by bootstrap (not just the queue stub)
	// the bootstrap replaces the stub with a proper function that doesn't have .q property
	type AdmiralStub = Admiral & { q?: any[] };
	const w = window as Window & { admiral?: AdmiralStub };

	const admiralExists = typeof w.admiral === 'function';
	const admiralAsRecord = w.admiral as unknown as Record<string, unknown>;
	const admiralIsOnlyStub = admiralExists && Array.isArray(admiralAsRecord.q);
	const admiralIsInitialized = admiralExists && !admiralIsOnlyStub;

	if (admiralIsInitialized) {
		log(
			'dotcom',
			'🛡️ Admiral - Commercial is handling Admiral, skipping commercial initialization',
		);
		return true;
	}
	return false;
};

export const AdmiralScript = () => {
	const ab = useAB();
	const abTestVariant = getAdmiralAbTestVariant(ab);
	const isInVariant = abTestVariant?.startsWith('variant') ?? false;

	useEffect(() => {
		/**
		 * The Admiral bootstrap script should only run under the following conditions:
		 *
		 * - Should not run if the CMP is due to show
		 * - Should only run in the US
		 * - Should only run if in the variant of the AB test
		 * - Should not run if the gu_hide_support_messaging cookie is set
		 * - Should not run for content marked as: shouldHideAdverts, shouldHideReaderRevenue, isSensitive
		 * - Should not run for paid-content sponsorship type (includes Hosted Content)
		 * - Should not run for certain sections
		 */
		const page = window.guardian.config.page;

		const shouldRun =
			!isComHandlingAdmiral() &&
			cmp.hasInitialised() &&
			!cmp.willShowPrivacyMessageSync() &&
			isInUsa() &&
			isInVariant &&
			!getCookie({
				name: 'gu_hide_support_messaging',
				shouldMemoize: true,
			}) &&
			!page.shouldHideAdverts &&
			!page.shouldHideReaderRevenue &&
			!page.isSensitive &&
			page.sponsorshipType !== 'paid-content' &&
			![
				'about',
				'info',
				'membership',
				'help',
				'guardian-live-australia',
				'gnm-archive',
				'guardian-labs',
				'thefilter',
			].includes(page.section ?? '');
		if (!shouldRun) return;

		// Record INSERT Ophan event
		recordAdmiralOphanEvent(ab, { action: 'INSERT' });

		// Initialize Admiral Adblock Recovery
		log('dotcom', '🛡️ Initialising Admiral Adblock Recovery');

		// Set up window.admiral stub
		// This initializes admiral before the bootstrap script loads
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required for Admiral stub initialization
		type AdmiralStub = Admiral & { q?: any[] };
		const w = window as Window & { admiral?: AdmiralStub };

		if (!w.admiral) {
			// Create the Admiral stub function with queue
			const stub = function (...args: unknown[]) {
				if (!stub.q) stub.q = [];
				stub.q.push(args);
			} as AdmiralStub;
			w.admiral = stub;
		}

		log('dotcom', '🛡️ Setting up Admiral event logger');

		// Set up Admiral event logging
		setUpAdmiralEventLogger(w.admiral, ab);

		// Set AB test targeting
		if (abTestVariant) {
			w.admiral('targeting', 'set', 'guAbTest', abTestVariant);
		}

		// Load Admiral bootstrap script
		const BASE_AJAX_URL =
			window.guardian.config.stage === 'CODE'
				? 'https://code.api.nextgen.guardianapps.co.uk'
				: 'https://api.nextgen.guardianapps.co.uk';

		const admiralScript = document.createElement('script');
		admiralScript.src = `${BASE_AJAX_URL}/commercial/admiral-bootstrap.js`;
		admiralScript.async = true;
		document.head.appendChild(admiralScript);

		log('dotcom', '🛡️ Admiral initialization complete');

		return () => {
			// Clean up Admiral bootstrap script
			admiralScript.parentNode?.removeChild(admiralScript);
		};
	}, [ab, isInVariant, abTestVariant]);

	return null;
};

import { isInUsa } from '@guardian/commercial-core/geo/geo-utils';
import type { Admiral, AdmiralEvent } from '@guardian/commercial-core/types';
import { cmp, getCookie, log } from '@guardian/libs';
import { useEffect } from 'react';
import { getOphan } from '../client/ophan/ophan';
import { useBetaAB } from '../lib/useAB';
import { useConfig } from './ConfigContext';

const testName = 'growth-admiral-adblock-detect';

/**
 * Sends component events to Ophan with the componentType of `AD_BLOCK_RECOVERY`
 * as well as sending the AB test participation
 *
 * @param variantName - The AB test variant name
 * @param renderingTarget - The rendering target to get the correct Ophan instance
 * @param overrides allows overriding / setting values for `action` and `value`
 */
const recordAdmiralOphanEvent = async (
	variantName: string | undefined,
	{
		action,
		value,
	}: {
		action: 'INSERT' | 'DETECT' | 'VIEW' | 'CLOSE';
		value?: string;
	},
	renderingTarget: 'Web' | 'Apps' = 'Web',
) => {
	try {
		const ophan = await getOphan(renderingTarget);
		ophan.record({
			componentEvent: {
				component: {
					componentType: 'AD_BLOCK_RECOVERY',
					id: 'admiral-adblock-recovery',
				},
				action,
				...(value && { value }),
				...(variantName && {
					abTest: {
						name: testName,
						variant: variantName,
					},
				}),
			},
		});
	} catch (e) {
		log('dotcom', '🛡️ Admiral - Error recording Ophan event:', e);
	}
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
const handleMeasureDetectedEvent = async (
	variantName: string | undefined,
	event: AdmiralEvent,
	renderingTarget: 'Web' | 'Apps',
): Promise<void> => {
	const isMeasureDetectedEvent = (
		e: AdmiralEvent,
	): e is MeasureDetectedEvent =>
		typeof e === 'object' &&
		'adblocking' in e &&
		'whitelisted' in e &&
		'subscribed' in e;

	if (!isMeasureDetectedEvent(event)) {
		log(
			'dotcom',
			`🛡️ Admiral - Event is not of expected format of measure.detected ${JSON.stringify(
				event,
			)}`,
		);
		return;
	}

	if (event.adblocking) {
		log('dotcom', '🛡️ Admiral - user has an adblocker and it is enabled');
		await recordAdmiralOphanEvent(
			variantName,
			{
				action: 'DETECT',
				value: 'blocked',
			},
			renderingTarget,
		);
	}
	if (event.whitelisted) {
		log(
			'dotcom',
			'🛡️ Admiral - user has seen Engage and subsequently disabled their adblocker',
		);
		await recordAdmiralOphanEvent(
			variantName,
			{
				action: 'DETECT',
				value: 'whitelisted',
			},
			renderingTarget,
		);
	}
	if (event.subscribed) {
		log(
			'dotcom',
			'🛡️ Admiral - user has an active subscription to a transact plan',
		);
	}
};

const handleCandidateShownEvent = async (
	variantName: string | undefined,
	event: AdmiralEvent,
	renderingTarget: 'Web' | 'Apps',
): Promise<void> => {
	const isCandidateShownEvent = (e: AdmiralEvent): e is CandidateShownEvent =>
		typeof e === 'object' &&
		'candidateID' in e &&
		'variantID' in e &&
		'candidateGroups' in e;

	if (isCandidateShownEvent(event)) {
		log('dotcom', `🛡️ Admiral - Launching candidate ${event.candidateID}`);
		await recordAdmiralOphanEvent(
			variantName,
			{
				action: 'VIEW',
				value: event.candidateID,
			},
			renderingTarget,
		);
	} else {
		log(
			'dotcom',
			`🛡️ Admiral - Event is not of expected format of candidate.shown ${JSON.stringify(
				event,
			)}`,
		);
	}
};

const handleCandidateDismissedEvent = async (
	variantName: string | undefined,
	event: AdmiralEvent,
	renderingTarget: 'Web' | 'Apps',
): Promise<void> => {
	const isCandidateDismissedEvent = (
		e: AdmiralEvent,
	): e is CandidateDismissedEvent =>
		typeof e === 'object' && 'candidateID' in e && 'candidateGroups' in e;

	if (isCandidateDismissedEvent(event)) {
		log(
			'dotcom',
			`🛡️ Admiral - Candidate ${event.candidateID} was dismissed`,
		);
		await recordAdmiralOphanEvent(
			variantName,
			{
				action: 'CLOSE',
				value: event.candidateID,
			},
			renderingTarget,
		);
	} else {
		log(
			'dotcom',
			`🛡️ Admiral - Event is not of expected format of candidate.dismissed ${JSON.stringify(
				event,
			)}`,
		);
	}
};

const setUpAdmiralEventLogger = (
	admiral: Admiral,
	variantName: string | undefined,
	renderingTarget: 'Web' | 'Apps',
): void => {
	admiral('after', 'measure.detected', function (event) {
		void handleMeasureDetectedEvent(variantName, event, renderingTarget);
	});

	admiral('after', 'candidate.shown', function (event) {
		void handleCandidateShownEvent(variantName, event, renderingTarget);
	});

	admiral('after', 'candidate.dismissed', function (event) {
		void handleCandidateDismissedEvent(variantName, event, renderingTarget);
	});
};

export const AdmiralScript = () => {
	const { renderingTarget } = useConfig();
	const abTests = useBetaAB();
	const isInVariantDetectGroup =
		abTests?.isUserInTestGroup(testName, 'variant-detect') ?? false;
	const variantName = isInVariantDetectGroup
		? 'variant-detect'
		: 'variant-recover'; //We need to default to 'variant-recover' for users who are not in the AB test in order to show Admiral Modal to all users in the US who are not blocked by the CMP and meet the other criteria.

	useEffect(() => {
		/**
		 * The Admiral bootstrap script should only run under the following conditions:
		 *
		 * - Should not run if the CMP is due to show
		 * - Should only run in the US
		 * - Should not run if the gu_hide_support_messaging cookie is set
		 * - Should not run for content marked as: shouldHideAdverts, shouldHideReaderRevenue, isSensitive
		 * - Should not run for paid-content sponsorship type (includes Hosted Content)
		 * - Should not run for certain sections
		 *
		 * Variant-detect group loads the script but the modal will not be shown.
		 */
		const page = window.guardian.config.page;
		if (!window.guardian.config.switches.consentManagement) return;

		let admiralScript: HTMLScriptElement | undefined;
		let isCancelled = false;

		const initialiseAdmiral = async () => {
			try {
				const willShowPrivacyMessage =
					await cmp.willShowPrivacyMessage();

				const shouldRun =
					!willShowPrivacyMessage &&
					isInUsa() &&
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

				if (!shouldRun || isCancelled) return;

				void recordAdmiralOphanEvent(
					variantName,
					{
						action: 'INSERT',
					},
					renderingTarget,
				);

				log('dotcom', '🛡️ Initialising Admiral Adblock Recovery');

				// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required for Admiral stub initialization
				type AdmiralStub = Admiral & { q?: any[] };
				const w = window as Window & { admiral?: AdmiralStub };

				if (!w.admiral) {
					const stub = function (...args: unknown[]) {
						if (!stub.q) stub.q = [];
						stub.q.push(args);
					} as AdmiralStub;
					w.admiral = stub;
				}

				log('dotcom', '🛡️ Setting up Admiral event logger');
				setUpAdmiralEventLogger(
					w.admiral,
					variantName,
					renderingTarget,
				);

				if (variantName) {
					w.admiral('targeting', 'set', 'guAbTest', variantName);
				}

				const BASE_AJAX_URL = window.guardian.config.page.ajaxUrl;
				admiralScript = document.createElement('script');
				admiralScript.src = `${BASE_AJAX_URL}/commercial/admiral-bootstrap.js`;
				admiralScript.async = true;
				document.head.appendChild(admiralScript);

				log('dotcom', '🛡️ Admiral initialization complete');
			} catch (error) {
				log(
					'dotcom',
					'🛡️ Admiral - Error waiting for CMP readiness:',
					error,
				);
			}
		};

		void initialiseAdmiral();

		return () => {
			isCancelled = true;
			admiralScript?.parentNode?.removeChild(admiralScript);
		};
	}, [variantName, renderingTarget]);

	return null;
};

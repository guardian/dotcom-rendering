import type { ABTest, ABTestAPI } from '@guardian/ab-core';
import {
	bypassCommercialMetricsSampling,
	EventTimer,
	initCommercialMetrics,
} from '@guardian/commercial-core';
import {
	bypassCoreWebVitalsSampling,
	initCoreWebVitals,
} from '@guardian/core-web-vitals';
import { getCookie, isString, isUndefined } from '@guardian/libs';
import { ABTests } from 'ab-testing';
import { useCallback, useEffect, useState } from 'react';
import { useAB, useBetaAB } from '../lib/useAB';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { useDetectAdBlock } from '../lib/useDetectAdBlock';
import { usePageViewId } from '../lib/usePageViewId';
import type { ServerSideTests } from '../types/config';
import { useConfig } from './ConfigContext';

type Props = {
	commercialMetricsEnabled: boolean;
	tests: ServerSideTests;
};

const sampling = 1 / 100;
/** defining this here allows to share this with other metrics */
const willRecordCoreWebVitals = Math.random() < sampling;

// For these tests switch off sampling and collect metrics for 100% of views
const clientSideTestsToForceMetrics: ABTest[] = [
	/* keep array multi-line */
];

const shouldCollectMetricsForBetaTest = (testParticipations: string[]) => {
	const participationConfigs = ABTests.filter((test) =>
		testParticipations.includes(test.name),
	);
	return participationConfigs.some(
		(test) => test.shouldForceMetricsCollection,
	);
};

const useBrowserId = () => {
	const [browserId, setBrowserId] = useState<string>();

	useEffect(() => {
		const cookie = getCookie({ name: 'bwid', shouldMemoize: true });

		const id = isString(cookie) ? cookie : 'no-browser-id-available';

		setBrowserId(id);
	}, []);

	return browserId;
};

const useDev = () => {
	const [isDev, setIsDev] = useState<boolean>();

	useEffect(() => {
		setIsDev(
			!!window.guardian.config.page.isDev ||
				window.location.hostname === 'm.code.dev-theguardian.com' ||
				window.location.hostname ===
					(process.env.HOSTNAME ?? 'localhost') ||
				window.location.hostname === 'preview.gutools.co.uk',
		);
	}, []);

	return isDev;
};

/**
 * Record relevant metrics to our data warehouse:
 * - Core Web Vitals
 * - Commercial Metrics
 *
 * ## Why does this need to be an Island?
 *
 * Metrics are tied to a single page view and are gathered
 * on the client-side exclusively.
 *
 * ---
 *
 * (No visual story exists as this does not render anything)
 */
export const Metrics = ({ commercialMetricsEnabled, tests }: Props) => {
	const abTestApi = useAB()?.api;
	const betaABTest = useBetaAB();
	const adBlockerInUse = useAdBlockInUse();
	const detectedAdBlocker = useDetectAdBlock();

	const { renderingTarget } = useConfig();
	const browserId = useBrowserId();
	const pageViewId = usePageViewId(renderingTarget);

	const isDev = useDev();

	const userInServerSideTest = Object.keys(tests).length > 0;

	const betaParticipations = betaABTest?.getParticipations() ?? {};

	const collectBetaTestMetrics = shouldCollectMetricsForBetaTest(
		Object.keys(betaParticipations),
	);

	const shouldBypassSampling = useCallback(
		(api: ABTestAPI) =>
			willRecordCoreWebVitals ||
			userInServerSideTest ||
			collectBetaTestMetrics ||
			clientSideTestsToForceMetrics.some((test) =>
				api.runnableTest(test),
			),

		[userInServerSideTest, collectBetaTestMetrics],
	);

	useEffect(
		function coreWebVitals() {
			if (isUndefined(abTestApi)) return;
			if (isUndefined(browserId)) return;
			if (isUndefined(isDev)) return;
			if (isUndefined(pageViewId)) return;

			const bypassSampling = shouldBypassSampling(abTestApi);

			/**
			 * We rely on `bypassSampling` rather than the built-in sampling,
			 * but set the value to greater than 0 to avoid console warnings.
			 */
			const nearZeroSampling = Number.MIN_VALUE;

			void initCoreWebVitals({
				browserId,
				pageViewId,
				isDev,
				sampling: nearZeroSampling,
				team: 'dotcom',
			});

			if (bypassSampling || isDev) {
				void bypassCoreWebVitalsSampling('commercial');
			}
		},
		[abTestApi, browserId, isDev, pageViewId, shouldBypassSampling],
	);

	useEffect(
		function commercialMetrics() {
			// Only send metrics if the switch is enabled
			if (!commercialMetricsEnabled) return;

			if (isUndefined(abTestApi)) return;
			if (isUndefined(adBlockerInUse)) return;
			if (isUndefined(browserId)) return;
			if (isUndefined(isDev)) return;
			if (isUndefined(pageViewId)) return;

			const bypassSampling = shouldBypassSampling(abTestApi);

			// This is a new detection method we are trying, so we want to record it separately to `adBlockerInUse`
			EventTimer.get().setProperty(
				'detectedAdBlocker',
				detectedAdBlocker,
			);

			initCommercialMetrics({
				pageViewId,
				browserId,
				isDev,
				adBlockerInUse,
			})
				.then(() => {
					if (bypassSampling || isDev) {
						void bypassCommercialMetricsSampling();
					}
				})
				.catch((e) =>
					console.error(
						`Error initialising commercial metrics: ${String(e)}`,
					),
				);
		},
		[
			abTestApi,
			adBlockerInUse,
			detectedAdBlocker,
			browserId,
			commercialMetricsEnabled,
			isDev,
			pageViewId,
			shouldBypassSampling,
		],
	);

	// We don’t render anything
	return null;
};

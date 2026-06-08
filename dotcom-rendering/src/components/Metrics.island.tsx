import { activeABtests } from '@guardian/ab-testing-config';
import {
	bypassCommercialMetricsSampling,
	EventTimer,
	initCommercialMetrics,
} from '@guardian/commercial-core';
import {
	bypassCoreWebVitalsSampling,
	initCoreWebVitals,
} from '@guardian/core-web-vitals';
import { isUndefined } from '@guardian/libs';
import { useCallback, useEffect, useState } from 'react';
import { useAB } from '../lib/useAB';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { useBrowserId } from '../lib/useBrowserId';
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

const shouldCollectMetricsForTests = (userTestParticipations: string[]) => {
	const userParticipationConfigs = activeABtests.filter((test) =>
		userTestParticipations.includes(test.name),
	);
	return userParticipationConfigs.some(
		(test) => test.shouldForceMetricsCollection,
	);
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
	const abTests = useAB();
	const adBlockerInUse = useAdBlockInUse();
	const detectedAdBlocker = useDetectAdBlock();

	const { renderingTarget } = useConfig();
	const browserId = useBrowserId();
	const pageViewId = usePageViewId(renderingTarget);

	const isDev = useDev();

	const userInServerSideTest = Object.keys(tests).length > 0;

	const userParticipations = abTests?.getParticipations() ?? {};

	const collectTestMetrics = shouldCollectMetricsForTests(
		Object.keys(userParticipations),
	);

	const shouldBypassSampling = useCallback(
		() =>
			willRecordCoreWebVitals ||
			userInServerSideTest ||
			collectTestMetrics,

		[userInServerSideTest, collectTestMetrics],
	);

	useEffect(
		function coreWebVitals() {
			if (isUndefined(abTests)) {
				return;
			}
			if (isUndefined(browserId)) {
				return;
			}
			if (isUndefined(isDev)) {
				return;
			}
			if (isUndefined(pageViewId)) {
				return;
			}

			const bypassSampling = shouldBypassSampling();

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
		[abTests, browserId, isDev, pageViewId, shouldBypassSampling],
	);

	useEffect(
		function commercialMetrics() {
			// Only send metrics if the switch is enabled
			if (!commercialMetricsEnabled) {
				return;
			}

			if (isUndefined(abTests)) {
				return;
			}
			if (isUndefined(adBlockerInUse)) {
				return;
			}
			if (isUndefined(browserId)) {
				return;
			}
			if (isUndefined(isDev)) {
				return;
			}
			if (isUndefined(pageViewId)) {
				return;
			}

			const bypassSampling = shouldBypassSampling();

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
			abTests,
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

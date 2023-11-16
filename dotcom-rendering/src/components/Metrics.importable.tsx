import type { ABTest, ABTestAPI } from '@guardian/ab-core';
import {
	bypassCommercialMetricsSampling,
	initCommercialMetrics,
} from '@guardian/commercial';
import {
	bypassCoreWebVitalsSampling,
	initCoreWebVitals,
} from '@guardian/core-web-vitals';
import { getCookie, isString, isUndefined } from '@guardian/libs';
import { useCallback, useEffect, useState } from 'react';
import { getOphan } from '../client/ophan/ophan';
import { adsInMerch } from '../experiments/tests/ads-in-merch-high';
import { integrateIma } from '../experiments/tests/integrate-ima';
import { useAB } from '../lib/useAB';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import type { ServerSideTests } from '../types/config';
import type { RenderingTarget } from '../types/renderingTarget';
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
	integrateIma,
	adsInMerch,
];

const useBrowserId = () => {
	const [browserId, setBrowserId] = useState<string>();

	useEffect(() => {
		const cookie = getCookie({ name: 'bwid', shouldMemoize: true });

		const id = isString(cookie) ? cookie : 'no-browser-id-available';

		setBrowserId(id);
	}, []);

	return browserId;
};

const usePageViewId = (renderingTarget: RenderingTarget) => {
	const [id, setId] = useState<string>();

	useEffect(() => {
		getOphan(renderingTarget)
			.then(({ pageViewId }) => {
				setId(pageViewId);
			})
			.catch(() => {
				setId('no-page-view-id-available');
			});
	}, [renderingTarget]);

	return id;
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

export const Metrics = ({ commercialMetricsEnabled, tests }: Props) => {
	const abTestApi = useAB()?.api;
	const adBlockerInUse = useAdBlockInUse();

	const { renderingTarget } = useConfig();
	const browserId = useBrowserId();
	const pageViewId = usePageViewId(renderingTarget);

	const isDev = useDev();

	const userInServerSideTest = Object.keys(tests).length > 0;

	const shouldBypassSampling = useCallback(
		(api: ABTestAPI) =>
			willRecordCoreWebVitals ||
			userInServerSideTest ||
			clientSideTestsToForceMetrics.some((test) =>
				api.runnableTest(test),
			),
		[userInServerSideTest],
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

			if (bypassSampling || isDev)
				void bypassCoreWebVitalsSampling('commercial');
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

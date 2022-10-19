import '../webpackPublicPath';

import {
	bypassCoreWebVitalsSampling,
	getCookie,
	initCoreWebVitals,
} from '@guardian/libs';
import { startup } from '../startup';

const init = async () => {
	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const { pageViewId } = window.guardian.config.ophan;
	const sampling = 5 / 100;

	await initCoreWebVitals({
		browserId,
		pageViewId,
		isDev: false,
		sampling,
		team: 'dotcom',
	});

	if (window.location.hostname === (process.env.HOSTNAME || 'localhost')) {
		await bypassCoreWebVitalsSampling('dotcom');
	}
};

startup('coreWebVitalsLegacy', null, init);

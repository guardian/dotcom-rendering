import {
	bypassCoreWebVitalsSampling,
	getCookie,
	initCoreWebVitals,
} from '@guardian/libs';
import { startup } from '@root/src/web/browser/startup';

const init = (): Promise<void> => {
	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const { pageViewId } = window.guardian.config.ophan;
	const isDev =
		window.location.hostname === 'm.code.dev-theguardian.com' ||
		window.location.hostname === 'localhost' ||
		window.location.hostname === 'preview.gutools.co.uk';
	const sampling = 1 / 100;

	initCoreWebVitals({
		browserId,
		pageViewId,
		isDev,
		sampling,
		team: 'dotcom',
	});

	if (window.location.hostname === 'localhost')
		bypassCoreWebVitalsSampling('dotcom');

	return Promise.resolve();
};

startup('coreVitals', null, init);

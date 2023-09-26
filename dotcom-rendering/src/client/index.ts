import './webpackPublicPath';
import { log } from '@guardian/libs';
import { schedule } from '../lib/scheduler';

const isPolyfilled = new Promise<void>((resolve) => {
	if (window.guardian.mustardCut || window.guardian.polyfilled) {
		resolve();
	}
	window.guardian.onPolyfilledCallbacks.push(() => {
		resolve();
	});
});

/*************************************************************
 *
 * The following modules are bundled in the entry chunk,
 * so they can be run immediately, but we still want to report
 * on the duration of loading and evaluating them.
 *
 *************************************************************/

log('dotcom', '🎬 booting CMP');
void import(/* webpackMode: "eager" */ './bootCmp').then(
	async ({ bootCmp }) => {
		await isPolyfilled;
		await schedule('bootCmp', bootCmp, { priority: 'critical' });
		log('dotcom', '🥾 booted CMP');
	},
);

log('dotcom', '🎬 booting Ophan');
void import(/* webpackMode: "eager" */ './ophan/recordInitialPageEvents').then(
	async ({ recordInitialPageEvents }) => {
		await isPolyfilled;
		await schedule('recordInitialPageEvents', recordInitialPageEvents, {
			priority: 'critical',
		});
		log('dotcom', '🥾 booted Ophan');
	},
);

log('dotcom', '🎬 booting GA');
void import(/* webpackMode: "eager" */ './ga').then(async ({ ga }) => {
	await isPolyfilled;
	await schedule('ga', ga, {
		priority: 'critical',
	});
	log('dotcom', '🥾 booted GA');
});

log('dotcom', '🎬 booting Sentry');
void import(/* webpackMode: "eager" */ './sentryLoader').then(
	async ({ sentryLoader }) => {
		await isPolyfilled;
		await schedule('sentryLoader', sentryLoader, {
			priority: 'critical',
		});
		log('dotcom', '🥾 booted Sentry');
	},
);

log('dotcom', '🎬 booting dynamic import polyfill');
void import(/* webpackMode: "eager" */ './dynamicImport').then(
	async ({ dynamicImport }) => {
		await isPolyfilled;
		await schedule('dynamicImport', dynamicImport, {
			priority: 'critical',
		});
		log('dotcom', '🥾 booted dynamic import polyfill');
	},
);

log('dotcom', '🎬 booting Islands');
void import(/* webpackMode: "eager" */ './islands').then(
	async ({ islands }) => {
		await isPolyfilled;
		await schedule('islands', islands, {
			priority: 'critical',
		});
		log('dotcom', '🥾 booted Islands');
	},
);

log('dotcom', '🎬 booting perf monitoring');
void import(/* webpackMode: "eager" */ './performanceMonitoring').then(
	async ({ performanceMonitoring }) => {
		await isPolyfilled;
		await schedule('performanceMonitoring', performanceMonitoring, {
			priority: 'critical',
		});
		log('dotcom', '🥾 booted perf monitoring');
	},
);

/*************************************************************
 *
 * The following modules are lazy loaded,
 * because they are lower priority and do not want to block
 * the modules above on loading these.
 *
 * We are not assigning chunk name to allow Webpack
 * to optimise chunking based on its algorithm.
 *
 *************************************************************/

log('dotcom', '🎬 booting updateIframeHeight');
void import(
	/* webpackMode: 'lazy' */
	'./updateIframeHeight'
).then(async ({ updateIframeHeight }) => {
	await isPolyfilled;
	await schedule('updateIframeHeight', updateIframeHeight, {
		priority: 'feature',
	});
	log('dotcom', '🥾 booted updateIframeHeight');
});

log('dotcom', '🎬 booting newsletterEmbedIframe');
void import(
	/* webpackMode: 'lazy' */
	'./newsletterEmbedIframe'
).then(async ({ newsletterEmbedIframe }) => {
	await isPolyfilled;
	await schedule('newsletterEmbedIframe', newsletterEmbedIframe, {
		priority: 'feature',
	});
	log('dotcom', '🥾 booted newsletterEmbedIframe');
});

log('dotcom', '🎬 booting relative time');
void import(
	/* webpackMode: 'lazy' */
	'./relativeTime'
).then(async ({ relativeTime }) => {
	await isPolyfilled;
	await schedule('relativeTime', relativeTime, {
		priority: 'feature',
	});
	log('dotcom', '🥾 booted relative time');
});

log('dotcom', '🎬 booting discussion');
void import(
	/* webpackMode: 'lazy' */
	'./discussion'
).then(async ({ discussion }) => {
	await isPolyfilled;
	await schedule('initDiscussion', discussion, {
		priority: 'feature',
	});
	log('dotcom', '🥾 booted discussion');
});

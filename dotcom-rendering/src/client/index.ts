import './webpackPublicPath';
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

void import(/* webpackMode: "eager" */ './bootCmp').then(
	async ({ bootCmp }) => {
		await isPolyfilled;
		void schedule('bootCmp', bootCmp, { priority: 'critical' });
	},
);
void import(/* webpackMode: "eager" */ './ophan/recordInitialPageEvents').then(
	async ({ recordInitialPageEvents }) => {
		await isPolyfilled;
		schedule('recordInitialPageEvents', recordInitialPageEvents, {
			priority: 'critical',
		});
	},
);
void import(/* webpackMode: "eager" */ './ga').then(async ({ ga }) => {
	await isPolyfilled;
	void schedule('ga', ga, {
		priority: 'critical',
	});
});
void import(/* webpackMode: "eager" */ './sentryLoader').then(
	async ({ sentryLoader }) => {
		await isPolyfilled;
		schedule('sentryLoader', sentryLoader, {
			priority: 'critical',
		});
	},
);
void import(/* webpackMode: "eager" */ './dynamicImport').then(
	async ({ dynamicImport }) => {
		await isPolyfilled;
		schedule('dynamicImport', dynamicImport, {
			priority: 'critical',
		});
	},
);
void import(/* webpackMode: "eager" */ './islands').then(
	async ({ islands }) => {
		await isPolyfilled;
		void schedule('islands', islands, {
			priority: 'critical',
		});
	},
);
void import(/* webpackMode: "eager" */ './performanceMonitoring').then(
	async ({ performanceMonitoring }) => {
		await isPolyfilled;
		void schedule('performanceMonitoring', performanceMonitoring, {
			priority: 'critical',
		});
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

void import(
	/* webpackMode: 'lazy' */
	'./updateIframeHeight'
).then(async ({ updateIframeHeight }) => {
	await isPolyfilled;
	void schedule('updateIframeHeight', updateIframeHeight, {
		priority: 'feature',
	});
});
void import(
	/* webpackMode: 'lazy' */
	'./newsletterEmbedIframe'
).then(async ({ newsletterEmbedIframe }) => {
	await isPolyfilled;
	void schedule('newsletterEmbedIframe', newsletterEmbedIframe, {
		priority: 'feature',
	});
});
void import(
	/* webpackMode: 'lazy' */
	'./relativeTime'
).then(async ({ relativeTime }) => {
	await isPolyfilled;
	void schedule('relativeTime', relativeTime, {
		priority: 'feature',
	});
});
void import(
	/* webpackMode: 'lazy' */
	'./discussion'
).then(async ({ discussion }) => {
	await isPolyfilled;
	void schedule('initDiscussion', discussion, {
		priority: 'feature',
	});
});

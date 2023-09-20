// This is duplicate of ./index.ts that uses the scheduler to load modules.
// The idea right now is to recreate the exact behaviour of a standard page,
// to confirm that the scheduler itself does not introduce any regressions.
// A bundle that uses this file as the entry point will be served in a 1% test.

import './webpackPublicPath';

import type { ScheduleOptions } from '../lib/scheduler';
import { schedule, setSchedulerConcurrency } from '../lib/scheduler';

if (window.location.hash.includes('concurrency=')) {
	const match = window.location.hash.match(/concurrency=(\d+)/);
	if (match) {
		setSchedulerConcurrency(Number(match[1]));
	}
}

const boot = (
	name: string,
	task: () => Promise<unknown>,
	options: ScheduleOptions = {
		priority: 'critical',
	},
) => {
	if (window.guardian.mustardCut || window.guardian.polyfilled) {
		void schedule(name, task, options);
	} else {
		window.guardian.queue.push(() => void schedule(name, task, options));
	}
};

/*************************************************************
 *
 * The following modules are bundled in the entry chunk,
 * so they can be run immediately, but we still want to report
 * on the duration of loading and evaluating them.
 *
 *************************************************************/

boot('bootCmp', () =>
	import(/* webpackMode: "eager" */ './bootCmp').then(({ bootCmp }) =>
		bootCmp(),
	),
);
boot('recordInitialPageEvents', () =>
	import(/* webpackMode: "eager" */ './ophan/recordInitialPageEvents').then(
		({ recordInitialPageEvents }) => recordInitialPageEvents(),
	),
);
boot('ga', () =>
	import(/* webpackMode: "eager" */ './ga').then(({ ga }) => ga()),
);
boot('sentryLoader', () =>
	import(/* webpackMode: "eager" */ './sentryLoader').then(
		({ sentryLoader }) => sentryLoader(),
	),
);
boot('dynamicImport', () =>
	import(/* webpackMode: "eager" */ './dynamicImport').then(
		({ dynamicImport }) => dynamicImport(),
	),
);
boot('islands', () =>
	import(/* webpackMode: "eager" */ './islands').then(({ islands }) =>
		islands(),
	),
);
boot('performanceMonitoring', () =>
	import(/* webpackMode: "eager" */ './performanceMonitoring').then(
		({ performanceMonitoring }) => performanceMonitoring(),
	),
);

/*************************************************************
 *
 * The following modules are lazy loaded as separate chunks,
 * because they are lower priority and do not want to block
 * the modules above on loading these.
 *
 *************************************************************/

boot('atomIframe', () =>
	import(
		/* webpackMode: 'lazy' */
		/* webpackChunkName: 'atomIframe' */
		'./atomIframe'
	).then(({ atomIframe }) => atomIframe()),
);

boot('embedIframe', () =>
	import(
		/* webpackMode: 'lazy' */
		/* webpackChunkName: 'embedIframe' */
		'./embedIframe'
	).then(({ embedIframe }) => embedIframe()),
);

boot('newsletterEmbedIframe', () =>
	import(
		/* webpackMode: 'lazy' */
		/* webpackChunkName: 'newsletterEmbedIframe' */
		'./newsletterEmbedIframe'
	).then(({ newsletterEmbedIframe }) => newsletterEmbedIframe()),
);

boot('relativeTime', () =>
	import(
		/* webpackMode: 'lazy' */
		/* webpackChunkName: 'relativeTime' */
		'./relativeTime'
	).then(({ relativeTime }) => relativeTime()),
);

boot('initDiscussion', () =>
	import(
		/* webpackMode: 'lazy' */
		/* webpackChunkName: 'discussion' */
		'./discussion'
	).then(({ discussion }) => discussion()),
);

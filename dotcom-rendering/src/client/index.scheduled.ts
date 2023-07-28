// This is duplicate of ./index.ts that uses the scheduler to load modules.
// The idea right now is to recreate the exact behaviour of a standard page,
// to confirm that the scheduler itself does not introduce any regressions.
// A bundle that uses this file as the entry point will be served in a 1% test.

import './webpackPublicPath';

// these modules are bundled in the initial (i.e. this) chunk, so that they run ASAP

import type { ScheduleOptions } from '../lib/scheduler';
import { schedule, setSchedulerConcurrency } from '../lib/scheduler';
import { bootCmp } from './bootCmp';
import { dynamicImport } from './dynamicImport';
import { ga } from './ga';
import { islands } from './islands';
import { ophan } from './ophan';
import { performanceMonitoring } from './performanceMonitoring';
import { sentryLoader } from './sentryLoader';

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

boot('bootCmp', bootCmp);
boot('ophan', ophan);
boot('ga', ga);
boot('sentryLoader', sentryLoader);
boot('dynamicImport', dynamicImport);
boot('islands', islands);
boot('performanceMonitoring', performanceMonitoring);

// these modules are loaded as separate chunks, so that they can be lazy-loaded
void import(/* webpackChunkName: 'atomIframe' */ './atomIframe').then(
	({ atomIframe }) => boot('atomIframe', atomIframe),
);

void import(/* webpackChunkName: 'embedIframe' */ './embedIframe').then(
	({ embedIframe }) => boot('embedIframe', embedIframe),
);

void import(
	/* webpackChunkName: 'newsletterEmbedIframe' */ './newsletterEmbedIframe'
).then(({ newsletterEmbedIframe }) =>
	boot('newsletterEmbedIframe', newsletterEmbedIframe),
);

void import(/* webpackChunkName: 'relativeTime' */ './relativeTime').then(
	({ relativeTime }) => boot('relativeTime', relativeTime),
);

void import(/* webpackChunkName: 'discussion' */ './discussion').then(
	({ discussion }) => boot('initDiscussion', discussion),
);

import './webpackPublicPath';

// these modules are bundled in the initial (i.e. this) chunk, so that they run ASAP
import { bootCmp } from './bootCmp';
import { dynamicImport } from './dynamicImport';
import { ga } from './ga';
import { islands } from './islands';
import { recordInitialPageEvents } from './ophan/recordInitialPageEvents';
import { performanceMonitoring } from './performanceMonitoring';
import { sentryLoader } from './sentryLoader';
import { startup } from './startup';

startup('bootCmp', bootCmp);
startup('recordInitialPageEvents', recordInitialPageEvents);
startup('ga', ga);
startup('sentryLoader', sentryLoader);
startup('dynamicImport', dynamicImport);
startup('islands', islands);
startup('performanceMonitoring', performanceMonitoring);

// these modules are loaded as separate chunks, so that they can be lazy-loaded
void import(/* webpackChunkName: 'atomIframe' */ './atomIframe').then(
	({ atomIframe }) => startup('atomIframe', atomIframe),
);
void import(/* webpackChunkName: 'embedIframe' */ './embedIframe').then(
	({ embedIframe }) => startup('embedIframe', embedIframe),
);
void import(
	/* webpackChunkName: 'newsletterEmbedIframe' */ './newsletterEmbedIframe'
).then(({ newsletterEmbedIframe }) =>
	startup('newsletterEmbedIframe', newsletterEmbedIframe),
);
void import(/* webpackChunkName: 'relativeTime' */ './relativeTime').then(
	({ relativeTime }) => startup('relativeTime', relativeTime),
);
void import(/* webpackChunkName: 'discussion' */ './discussion').then(
	({ discussion }) => startup('initDiscussion', discussion),
);

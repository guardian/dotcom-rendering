import './webpackPublicPath.ts';

// these modules are bundled in the initial (i.e. this) chunk, so that they run ASAP
import { bootCmp } from './bootCmp.ts';
import { dynamicImport } from './dynamicImport.ts';
import { ga } from './ga/index.ts';
import { islands } from './islands/index.ts';
import { ophan } from './ophan/index.ts';
import { performanceMonitoring } from './performanceMonitoring.ts';
import { sentryLoader } from './sentryLoader/index.ts';
import { startup } from './startup.ts';

startup('bootCmp', bootCmp);
startup('ophan', ophan);
startup('ga', ga);
startup('sentryLoader', sentryLoader);
startup('dynamicImport', dynamicImport);
startup('islands', islands);
startup('performanceMonitoring', performanceMonitoring);

// these modules are loaded as separate chunks, so that they can be lazy-loaded
void import(/* webpackChunkName: 'atomIframe' */ './atomIframe.ts').then(
	({ atomIframe }) => startup('atomIframe', atomIframe),
);
void import(/* webpackChunkName: 'embedIframe' */ './embedIframe.ts').then(
	({ embedIframe }) => startup('embedIframe', embedIframe),
);
void import(
	/* webpackChunkName: 'newsletterEmbedIframe' */ './newsletterEmbedIframe.ts'
).then(({ newsletterEmbedIframe }) =>
	startup('newsletterEmbedIframe', newsletterEmbedIframe),
);
void import(
	/* webpackChunkName: 'relativeTime' */ './relativeTime/index.ts'
).then(({ relativeTime }) => startup('relativeTime', relativeTime));
void import(/* webpackChunkName: 'discussion' */ './discussion.ts').then(
	({ discussion }) => startup('initDiscussion', discussion),
);

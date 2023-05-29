import './webpackPublicPath';

// these modules are bundled in the initial (i.e. this) chunk, so that they run ASAP
import { bootCmp } from './bootCmp';
import { dynamicImport } from './dynamicImport';
import { ga } from './ga';
import { islands } from './islands';
import { ophan } from './ophan';
import { sentryLoader } from './sentryLoader';
import { startup } from './startup';

startup('bootCmp', null, bootCmp);
startup('ophan', null, ophan);
startup('ga', null, ga);
startup('sentryLoader', null, sentryLoader);
startup('dynamicImport', null, dynamicImport);
startup('islands', null, islands);

// these modules are loaded as separate chunks, so that they can be lazy-loaded
void import(/* webpackChunkName: 'atomIframe' */ './atomIframe').then(
	({ atomIframe }) => startup('atomIframe', null, atomIframe),
);
void import(/* webpackChunkName: 'embedIframe' */ './embedIframe').then(
	({ embedIframe }) => startup('embedIframe', null, embedIframe),
);
void import(
	/* webpackChunkName: 'newsletterEmbedIframe' */ './newsletterEmbedIframe'
).then(({ newsletterEmbedIframe }) =>
	startup('newsletterEmbedIframe', null, newsletterEmbedIframe),
);
void import(/* webpackChunkName: 'relativeTime' */ './relativeTime').then(
	({ relativeTime }) => startup('relativeTime', null, relativeTime),
);
void import(/* webpackChunkName: 'discussion' */ './discussion').then(
	({ discussion }) => startup('initDiscussion', null, discussion),
);

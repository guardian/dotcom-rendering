import './webpackPublicPath';

// these modules are bundled in the initial (i.e. this) chunk, so that they run ASAP
import { bootCmp } from './bootCmp';
import { dynamicImport } from './dynamicImport';
import { ga } from './ga';
import { islands } from './islands';
import { ophan } from './ophan';
import { sentryLoader } from './sentryLoader';
import { startup } from './startup';

startup(bootCmp);
startup(ophan);
startup(ga);
startup(sentryLoader);
startup(dynamicImport);
startup(islands);

// these modules are loaded as separate chunks, so that they can be lazy-loaded
void import(/* webpackChunkName: 'atomIframe' */ './atomIframe').then(
	({ atomIframe }) => startup(atomIframe),
);
void import(/* webpackChunkName: 'embedIframe' */ './embedIframe').then(
	({ embedIframe }) => startup(embedIframe),
);
void import(
	/* webpackChunkName: 'newsletterEmbedIframe' */ './newsletterEmbedIframe'
).then(({ newsletterEmbedIframe }) => startup(newsletterEmbedIframe));
void import(/* webpackChunkName: 'relativeTime' */ './relativeTime').then(
	({ relativeTime }) => startup(relativeTime),
);
void import(/* webpackChunkName: 'discussion' */ './discussion').then(
	({ discussion }) => startup(discussion),
);

import './webpackPublicPath';
import { init as initAtomIframe } from './atomIframe/init';
import { bootCmp } from './entries/bootCmp';
import { dynamicImport } from './entries/dynamicImport';
import { embedIframe } from './entries/embedIframe';
import { ga } from './entries/ga';
import { initDiscussion } from './entries/initDiscussion';
import { islands } from './entries/islands';
import { newsletterEmbedIframe } from './entries/newsletterEmbedIframe';
import { ophan } from './entries/ophan';
import { relativeTime } from './entries/relativeTime';
import { sentryLoader } from './entries/sentryLoader';
import { startup } from './startup';

// this could be smarter, e.g. batching startups or awaiting consent
startup('sentryLoader', null, sentryLoader);
startup('bootCmp', null, bootCmp);
startup('ga', null, ga);
startup('ophan', null, ophan);
startup('islands', null, islands);
startup('dynamicImport', null, dynamicImport);
startup('atomIframe', null, initAtomIframe);
startup('embedIframe', null, embedIframe);
startup('newsletterEmbedIframe', null, newsletterEmbedIframe);
startup('relativeTime', null, relativeTime);
startup('initDiscussion', null, initDiscussion);

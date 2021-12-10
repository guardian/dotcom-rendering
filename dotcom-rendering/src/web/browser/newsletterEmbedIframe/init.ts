import '../webpackPublicPath';
import { startup } from '@root/src/web/browser/startup';
import newsletterEmbedIframe from '@guardian/common-rendering/src/newsletterEmbedIframe';

startup(
	'newsletterEmbedIframe',
	null,
	newsletterEmbedIframe('.email-sub__iframe'),
);

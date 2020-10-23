import '../webpackPublicPath';
import { startup } from '@root/src/web/browser/startup';
import { atomIframe } from './atomIframe';

startup('atomIframe', null, atomIframe);

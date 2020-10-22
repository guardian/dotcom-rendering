import '../webpackPublicPath';
import { startup } from '@root/src/web/browser/startup';
import { embedIframe } from './embedIframe';

startup('embedIframe', null, embedIframe);

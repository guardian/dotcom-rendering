import { updateIframeHeight } from './updateIframeHeight';

export const embedIframe = (): Promise<void> =>
	updateIframeHeight('iframe.js-embed__iframe');

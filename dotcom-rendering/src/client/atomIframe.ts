import { updateIframeHeight } from './updateIframeHeight';

export const atomIframe = (): Promise<void> =>
	updateIframeHeight('iframe.atom__iframe');

import { updateIframeHeight } from '../updateIframeHeight';

export const embedIframe = (): Promise<void> =>
	updateIframeHeight('.js-embed__iframe');

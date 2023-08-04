import { updateIframeHeight } from './updateIframeHeight.tsx';

export const embedIframe = (): Promise<void> =>
	updateIframeHeight('.js-embed__iframe');

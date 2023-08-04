import { updateIframeHeight } from './updateIframeHeight.tsx';

export const atomIframe = (): Promise<void> =>
	updateIframeHeight('.atom__iframe');

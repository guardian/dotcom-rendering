import { updateIframeHeight } from '../updateIframeHeight';

export const atomIframe = (): Promise<void> =>
	updateIframeHeight('.atom__iframe');

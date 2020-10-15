import { updateIframeHeight } from '../updateIframeHeight';

export const embedIframe = (): Promise<void> =>
    updateIframeHeight('.embed__iframe');

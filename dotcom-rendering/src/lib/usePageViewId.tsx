import { isServer } from './isServer';

export const usePageViewId = (): string | undefined => {
	return isServer ? undefined : window.guardian.config.ophan.pageViewId;
};

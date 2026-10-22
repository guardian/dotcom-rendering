import type { Inline1Props } from '@guardian/support-dotcom-components/dist/src/shared/types/props/inline1';

export const inline1SdcListener = (): Promise<void> => {
	window.addEventListener('commercial.sdc-render', (event: CustomEvent) => {
		event.detail;
		const slot = event.target as HTMLElement;
	});

	return Promise.resolve();
};

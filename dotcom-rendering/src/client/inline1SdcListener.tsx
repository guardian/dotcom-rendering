import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types/props/inline1';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import type { ReactComponent } from '../components/marketing/lib/ReactComponent';

const fetchComponent = (
	message: Inline1Props['variant']['message'],
): Promise<ReactComponent<Inline1Props> | undefined> => {
	if (message.type === 'Inline1SupportMessage') {
		return import(
			/* webpackChunkName: "contributions-liveblog-epic" */ `../components/marketing/inline1/SupporterRevenue`
		)
			.then((module) => {
				return module.SupporterRevenue;
			})
			.catch((err) => {
				const msg = `Error importing inline1 component: ${String(err)}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'inline1',
				);
				throw err;
			});
	}
	return Promise.resolve(undefined);
};

const render = <P extends object>(
	Component: ReactComponent<P>,
	props: P,
	slot: HTMLElement,
) => {
	createRoot(slot).render(createElement(Component, props));
};

export const inline1SdcListener = (): Promise<void> => {
	window.addEventListener(
		'commercial.sdc-render',
		(event: CustomEvent<{ props: Inline1Props }>) => {
			// The event should have been dispatched on the ad slot element -
			const slot = event.target;
			if (!(slot instanceof HTMLElement)) return;

			void fetchComponent(event.detail.props.variant.message).then(
				(Component) => {
					if (Component) {
						render(Component, event.detail.props, slot);
					}
				},
			);
		},
	);

	return Promise.resolve();
};

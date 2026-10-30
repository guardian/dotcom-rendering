import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types/props/inline1';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import type { ReactComponent } from '../components/marketing/lib/ReactComponent';

const fetchComponent = (
	message: Inline1Props['variant']['message'],
): Promise<ReactComponent<Inline1Props> | undefined> => {
	if (message.type === 'Inline1SupportMessage') {
		return import(
			/* webpackChunkName: "SupporterRevenue" */ `../components/marketing/inline1/SupporterRevenue`
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
	slot.innerHTML = '';
	// override ad-slot-container style in parent element
	slot.style.textAlign = 'left';
	createRoot(slot).render(createElement(Component, props));
};

/**
 * Set up an event handler for the inline1 slot.
 * If the commercial bundle wants the page to render a component from SDC then it will send an event on the ad slot element.
 * This handler then renders the required component into the ad slot.
 */
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

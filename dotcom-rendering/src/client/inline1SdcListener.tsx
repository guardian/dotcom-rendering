import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types/props/inline1';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from '../components/ConfigContext';
import type { ReactComponent } from '../components/marketing/lib/ReactComponent';
import { getConfig } from './islands/getConfig';

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
				return undefined;
			});
	}
	if (message.type === 'Inline1NewsletterMessage') {
		return import(
			/* webpackChunkName: "Newsletter" */ `../components/marketing/inline1/Newsletter`
		)
			.then((module) => {
				return module.Newsletter;
			})
			.catch((err) => {
				const msg = `Error importing inline1 component: ${String(err)}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'inline1',
				);
				return undefined;
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
	createRoot(slot).render(
		<ConfigProvider value={getConfig()}>
			{createElement(Component, props)}
		</ConfigProvider>,
	);
};

const fetchAndRender = (slot: HTMLElement, props: Inline1Props): void => {
	void fetchComponent(props.variant.message).then((Component) => {
		if (Component) {
			render(Component, props, slot);
		}
	});
};

const handleEvent = (event: CustomEvent<{ props: Inline1Props }>): void => {
	// The event should have been dispatched on the ad slot element
	const slot = event.target;
	if (!(slot instanceof HTMLElement)) return;

	window.removeEventListener('commercial.sdc-render', handleEvent);
	fetchAndRender(slot, event.detail.props);
};

/**
 * Set up rendering for the inline1 slot.
 *
 * If the commercial bundle wants the page to render a component from SDC then
 * it sends an event on the ad slot element, and also records the request on
 * `window.guardian.sdc.inline1`. This is to avoid a race between this
 * function and the commercial script.
 */
export const inline1SdcListener = (): Promise<void> => {
	// Check if the commercial bundle has already sent an event
	const request = window.guardian.commercial?.sdc?.inline1;
	if (request) {
		const slot = document.getElementById(request.slotId);
		if (slot) {
			fetchAndRender(slot, request.props);
		}
	} else {
		// No event yet, set up the listener
		window.addEventListener('commercial.sdc-render', handleEvent);
	}

	return Promise.resolve();
};

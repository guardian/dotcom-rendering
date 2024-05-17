import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import { getOphan } from '../../client/ophan/ophan';
import { isServer } from '../../lib/isServer';
import type { RenderingTarget } from '../../types/renderingTarget';
import type { CurrentSignInGateABTest } from './types';

export type ComponentEventParams = {
	componentType: string;
	componentId?: string;
	abTestName: string;
	abTestVariant: string;
	viewId?: string;
	browserId?: string;
};

// ophan helper methods
const submitComponentEventTracking = async (
	componentEvent: ComponentEvent,
	renderingTarget: RenderingTarget,
) => {
	if (isServer) return;

	const ophan = await getOphan(renderingTarget);
	ophan.record({ componentEvent });
};

export const submitViewEventTracking = (
	componentEvent: Omit<ComponentEvent, 'action'>,
	renderingTarget: RenderingTarget,
) =>
	void submitComponentEventTracking(
		{
			...componentEvent,
			action: 'VIEW',
		},
		renderingTarget,
	);

const submitClickEventTracking = (
	componentEvent: Omit<ComponentEvent, 'action'>,
	renderingTarget: RenderingTarget,
) =>
	void submitComponentEventTracking(
		{
			...componentEvent,
			action: 'CLICK',
		},
		renderingTarget,
	);

export const withComponentId = (id?: string): ComponentEvent['component'] => ({
	componentType: 'SIGN_IN_GATE',
	id,
	// What’s the benefit of passing empty sets here?
	products: new Set(),
	labels: new Set(),
});

export const trackLink = (
	componentId: string,
	value: string,
	renderingTarget: RenderingTarget,
	abTest?: CurrentSignInGateABTest,
): void => {
	const component = withComponentId(componentId);

	submitClickEventTracking(
		{
			component,
			abTest,
			value,
		},
		renderingTarget,
	);
};

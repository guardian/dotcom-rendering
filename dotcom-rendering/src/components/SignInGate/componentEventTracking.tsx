import type { OphanComponent, OphanComponentEvent } from '@guardian/libs';
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
	componentEvent: OphanComponentEvent,
	renderingTarget: RenderingTarget,
) => {
	if (isServer) return;

	const ophan = await getOphan(renderingTarget);
	ophan.record({ componentEvent });
};

export const submitViewEventTracking = (
	componentEvent: Omit<OphanComponentEvent, 'action'>,
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
	componentEvent: Omit<OphanComponentEvent, 'action'>,
	renderingTarget: RenderingTarget,
) =>
	void submitComponentEventTracking(
		{
			...componentEvent,
			action: 'CLICK',
		},
		renderingTarget,
	);

export const withComponentId: (id: string) => OphanComponent = (id = '') => ({
	componentType: 'SIGN_IN_GATE',
	id,
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

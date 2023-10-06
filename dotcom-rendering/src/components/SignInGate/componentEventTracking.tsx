import type { OphanComponent, OphanComponentEvent } from '@guardian/libs';
import { getOphan } from '../../client/ophan/ophan';
import { isServer } from '../../lib/isServer';
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
) => {
	if (isServer) return;

	const ophan = await getOphan();
	ophan.record({ componentEvent });
};

export const submitViewEventTracking = (
	componentEvent: Omit<OphanComponentEvent, 'action'>,
) =>
	void submitComponentEventTracking({
		...componentEvent,
		action: 'VIEW',
	});

const submitClickEventTracking = (
	componentEvent: Omit<OphanComponentEvent, 'action'>,
) =>
	void submitComponentEventTracking({
		...componentEvent,
		action: 'CLICK',
	});

export const withComponentId: (id: string) => OphanComponent = (id = '') => ({
	componentType: 'SIGN_IN_GATE',
	id,
});

export const trackLink = (
	componentId: string,
	value: string,
	abTest?: CurrentSignInGateABTest,
): void => {
	const component = withComponentId(componentId);

	submitClickEventTracking({
		component,
		abTest,
		value,
	});
};

import {
	OphanComponent,
	OphanComponentEvent,
} from '@root/src/web/browser/ophan/ophan';
import { CurrentSignInGateABTest } from 'src/web/components/SignInGate/types';

type ABTestVariant = {
	name: string;
	variant: string;
};

export type ComponentEventParams = {
	componentType: string;
	componentId?: string;
	abTestName: string;
	abTestVariant: string;
	viewId?: string;
	browserId?: string;
	visitId?: string;
};

type ComponentEventWithoutAction = {
	component: OphanComponent;
	value?: string;
	id?: string;
	abTest?: ABTestVariant;
};

const ophan = window?.guardian?.ophan;

// ophan helper methods
export const submitComponentEventTracking = (
	componentEvent: OphanComponentEvent,
) => {
	ophan.record({ componentEvent });
};

export const submitViewEventTracking = (
	componentEvent: ComponentEventWithoutAction,
) =>
	submitComponentEventTracking({
		...componentEvent,
		action: 'VIEW',
	});

export const submitClickEventTracking = (
	componentEvent: ComponentEventWithoutAction,
) =>
	submitComponentEventTracking({
		...componentEvent,
		action: 'CLICK',
	});

export const withComponentId: (id: string) => OphanComponent = (
	id: string = '',
) => ({
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

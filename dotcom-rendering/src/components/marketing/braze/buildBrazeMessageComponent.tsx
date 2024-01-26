import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import type {
	BrazeClickHandler,
	OphanComponentType,
	SubmitComponentEvent,
	TrackClick,
} from './utils/tracking';
import { buildTrackClick } from './utils/tracking';

export type ReactComponent<GenericProps = Record<string, never>> = (
	props: GenericProps,
) => EmotionJSX.Element;

interface HasComponentName {
	componentName: string;
}

interface HasClickTrackingCallbacks {
	logButtonClickWithBraze: BrazeClickHandler;
	submitComponentEvent: SubmitComponentEvent;
}

export interface HasConsolidatedTrackClick {
	trackClick: TrackClick;
}

export type ComponentMapping<A> = {
	[key: string]: ReactComponent<A>;
};

export type BrazeMessageProps = {
	[key: string]: string | undefined;
};

// We know in here that we have access to logButtonClickWithBraze and
// submitComponentEvent (using the HasClickTrackingCallbacks interface). So,
// we're able to consolidate these into a single trackClick callback in the
// underlying component(s), as specified by the HasConsolidatedTrackClick
// interface.
export function buildBrazeMessageComponent<
	A extends HasComponentName & HasClickTrackingCallbacks,
>(
	ophanComponentType: OphanComponentType,
	mappings: ComponentMapping<A & HasConsolidatedTrackClick>,
) {
	const BrazeMessageComponent = (props: A) => {
		const ComponentToRender = mappings[props.componentName];

		if (!ComponentToRender) {
			return null;
		}

		const trackClick = buildTrackClick({
			submitComponentEvent: props.submitComponentEvent,
			logButtonClickWithBraze: props.logButtonClickWithBraze,
			ophanComponentType,
		});

		const augmentedProps = {
			...props,
			trackClick,
		};

		return <ComponentToRender {...augmentedProps} />;
	};

	return BrazeMessageComponent;
}

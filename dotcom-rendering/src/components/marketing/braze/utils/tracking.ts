import type { OphanComponentEvent } from '@guardian/libs';

type BrazeClickHandler = (internalButtonId: number) => void;
type SubmitComponentEvent = (componentEvent: OphanComponentEvent) => void;

type OphanComponentType = 'RETENTION_EPIC' | 'RETENTION_ENGAGEMENT_BANNER';

type Props = {
	submitComponentEvent: SubmitComponentEvent;
	logButtonClickWithBraze: BrazeClickHandler;
	ophanComponentType: OphanComponentType;
};

type InnerProps = {
	ophanComponentId: string;
	internalButtonId: number;
};

type TrackClick = (innerProps: InnerProps) => void;

const catchAndLogErrors = (description: string, fn: () => void): void => {
	try {
		fn();
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.error(`Error (${description}): `, e.message);
		}
	}
};

const buildTrackClick =
	({
		submitComponentEvent,
		logButtonClickWithBraze,
		ophanComponentType,
	}: Props): TrackClick =>
	({ internalButtonId, ophanComponentId }: InnerProps) => {
		catchAndLogErrors('ophanButtonClick', () => {
			// Braze displays button id from 1, but internal representation is numbered from 0
			// This ensures that the Button ID in Braze and Ophan will be the same
			const externalButtonId = internalButtonId + 1;
			submitComponentEvent({
				component: {
					componentType: ophanComponentType,
					id: ophanComponentId,
				},
				action: 'CLICK',
				value: externalButtonId.toString(10),
			});
		});

		catchAndLogErrors('brazeButtonClick', () => {
			logButtonClickWithBraze(internalButtonId);
		});
	};

export {
	BrazeClickHandler,
	SubmitComponentEvent,
	TrackClick,
	OphanComponentType,
	buildTrackClick,
};

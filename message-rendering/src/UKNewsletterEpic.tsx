import React from 'react';
import { NewsletterEpic, NewsletterSubscribeCallback } from './NewsletterEpic';
import type { TrackClick } from './tracking';
import type { OphanComponentEvent } from '@guardian/libs';

const newsletterId = '4156';

const IMAGE_URL =
	'https://i.guim.co.uk/img/media/568c6031be78dab6f6c28336010884f3ebd0f97c/0_0_1936_1936/master/1936.png?width=196&quality=45&auto=format&s=2a3630e9625620d5726c31c5cdbf4772';

export type BrazeMessageProps = {
	header?: string;
	frequency?: string;
	paragraph1?: string;
	paragraph2?: string;
	ophanComponentId?: string;
};

// componentName: string;
// brazeMessageProps: BrazeMessageProps;
// subscribeToNewsletter: NewsletterSubscribeCallback;
// countryCode?: string;
// logButtonClickWithBraze: BrazeClickHandler;
// submitComponentEvent: SubmitComponentEvent;
type BrazeClickHandler = (internalButtonId: number) => void;
type SubmitComponentEvent = (componentEvent: OphanComponentEvent) => void;

export type Props = {
	brazeMessageProps: BrazeMessageProps;
	subscribeToNewsletter: NewsletterSubscribeCallback;
	trackClick: TrackClick;
	componentName: string;
	countryCode?: string;
	logButtonClickWithBraze: BrazeClickHandler;
	submitComponentEvent: SubmitComponentEvent;
};

const COMPONENT_NAME = 'UKNewsletterEpic';

const canRender = () => {
	return true;
};
export const UKNewsletterEpic: React.FC<Props> = (props: Props) => {
	if (!canRender()) {
		return null;
	}

	return (
		<NewsletterEpic
			{...props}
			brazeMessageProps={{
				...props.brazeMessageProps,
				imageUrl: IMAGE_URL,
				newsletterId,
			}}
		></NewsletterEpic>
	);
};

export { COMPONENT_NAME };

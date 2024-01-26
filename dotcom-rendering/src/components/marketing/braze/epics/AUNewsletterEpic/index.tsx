import type { NewsletterSubscribeCallback } from '../../types/dcrTypes';
import type { TrackClick } from '../../utils/tracking';
import { NewsletterEpic } from '../NewsletterEpic';
import { canRender, COMPONENT_NAME } from './canRender';

const IMAGE_URL =
	'https://i.guim.co.uk/img/media/ad66f0f437d2e919f08ab5d402e4be9891425940/0_0_2000_2000/2000.png?width=400&quality=75&s=23aad591d8878d830e7f6a5fd43a010f';

const newsletterId = '4148';

export type BrazeMessageProps = {
	header?: string;
	frequency?: string;
	paragraph1?: string;
	paragraph2?: string;
	ophanComponentId?: string;
};

export type Props = {
	brazeMessageProps: BrazeMessageProps;
	subscribeToNewsletter: NewsletterSubscribeCallback;
	trackClick: TrackClick;
};

export const AUNewsletterEpic = (props: Props) => {
	if (!canRender(props.brazeMessageProps)) {
		return <></>;
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

import type { NewsletterSubscribeCallback } from '../../types/dcrTypes';
import type { TrackClick } from '../../utils/tracking';
import { NewsletterEpic } from '../NewsletterEpic/NewsletterEpic';
import { canRender, COMPONENT_NAME } from './canRender';

const newsletterId = '4147';

const IMAGE_URL =
	'https://i.guim.co.uk/img/media/591152b12591385d278b2c112d31a561a40a2e2d/0_1_648_648/648.png?width=196&s=be117e8d22a0c389daf49b369f726915';

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

export const DownToEarthNewsletterEpic = (props: Props) => {
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

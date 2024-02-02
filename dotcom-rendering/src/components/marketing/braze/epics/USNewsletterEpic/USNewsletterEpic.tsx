import type { NewsletterSubscribeCallback } from '../../types/dcrTypes';
import type { TrackClick } from '../../utils/tracking';
import { NewsletterEpic } from '../NewsletterEpic/NewsletterEpic';
import { canRender, COMPONENT_NAME } from './canRender';

const IMAGE_URL =
	'https://i.guim.co.uk/img/media/d0944e021b1cc7426f515fecc8034f12b7862041/0_0_784_784/master/784.png?width=196&quality=45&auto=format&s=cca73e857c5093f39ef7a2a9dc2e7ce7';

const newsletterId = '4300';

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

export const USNewsletterEpic = (props: Props) => {
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

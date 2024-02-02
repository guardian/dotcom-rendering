import type { NewsletterSubscribeCallback } from '../../types/dcrTypes';
import type { TrackClick } from '../../utils/tracking';
import { NewsletterEpic } from '../NewsletterEpic/NewsletterEpic';
import { canRender, COMPONENT_NAME } from './canRender';

// Image URL updated
const IMAGE_URL =
	'https://i.guim.co.uk/img/media/d277750131b8bb53086870cd7e6adea00aadf432/0_0_200_200/200.png?width=200&quality=75&s=7a0d75b73f805685529987bba80cbccb';

const newsletterId = '6006';

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

export const EpicNewsletter_TheGuide = (props: Props) => {
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

import { isImageUrlAllowed } from '../../utils/images';
import type { BrazeMessageProps } from './NewsletterEpic';

export const COMPONENT_NAME = 'NewsletterEpic';

export const canRender = (props: BrazeMessageProps): boolean => {
	const {
		header,
		frequency,
		paragraph1,
		imageUrl,
		newsletterId,
		ophanComponentId,
	} = props;

	if (
		!(
			header &&
			frequency &&
			paragraph1 &&
			imageUrl &&
			newsletterId &&
			ophanComponentId
		)
	) {
		return false;
	}
	if (!isImageUrlAllowed(imageUrl)) {
		console.log(`Image URL ${imageUrl} is not allowed`);
		return false;
	}
	return true;
};

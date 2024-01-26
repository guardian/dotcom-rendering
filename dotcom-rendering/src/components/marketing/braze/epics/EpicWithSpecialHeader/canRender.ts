import { isImageUrlAllowed } from '../../utils/images';
import { canRender as epicCanRender } from '../Epic/canRender';
import type { BrazeMessageProps } from '../Epic/index';

export const COMPONENT_NAME = 'EpicWithSpecialHeader';

export const canRender = (brazeMessageProps: BrazeMessageProps): boolean => {
	const canRenderResult = epicCanRender(brazeMessageProps);
	if (canRenderResult) {
		const {
			authoredEpicImageUrl,
			authoredEpicImageAltText,
			authoredEpicBylineName,
		} = brazeMessageProps;
		if (authoredEpicImageUrl && !isImageUrlAllowed(authoredEpicImageUrl)) {
			console.log(`Image URL ${authoredEpicImageUrl} is not allowed`);
			return false;
		}
		return Boolean(
			authoredEpicImageUrl &&
				authoredEpicImageAltText &&
				authoredEpicBylineName,
		);
	}
	return canRenderResult;
};

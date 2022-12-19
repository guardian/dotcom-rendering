import type { ImageBlockElement } from '../../types/content';
import type { Platform } from '../../types/platform';
import { ImageComponent } from './ImageComponent';

type Props = {
	platform: Platform;
	format: ArticleFormat;
	element: ImageBlockElement;
	hideCaption?: boolean;
	title?: string;
	isMainMedia?: boolean;
	starRating?: number;
	isAvatar?: boolean;
};

export const ImageBlockComponent = ({
	platform,
	format,
	element,
	hideCaption,
	title,
	isMainMedia,
	starRating,
	isAvatar,
}: Props) => {
	const { role } = element;
	return (
		<ImageComponent
			platform={platform}
			element={element}
			format={format}
			hideCaption={hideCaption}
			isMainMedia={isMainMedia}
			starRating={starRating}
			role={role}
			title={title}
			isAvatar={isAvatar}
		/>
	);
};

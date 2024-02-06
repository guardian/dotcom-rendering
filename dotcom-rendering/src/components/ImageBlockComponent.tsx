import type { ImageBlockElement } from '../types/content';
import { ImageComponent } from './ImageComponent';

type Props = {
	format: ArticleFormat;
	element: ImageBlockElement;
	hideCaption?: boolean;
	title?: string;
	isMainMedia?: boolean;
	starRating?: number;
	isAvatar?: boolean;
};

export const ImageBlockComponent = ({
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

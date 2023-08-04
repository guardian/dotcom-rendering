import type { Switches } from '../types/config.ts';
import type { ImageBlockElement } from '../types/content.ts';
import { ImageComponent } from './ImageComponent.tsx';

type Props = {
	format: ArticleFormat;
	element: ImageBlockElement;
	hideCaption?: boolean;
	title?: string;
	isMainMedia?: boolean;
	starRating?: number;
	isAvatar?: boolean;
	switches?: Switches;
};

export const ImageBlockComponent = ({
	format,
	element,
	hideCaption,
	title,
	isMainMedia,
	starRating,
	isAvatar,
	switches,
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
			switches={switches}
		/>
	);
};

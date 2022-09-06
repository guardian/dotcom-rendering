import { ImageComponent } from './ImageComponent';

type Props = {
	format: ArticleFormat;
	element: ImageBlockElement;
	hideCaption?: boolean;
	title?: string;
	isMainMedia?: boolean;
	starRating?: number;
	isAvatar?: boolean;
	isMainMediaTest?: boolean;
};

export const ImageBlockComponent = ({
	format,
	element,
	hideCaption,
	title,
	isMainMedia,
	starRating,
	isAvatar,
	isMainMediaTest,
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
			isMainMediaTest={isMainMediaTest}
		/>
	);
};

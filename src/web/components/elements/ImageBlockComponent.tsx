import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';

type Props = {
	format: Format;
	palette: Palette;
	element: ImageBlockElement;
	hideCaption?: boolean;
	title?: string;
	isMainMedia?: boolean;
	starRating?: number;
	isAvatar?: boolean;
};

export const ImageBlockComponent = ({
	format,
	palette,
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
			palette={palette}
			hideCaption={hideCaption}
			isMainMedia={isMainMedia}
			starRating={starRating}
			role={role}
			title={title}
			isAvatar={isAvatar}
		/>
	);
};

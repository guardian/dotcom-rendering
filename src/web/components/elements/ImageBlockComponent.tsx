import React from 'react';
import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';

type Props = {
	format: Format;
	palette: Palette;
	element: ImageBlockElement;
	hideCaption?: boolean;
	title?: string;
};

export const ImageBlockComponent = ({
	format,
	palette,
	element,
	hideCaption,
	title,
}: Props) => {
	const { role } = element;
	return (
		<ImageComponent
			element={element}
			format={format}
			palette={palette}
			hideCaption={hideCaption}
			role={role}
			title={title}
		/>
	);
};

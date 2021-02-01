import React from 'react';
import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';

type Props = {
	format: Format;
	element: ImageBlockElement;
	hideCaption?: boolean;
	title?: string;
};

export const ImageBlockComponent = ({
	format,
	element,
	hideCaption,
	title,
}: Props) => {
	const { role } = element;
	return (
		<ImageComponent
			element={element}
			format={format}
			hideCaption={hideCaption}
			role={role}
			title={title}
		/>
	);
};

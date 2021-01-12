import React from 'react';
import { ImageComponent } from '@root/src/web/components/elements/ImageComponent';

import { Display, Design } from '@guardian/types';

type Props = {
	display: Display;
	design: Design;
	element: ImageBlockElement;
	pillar: CAPIPillar;
	hideCaption?: boolean;
	title?: string;
};

export const ImageBlockComponent = ({
	display,
	design,
	element,
	pillar,
	hideCaption,
	title,
}: Props) => {
	const { role } = element;
	return (
		<ImageComponent
			display={display}
			design={design}
			element={element}
			pillar={pillar}
			hideCaption={hideCaption}
			role={role}
			title={title}
		/>
	);
};

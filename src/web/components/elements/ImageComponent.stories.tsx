/* eslint-disable jsx-a11y/aria-role */
import React from 'react';

import { Display, Design, Pillar } from '@guardian/types';
import { ImageComponent } from '@frontend/web/components/elements/ImageComponent';
import { decidePalette } from '@root/src/web/lib/decidePalette';

import { image } from './ImageBlockComponent.mocks';

export default {
	component: ImageComponent,
	title: 'Components/ImageComponent',
	parameters: {
		chromatic: { diffThreshold: 0.4 },
	},
};

export const ImageComp = () => {
	return (
		<ImageComponent
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			})}
			element={image}
			hideCaption={true}
			role="inline"
		/>
	);
};
ImageComp.story = {
	name: 'Default Story',
};

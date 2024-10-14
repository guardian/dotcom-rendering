// ----- Imports ----- //

import { Pillar } from '../../../articleFormat';
import imageFixture from 'fixtures/galleryImage';
import { article } from 'fixtures/item';
import type { ReactElement } from 'react';
import { galleryWrapperStyles } from '../layout';
import GalleryImage from './index';

// ----- Stories ----- //

const Default = (): ReactElement => (
	<div css={galleryWrapperStyles}>
		<GalleryImage
			format={{
				...article,
				theme: Pillar.News,
			}}
			image={imageFixture}
		/>
	</div>
);

// ----- Exports ----- //

export default {
	component: GalleryImage,
	title: 'AR/Editions/GalleryImage',
	parameters: {
		backgrounds: {
			default: 'gallery-template-bg',
			values: [{ name: 'gallery-template-bg', value: '#121212' }],
		},
	},
};

export { Default };

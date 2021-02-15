// ----- Imports ----- //

import { none, Pillar, some } from '@guardian/types';
import type { Image } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import { article } from 'fixtures/item';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import GalleryImage from './index';

// ----- Setup ------ //

const captionDoc = (): DocumentFragment => {
	const doc = new DocumentFragment();

	const el = document.createElement('strong');
	el.innerText = 'Philadelphia, 1964';

	doc.appendChild(el);
	return doc;
};

const srcset =
	'https://i.guim.co.uk/img/media/9a64d5d97849705a3b0e9d42b513c2cd4cf172bf/0_0_5760_3840/master/5760.jpg?width=140&quality=85&fit=bounds&s=617255b1a12f36691a15dc49c97b0ebe 140w, https://i.guim.co.uk/img/media/9a64d5d97849705a3b0e9d42b513c2cd4cf172bf/0_0_5760_3840/master/5760.jpg?width=500&quality=85&fit=bounds&s=a519fdaa0e4d795da4c66b6d24014d33 500w, https://i.guim.co.uk/img/media/9a64d5d97849705a3b0e9d42b513c2cd4cf172bf/0_0_5760_3840/master/5760.jpg?width=1000&quality=85&fit=bounds&s=7f272791411e966347baf1de11502f0c 1000w, https://i.guim.co.uk/img/media/9a64d5d97849705a3b0e9d42b513c2cd4cf172bf/0_0_5760_3840/master/5760.jpg?width=1500&quality=85&fit=bounds&s=35cb6d3d192fdc938294765a075fa8c9 1500w, https://i.guim.co.uk/img/media/9a64d5d97849705a3b0e9d42b513c2cd4cf172bf/0_0_5760_3840/master/5760.jpg?width=2000&quality=85&fit=bounds&s=0ba543a935e979b24ec35fd9d2640d16 2000w';

const image: Image = {
	kind: ElementKind.Image,
	src:
		'https://i.guim.co.uk/img/media/9a64d5d97849705a3b0e9d42b513c2cd4cf172bf/0_0_5760_3840/master/5760.jpg?width=500&quality=85&fit=bounds&s=a519fdaa0e4d795da4c66b6d24014d33',
	srcset: srcset,
	dpr2Srcset: srcset,
	alt: some('image'),
	width: 550,
	height: 550,
	role: 1,
	caption: some(captionDoc()),
	credit: none,
	nativeCaption: some('Native caption'),
};

// ----- Stories ----- //

const Default = (): ReactElement => (
	<div style={{ backgroundColor: '#121212', width: '500px' }}>
		<GalleryImage
			format={{
				...article,
				theme: selectPillar(Pillar.News),
			}}
			image={image}
		/>
	</div>
);

// const FullScreen = (): ReactElement => (
// 	<HeaderMedia
// 		item={{
// 			...article,
// 			display: Display.Immersive,
// 			theme: selectPillar(Pillar.News),
// 		}}
// 	/>
// );

// const WithStarRating = (): ReactElement => (
// 	<HeaderMedia
// 		item={{
// 			...review,
// 			theme: selectPillar(Pillar.Culture),
// 		}}
// 	/>
// );

// const Video = (): ReactElement => (
// 	<HeaderMedia
// 		item={{
// 			...article,
// 			mainMedia: video,
// 			theme: selectPillar(Pillar.News),
// 		}}
// 	/>
// );

// ----- Exports ----- //

export default {
	component: GalleryImage,
	title: 'Editions/GalleryImage',
};

export { Default };

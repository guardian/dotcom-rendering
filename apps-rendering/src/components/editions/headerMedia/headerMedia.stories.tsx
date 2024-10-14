// ----- Imports ----- //

import { ArticleDisplay, Pillar } from '../../../articleFormat';
import { article, cartoon, review } from 'fixtures/item';
import type { ReactElement } from 'react';
import HeaderMedia from './index';
import { cartoonMainMedia } from '../../../fixtures/cartoon';

// ----- Setup ------ //

const video = {
	kind: 0,
	value: {
		kind: 1,
		video: {
			posterUrl:
				'https://media.guim.co.uk/032aa99755664104fbfc4cbe45cfae0243dce462/0_0_3972_2234/master/3972.jpg',
			videoId: 'wD_bWOEuuoc',
			duration: 59,
			atomId: '26401ff7-24d0-4ba5-8882-2c32c2b379f0',
			title: 'Super Bowl LV: Tom Brady MVP as Buccaneers beat Chiefs 31-9 – video report',
		},
	},
};

// ----- Stories ----- //

const Image = (): ReactElement => (
	<HeaderMedia
		item={{
			...article,
			theme: Pillar.News,
		}}
	/>
);

const FullScreen = (): ReactElement => (
	<HeaderMedia
		item={{
			...article,
			display: ArticleDisplay.Immersive,
			theme: Pillar.News,
		}}
	/>
);

const WithStarRating = (): ReactElement => (
	<HeaderMedia
		item={{
			...review,
			theme: Pillar.Culture,
		}}
	/>
);

const Video = (): ReactElement => (
	<HeaderMedia
		item={{
			...article,
			mainMedia: video,
			theme: Pillar.News,
		}}
	/>
);

const Cartoon = (): ReactElement => (
	<HeaderMedia
		item={{
			...cartoon,
			mainMedia: cartoonMainMedia,
			theme: Pillar.Opinion,
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: HeaderMedia,
	title: 'AR/Editions/HeaderMedia',
};

export { Image, FullScreen, WithStarRating, Video, Cartoon };

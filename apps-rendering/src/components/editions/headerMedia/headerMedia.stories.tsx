// ----- Imports ----- //

import { ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { article, review } from 'fixtures/item';
import type { ReactElement } from 'react';
import HeaderMedia from './index';

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
			theme: ArticlePillar.News,
		}}
	/>
);

const FullScreen = (): ReactElement => (
	<HeaderMedia
		item={{
			...article,
			display: ArticleDisplay.Immersive,
			theme: ArticlePillar.News,
		}}
	/>
);

const WithStarRating = (): ReactElement => (
	<HeaderMedia
		item={{
			...review,
			theme: ArticlePillar.Culture,
		}}
	/>
);

const Video = (): ReactElement => (
	<HeaderMedia
		item={{
			...article,
			mainMedia: video,
			theme: ArticlePillar.News,
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: HeaderMedia,
	title: 'AR/Editions/HeaderMedia',
};

export { Image, FullScreen, WithStarRating, Video };

// ----- Imports ----- //

import { Display, Pillar } from '@guardian/types';
import { article, review } from 'fixtures/item';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import HeaderMedia from './index';

// ----- Setup ------ //

const image = {
	kind: 0,
	value: {
		kind: 0,
		image: {
			src:
				'https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=500&quality=85&fit=bounds&s=6d0b66dcc9233754f89c07e74c44158f',
			srcset:
				'https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=140&quality=85&fit=bounds&s=d0c466d24ac750ce4b1c9fe8a40fbdd3 140w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=500&quality=85&fit=bounds&s=6d0b66dcc9233754f89c07e74c44158f 500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1000&quality=85&fit=bounds&s=8f38bcd742d1ae10a3f01508e31c7f5f 1000w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1500&quality=85&fit=bounds&s=45e33e51a33abe2b327882eb9de69d04 1500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=2000&quality=85&fit=bounds&s=5bc078a6facde21b41d2c649ac36e01b 2000w',
			dpr2Srcset:
				'https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=140&quality=45&fit=bounds&s=5b4d13a66861d58dff15b371d11043ae 140w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=500&quality=45&fit=bounds&s=e043c3329b11500e9b907ac2c93275ff 500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1000&quality=45&fit=bounds&s=bb69b200c27229f685132af3eddd10b3 1000w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=1500&quality=45&fit=bounds&s=5ea519b33cadfdca59a7d7b1ce570631 1500w, https://i.guim.co.uk/img/media/305593466a8bbd045d233b207b368a5dbcfd08f4/0_101_3000_1800/master/3000.jpg?width=2000&quality=45&fit=bounds&s=fe2810561ff271c2a97583ca67cd97e8 2000w',
			alt: 'image',
			width: 3000,
			height: 1800,
			caption: {},
			credit: { kind: 0, value: 'Photograph: Philip Keith/The Guardian' },
			nativeCaption: {
				kind: 0,
				value:
					'‘They could kill me any day; that’s all right with me. I am going down swinging, brother’ … West.',
			},
			role: 0,
		},
	},
};

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
			title:
				'Super Bowl LV: Tom Brady MVP as Buccaneers beat Chiefs 31-9 – video report',
		},
	},
};

// ----- Stories ----- //

const Image = (): ReactElement => (
	<HeaderMedia
		item={{
			...article,
			mainMedia: image,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const FullScreen = (): ReactElement => (
	<HeaderMedia
		item={{
			...article,
			mainMedia: image,
			display: Display.Immersive,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const WithStarRating = (): ReactElement => (
	<HeaderMedia
		item={{
			...review,
			mainMedia: image,
			theme: selectPillar(Pillar.Culture),
		}}
	/>
);

const Video = (): ReactElement => (
	<HeaderMedia
		item={{
			...article,
			mainMedia: video,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: HeaderMedia,
	title: 'Editions/HeaderMedia',
};

export { Image, FullScreen, WithStarRating, Video };

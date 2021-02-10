// ----- Imports ----- //

import { Design, Display, none, Pillar, some, toOption } from '@guardian/types';
import type { Option } from '@guardian/types';
import { parse } from 'client/parser';
import type { Contributor } from 'contributor';
import type { Image } from 'image';
import type { Item, Review } from 'item';
import { pipe2 } from 'lib';

// ----- Fixture ----- //

const parser = new DOMParser();
const parseHtml = parse(parser);

const headline =
	'Reclaimed lakes and giant airports: how Mexico City might have looked';

const standfirst: Option<DocumentFragment> = pipe2(
	'<p>The Mexican capital was founded by Aztecs on an island in a vast lake. No wonder water flows through so many of its unbuilt projects</p>',
	parseHtml,
	toOption,
);

const bylineHtml: Option<DocumentFragment> = pipe2(
	'<a href="https://theguardian.com">Jane Smith</a> Editor of things',
	parseHtml,
	toOption,
);

const srcset =
	'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=32&quality=85&fit=bounds&s=100fc280274e40946afb34d4b561ce9f 32w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e 64w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=128&quality=85&fit=bounds&s=35b6ce614cae19fbdcdefa55a670eda5 128w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=192&quality=85&fit=bounds&s=930a05d87b62a1f613ff76f3ee0c97a0 192w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=256&quality=85&fit=bounds&s=8c44b90de342114bd3bf6145767d4b31 256w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=400&quality=85&fit=bounds&s=8491504dfb944eee7ef173e739cb4f74 400w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=600&quality=85&fit=bounds&s=668fc2d7278f6c4a553f806c9b2d47d3 600w';

const image: Image = {
	src:
		'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e',
	srcset: srcset,
	dpr2Srcset: srcset,
	alt: some('image'),
	width: 550,
	height: 550,
	role: 1,
	caption: none,
	nativeCaption: none,
	credit: none,
};

const contributors: Contributor[] = [
	{
		id: 'profile/hannah-j-davies',
		apiUrl: 'https://content.guardianapis.com/profile/hannah-j-davies',
		name: 'Hannah J Davies',
		image: some(image),
	},
];

const mainMedia = {
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

const fields = {
	theme: Pillar.News,
	display: Display.Standard,
	body: [],
	headline: headline,
	standfirst: standfirst,
	byline: '',
	bylineHtml: bylineHtml,
	publishDate: none,
	contributors: contributors,
	mainMedia: mainMedia,
	series: some({
		id: '',
		type: 0,
		webTitle: '',
		webUrl: '',
		apiUrl: '',
		references: [],
	}),
	commentable: false,
	tags: [],
	shouldHideReaderRevenue: false,
	branding: none,
	internalShortId: none,
	commentCount: none,
	relatedContent: none,
};

const article: Item = {
	design: Design.Article,
	...fields,
};

const analysis: Item = {
	design: Design.Analysis,
	...fields,
};

const feature: Item = {
	design: Design.Feature,
	...fields,
};

const review: Review = {
	design: Design.Review,
	starRating: 4,
	...fields,
};

const advertisementFeature: Item = {
	design: Design.AdvertisementFeature,
	logo: none,
	...fields,
};

const comment: Item = {
	design: Design.Comment,
	...fields,
};

const interview: Item = {
	design: Design.Interview,
	...fields,
};

const media: Item = {
	design: Design.Media,
	...fields,
};

// ----- Exports ----- //

export {
	article,
	analysis,
	feature,
	review,
	advertisementFeature,
	comment,
	interview,
	media,
};

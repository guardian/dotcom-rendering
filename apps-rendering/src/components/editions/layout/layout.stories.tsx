// ----- Imports ----- //
import type { Tag } from '@guardian/content-api-models/v1/tag';
import {
	ArticleDisplay,
	ArticleElementRole,
	ArticlePillar,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { none, some } from '@guardian/types';
import type { Contributor } from 'contributor';
import {
	analysis,
	article,
	cartoon,
	comment,
	correction,
	editorial,
	feature,
	interview,
	letter,
	matchReport,
	media,
	review,
} from 'fixtures/item';
import type { Image } from 'image';
import { Optional } from 'optional';
import type { ReactElement } from 'react';
import Layout from '.';

// ----- Setup ------ //

const srcset =
	'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=32&quality=85&fit=bounds&s=100fc280274e40946afb34d4b561ce9f 32w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e 64w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=128&quality=85&fit=bounds&s=35b6ce614cae19fbdcdefa55a670eda5 128w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=192&quality=85&fit=bounds&s=930a05d87b62a1f613ff76f3ee0c97a0 192w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=256&quality=85&fit=bounds&s=8c44b90de342114bd3bf6145767d4b31 256w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=400&quality=85&fit=bounds&s=8491504dfb944eee7ef173e739cb4f74 400w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=600&quality=85&fit=bounds&s=668fc2d7278f6c4a553f806c9b2d47d3 600w';

const image: Image = {
	src: 'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e',
	srcset: srcset,
	dpr2Srcset: srcset,
	alt: some('image'),
	width: 550,
	height: 550,
	role: ArticleElementRole.Immersive,
	caption: none,
	nativeCaption: none,
	credit: none,
	imageSubtype: Optional.none(),
};

const contributors: Contributor[] = [
	{
		id: 'emmabrockes',
		name: 'Emma Bookes',
		image: some(image),
		apiUrl: '',
	},
];

const getTag = (id: string, webTitle: string): Tag => ({
	id,
	type: 6,
	webTitle,
	webUrl: '',
	apiUrl: '',
	references: [],
	internalName: '',
});

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Layout
		item={{
			...article,
			webUrl: 'https://www.theguardian.com',
			theme: ArticlePillar.News,
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Layout
		item={{
			...analysis,
			webUrl: 'https://www.theguardian.com',
			tags: [getTag('tone/analysis', 'View from the Guardian ')],
			theme: ArticlePillar.Lifestyle,
		}}
	/>
);

const Editorial = (): ReactElement => (
	<Layout
		item={{
			...editorial,
			tags: [getTag('tone/editorials', 'View from the Guardian ')],
			webUrl: 'https://www.theguardian.com',
			theme: ArticlePillar.Opinion,
		}}
	/>
);

const Feature = (): ReactElement => (
	<Layout
		item={{
			...feature,
			webUrl: 'https://www.theguardian.com',
			theme: ArticlePillar.Sport,
		}}
	/>
);

const Review = (): ReactElement => (
	<Layout
		item={{
			...review,
			webUrl: 'https://www.theguardian.com',
			theme: ArticlePillar.Culture,
		}}
	/>
);

const Showcase = (): ReactElement => (
	<Layout
		item={{
			...article,
			webUrl: 'https://www.theguardian.com',
			display: ArticleDisplay.Showcase,
			theme: ArticlePillar.News,
		}}
	/>
);

const Interview = (): ReactElement => (
	<Layout
		item={{
			...interview,
			webUrl: 'https://www.theguardian.com',
			theme: ArticlePillar.Sport,
		}}
	/>
);

const Comment = (): ReactElement => (
	<Layout
		item={{
			...comment,
			webUrl: 'https://www.theguardian.com',
			contributors,
			theme: ArticlePillar.News,
		}}
	/>
);

const Letter = (): ReactElement => (
	<Layout
		item={{
			...letter,
			webUrl: 'https://www.theguardian.com',
			tags: [getTag('tone/letters', 'Letters ')],
			theme: ArticlePillar.Opinion,
		}}
	/>
);

const Correction = (): ReactElement => (
	<Layout
		item={{
			...correction,
			tags: [
				getTag(
					'theguardian/series/correctionsandclarifications',
					'Corrections and Clarifications ',
				),
			],
			theme: ArticlePillar.News,
		}}
	/>
);

const MatchReport = (): ReactElement => (
	<Layout
		item={{
			...matchReport,
			webUrl: 'https://www.theguardian.com',
			tags: [getTag('tone/sport', 'Sport ')],
			theme: ArticlePillar.Sport,
		}}
	/>
);

const Cartoon = (): ReactElement => (
	<Layout
		item={{
			...cartoon,
			webUrl: 'https://www.theguardian.com',
			tags: [getTag('type/picture', 'cartoon')],
		}}
	/>
);

const Gallery = (): ReactElement => (
	<Layout
		item={{
			...media,
			webUrl: 'https://www.theguardian.com',
			theme: ArticlePillar.News,
		}}
	/>
);

Gallery.parameters = {
	backgrounds: {
		default: 'gallery-template-bg',
		values: [{ name: 'gallery-template-bg', value: '#121212' }],
	},
};

// ----- Exports ----- //

export default {
	component: Layout,
	title: 'Editions/Layouts',
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			diffThreshold: 0.4,
			viewports: [breakpoints.mobile, breakpoints.tablet],
		},
	},
};

export {
	Default,
	Analysis,
	Feature,
	Review,
	Showcase,
	Interview,
	Comment,
	Editorial,
	Gallery,
	Letter,
	Correction,
	MatchReport,
	Cartoon,
};

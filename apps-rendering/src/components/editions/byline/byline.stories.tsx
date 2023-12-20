// ----- Imports ----- //

import { ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { none, some } from '../../../../vendor/@guardian/types/index';
import { parse } from 'client/parser';
import type { Contributor } from 'contributor';
import {
	analysis,
	article,
	comment,
	feature,
	interview,
	review,
} from 'fixtures/item';
import type { Image } from 'image';
import { Optional } from 'optional';
import type { ReactElement } from 'react';
import Byline from './index';

// ----- Setup ----- //

const srcset =
	'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=32&quality=85&fit=bounds&s=100fc280274e40946afb34d4b561ce9f 32w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e 64w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=128&quality=85&fit=bounds&s=35b6ce614cae19fbdcdefa55a670eda5 128w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=192&quality=85&fit=bounds&s=930a05d87b62a1f613ff76f3ee0c97a0 192w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=256&quality=85&fit=bounds&s=8c44b90de342114bd3bf6145767d4b31 256w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=400&quality=85&fit=bounds&s=8491504dfb944eee7ef173e739cb4f74 400w, https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=600&quality=85&fit=bounds&s=668fc2d7278f6c4a553f806c9b2d47d3 600w';

const image: Image = {
	src: 'https://i.guim.co.uk/img/uploads/2017/10/06/Emma-Brockes,-L.png?width=64&quality=85&fit=bounds&s=b6b6831a7a599a815002b8a4c041342e',
	srcset: srcset,
	dpr2Srcset: srcset,
	alt: some('image'),
	width: 550,
	height: 550,
	role: 1,
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

const parser = new DOMParser();
const parseByline = parse(parser);

const profileLink = 'https://theguardian.com';
const byline = 'Jane Smith';
const job = 'Editor of things';

const mockBylineHtml = parseByline(
	`<a href="${profileLink}">${byline}</a> ${job}`,
).toOption();

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Byline
		item={{
			...article,
			display: ArticleDisplay.Standard,
			bylineHtml: mockBylineHtml,
			theme: ArticlePillar.News,
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Byline
		item={{
			...analysis,
			bylineHtml: mockBylineHtml,
			theme: ArticlePillar.News,
		}}
	/>
);

const Feature = (): ReactElement => (
	<Byline
		item={{
			...feature,
			bylineHtml: mockBylineHtml,
			theme: ArticlePillar.News,
		}}
	/>
);

const Review = (): ReactElement => (
	<Byline
		item={{
			...review,
			bylineHtml: mockBylineHtml,
			theme: ArticlePillar.News,
		}}
	/>
);

const Showcase = (): ReactElement => (
	<Byline
		item={{
			...article,
			display: ArticleDisplay.Showcase,
			bylineHtml: mockBylineHtml,
			theme: ArticlePillar.News,
		}}
	/>
);

const Interview = (): ReactElement => (
	<Byline
		item={{
			...interview,
			bylineHtml: mockBylineHtml,
			theme: ArticlePillar.News,
		}}
	/>
);

const Comment = (): ReactElement => (
	<div
		style={{
			marginTop: '64px',
		}}
	>
		<Byline
			item={{
				...comment,
				bylineHtml: mockBylineHtml,
				theme: ArticlePillar.News,
				contributors: contributors,
			}}
		/>
	</div>
);

// ----- Exports ----- //

export default {
	component: Byline,
	title: 'AR/Editions/Byline',
};

export { Default, Analysis, Feature, Review, Showcase, Interview, Comment };

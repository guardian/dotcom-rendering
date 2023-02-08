// ----- Imports ----- //

import {
	ArticleDisplay,
	ArticleElementRole,
	ArticlePillar,
} from '@guardian/libs';
import { none, some } from '@guardian/types';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import type { Contributor } from 'contributor';
import {
	analysis,
	article,
	comment,
	feature,
	interview,
	media,
	review,
} from 'fixtures/item';
import type { Image } from 'image';
import { Optional } from 'optional';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Headline from '.';

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

const hasContributor = (): { contributors: Contributor[] } => {
	return {
		contributors: boolean('Contributors', true) ? contributors : [],
	};
};

const isImmersive = (): { display: ArticleDisplay } => {
	return {
		display: boolean('Immersive', false)
			? ArticleDisplay.Immersive
			: ArticleDisplay.Standard,
	};
};

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Headline
		item={{
			...article,
			...isImmersive(),
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Headline
		item={{
			...analysis,
			...isImmersive(),
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Feature = (): ReactElement => (
	<Headline
		item={{
			...feature,
			...isImmersive(),
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Review = (): ReactElement => (
	<Headline
		item={{
			...review,
			theme: selectPillar(ArticlePillar.Culture),
		}}
	/>
);

const Showcase = (): ReactElement => (
	<Headline
		item={{
			...review,
			...isImmersive(),
			display: ArticleDisplay.Showcase,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Interview = (): ReactElement => (
	<Headline
		item={{
			...interview,
			...isImmersive(),
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Comment = (): ReactElement => (
	<Headline
		item={{
			...comment,
			...isImmersive(),
			...hasContributor(),
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Media = (): ReactElement => (
	<Headline
		item={{
			...media,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Headline,
	title: 'AR/Editions/Headline',
	decorators: [withKnobs],
};

export {
	Default,
	Analysis,
	Feature,
	Review,
	Showcase,
	Interview,
	Comment,
	Media,
};

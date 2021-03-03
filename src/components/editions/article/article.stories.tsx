// ----- Imports ----- //
import type { Tag } from '@guardian/content-api-models/v1/tag';
import { Display, Pillar } from '@guardian/types';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import {
	analysis,
	article,
	comment,
	feature,
	interview,
	media,
	review,
	editorial,
} from 'fixtures/item';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Article from '../article';

// ----- Setup ------ //

const isImmersive = (): { display: Display } => {
	return {
		display: boolean('Immersive', false)
			? Display.Immersive
			: Display.Standard,
	};
};

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
	<Article
		item={{
			...article,
			...isImmersive(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Article
		item={{
			...analysis,
			...isImmersive(),
			theme: selectPillar(Pillar.Lifestyle),
		}}
	/>
);

const Editorial = (): ReactElement => (
	<Article
		item={{
			...editorial,
			tags: [getTag('tone/editorials', 'View from the Guardian ')],
			...isImmersive(),
			theme: selectPillar(Pillar.Opinion),
		}}
	/>
);

const Feature = (): ReactElement => (
	<Article
		item={{
			...feature,
			...isImmersive(),
			theme: selectPillar(Pillar.Sport),
		}}
	/>
);

const Review = (): ReactElement => (
	<Article
		item={{
			...review,
			theme: selectPillar(Pillar.Culture),
		}}
	/>
);

const Showcase = (): ReactElement => (
	<Article
		item={{
			...article,
			display: Display.Showcase,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Interview = (): ReactElement => (
	<Article
		item={{
			...interview,
			...isImmersive(),
			theme: selectPillar(Pillar.Sport),
		}}
	/>
);

const Comment = (): ReactElement => (
	<Article
		item={{
			...comment,
			...isImmersive(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Media = (): ReactElement => (
	<Article
		item={{
			...media,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Article,
	title: 'Editions/Article',
	decorators: [withKnobs],
	parameters: { layout: 'fullscreen' },
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
	Editorial,
};

// ----- Imports ----- //

import { ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import {
	article,
	articleWithStandfirstLink,
	comment,
	feature,
	review,
} from 'fixtures/item';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Standfirst from './standfirst';

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Standfirst
		item={{
			...article,
			display: boolean('Immersive', false)
				? ArticleDisplay.Immersive
				: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Review = (): ReactElement => (
	<Standfirst
		item={{
			...review,
			display: boolean('Immersive', false)
				? ArticleDisplay.Immersive
				: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.Culture),
		}}
	/>
);

const Feature = (): ReactElement => (
	<Standfirst
		item={{
			...feature,
			display: boolean('Immersive', false)
				? ArticleDisplay.Immersive
				: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.Sport),
		}}
	/>
);

const Comment = (): ReactElement => (
	<Standfirst
		item={{
			...comment,
			display: boolean('Immersive', false)
				? ArticleDisplay.Immersive
				: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.Opinion),
		}}
	/>
);

const Link = (): ReactElement => (
	<Standfirst
		item={{
			...articleWithStandfirstLink,
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Standfirst,
	title: 'AR/Standfirst',
	decorators: [withKnobs],
};

export { Default, Review, Feature, Comment, Link };

// ----- Imports ----- //

import { ArticleDisplay, Pillar } from '../../articleFormat';
import { some } from '../../../vendor/@guardian/types/index';
import { analysis, article, feature, labs, review } from 'fixtures/item';
import type { ReactElement } from 'react';
import Headline from './';

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Headline
		item={{
			...article,
			display: ArticleDisplay.Standard,
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Headline
		item={{
			...analysis,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		}}
	/>
);

const Feature = (): ReactElement => (
	<Headline
		item={{
			...feature,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		}}
	/>
);

const Review = (): ReactElement => (
	<Headline
		item={{
			...review,
			starRating: some(3),
			display: ArticleDisplay.Standard,
		}}
	/>
);

const Labs = (): ReactElement => (
	<Headline
		item={{
			...labs,
			display: ArticleDisplay.Standard,
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Headline,
	title: 'AR/Headline',
};

export { Default, Analysis, Feature, Review, Labs };

// ----- Imports ----- //

import { Display, Pillar } from '@guardian/types';
import { boolean, radios, withKnobs } from '@storybook/addon-knobs';
import { analysis, article, feature, labs, review } from 'fixtures/item';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Headline from './headline';

// ----- Setup ----- //

const starRating = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Headline
		item={{
			...article,
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Headline
		item={{
			...analysis,
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Feature = (): ReactElement => (
	<Headline
		item={{
			...feature,
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Review = (): ReactElement => (
	<Headline
		item={{
			...review,
			starRating: radios('Rating', starRating, 3),
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
		}}
	/>
);

const Labs = (): ReactElement => (
	<Headline
		item={{
			...labs,
			display: Display.Standard,
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Headline,
	title: 'AR/Headline',
	decorators: [withKnobs],
};

export { Default, Analysis, Feature, Review, Labs };

// ----- Imports ----- //

import { Display, Pillar } from '@guardian/types';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { article, comment, feature, review } from 'fixtures/item';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Standfirst from './standfirst';

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Standfirst
		item={{
			...article,
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Review = (): ReactElement => (
	<Standfirst
		item={{
			...review,
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
			theme: selectPillar(Pillar.Culture),
		}}
	/>
);

const Feature = (): ReactElement => (
	<Standfirst
		item={{
			...feature,
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
			theme: selectPillar(Pillar.Sport),
		}}
	/>
);

const Comment = (): ReactElement => (
	<Standfirst
		item={{
			...comment,
			display: boolean('Immersive', false)
				? Display.Immersive
				: Display.Standard,
			theme: selectPillar(Pillar.Opinion),
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Standfirst,
	title: 'Standfirst',
	decorators: [withKnobs],
};

export { Default, Review, Feature, Comment };

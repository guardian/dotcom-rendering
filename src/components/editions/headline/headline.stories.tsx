// ----- Imports ----- //

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
} from 'fixtures/item';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Headline from '.';

// ----- Setup ------ //

const isImmersive = (): { display: Display } => {
	return {
		display: boolean('Immersive', false)
			? Display.Immersive
			: Display.Standard,
	};
};

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Headline
		item={{
			...article,
			...isImmersive(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Headline
		item={{
			...analysis,
			...isImmersive(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Feature = (): ReactElement => (
	<Headline
		item={{
			...feature,
			...isImmersive(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Review = (): ReactElement => (
	<Headline
		item={{
			...review,
			theme: selectPillar(Pillar.Culture),
		}}
	/>
);

const Showcase = (): ReactElement => (
	<Headline
		item={{
			...review,
			...isImmersive(),
			display: Display.Showcase,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Interview = (): ReactElement => (
	<Headline
		item={{
			...interview,
			...isImmersive(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Comment = (): ReactElement => (
	<Headline
		item={{
			...comment,
			...isImmersive(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Media = (): ReactElement => (
	<Headline
		item={{
			...media,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Headline,
	title: 'Editions/Headline',
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

// ----- Imports ----- //

import type { Tag } from '@guardian/content-api-models/v1/tag';
import { Display, Pillar } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import Series from 'components/series';
import { article, interview } from 'fixtures/item';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Headline from '.';

// ----- Setup ------ //

const getTags = (id: string, webTitle: string): Tag[] => [
	{
		id,
		type: 6,
		webTitle,
		webUrl: '',
		apiUrl: '',
		references: [],
		internalName: '',
	},
];

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Headline
		item={{
			...article,
			tags: getTags('lifeandstyle/running', 'Running'),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Interview = (): ReactElement => (
	<Headline
		item={{
			...interview,
			tags: getTags('tone/interview', 'Interview'),
			theme: selectPillar(Pillar.Culture),
		}}
	/>
);

const Immersive = (): ReactElement => (
	<Headline
		item={{
			...article,
			tags: getTags('news/series/the-long-read', 'The long read'),
			display: Display.Immersive,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Series,
	title: 'AR/Editions/Series',
	decorators: [withKnobs],
};

export { Default, Interview, Immersive };

// ----- Imports ----- //

import type { Tag } from '@guardian/content-api-models/v1/tag';
import { ArticleDisplay, Pillar } from '../../../articleFormat';
import Series from 'components/Series';
import { article, interview } from 'fixtures/item';
import type { ReactElement } from 'react';
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
			theme: Pillar.News,
		}}
	/>
);

const Interview = (): ReactElement => (
	<Headline
		item={{
			...interview,
			tags: getTags('tone/interview', 'Interview'),
			theme: Pillar.Culture,
		}}
	/>
);

const Immersive = (): ReactElement => (
	<Headline
		item={{
			...article,
			tags: getTags('news/series/the-long-read', 'The long read'),
			display: ArticleDisplay.Immersive,
			theme: Pillar.News,
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Series,
	title: 'AR/Editions/Series',
};

export { Default, Interview, Immersive };

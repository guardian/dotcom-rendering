// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { none } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { selectPillar } from 'storybookHelpers';
import Follow from './follow';

// ----- Stories ----- //

const Default: FC = () => (
	<Follow
		contributors={[
			{
				id: 'profile/janesmith',
				apiUrl: 'janesmith.com',
				name: 'Jane Smith',
				image: none,
			},
		]}
		theme={selectPillar(ArticlePillar.News)}
		design={ArticleDesign.Standard}
		display={ArticleDisplay.Standard}
	/>
);

// ----- Exports ----- //

export default {
	component: Follow,
	title: 'AR/Follow',
	decorators: [withKnobs],
};

export { Default };

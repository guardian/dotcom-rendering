// ----- Imports ----- //

import { Design, Display, none, Pillar } from '@guardian/types';
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
		theme={selectPillar(Pillar.News)}
		design={Design.Article}
		display={Display.Standard}
	/>
);

// ----- Exports ----- //

export default {
	component: Follow,
	title: 'Follow',
	decorators: [withKnobs],
};

export { Default };

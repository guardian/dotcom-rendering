// ----- Imports ----- //

import { Design, Display, Pillar } from '@guardian/types/Format';
import { none } from '@guardian/types/option';
import { withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import React from 'react';
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

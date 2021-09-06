// ----- Imports ----- //

import { Design, Display, Pillar, some } from '@guardian/types';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { selectPillar } from 'storybookHelpers';
import CommentCount from './commentCount';

// ----- Stories ----- //

const Default: FC = () => (
	<CommentCount
		count={some(number('Count', 1234, { min: 0 }))}
		theme={selectPillar(Pillar.News)}
		design={Design.Article}
		display={Display.Standard}
		commentable={boolean('Commentable', true)}
	/>
);

// ----- Exports ----- //

export default {
	component: CommentCount,
	title: 'AR/CommentCount',
	decorators: [withKnobs],
};

export { Default };

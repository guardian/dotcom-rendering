// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { some } from '@guardian/types';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { selectPillar } from 'storybookHelpers';
import CommentCount from './commentCount';

// ----- Stories ----- //

const Default: FC = () => (
	<CommentCount
		count={some(number('Count', 1234, { min: 0 }))}
		theme={selectPillar(ArticlePillar.News)}
		design={ArticleDesign.Standard}
		display={ArticleDisplay.Standard}
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

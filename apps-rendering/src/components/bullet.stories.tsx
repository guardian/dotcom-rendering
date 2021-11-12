// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { selectPillar } from 'storybookHelpers';
import Bullet from './bullet';

// ----- Stories ----- //

const Default: FC = () => (
	<Bullet
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
		text="• Lorem ipsum"
	/>
);

// ----- Exports ----- //

export default {
	component: Bullet,
	title: 'AR/Bullet',
	decorators: [withKnobs],
};

export { Default };

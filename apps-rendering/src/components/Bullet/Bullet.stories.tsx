// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { FC } from 'react';
import Bullet from './';

// ----- Stories ----- //

const Default: FC = () => (
	<Bullet
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		text="• Lorem ipsum"
	/>
);

// ----- Exports ----- //

export default {
	component: Bullet,
	title: 'AR/Bullet',
};

export { Default };

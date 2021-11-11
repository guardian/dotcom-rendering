// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { FC } from 'react';
import { selectDesign, selectPillar } from 'storybookHelpers';
import ListItem from './listItem';

// ----- Stories ----- //

const Default: FC = () => (
	<ListItem
		format={{
			design: selectDesign(ArticleDesign.Standard),
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
	>
		A bullet point
	</ListItem>
);

// ----- Exports ----- //

export default {
	component: ListItem,
	title: 'AR/ListItem',
};

export { Default };

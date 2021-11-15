// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { FC } from 'react';
import List from './list';
import ListItem from './listItem';

// ----- Setup ----- //

const listItem = (
	<ListItem
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
	>
		A bullet point
	</ListItem>
);

// ----- Stories ----- //

const Default: FC = () => <List>{[listItem, listItem, listItem]}</List>;

// ----- Exports ----- //

export default {
	component: List,
	title: 'AR/List',
};

export { Default };

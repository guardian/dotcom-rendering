// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { FC } from 'react';
import ListItem from './listItem';
import OrderedList from './orderedList';

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

const Default: FC = () => (
	<OrderedList>{[listItem, listItem, listItem]}</OrderedList>
);

// ----- Exports ----- //

export default {
	component: OrderedList,
	title: 'AR/OrderedList',
};

export { Default };

// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import ListItem from 'components/ListItem';
import type { FC } from 'react';
import List from './';

// ----- Setup ----- //

const format = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticlePillar.News,
};

const listItem = <ListItem>A bullet point</ListItem>;

// ----- Stories ----- //

const Default: FC = () => (
	<List usePillarColour={false} format={format}>
		{[listItem, listItem, listItem]}
	</List>
);

// ----- Exports ----- //

export default {
	component: List,
	title: 'AR/List',
};

export { Default };

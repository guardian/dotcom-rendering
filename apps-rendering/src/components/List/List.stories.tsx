// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, Pillar } from '../../articleFormat';
import ListItem from 'components/ListItem';
import List from './';

// ----- Setup ----- //

const format = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

const listItem = <ListItem>A bullet point</ListItem>;

// ----- Stories ----- //

const Default = () => (
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

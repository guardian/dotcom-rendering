// ----- Imports ----- //

import { Design, Display, Pillar } from '@guardian/types';
import type { FC } from 'react';
import ListItem from './listItem';
import OrderedList from './orderedList';

// ----- Setup ----- //

const listItem = (
	<ListItem
		format={{
			design: Design.Article,
			display: Display.Standard,
			theme: Pillar.News,
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

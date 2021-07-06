// ----- Imports ----- //

import { Design, Display, Pillar } from '@guardian/types';
import type { FC } from 'react';
import List from './list';
import ListItem from './listItem';

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

const Default: FC = () => <List>{[listItem, listItem, listItem]}</List>;

// ----- Exports ----- //

export default {
	component: List,
	title: 'List',
};

export { Default };

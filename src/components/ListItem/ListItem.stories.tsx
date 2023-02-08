// ----- Imports ----- //

import type { FC } from 'react';
import ListItem from './';

// ----- Stories ----- //

const Default: FC = () => <ListItem>A bullet point</ListItem>;

// ----- Exports ----- //

export default {
	component: ListItem,
	title: 'AR/ListItem',
};

export { Default };

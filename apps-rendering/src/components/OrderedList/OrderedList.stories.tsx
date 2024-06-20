// ----- Imports ----- //

import ListItem from 'components/ListItem';
import OrderedList from './';

// ----- Setup ----- //

const listItem = <ListItem>A bullet point</ListItem>;

// ----- Stories ----- //

const Default = () => (
	<OrderedList>{[listItem, listItem, listItem]}</OrderedList>
);

// ----- Exports ----- //

export default {
	component: OrderedList,
	title: 'AR/OrderedList',
};

export { Default };

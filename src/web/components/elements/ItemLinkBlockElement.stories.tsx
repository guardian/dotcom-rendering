import { ItemLinkBlockElement } from './ItemLinkBlockElement';

export default {
	component: ItemLinkBlockElement,
	title: 'Components/ItemLinkBlockElement',
};

export const Default = () => (
	<ItemLinkBlockElement html='<ul> <li><p><strong>Title:</strong> <a href="https://www.theguardian.com">Link text</a></p></li> </ul>' />
);

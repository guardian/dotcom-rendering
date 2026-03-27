import preview from '../../.storybook/preview';
import { ItemLinkBlockElement } from './ItemLinkBlockElement';

const meta = preview.meta({
	component: ItemLinkBlockElement,
	title: 'Components/ItemLinkBlockElement',
});

export const Default = meta.story(() => (
	<ItemLinkBlockElement html='<ul> <li><p><strong>Title:</strong> <a href="https://www.theguardian.com">Link text</a></p></li> </ul>' />
));

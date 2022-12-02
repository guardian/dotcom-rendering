import type { CartoonType, Variant } from './Cartoon';
import { Cartoon } from './Cartoon';

const variant: Variant = {
	viewportSize: 'small',
	images: [
		{
			height: 2074,
			width: 3110,
			mimeType: 'image/jpeg',
			file: 'https://media.guim.co.uk/7cffd9d6809318a9d92c719c473d193caf95d601/0_0_3110_2074/3110.jpg',
		},
		{
			height: 2074,
			width: 3110,
			mimeType: 'image/jpeg',
			file: 'https://media.guim.co.uk/7cffd9d6809318a9d92c719c473d193caf95d601/0_0_3110_2074/master/3110.jpg',
		},
	],
};

const fixture1: CartoonType = {
	type: 'cartoon',
	caption: 'hello world',
	displayCredit: true,
	alt: 'string',
	credit: 'string',
	variants: [variant],
	transcript: '<strong>Strong text</strong><br /><a href="theguardian.com">a link</a><br /><ul><li>list</li><li>items</li></ul>',
};

export default {
	component: Cartoon,
	title: 'Components/Cartoon',
};

export const Default = () => <Cartoon cartoon={fixture1} />;

Default.story = {
	name: 'for videos',
};

import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ProductLinkElementButton } from './ProductLinkElementButton';

const meta = {
	component: ProductLinkElementButton,
	title: 'Components/ProductLinkButton',
	parameters: {
		layout: 'padded',
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},

	args: {
		label: '£6.50 for 350g at Ollie’s Kimchi',
		url: 'https://ollieskimchi.co.uk/shop/ols/products/ollies-kimchi',
		priority: 'primary',
	},
} satisfies Meta<typeof ProductLinkElementButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithLongLabel = {
	args: {
		label: '£10.99 for a 5 x 5 x 50cm sheet at Amazon',
	},
} satisfies Story;

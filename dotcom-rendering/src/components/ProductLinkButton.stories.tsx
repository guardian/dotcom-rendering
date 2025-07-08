import type { Meta, StoryObj } from '@storybook/react';
import { ProductLinkButton } from './ProductLinkButton';

const meta = {
	component: ProductLinkButton,
	title: 'Components/ProductLinkButton',
	parameters: {
		layout: 'padded',
	},
	args: {
		label: '£6.50 for 350g at Ollie’s Kimchi',
		url: 'https://ollieskimchi.co.uk/shop/ols/products/ollies-kimchi',
	},
} satisfies Meta<typeof ProductLinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

import { space } from '@guardian/source/foundations';
import type { StoryFn } from '@storybook/react';
import { ProductLinkButton } from './ProductLinkButton';

export default {
	component: ProductLinkButton,
	title: 'Components/ProductLinkButton',
	decorators: [
		(Story: StoryFn) => (
			<div style={{ padding: `${space[3]}px` }}>
				<Story />
			</div>
		),
	],
};

export const ProductLinkButtonStory = () => {
	return (
		<ProductLinkButton
			label="£6.50 for 350g at Ollie’s Kimchi"
			url="https://ollieskimchi.co.uk/shop/ols/products/ollies-kimchi"
		/>
	);
};

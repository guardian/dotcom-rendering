import type { StoryFn } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { FormatBoundary } from './FormatBoundary';
import type { Product } from './ProductCard';
import { ProductCarousel } from './ProductCarousel.importable';

const productData: Product[] = [
	{
		reviewHeading: 'Best all-rounder:',
		name: 'Kenko Japanese mayonnaise',
		image: 'https://i.guim.co.uk/img/media/d8755abe62a318b62e2736b98383bf11762d6c91/0_0_2562_2562/master/2562.jpg?width=620&dpr=2&s=none&crop=none',
		description: '£4.40 for 500g at Waitrose',
		url: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.waitrose.com%2Fecom%2Fproducts%2Fkenko-mayonnaise%2F424830-807548-807549&sref=https://www.theguardian.com/thefilter/2025/jun/07/best-supermarket-mayonnaise-tom-hunt&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C114047X1572903',
	},
	{
		reviewHeading: 'Best all-rounder:',
		name: 'Kenko Japanese mayonnaise',
		image: 'https://i.guim.co.uk/img/media/d8755abe62a318b62e2736b98383bf11762d6c91/0_0_2562_2562/master/2562.jpg?width=620&dpr=2&s=none&crop=none',
		description: '£4.40 for 500g at Waitrose',
		url: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.waitrose.com%2Fecom%2Fproducts%2Fkenko-mayonnaise%2F424830-807548-807549&sref=https://www.theguardian.com/thefilter/2025/jun/07/best-supermarket-mayonnaise-tom-hunt&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C114047X1572903',
	},
	{
		reviewHeading: 'Best all-rounder:',
		name: 'Kenko Japanese mayonnaise',
		image: 'https://i.guim.co.uk/img/media/d8755abe62a318b62e2736b98383bf11762d6c91/0_0_2562_2562/master/2562.jpg?width=620&dpr=2&s=none&crop=none',
		description: '£4.40 for 500g at Waitrose',
		url: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.waitrose.com%2Fecom%2Fproducts%2Fkenko-mayonnaise%2F424830-807548-807549&sref=https://www.theguardian.com/thefilter/2025/jun/07/best-supermarket-mayonnaise-tom-hunt&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C114047X1572903',
	},
];

export default {
	component: ProductCarousel,
	title: 'Components/ProductCarousel',
	decorators: [
		(Story: StoryFn) => (
			<FormatBoundary
				format={{
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.Lifestyle,
				}}
			>
				<Story />
			</FormatBoundary>
		),
	],
};

export const Default = () => <ProductCarousel products={productData} />;

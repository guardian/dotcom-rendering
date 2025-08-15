import { breakpoints } from '@guardian/source/foundations';
import type { Meta } from '@storybook/react';
import { ArticleDesign, Pillar } from '../lib/articleFormat';
import type { InlineProductCardProps } from './InlineProductCard';
import { InlineProductCard } from './InlineProductCard';

const meta = {
	component: InlineProductCard,
	title: 'Components/InlineProductCard',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileMedium,
				breakpoints.desktop,
			],
		},

		formats: [
			{
				design: ArticleDesign.Standard,
				display: ArticleDesign.Standard,
				theme: Pillar.Lifestyle,
			},
		],
	},
} satisfies Meta<typeof InlineProductCard>;

export default meta;

const sampleProductCard: InlineProductCardProps = {
	image: 'https://i.guim.co.uk/img/media/d8755abe62a318b62e2736b98383bf11762d6c91/0_0_2562_2562/master/2562.jpg?width=620&dpr=2&s=none&crop=none',
	url: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.waitrose.com%2Fecom%2Fproducts%2Fkenko-mayonnaise%2F424830-807548-807549&sref=https://www.theguardian.com/thefilter/2025/jun/07/best-supermarket-mayonnaise-tom-hunt&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C114047X1572903',
	price: '£4.40',
	retailer: 'Waitrose',
	brandName: 'Kenko',
	productName: 'Japanese mayonnaise',
	statistics: [
		{
			name: 'Rating',
			value: '4.8/5',
		},
		{
			name: 'Taste',
			value: 'sweet, sour, salty and has an umami-rich profile',
		},
	],
};

export const Default = () => <InlineProductCard {...sampleProductCard} />;

import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source/foundations';
import type { Meta } from '@storybook/react';
import type { ArticleFormat } from '../lib/articleFormat';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { ProductImage } from '../types/content';
import { ArticleContainer } from './ArticleContainer';
import type { InlineProductCardProps } from './InlineProductCard';
import { InlineProductCard } from './InlineProductCard';
import { Section as SectionComponent } from './Section';

const meta = {
	component: InlineProductCard,
	title: 'Components/InlineProductCard',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},

		formats: [
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
		],
	},
	decorators: [
		(Story) => (
			<SectionComponent
				shouldCenter={true}
				showSideBorders={true}
				centralBorder={'full'}
				css={css`
					strong {
						font-weight: bold;
					}
				`}
				format={{
					design: ArticleDesign.Review,
					display: ArticleDisplay.Showcase,
					theme: Pillar.Lifestyle,
				}}
			>
				<ArticleContainer
					format={{
						design: ArticleDesign.Review,
						display: ArticleDisplay.Showcase,
						theme: Pillar.Lifestyle,
					}}
				>
					<Story />
				</ArticleContainer>
			</SectionComponent>
		),
	],
} satisfies Meta<typeof InlineProductCard>;

export default meta;

const productImage: ProductImage = {
	url: 'https://media.guimcode.co.uk/cb193848ed75d40103eceaf12b448de2330770dc/0_0_725_725/725.jpg',
	caption: 'Filter-2 test image for live demo',
	height: 1,
	width: 1,
	alt: 'Bosch Sky kettle',
	credit: 'Photograph: Rachel Ogden/The Guardian',
	displayCredit: false,
};

const sampleProductCard: InlineProductCardProps = {
	format: {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme: Pillar.Lifestyle,
	},
	image: productImage,
	productCtas: [
		{
			url: 'https://www.theguardian.com',
			label: '£89.99 at Amazon',
		},
		{
			url: 'https://www.theguardian.com',
			label: '£99.99 at John Lewis',
		},
	],
	brandName: 'AirCraft',
	productName: 'Lume',
	customAttributes: [
		{ name: 'What we love', value: 'It packs away pretty small' },
		{
			name: 'What we don\'t love',
			value: 'There’s nowhere to stow the remote control',
		},
	],
	isCardOnly: false,
};

export const Default = () => <InlineProductCard {...sampleProductCard} />;

export const productCardOnly = () => (
	<InlineProductCard {...sampleProductCard} isCardOnly={true} />
);

export const productCardOnlyDisplayCredit = () => (
	<InlineProductCard
		{...sampleProductCard}
		image={{
			...productImage,
			displayCredit: true,
		}}
		isCardOnly={true}
	/>
);

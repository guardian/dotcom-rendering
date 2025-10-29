import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { getNestedArticleElement } from '../lib/renderElement';
import type { ProductBlockElement, ProductImage } from '../types/content';
import { ArticleContainer } from './ArticleContainer';
import { ProductElement } from './ProductElement';
import { Section as SectionComponent } from './Section';

const ArticleElementComponent = getNestedArticleElement({
	abTests: {},
	ajaxUrl: '',
	editionId: 'UK',
	isAdFreeUser: false,
	isSensitive: false,
	pageId: 'testID',
	switches: {},
	webTitle: 'Storybook page',
	shouldHideAds: false,
});

const productImage: ProductImage = {
	url: 'https://media.guimcode.co.uk/cb193848ed75d40103eceaf12b448de2330770dc/0_0_725_725/725.jpg',
	caption: 'Filter-2 test image for live demo',
	height: 1,
	width: 1,
	alt: 'Bosch Sky kettle',
	credit: 'Photograph: Rachel Ogden/The Guardian',
	displayCredit: false,
};

const product: ProductBlockElement = {
	_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
	elementId: 'b1f6e8e2-3f3a-4f0c-8d1e-5f3e3e3e3e3e',
	primaryHeading: '<em>Best Kettle overall</em>',
	secondaryHeading: 'Bosch Sky Kettle',
	brandName: 'Bosch',
	productName: 'Sky Kettle',
	image: productImage,
	displayType: 'InlineWithProductCard',
	customAttributes: [
		{ name: 'What we love', value: 'It pours well and looks great' },
		{
			name: "What we don't love",
			value: 'The handle feels a bit cheap compared to the rest of it',
		},
	],
	productCtas: [
		{
			url: 'https://www.johnlewis.com/bosch-twk7203gb-sky-variable-temperature-kettle-1-7l-black/p3228625',
			text: '',
			retailer: 'John Lewis',
			price: '£45.99',
		},
		{
			url: 'https://www.amazon.co.uk/Bosch-TWK7203GB-Sky-Variable-Temperature/dp/B07Z8VQ2V6',
			text: '',
			retailer: 'Amazon',
			price: '£39.99',
		},
	],
	starRating: 'none-selected',
	content: [
		{
			displayCredit: true,
			_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
			role: 'inline',
			media: {
				allImages: [
					{
						index: 0,
						fields: {
							height: '3213',
							width: '3213',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/3213.jpg',
					},
					{
						index: 1,
						fields: {
							isMaster: 'true',
							height: '3213',
							width: '3213',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
					},
					{
						index: 2,
						fields: {
							height: '2000',
							width: '2000',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/2000.jpg',
					},
					{
						index: 3,
						fields: {
							height: '1000',
							width: '1000',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/1000.jpg',
					},
					{
						index: 4,
						fields: {
							height: '500',
							width: '500',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/500.jpg',
					},
					{
						index: 5,
						fields: {
							height: '140',
							width: '140',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/140.jpg',
					},
				],
			},
			elementId: '76686aa1-2e47-4616-b4ed-a88d0afe07ed',
			imageSources: [
				{
					weighting: 'inline',
					srcSet: [
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 620,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 1240,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 605,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 1210,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 445,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 890,
						},
					],
				},
				{
					weighting: 'thumbnail',
					srcSet: [
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 140,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 280,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 120,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 240,
						},
					],
				},
				{
					weighting: 'supporting',
					srcSet: [
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 380,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 760,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 300,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 600,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 620,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 1240,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 605,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 1210,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 445,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 890,
						},
					],
				},
			],
			data: {
				alt: 'Testing Bosch Sky Kettle',
				credit: 'Photograph: Rachel Ogden/The Guardian',
			},
		},
		{
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://www.johnlewis.com/bosch-twk7203gb-sky-variable-temperature-kettle-1-7l-black/p3228625',
			label: '£79.99 at John Lewis',
			elementId: 'f9b3e7a9-788b-4ada-bd99-f7c40b843db7',
			linkType: 'ProductButton',
		},
		{
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://www.amazon.co.uk/Bosch-TWK7203GB-Sky-Variable-Temperature/dp/B07Z8VQ2V6',
			label: '£79.99 at Amazon',
			elementId: 'f9b3e7a9-788b-4ada-bd99-f7c40b843db7',
			linkType: 'ProductButton',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p>Offering variable temperatures and a double-walled stainless-steel housing, the 3kW Sky is a brilliant blend of robust form and function. It boasts a low minimum boil (300ml), a keep-warm setting and touch controls.</p>',
			elementId: '4a27eb68-6a03-4e82-a7d0-e4f1ef3ccb6f',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p><strong>Why we love it<br></strong>I found it difficult to select a best kettle from so many that performed well, but the Bosch Sky clinched it because it’s such a good all-rounder that will suit most people. It pours well, has a button that’s within easy reach of the handle so it’s simple to open the lid without touching it, and it’s insulated so the exterior doesn’t become too hot to touch. From a design perspective, it has a more industrial feel than many others – no frippery here – but not too modern that it wouldn’t fit into most kitchens. Its display is thoughtfully designed, easy to keep clean and lights up as it heats.</p>',
			elementId: 'f48f03d4-bece-4763-874b-4027a311643e',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p>The exterior doesn’t get too hot (up to 40C), and while it wasn’t the fastest to boil in testing, it was only seconds behind the Dualit below. It clicked off at boiling point, and the water was still a toasty 78C 30 minutes later. At the hour point, it was 66C, and two hours 52C, meaning you’ll spend less time and energy reboiling.</p>',
			elementId: 'df571922-33b1-416a-8b3d-ee756b638cc1',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p><strong>It’s a shame that … </strong> its premium look ends at the handle, which seems cheap and plasticky next to the sleek aesthetic of the rest of it.</p>',
			elementId: 'd98fc724-8908-46e2-acc6-4739ad4d5719',
		},
	],
};

const meta: Meta<typeof ProductElement> = {
	component: ProductElement,
	title: 'Components/ProductElement',
	parameters: {
		formats: [
			{
				design: ArticleDesign.Review,
				display: ArticleDesign.Review,
				theme: Pillar.Lifestyle,
			},
		],
	},
	args: {
		product,
		format: {
			design: ArticleDesign.Review,
			display: ArticleDisplay.Showcase,
			theme: Pillar.Lifestyle,
		},
		ArticleElementComponent,
		shouldShowLeftColCard: true,
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
};
export default meta;

type Story = StoryObj<typeof ProductElement>;

export const Default = {} satisfies Story;

export const WithoutHeading: Story = {
	render: (args) => (
		<>
			<ProductElement
				{...args}
				product={{
					...product,
					primaryHeading: '',
					secondaryHeading: '',
				}}
				format={{
					design: ArticleDesign.Review,
					display: ArticleDisplay.Showcase,
					theme: Pillar.Lifestyle,
				}}
				ArticleElementComponent={ArticleElementComponent}
				shouldShowLeftColCard={true}
			/>
			<ProductElement
				{...args}
				product={{
					...product,
					primaryHeading: `<em></em>`,
					secondaryHeading: `<strong></strong>`,
				}}
				format={{
					design: ArticleDesign.Review,
					display: ArticleDisplay.Showcase,
					theme: Pillar.Lifestyle,
				}}
				ArticleElementComponent={ArticleElementComponent}
				shouldShowLeftColCard={true}
			/>
		</>
	),
} satisfies Story;

export const DisplayCredit: Story = {
	render: (args) => (
		<>
			<ProductElement
				{...args}
				product={{
					...product,
					image: { ...productImage, displayCredit: true },
				}}
				format={{
					design: ArticleDesign.Review,
					display: ArticleDisplay.Showcase,
					theme: Pillar.Lifestyle,
				}}
				ArticleElementComponent={ArticleElementComponent}
				shouldShowLeftColCard={true}
			/>
			<ProductElement
				{...args}
				product={{
					...product,
					image: { ...productImage, displayCredit: true },
				}}
				format={{
					design: ArticleDesign.Review,
					display: ArticleDisplay.Showcase,
					theme: Pillar.Lifestyle,
				}}
				ArticleElementComponent={ArticleElementComponent}
				shouldShowLeftColCard={true}
			/>
		</>
	),
} satisfies Story;

export const NoPrimaryHeading: Story = {
	args: {
		product: {
			...product,
			primaryHeading: '<em>Primary heading only</em>',
			secondaryHeading: '',
		},
	},
} satisfies Story;

export const NoSecondaryHeading: Story = {
	args: {
		product: {
			...product,
			primaryHeading: '',
			secondaryHeading: 'Secondary heading only',
		},
	},
} satisfies Story;

export const DisplayTypeProductCardOnly: Story = {
	args: {
		product: {
			...product,
			displayType: 'ProductCardOnly',
		},
	},
} satisfies Story;

export const MultipleProducts: Story = {
	render: (args) => (
		<>
			<ProductElement {...args} />
			<ProductElement {...args} />
		</>
	),
} satisfies Story;

export const MultipleProductsWithoutStats: Story = {
	render: (args) => (
		<>
			<ProductElement
				{...args}
				product={{ ...product, customAttributes: [] }}
			/>
			<ProductElement
				{...args}
				product={{ ...product, customAttributes: [] }}
			/>
		</>
	),
} satisfies Story;

export const WithoutFields: Story = {
	args: {
		product: {
			...product,
			image: undefined,
			primaryHeading: '',
			secondaryHeading: '',
			brandName: '',
			productName: '',
			productCtas: [],
			customAttributes: [],
		},
	},
} satisfies Story;

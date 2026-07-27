import { breakpoints } from '@guardian/source/foundations';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import preview from '../../.storybook/preview';
import { exampleProduct } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ScrollableProduct } from './ScrollableProduct.island';

const meta = preview.meta({
	title: 'Components/Scrollable Products',
	component: ScrollableProduct,
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
	args: {
		title: 'At a glance',
		products: [
			{
				productBlock: {
					...exampleProduct,
					primaryHeadingHtml: '<em>Product 0</em>',
					h2Id: 'product',
				},
				ctaIndex: 0,
			},
			{
				productBlock: {
					...exampleProduct,
					primaryHeadingHtml: '<em>Product 1</em>',
					h2Id: 'product-1',
					productName: 'Lorem ipsum dolor sit amet',
				},
				ctaIndex: 0,
			},
			{
				productBlock: {
					...exampleProduct,
					primaryHeadingHtml: '<em>Product 2</em>',
					h2Id: 'product-2',
				},
				ctaIndex: 0,
			},
			{
				productBlock: {
					...exampleProduct,
					primaryHeadingHtml: '<em>Product 3</em>',
					h2Id: 'product-3',
				},
				ctaIndex: 0,
			},
			{
				productBlock: {
					...exampleProduct,
					primaryHeadingHtml: '<em>Product 4</em>',
					h2Id: 'product-4',
				},
				ctaIndex: 0,
			},
		],
		format: {
			design: ArticleDesign.Review,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
	},
	decorators: [centreColumnDecorator],
	render: (args) => (
		<>
			<ScrollableProduct {...args} />
			<h1 style={{ fontSize: '50px' }} id={'product'}>
				Product 0
			</h1>
			<div style={{ fontSize: '20px' }}>
				The standard Lorem Ipsum passage, used since the 1500s
			</div>
			<h1 style={{ fontSize: '50px' }} id={'product-1'}>
				Product 1
			</h1>
			<div style={{ fontSize: '20px' }}>
				The standard Lorem Ipsum passage, used since the 1500s
			</div>
			<h1 style={{ fontSize: '50px' }} id={'product-2'}>
				Product 2
			</h1>
			<div style={{ fontSize: '20px' }}>
				The standard Lorem Ipsum passage, used since the 1500s
			</div>
			<h1 style={{ fontSize: '50px' }} id={'product-3'}>
				Product 3
			</h1>
			<div style={{ fontSize: '20px' }}>
				The standard Lorem Ipsum passage, used since the 1500s
			</div>
			<h1 style={{ fontSize: '50px' }} id={'product-4'}>
				Product 4
			</h1>
			<div style={{ fontSize: '20px', height: '100vh' }}>
				The standard Lorem Ipsum passage, used since the 1500s
			</div>
		</>
	),
});

export const With5Cards = meta.story();

import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { exampleProduct } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ScrollableProduct } from './ScrollableProduct.importable';

const meta = {
	title: 'Article Carousel/Scrollable Products',
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
		products: [
			{ ...exampleProduct, h2Id: 'product' },
			{
				...exampleProduct,
				h2Id: 'product-1',
				productName: 'Lorem ipsum dolor sit amet',
			},
			{ ...exampleProduct, h2Id: 'product-2' },
			{ ...exampleProduct, h2Id: 'product-3' },
			{ ...exampleProduct, h2Id: 'product-4' },
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
} satisfies Meta<typeof ScrollableProduct>;

export default meta;

type Story = StoryObj<typeof meta>;

export const With5Cards = {} satisfies Story;

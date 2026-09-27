import { breakpoints } from '@guardian/source/foundations';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import preview from '../../.storybook/preview';
import { exampleProduct } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { SummaryProduct } from '../types/content';
import { ProductOnwards } from './ProductOnwards';
import { ScrollableProduct } from './ScrollableProduct.island';

const products: SummaryProduct[] = [
	'Best kettle overall',
	'Best budget kettle',
	'Best smart kettle',
	'Best kettle for coffee',
	'Best quiet kettle',
	'Best stovetop kettle',
	'Best travel kettle',
].map((heading, i) => ({
	productBlock: {
		...exampleProduct,
		primaryHeadingHtml: heading,
		primaryHeadingText: heading,
		h2Id: `product-${i}`,
	},
	ctaIndex: 0,
}));

/**
 * Stand-in article body so the carousel sits at the end of some content and
 * the cards' "Read more" links have anchor targets to jump back up to.
 */
const FakeArticleBody = () => (
	<>
		{products.map((product, i) => (
			<div key={product.productBlock.h2Id}>
				<h2
					style={{ fontSize: '28px', paddingTop: '16px' }}
					id={`product-${i}`}
				>
					{product.productBlock.primaryHeadingText}
				</h2>
				<p style={{ fontSize: '17px', paddingBottom: '16px' }}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
			</div>
		))}
	</>
);

const meta = preview.meta({
	title: 'Components/ProductOnwards',
	component: ProductOnwards,
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
		heading: 'The Filter Kitchen recommends',
		products,
		format: {
			design: ArticleDesign.Review,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
	},
});

/**
 * Variant A: reuses the in-body "At a glance" carousel as-is, placed after
 * the article body in the centre column. Note ScrollableProduct hardcodes
 * its `at-a-glance-*` portal ids, so on a real page this would clash with
 * an actual mid-article "At a glance" carousel — fine for a mockup.
 */
export const VariantAReusedCards = meta.story({
	decorators: [centreColumnDecorator],
	render: (args) => (
		<>
			<FakeArticleBody />
			<ScrollableProduct
				title={args.heading}
				products={args.products}
				format={args.format}
			/>
		</>
	),
});

/**
 * Variant B: a full-width onwards-style section. No grid decorator — the
 * component's own `grid.paddedContainer` supplies the page grid, matching
 * how ScrollableSmallOnwards is rendered.
 */
export const VariantBOnwardsSection = meta.story({
	render: (args) => (
		<>
			<div style={{ maxWidth: '620px', margin: '0 auto' }}>
				<FakeArticleBody />
			</div>
			<ProductOnwards {...args} />
		</>
	),
});

/** Variant B with fewer products than visible slides: no navigation buttons. */
export const VariantBFewProducts = meta.story({
	args: {
		products: products.slice(0, 3),
	},
	render: (args) => <ProductOnwards {...args} />,
});

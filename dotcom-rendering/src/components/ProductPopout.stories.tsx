import { css, Global } from '@emotion/react';
import {
	breakpoints,
	palette as sourcePalette,
	textSans12,
} from '@guardian/source/foundations';
import { storybookPaletteDeclarations } from '../../.storybook/mocks/paletteDeclarations';
import preview from '../../.storybook/preview';
import { examplePopoutProducts } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ProductPopout } from './ProductPopout.island';

/** Filter articles can run to a lot of products, so repeat the fixture to see
 * how the popout behaves at that length. */
const manyProducts = [
	...examplePopoutProducts,
	...examplePopoutProducts.map((product, index) => ({
		...product,
		elementId: `${product.elementId}-copy-${index}`,
	})),
];

const format = {
	design: ArticleDesign.Review,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

/**
 * The popout is rendered into a portal on `document.body`, which on a real page
 * sits inside the `:root` palette declarations. Storybook scopes the palette to
 * a wrapper element instead, so we declare it at `:root` here too.
 */
const rootPaletteDecorator = (Story: () => JSX.Element) => (
	<>
		<Global
			styles={css`
				:root {
					${storybookPaletteDeclarations(format, 'light').join('')}
				}
			`}
		/>
		<Story />
	</>
);

const meta = preview.meta({
	title: 'Components/Product Popout',
	component: ProductPopout,
	args: {
		products: examplePopoutProducts,
		title: 'Everything we recommend',
		triggerLabel: 'See all our picks',
		format,
	},
	decorators: [rootPaletteDecorator],
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobileMedium, breakpoints.desktop],
		},
	},
});

export const Default = meta.story();

export const ManyProducts = meta.story({
	args: { products: manyProducts },
});

export const Mobile = meta.story({
	globals: { viewport: { value: 'mobileMedium' } },
});

/**
 * Mimics the US mobile sticky ad slot so we can check the trigger sits above it
 * rather than over it.
 */
const mobileStickyAdDecorator = (Story: () => JSX.Element) => (
	<>
		<Story />
		<div
			className="mobilesticky-container"
			css={css`
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				height: 100px;
				background-color: ${sourcePalette.neutral[86]};
				display: flex;
				align-items: center;
				justify-content: center;
				${textSans12};
				color: ${sourcePalette.neutral[46]};
			`}
		>
			ADVERTISEMENT
		</div>
	</>
);

export const WithMobileStickyAd = meta.story({
	decorators: [mobileStickyAdDecorator],
	globals: { viewport: { value: 'mobileMedium' } },
});

/** Alternative wordings for the trigger, to compare side by side. */
export const CtaWordingJumpToPicks = meta.story({
	args: { triggerLabel: 'Jump to our picks' },
});

export const CtaWordingTheShortlist = meta.story({
	args: { triggerLabel: 'The shortlist' },
});

export const CtaWordingAllProducts = meta.story({
	args: { triggerLabel: 'All 7 products' },
});

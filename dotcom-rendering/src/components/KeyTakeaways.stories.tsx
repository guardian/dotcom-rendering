import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { images } from '../../fixtures/generated/images';
import { getAllThemes } from '../lib/format';
import { RenderArticleElement } from '../lib/renderElement';
import type { TextBlockElement } from '../types/content';
import { KeyTakeaways } from './KeyTakeaways';

const meta = {
	component: KeyTakeaways,
	title: 'Components/KeyTakeaways',
} satisfies Meta<typeof KeyTakeaways>;

export default meta;

type Story = StoryObj<typeof meta>;

const testTextElement: TextBlockElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: 'test-text-element-id-1',
	dropCap: false,
	html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>',
};

export const AllThemes = {
	args: {
		keyTakeaways: [
			{
				title: 'The first key takeaway',
				body: [testTextElement],
			},
			{
				title: 'The second key takeaway',
				body: [testTextElement],
			},
		],
		/**
		 * This will be replaced by the `splitTheme` decorator, but it's
		 * required by the type.
		 */
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
		abTests: {},
		/**
		 * This is used for rich links. An empty string isn't technically valid,
		 * but there are no rich links in this example.
		 */
		ajaxUrl: '',
		editionId: 'UK',
		isAdFreeUser: false,
		isSensitive: false,
		pageId: 'testID',
		switches: {},
		RenderArticleElement,
	},
	decorators: [
		splitTheme(
			getAllThemes({
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			}),
		),
	],
} satisfies Story;

// TODO ensure desktop/mobile variations
export const SomeDesignsAndDisplays = {
	args: AllThemes.args,
	decorators: [
		splitTheme([
			{
				design: ArticleDesign.Obituary,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
			{
				design: ArticleDesign.Editorial,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
			{
				design: ArticleDesign.Profile,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
			{
				design: ArticleDesign.Analysis,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
			{
				design: ArticleDesign.Interview,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Immersive,
				theme: Pillar.Lifestyle,
			},
		]),
	],
} satisfies Story;

// Authoritative Clear

// format: {
// 	design: ArticleDesign.Obituary,
// 	display: ArticleDisplay.Standard,
// 	theme: Pillar.News,
// },

// Authoritative Stand Out

// format: {
// 	design: ArticleDesign.Editorial,
// 	display: ArticleDisplay.Standard,
// 	theme: Pillar.News,
// },

// Neutral Clear

// format: {
// 	design: ArticleDesign.Editorial,
// 	display: ArticleDisplay.Standard,
// 	theme: Pillar.News,
// },

// Neutral Stand Out

// Soft Clear
// Soft Stand Out

export const Images = {
	args: {
		...AllThemes.args,
		keyTakeaways: [
			{
				title: 'The first key takeaway',
				body: [testTextElement, ...images.slice(0, 2)],
			},
			{
				title: 'The second key takeaway',
				body: [testTextElement, ...images.slice(2, 3)],
			},
		],
	},
	decorators: [
		splitTheme(
			[
				{
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.Culture,
				},
			],
			{ orientation: 'vertical' },
		),
	],
} satisfies Story;

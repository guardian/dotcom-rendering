import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { images } from '../../fixtures/generated/images';
import { getAllDesigns, getAllThemes } from '../lib/format';
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
	dropCap: 'on', // this should be overruled by key takeaway which always sets forceDropCap="off"
	html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>',
};

export const ThemeVariations = {
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

export const DesignVariations = {
	args: ThemeVariations.args,
	decorators: [
		splitTheme(
			getAllDesigns({
				theme: Pillar.News,
				display: ArticleDisplay.Standard,
			}),
		),
	],
} satisfies Story;

export const OtherVariations = {
	args: ThemeVariations.args,
	decorators: [
		splitTheme([
			{
				design: ArticleDesign.Obituary,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
			{
				design: ArticleDesign.Review,
				display: ArticleDisplay.Standard,
				theme: Pillar.Sport,
			},
			{
				design: ArticleDesign.Recipe,
				display: ArticleDisplay.Immersive,
				theme: Pillar.Lifestyle,
			},
			{
				design: ArticleDesign.Feature,
				display: ArticleDisplay.Immersive,
				theme: ArticleSpecial.SpecialReport,
			},
			{
				design: ArticleDesign.Feature,
				display: ArticleDisplay.Immersive,
				theme: ArticleSpecial.SpecialReportAlt,
			},
		]),
	],
} satisfies Story;

export const Images = {
	args: {
		...ThemeVariations.args,
		keyTakeaways: [
			{
				title: 'The first key takeaway',
				body: [
					testTextElement,
					{ ...images[0], displayCredit: true, role: 'inline' },
					{ ...images[1], displayCredit: true, role: 'thumbnail' },
					testTextElement,
				],
			},
			{
				title: 'The second key takeaway',
				body: [
					testTextElement,
					{
						...images[2],
						displayCredit: true,
						data: { ...images[2].data, caption: 'Sunset' },
					},
				],
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

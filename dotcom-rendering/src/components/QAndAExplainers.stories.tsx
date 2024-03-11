import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { images } from '../../fixtures/generated/images';
import { getAllThemes } from '../lib/format';
import type { TextBlockElement } from '../types/content';
import { QAndAExplainers } from './QAndAExplainers';

const meta = {
	component: QAndAExplainers,
	title: 'Components/QAndAExplainers',
} satisfies Meta<typeof QAndAExplainers>;

export default meta;

type Story = StoryObj<typeof meta>;

const html =
	'<p>An Answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>';

const testTextElement: TextBlockElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: 'test-text-element-id-1',
	dropCap: false,
	html,
};

export const AllThemes = {
	args: {
		qAndAExplainers: [
			{
				title: 'The first question',
				body: [testTextElement],
			},
			{
				title: 'The second question',
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
		pageId: 'testID',
		switches: {},
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

export const Images = {
	args: {
		qAndAExplainers: [
			{
				title: 'The first question',
				body: [testTextElement, ...images.slice(0, 2)],
			},
			{
				title: 'The second question',
				body: [testTextElement, ...images.slice(2, 3)],
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

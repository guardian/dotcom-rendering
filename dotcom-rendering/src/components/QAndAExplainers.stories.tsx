import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '.storybook/modes';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { images } from '../../fixtures/generated/images';
import { getAllThemes } from '../lib/format';
import { RenderArticleElement } from '../lib/renderElement';
import type { TextBlockElement } from '../types/content';
import { QAndAExplainers } from './QAndAExplainers';

const meta = {
	component: QAndAExplainers,
	title: 'Components/QAndAExplainers',
} satisfies Meta<typeof QAndAExplainers>;

export default meta;

type Story = StoryObj<typeof meta>;

const testTextElement: TextBlockElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: 'test-text-element-id-1',
	html: '<p>An Answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>',
	dropCap: 'on', // this should be overruled by q&a which always sets forceDropCap="off"
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
		 * This will be replaced by the `formats` parameter, but it's
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
	decorators: [centreColumnDecorator],
	parameters: {
		formats: getAllThemes({
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		}),
		chromatic: {
			modes: {
				horizontal: allModes.sideBySideHorizontal,
			},
		},
	},
} satisfies Story;

export const Images = {
	args: {
		...AllThemes.args,
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Culture,
		},
		qAndAExplainers: [
			{
				title: 'The first question',
				body: [
					testTextElement,
					{ ...images[0], displayCredit: true, role: 'inline' },
					{ ...images[1], displayCredit: true, role: 'thumbnail' },
					testTextElement,
				],
			},
			{
				title: 'The second question',
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
	decorators: [centreColumnDecorator],
	parameters: {
		chromatic: {
			modes: {
				vertical: allModes.sideBySideVertical,
			},
		},
	},
} satisfies Story;

import type { Meta, StoryObj } from '@storybook/react';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import { images } from '../../fixtures/generated/images';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '../lib/format';
import { getAllDesigns, getAllThemes } from '../lib/format';
import { RenderArticleElement } from '../lib/renderElement';
import type { TextBlockElement } from '../types/content';
import { MiniProfiles } from './MiniProfiles';

const meta = {
	component: MiniProfiles,
	title: 'Components/MiniProfiles',
} satisfies Meta<typeof MiniProfiles>;

export default meta;

type Story = StoryObj<typeof meta>;

const testTextElement: TextBlockElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: 'test-text-element-id-1',
	dropCap: 'on', // this should be overruled by mini profile which always sets forceDropCap="off"
	html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>',
};

const testParagraph =
	'<p>Proin <strong>imperdiet</strong> pellentesque <a href="#">adipiscing</a> turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus.</p>';
const testListHtml =
	'<ul><li><p>This is the <em>first</em> item in the list</p></li><li><p>The second item has a <a href="#">hyperlink</a>.</p></li></ul>';
const testBioText = testParagraph + testListHtml;
const endNoteText =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu auctor ex.';

export const ThemeVariations = {
	args: {
		miniProfiles: [
			{
				title: 'The first mini profile',
				bio: testBioText,
				body: [testTextElement],
				endNote: endNoteText,
			},
			{
				title: 'The second mini profile',
				body: [testTextElement],
			},
		],
		isLastElement: true,
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
				horizontal: allModes.splitHorizontal,
			},
		},
	},
} satisfies Story;

// Audio designs don't support mini profiles
const isNotAudioDesign = (format: ArticleFormat) =>
	format.design !== ArticleDesign.Audio;

export const DesignVariations = {
	args: ThemeVariations.args,
	decorators: [centreColumnDecorator],
	parameters: {
		formats: getAllDesigns({
			theme: Pillar.News,
			display: ArticleDisplay.Standard,
		}).filter(isNotAudioDesign),
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
} satisfies Story;

export const OtherVariations = {
	args: ThemeVariations.args,
	decorators: [centreColumnDecorator],
	parameters: {
		formats: [
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
		],
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
} satisfies Story;

export const Images = {
	args: {
		...ThemeVariations.args,
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Culture,
		},
		miniProfiles: [
			{
				title: 'The first mini profile',
				bio: testBioText,
				body: [
					testTextElement,
					{ ...images[0], displayCredit: true, role: 'inline' },
					{ ...images[1], displayCredit: true, role: 'thumbnail' },
					testTextElement,
				],
				endNote: endNoteText,
			},
			{
				title: 'The second mini profile',
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
				vertical: allModes.splitVertical,
			},
		},
	},
} satisfies Story;

export const WithSeparatorLine = {
	args: {
		...ThemeVariations.args,
		isLastElement: false,
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Culture,
		},
	},
	decorators: [centreColumnDecorator],
} satisfies Story;

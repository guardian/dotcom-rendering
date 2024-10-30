import { ArticleDisplay, ArticleSpecial, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import { images } from '../../fixtures/generated/images';
import {
	ArticleDesign,
	getAllDesigns,
	getAllThemes,
} from '../lib/articleFormat';
import { RenderArticleElement } from '../lib/renderElement';
import type { TextBlockElement } from '../types/content';
import { MultiByline } from './MultiByline';

const meta = {
	component: MultiByline,
	title: 'Components/MultiByline',
} satisfies Meta<typeof MultiByline>;

export default meta;

type Story = StoryObj<typeof meta>;

const testTextElement: TextBlockElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: 'test-text-element-id-1',
	dropCap: 'on', // this should be overruled by multi byline which always sets forceDropCap="off"
	html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>',
};

const testParagraph =
	'<p>Proin <strong>imperdiet</strong> pellentesque <a href="#">adipiscing</a> turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus.</p>';
const testListHtml =
	'<ul><li><p>This is the <em>first</em> item in the list</p></li><li><p>The second item has a <a href="#">hyperlink</a>.</p></li></ul>';
const testBioText = testParagraph + testListHtml;

export const ThemeVariations = {
	args: {
		multiBylineItems: [
			{
				title: 'This subheading is quite long so is likely to run on to multiple lines',
				bio: testBioText,
				body: [testTextElement],
				byline: 'Richard Hillgrove Political Editor',
				bylineHtml:
					"<a href='/profile/richard-hillgrove'>Richard Hillgrove</a> Political Editor",
				contributors: [
					{
						name: 'Richard Hillgrove',
						imageUrl:
							'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/5/24/1306249890287/Richard-Hillgrove.jpg?width=100&dpr=2&s=none',
					},
				],
			},
			{
				title: 'My hot take',
				bio: testBioText,
				body: [testTextElement],
				byline: 'Guardian Contributor',
				bylineHtml:
					"<a href='/profile/richard-hillgrove'>Richard Hillgrove</a>",
				contributors: [
					{
						name: 'Richard Hillgrove',
						imageUrl:
							'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/5/24/1306249890287/Richard-Hillgrove.jpg?width=100&dpr=2&s=none',
					},
				],
				imageOverrideUrl:
					'https://i.guim.co.uk/img/uploads/2024/09/17/Maurice_Casey.png?width=180&dpr=1&s=none',
			},
			{
				title: 'A further subheading',
				body: [testTextElement],
			},
			{
				title: 'This byline has a contributor with no link',
				bio: testBioText,
				body: [testTextElement],
				byline: 'Steve McQueen on Paul Gilroy',
				bylineHtml:
					"<span data-contributor-rel='author'>Steve McQueen</span> on Paul Gilroy",
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

export const DesignVariations = {
	args: ThemeVariations.args,
	decorators: [centreColumnDecorator],
	parameters: {
		formats: getAllDesigns({
			theme: Pillar.News,
			display: ArticleDisplay.Standard,
		}),
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
		multiBylineItems: [
			{
				title: 'The first byline',
				bio: testBioText,
				body: [
					testTextElement,
					{ ...images[0], displayCredit: true, role: 'inline' },
					{ ...images[1], displayCredit: true, role: 'thumbnail' },
					testTextElement,
				],
				byline: 'Richard Hillgrove Guardian Contributor',
				bylineHtml:
					"<a href='/profile/richard-hillgrove'>Richard Hillgrove</a>",
				contributors: [
					{
						name: 'Richard Hillgrove',
						imageUrl:
							'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/5/24/1306249890287/Richard-Hillgrove.jpg?width=100&dpr=2&s=none',
					},
				],
			},
			{
				title: 'The second byline',
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

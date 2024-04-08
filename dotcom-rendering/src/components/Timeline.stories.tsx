import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { images } from '../../fixtures/generated/images';
import { getNestedArticleElement } from '../lib/renderElement';
import type { TextBlockElement, YoutubeBlockElement } from '../types/content';
import { Timeline } from './Timeline';

const format: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

const meta = {
	component: Timeline,
	title: 'Components/Timeline',
	decorators: [splitTheme([format], { orientation: 'vertical' })],
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

const testTextElement: TextBlockElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: 'test-text-element-id-1',
	dropCap: 'on', // this should be overruled by timeline which always sets forceDropCap="off"
	html: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>',
};

const testYoutubeElement: YoutubeBlockElement = {
	duration: 142,
	expired: false,
	mediaTitle:
		'Nasa launches Perseverance rover in mission to find evidence of life on Mars – video',
	assetId: 'XmP56yBy-18',
	_type: 'model.dotcomrendering.pageElements.YoutubeBlockElement',
	id: '60606947-4f1f-4343-9bb7-000e91502129',
	elementId: '70606947-4f1f-4343-9bb7-000e91502129',
	posterImage: [
		{
			url: 'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/2000.jpg',
			width: 2000,
		},
		{
			url: 'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/1000.jpg',
			width: 1000,
		},
		{
			url: 'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/500.jpg',
			width: 500,
		},
		{
			url: 'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/140.jpg',
			width: 140,
		},
		{
			url: 'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/3282.jpg',
			width: 3282,
		},
	],
	channelId: 'UCIRYBXDze5krPDzAEOxFGVA',
};

const ArticleElementComponent = getNestedArticleElement({
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
	isMainMedia: false,
	webTitle: 'Storybook page',
});

export const FlatWithNoTitles = {
	args: {
		timeline: {
			_type: 'model.dotcomrendering.pageElements.DCRTimelineBlockElement',
			events: [
				{
					date: '1st January 2024',
					main: {
						...images[1],
						displayCredit: true,
						data: { ...images[1].data, caption: 'Inline image' },
					},
					body: [testTextElement, images[0], testTextElement],
				},
				{
					date: '5th January 2024',
					main: {
						...images[8],
						displayCredit: true,
						data: { ...images[8].data, caption: 'Showcase image' },
					},
					body: [testTextElement],
				},
				{
					date: '19th January 2024',
					label: 'Label 3',
					main: testYoutubeElement,
					body: [testTextElement, testTextElement],
				},
				{
					date: '8th February 2024',
					main: {
						...images[12],
						displayCredit: true,
						data: {
							...images[12].data,
							caption: 'Immersive image',
						},
					},
					body: [testTextElement, testTextElement, testTextElement],
				},
				{
					date: '9th February 2024',
					main: {
						...images[7],
						displayCredit: true,
						data: {
							...images[7].data,
							caption: 'Thumbnail image',
						},
					},
					body: [testTextElement, testTextElement, testTextElement],
				},
			] as const,
		},
		ArticleElementComponent,
		format,
	},
} satisfies Story;

export const FlatWithSomeTitlesAndLabels = {
	args: {
		...FlatWithNoTitles.args,
		timeline: {
			_type: 'model.dotcomrendering.pageElements.DCRTimelineBlockElement',
			events: [
				{
					...FlatWithNoTitles.args.timeline.events[0],
					title: 'An Event Occurs',
					label: 'Label 1',
				},
				{
					...FlatWithNoTitles.args.timeline.events[1],
					title: 'Another Event Occurs',
					label: 'Label 2',
				},
				FlatWithNoTitles.args.timeline.events[2],
			],
		},
	},
} satisfies Story;

export const SectionedWithNoTitles = {
	args: {
		timeline: {
			_type: 'model.dotcomrendering.pageElements.DCRSectionedTimelineBlockElement',
			sections: [
				{
					title: 'January',
					events: FlatWithNoTitles.args.timeline.events.slice(0, 2),
				},
				{
					title: 'February',
					events: FlatWithNoTitles.args.timeline.events.slice(2),
				},
			],
		},
		ArticleElementComponent,
		format,
	},
} satisfies Story;

export const SectionedWithSomeTitles = {
	args: {
		...SectionedWithNoTitles.args,
		timeline: {
			_type: 'model.dotcomrendering.pageElements.DCRSectionedTimelineBlockElement',
			sections: [
				{
					title: 'January',
					events: FlatWithSomeTitlesAndLabels.args.timeline.events.slice(
						0,
						2,
					),
				},
				{
					title: 'February',
					events: FlatWithSomeTitlesAndLabels.args.timeline.events.slice(
						2,
					),
				},
			],
		},
	},
} satisfies Story;

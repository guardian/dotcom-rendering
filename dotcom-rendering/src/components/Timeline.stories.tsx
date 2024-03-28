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
import type { TextBlockElement } from '../types/content';
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
					body: [testTextElement],
					main: {
						...images[8],
						displayCredit: true,
						data: { ...images[8].data, caption: 'Showcase image' },
					},
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
			] as const,
		},
		ArticleElementComponent,
		format,
	},
} satisfies Story;

export const FlatWithSomeTitles = {
	args: {
		...FlatWithNoTitles.args,
		timeline: {
			_type: 'model.dotcomrendering.pageElements.DCRTimelineBlockElement',
			events: [
				{
					...FlatWithNoTitles.args.timeline.events[0],
					title: 'An Event Occurs',
				},
				{
					...FlatWithNoTitles.args.timeline.events[1],
					title: 'Another Event Occurs',
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
					events: FlatWithSomeTitles.args.timeline.events.slice(0, 2),
				},
				{
					title: 'February',
					events: FlatWithSomeTitles.args.timeline.events.slice(2),
				},
			],
		},
	},
} satisfies Story;

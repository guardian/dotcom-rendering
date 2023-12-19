import { Meta, StoryObj } from '@storybook/react';
import {
	newsStoryWithDatesToExpanded,
	newsTimelineStoryNoDescriptionExpanded,
	noTimelineEventsStoryExpanded,
	sportTimelineStoryWithDescriptionAndEventsExpanded,
} from '../../fixtures/manual/timelineAtom';
import { TimelineAtom as TimelineAtomComponent } from './TimelineAtom.importable';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDisplay, ArticleDesign, Pillar } from '@guardian/libs';

const meta: Meta<typeof TimelineAtomComponent> = {
	title: 'Components/Timeline Atom',
	component: TimelineAtomComponent,
};

type Story = StoryObj<typeof TimelineAtomComponent>;

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

// Based on https://www.theguardian.com/stage/2018/mar/06/hamilton-nominated-olivier-awards
export const NoTimelineEventsStoryExpanded: Story = {
	args: { ...noTimelineEventsStoryExpanded },
	decorators: [splitTheme()],
};

// Based on https://www.theguardian.com/uk-news/2020/jul/21/importance-of-prince-andrew-interview-became-clear-in-editing-suite-says-maitlis
export const NewsTimelineStoryNoDescriptionExpanded: Story = {
	args: { ...newsTimelineStoryNoDescriptionExpanded },
	decorators: [splitTheme([defaultFormat])],
};

// Based on https://www.theguardian.com/sport/blog/2020/jul/09/why-chris-froome-and-team-ineos-parting-of-the-ways-cycling
export const SportTimelineStoryWithDescriptionAndEventsExpanded: Story = {
	args: { ...sportTimelineStoryWithDescriptionAndEventsExpanded },
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.LiveBlog,
				theme: Pillar.Sport,
			},
		]),
	],
};

// Based on https://www.theguardian.com/media/2019/jun/13/julian-assange-sajid-javid-signs-us-extradition-order
export const NewsStoryWithDatesToExpanded: Story = {
	args: { ...newsStoryWithDatesToExpanded },
	decorators: [splitTheme([defaultFormat])],
};

export default meta;

import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import preview from '../../.storybook/preview';
import {
	newsStoryWithDatesToExpanded,
	newsTimelineStoryNoDescriptionExpanded,
	noTimelineEventsStoryExpanded,
	sportTimelineStoryWithDescriptionAndEventsExpanded,
} from '../../fixtures/manual/timelineAtom';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { TimelineAtom as TimelineAtomComponent } from './TimelineAtom.island';

const meta = preview.meta({
	title: 'Components/Timeline Atom',
	component: TimelineAtomComponent,
});

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

// Based on https://www.theguardian.com/stage/2018/mar/06/hamilton-nominated-olivier-awards
export const NoTimelineEventsStoryExpanded = meta.story({
	args: { ...noTimelineEventsStoryExpanded },
	decorators: [splitTheme([defaultFormat])],
});

// Based on https://www.theguardian.com/uk-news/2020/jul/21/importance-of-prince-andrew-interview-became-clear-in-editing-suite-says-maitlis
export const NewsTimelineStoryNoDescriptionExpanded = meta.story({
	args: { ...newsTimelineStoryNoDescriptionExpanded },
	decorators: [splitTheme([defaultFormat])],
});

// Based on https://www.theguardian.com/sport/blog/2020/jul/09/why-chris-froome-and-team-ineos-parting-of-the-ways-cycling
export const SportTimelineStoryWithDescriptionAndEventsExpanded = meta.story({
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
});

// Based on https://www.theguardian.com/media/2019/jun/13/julian-assange-sajid-javid-signs-us-extradition-order
export const NewsStoryWithDatesToExpanded = meta.story({
	args: { ...newsStoryWithDatesToExpanded },
	decorators: [splitTheme([defaultFormat])],
});

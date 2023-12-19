import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	newsStoryWithDatesToExpanded,
	newsTimelineStoryNoDescriptionExpanded,
	noTimelineEventsStoryExpanded,
	sportTimelineStoryWithDescriptionAndEventsExpanded,
} from '../../fixtures/manual/timelineAtom';
import { TimelineAtom } from './TimelineAtom.importable';

const format: ArticleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export default {
	title: 'TimelineAtom',
	component: TimelineAtom,
};

// Based on https://www.theguardian.com/stage/2018/mar/06/hamilton-nominated-olivier-awards
export const NoTimelineEventsStoryExpanded = () => {
	return <TimelineAtom {...noTimelineEventsStoryExpanded} />;
};
NoTimelineEventsStoryExpanded.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Culture,
		},
	]),
];

// Based on https://www.theguardian.com/uk-news/2020/jul/21/importance-of-prince-andrew-interview-became-clear-in-editing-suite-says-maitlis
export const NewsTimelineStoryNoDescriptionExpanded = () => {
	return <TimelineAtom {...newsTimelineStoryNoDescriptionExpanded} />;
};
NewsTimelineStoryNoDescriptionExpanded.decorators = [splitTheme([format])];

// Based on https://www.theguardian.com/sport/blog/2020/jul/09/why-chris-froome-and-team-ineos-parting-of-the-ways-cycling
export const SportTimelineStoryWithDescriptionAndEventsExpanded = () => {
	return (
		<TimelineAtom {...sportTimelineStoryWithDescriptionAndEventsExpanded} />
	);
};
SportTimelineStoryWithDescriptionAndEventsExpanded.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Sport,
		},
	]),
];

// Based on https://www.theguardian.com/media/2019/jun/13/julian-assange-sajid-javid-signs-us-extradition-order
export const NewsStoryWithDatesToExpanded = () => {
	return <TimelineAtom {...newsStoryWithDatesToExpanded} />;
};
NewsStoryWithDatesToExpanded.decorators = [splitTheme([format])];

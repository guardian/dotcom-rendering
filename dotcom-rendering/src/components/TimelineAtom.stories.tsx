import {
	newsStoryWithDatesToExpanded,
	newsTimelineStoryNoDescriptionExpanded,
	noTimelineEventsStoryExpanded,
	sportTimelineStoryWithDescriptionAndEventsExpanded,
} from '../../fixtures/manual/timelineAtom';
import { TimelineAtom } from './TimelineAtom.importable';

export default {
	title: 'TimelineAtom',
	component: TimelineAtom,
};

// Based on https://www.theguardian.com/stage/2018/mar/06/hamilton-nominated-olivier-awards
export const NoTimelineEventsStoryExpanded = (): JSX.Element => {
	return <TimelineAtom {...noTimelineEventsStoryExpanded} />;
};

// Based on https://www.theguardian.com/uk-news/2020/jul/21/importance-of-prince-andrew-interview-became-clear-in-editing-suite-says-maitlis
export const NewsTimelineStoryNoDescriptionExpanded = (): JSX.Element => {
	return <TimelineAtom {...newsTimelineStoryNoDescriptionExpanded} />;
};

// Based on https://www.theguardian.com/sport/blog/2020/jul/09/why-chris-froome-and-team-ineos-parting-of-the-ways-cycling
export const SportTimelineStoryWithDescriptionAndEventsExpanded =
	(): JSX.Element => {
		return (
			<TimelineAtom
				{...sportTimelineStoryWithDescriptionAndEventsExpanded}
			/>
		);
	};

// Based on https://www.theguardian.com/media/2019/jun/13/julian-assange-sajid-javid-signs-us-extradition-order
export const NewsStoryWithDatesToExpanded = (): JSX.Element => {
	return <TimelineAtom {...newsStoryWithDatesToExpanded} />;
};

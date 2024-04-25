import { css, type SerializedStyles } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, headline, space, textSans } from '@guardian/source-foundations';
import type { NestedArticleElement } from '../lib/renderElement';
import { palette } from '../palette';
import type {
	DCRSectionedTimelineBlockElement,
	DCRTimelineBlockElement,
	DCRTimelineEvent,
	FEElement,
} from '../types/content';
import { Heading } from './Heading';
import { Subheading } from './Subheading';

// ----- Helpers ----- //

const hasTitle = (event: DCRTimelineEvent): boolean =>
	event.title !== undefined && event.title.trim() !== '';

const hasShowcaseRole = (element?: FEElement): boolean => {
	if (element === undefined) return false;
	return 'role' in element && element.role === 'showcase';
};

// ----- EventHeader ----- //

const timelineBulletStyles = css`
	position: relative;
	::before {
		content: '';
		position: absolute;
		display: block;
		width: 12px;
		height: 12px;
		border: 1px solid ${palette('--timeline-event-border')};
		border-radius: 100%;
		background-color: ${palette('--timeline-bullet')};
		left: -16.5px;
		top: -10px;
	}
`;

const smallDateStyles = css`
	display: block;
	${textSans.small({ fontWeight: 'bold' })}

	${from.desktop} {
		${textSans.medium({ fontWeight: 'bold' })}
	}
`;

const titleWeight = ({ design }: ArticleFormat): 'bold' | 'medium' => {
	switch (design) {
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			return 'bold';
		default:
			return 'medium';
	}
};

const titleStyles = (format: ArticleFormat): SerializedStyles => css`
	${headline.xxsmall({ fontWeight: titleWeight(format) })}

	${from.desktop} {
		${headline.xsmall({ fontWeight: titleWeight(format) })}
	}
`;

const headingStyles = css`
	margin-top: 4px;
`;

type EventHeaderProps = {
	event: DCRTimelineEvent;
	ArticleElementComponent: NestedArticleElement;
	sectioned: boolean;
	smallDates: boolean;
	format: ArticleFormat;
};

const EventHeader = ({
	event,
	ArticleElementComponent,
	format,
	sectioned,
	smallDates,
}: EventHeaderProps) => {
	const heading = (
		<Heading
			css={[
				headingStyles,
				!hasShowcaseRole(event.main) && timelineBulletStyles,
			]}
			level={sectioned ? 3 : 2}
		>
			<span css={smallDates ? smallDateStyles : titleStyles(format)}>
				{event.date}
			</span>
			{hasTitle(event) ? (
				<span css={titleStyles(format)}>{event.title}</span>
			) : null}
		</Heading>
	);

	if (event.main !== undefined && hasShowcaseRole(event.main)) {
		return (
			<header>
				<ArticleElementComponent
					index={0}
					element={event.main}
					format={format}
					isTimeline={true}
				/>
				{heading}
			</header>
		);
	} else if (event.main !== undefined) {
		return (
			<header>
				{heading}
				<ArticleElementComponent
					index={0}
					element={event.main}
					format={format}
					isTimeline={true}
				/>
			</header>
		);
	} else {
		return heading;
	}
};

// ----- TimelineEvent ----- //

const eventStyles = css`
	border: 1px solid ${palette('--timeline-event-border')};
	padding: 0 10px ${space[6]}px 10px;
	margin-bottom: ${space[5]}px;
	position: relative;

	${from.tablet} {
		margin-left: -21px;
		margin-right: -21px;
	}
	${from.leftCol} {
		margin-left: -11px;
		margin-right: -11px;
	}
`;

const labelStyles = css`
	border: 1px solid ${palette('--timeline-event-border')};
	border-bottom: none;
	padding: 3px 10px 4px 10px;
	display: inline-block;
	${textSans.small({ fontWeight: 'regular' })}

	${from.tablet} {
		margin-left: -21px;
		margin-right: -21px;
	}
	${from.leftCol} {
		margin-left: -11px;
		margin-right: -11px;
	}
`;

const immersiveMainElementEventStyles = css`
	padding-top: 0;
`;

type TimelineEventProps = {
	event: DCRTimelineEvent;
	ArticleElementComponent: NestedArticleElement;
	sectioned: boolean;
	smallDates: boolean;
	format: ArticleFormat;
};

const TimelineEvent = ({
	event,
	ArticleElementComponent,
	sectioned,
	smallDates,
	format,
}: TimelineEventProps) => (
	<>
		{event.label !== undefined && (
			<div css={labelStyles}>{event.label}</div>
		)}
		<section
			css={[
				eventStyles,
				hasShowcaseRole(event.main)
					? immersiveMainElementEventStyles
					: undefined,
			]}
		>
			<EventHeader
				event={event}
				ArticleElementComponent={ArticleElementComponent}
				sectioned={sectioned}
				smallDates={smallDates}
				format={format}
			/>
			{event.body.map((element, index) => (
				<ArticleElementComponent
					// eslint-disable-next-line react/no-array-index-key -- This is only rendered once so we can safely use index to suppress the warning
					key={index}
					index={index}
					element={element}
					forceDropCap="off"
					format={format}
					isTimeline={true}
				/>
			))}
		</section>
	</>
);

// ----- Timeline ----- //

type Props = {
	timeline: DCRTimelineBlockElement | DCRSectionedTimelineBlockElement;
	ArticleElementComponent: NestedArticleElement;
	format: ArticleFormat;
};

export const Timeline = ({
	timeline,
	format,
	ArticleElementComponent,
}: Props) => {
	switch (timeline._type) {
		case 'model.dotcomrendering.pageElements.DCRTimelineBlockElement': {
			const someEventsHaveTitles = timeline.events.some(hasTitle);

			return (
				<>
					{timeline.events.map((event) => (
						<TimelineEvent
							event={event}
							ArticleElementComponent={ArticleElementComponent}
							sectioned={false}
							key={event.date}
							smallDates={someEventsHaveTitles}
							format={format}
						/>
					))}
				</>
			);
		}
		case 'model.dotcomrendering.pageElements.DCRSectionedTimelineBlockElement': {
			const someEventsHaveTitles = timeline.sections.some((section) =>
				section.events.some(hasTitle),
			);

			return (
				<>
					{timeline.sections.map((section) => (
						<section key={section.title}>
							<Subheading format={format} topPadding={false}>
								{section.title}
							</Subheading>
							{section.events.map((event) => (
								<TimelineEvent
									event={event}
									ArticleElementComponent={
										ArticleElementComponent
									}
									sectioned={true}
									key={event.date}
									smallDates={someEventsHaveTitles}
									format={format}
								/>
							))}
						</section>
					))}
				</>
			);
		}
	}
};

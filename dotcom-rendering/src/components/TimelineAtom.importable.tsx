import { css } from '@emotion/react';
import { body, palette, remSpace, space } from '@guardian/source-foundations';
import { submitComponentEvent } from '../client/ophan/ophan';
import { palette as schemedPalette } from '../palette';
import type { TimelineAtomType, TimelineEvent } from '../types/content';
import { useConfig } from './ConfigContext';
import { Body } from './ExpandableAtom/Body';
import { Container } from './ExpandableAtom/Container';
import { Footer } from './ExpandableAtom/Footer';

const Snippet = css`
	:not(:last-child) {
		border-left: 0.0625rem solid ${palette.neutral[60]};
		padding-bottom: ${remSpace[4]};
	}
	padding-left: ${space[4]}px;
	margin-left: ${space[2]}px;
`;

const EventTitle = css`
	${body.medium({
		lineHeight: 'tight',
		fontWeight: 'bold',
	})};
`;

const EventDateBullet = css`
	content: '';
	width: ${space[4]}px;
	height: ${space[4]}px;
	border-radius: 100%;
	float: left;
	position: relative;
	left: -24px;
	background-color: ${schemedPalette('--timeline-atom-bullet')};
`;

const EventDate = css`
	::before {
		${EventDateBullet}
	}
	margin-left: -16px;
	background: ${schemedPalette('--timeline-atom-highlight-text-background')};
	color: ${schemedPalette('--timeline-atom-highlight-text')};
	${body.medium({
		lineHeight: 'tight',
		fontWeight: 'bold',
	})};
`;

const EventToDate = css`
	background: ${schemedPalette('--timeline-atom-highlight-text-background')};
	color: ${schemedPalette('--timeline-atom-highlight-text')};
	${body.medium({
		lineHeight: 'tight',
		fontWeight: 'bold',
	})};
`;

const TimelineContents = ({ events }: { events: TimelineEvent[] }) => {
	return (
		<div>
			{events.map((event, index) => {
				const time = new Date(event.unixDate).toISOString();
				const toTime =
					event.toUnixDate !== undefined
						? new Date(event.toUnixDate).toISOString()
						: '';
				return (
					<div key={index} data-type="event-snippet" css={Snippet}>
						<div>
							<time dateTime={time} css={EventDate}>
								{event.date}
							</time>
							{!!event.toDate && (
								<span>
									{' '}
									-{' '}
									<time dateTime={toTime} css={EventToDate}>
										{event.toDate}
									</time>
								</span>
							)}
						</div>
						{!!event.title && (
							<div css={EventTitle}>{event.title}</div>
						)}
						{!!event.body && <Body html={event.body} />}
					</div>
				);
			})}
		</div>
	);
};

export const TimelineAtom = ({
	id,
	events,
	description,
	title,
	expandForStorybook,
	likeHandler,
	dislikeHandler,
	expandCallback,
}: TimelineAtomType) => {
	const { renderingTarget } = useConfig();

	return (
		<Container
			atomType="timeline"
			atomTypeTitle="Timeline"
			id={id}
			expandForStorybook={expandForStorybook}
			title={title}
			expandCallback={
				expandCallback ??
				(() =>
					submitComponentEvent(
						{
							component: {
								componentType: 'TIMELINE_ATOM',
								id,
								products: [],
								labels: [],
							},
							action: 'EXPAND',
						},
						renderingTarget,
					))
			}
		>
			{!!description && <Body html={description} />}
			{events && <TimelineContents events={events} />}
			<Footer
				dislikeHandler={
					dislikeHandler ??
					(() =>
						submitComponentEvent(
							{
								component: {
									componentType: 'TIMELINE_ATOM',
									id,
									products: [],
									labels: [],
								},
								action: 'DISLIKE',
							},
							renderingTarget,
						))
				}
				likeHandler={
					likeHandler ??
					(() =>
						submitComponentEvent(
							{
								component: {
									componentType: 'TIMELINE_ATOM',
									id,
									products: [],
									labels: [],
								},
								action: 'LIKE',
							},
							renderingTarget,
						))
				}
			/>
		</Container>
	);
};

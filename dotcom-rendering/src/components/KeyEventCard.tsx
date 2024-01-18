import { css } from '@emotion/react';
import { from, space, textSans } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { palette } from '../palette';
import { DateTime } from './DateTime';

interface Props {
	id: string;
	blockFirstPublished: number;
	title: string;
	isSummary: boolean;
	filterKeyEvents: boolean;
	cardPosition?: string;
}

const linkStyles = css`
	text-decoration: none;

	&::before {
		content: '';
		display: block;
		position: relative;
		height: 13px;
		width: 13px;
		border-radius: 50%;
		background-color: ${palette('--key-event-bullet')};
		margin-bottom: ${space[1]}px;
		z-index: 2;

		${from.tablet} {
			height: 15px;
			width: 15px;
		}
	}

	&:hover::before {
		background-color: ${palette('--key-event-bullet-hover')};
	}

	&:hover {
		div {
			text-decoration: underline ${palette('--key-event-text')};
			text-underline-offset: 1px;
		}
	}
`;

const summaryStyles = css`
	&::before {
		background-color: ${palette('--summary-event-bullet')};
	}

	&:hover::before {
		background-color: ${palette('--summary-event-bullet-hover')};
	}
`;

const listItemStyles = css`
	position: relative;
	padding-bottom: ${space[3]}px;
	padding-top: ${space[3]}px;
	padding-right: ${space[3]}px;
	background-color: ${palette('--key-event-background')};
	list-style: none;
	display: block;
	width: 162px;
	scroll-snap-align: start;

	${from.desktop} {
		padding-bottom: ${space[3]}px;
		background-color: ${palette('--key-event-background-desktop')};
		width: 200px;
		padding-right: ${space[5]}px;
	}

	&::before {
		content: '';
		display: block;
		position: absolute;
		border-top: 1px dotted ${palette('--key-event-border')};
		left: 0;
		right: 0;
		top: 19px;
	}

	&:last-child::before {
		border-top: 0;
	}
`;

const textStyles = css`
	${textSans.small({ fontWeight: 'regular', lineHeight: 'regular' })};
	color: ${palette('--key-event-text')};
`;

const timeStyles = css`
	${textSans.xsmall({ fontWeight: 'bold', lineHeight: 'tight' })};
	color: ${palette('--key-event-title')};
	display: block;
`;

export const KeyEventCard = ({
	id,
	blockFirstPublished,
	isSummary,
	title,
	filterKeyEvents,
	cardPosition = 'unknown position',
}: Props) => {
	const url = `?filterKeyEvents=${String(
		filterKeyEvents,
	)}&page=with:block-${id}#block-${id}`;
	return (
		<li css={listItemStyles}>
			<Link
				priority="secondary"
				css={[linkStyles, isSummary && summaryStyles]}
				href={url}
				data-link-name={`key event card | ${cardPosition}`}
			>
				<div css={timeStyles}>
					<DateTime
						date={new Date(blockFirstPublished)}
						display="relative"
						editionId="UK"
						showWeekday={false}
						showDate={true}
						showTime={true}
					/>
				</div>
				<div css={textStyles}>{title}</div>
			</Link>
		</li>
	);
};

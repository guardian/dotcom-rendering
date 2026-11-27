import { css, keyframes } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineMedium28,
	headlineMedium34,
	space,
	textEgyptian17,
	textSans14,
	textSans17,
	until,
	visuallyHidden,
} from '@guardian/source/foundations';
import {
	Spinner,
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
	SvgCheckmark,
} from '@guardian/source/react-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getHeaderSignInUrl } from '../lib/headerSignInUrl';
import { getAuthStatus } from '../lib/identity';
import { isGameStatus } from '../lib/puzzleCardProgress';
import {
	IN_PROGRESS_BAR_PERCENTAGE,
	showsInProgress,
} from '../lib/puzzleProgress/inProgressDisplay';
import { palette as themePalette } from '../palette';
import type { PuzzlesArchive, PuzzlesArchiveItem } from '../types/puzzlesPage';

export type CalendarCell = {
	day: number;
	date: string;
	item?: PuzzlesArchiveItem;
};

const SupporterExclusiveIcon = ({ size = 12 }: { size?: number }) => (
	<svg
		aria-hidden="true"
		focusable="false"
		width={size}
		height={size}
		viewBox="0 0 12 11"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M5.70703 0L7.05412 4.1459H11.4134L7.88666 6.7082L9.23374 10.8541L5.70703 8.2918L2.18032 10.8541L3.5274 6.7082L0.000692368 4.1459H4.35995L5.70703 0Z"
			fill={themePalette('--puzzles-supporter-exclusive-star')}
		/>
	</svg>
);

const ProgressInformationIcon = () => (
	<svg
		aria-hidden="true"
		focusable="false"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
	>
		<path
			d="M10 0C4.46667 0 0 4.46667 0 10C0 15.5333 4.46667 20 10 20C15.5333 20 20 15.5333 20 10C20 4.46667 15.5333 0 10 0ZM11.1333 13.9333V14.4222C11.0222 14.5111 10.8667 14.5778 10.7111 14.6667C10.5556 14.7333 10.3778 14.8 10.2 14.8667C10.0222 14.9333 9.84445 14.9778 9.66667 15C9.48889 15.0222 9.31111 15.0444 9.15556 15.0444C8.8 15.0444 8.57778 14.9778 8.44444 14.8444C8.28889 14.7111 8.22222 14.5556 8.22222 14.4C8.22222 14.2222 8.24444 14.0444 8.26667 13.8667C8.28889 13.6889 8.33333 13.5111 8.37778 13.2889L9.31111 9.04445L8.44444 8.84445V8.37778C8.57778 8.33333 8.75556 8.26667 9 8.2C9.22222 8.13333 9.46667 8.08889 9.73333 8.04445C10 8 10.2444 7.95556 10.4889 7.93333C10.7333 7.91111 10.9556 7.88889 11.1556 7.88889L11.4 8.04445L10.1556 13.9333H11.1333ZM11.5556 6.46667C11.3556 6.64445 11.0667 6.73333 10.7333 6.73333C10.4222 6.73333 10.1556 6.64445 9.93333 6.46667C9.73333 6.28889 9.62222 6.06667 9.62222 5.77778C9.62222 5.46667 9.73333 5.22222 9.93333 5.04445C10.1333 4.86667 10.4 4.77778 10.7333 4.77778C11.0889 4.77778 11.3556 4.86667 11.5556 5.04445C11.7556 5.22222 11.8667 5.46667 11.8667 5.77778C11.8444 6.06667 11.7556 6.28889 11.5556 6.46667Z"
			fill={themePalette('--puzzles-info-icon')}
		/>
	</svg>
);

const CalendarCompletedIcon = () => (
	<svg
		width="18"
		height="15"
		viewBox="0 0 18 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M1.35439 6.91457L5.20392 10.7352L16.6088 0L18 1.40926L5.36046 15H4.59147L0 8.32169L1.35439 6.91457Z"
			fill={themePalette('--puzzles-completed-icon')}
		/>
	</svg>
);

const PremiumCompletedIcon = ({
	width = 16,
	height = 13.35119,
}: {
	width?: number;
	height?: number;
}) => (
	<svg
		aria-hidden="true"
		focusable="false"
		width={width}
		height={height}
		viewBox="0 0 16 13.3512"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M1.2039 6.15452L4.62571 9.5552L14.7634 0L16 1.25435L4.76485 13.3512H4.08131L0 7.40697L1.2039 6.15452Z"
			fill={themePalette('--puzzles-completed-icon')}
		/>
	</svg>
);

const InProgressIcon = ({ size = 16 }: { size?: number }) => (
	<svg
		aria-hidden="true"
		focusable="false"
		width={size}
		height={size}
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16V14.8571C11.7871 14.8571 14.8571 11.7871 14.8571 8C14.8571 4.2129 11.7871 1.14286 8 1.14286V0Z"
			fill={themePalette('--puzzles-in-progress-icon')}
		/>
		<path
			d="M7.10268 14.7991C7.39577 14.8373 7.69542 14.8571 8 14.8571V16C7.64582 16 7.29737 15.9743 6.95536 15.9297L7.10268 14.7991Z"
			fill={themePalette('--puzzles-in-progress-icon')}
		/>
		<path
			d="M3.82589 13.4408C4.29797 13.8036 4.81833 14.1062 5.375 14.3371L4.9375 15.3917C4.28684 15.1219 3.68013 14.7682 3.12946 14.3449L3.82589 13.4408Z"
			fill={themePalette('--puzzles-in-progress-icon')}
		/>
		<path
			d="M1.66295 10.625C1.89384 11.1817 2.19638 11.702 2.55915 12.1741L1.65402 12.8694C1.23081 12.3187 0.876893 11.7121 0.607143 11.0614L1.66295 10.625Z"
			fill={themePalette('--puzzles-in-progress-icon')}
		/>
		<path
			d="M1.20089 7.10268C1.16266 7.39577 1.14286 7.69542 1.14286 8C1.14286 8.30458 1.16266 8.60423 1.20089 8.89732L0.0691964 9.04353C0.0246848 8.70191 0 8.35375 0 8C0 7.64587 0.0245909 7.29732 0.0691964 6.95536L1.20089 7.10268Z"
			fill={themePalette('--puzzles-in-progress-icon')}
		/>
		<path
			d="M2.55915 3.82589C2.19638 4.29797 1.89384 4.81833 1.66295 5.375L0.607143 4.9375C0.876957 4.2869 1.23077 3.6801 1.65402 3.12946L2.55915 3.82589Z"
			fill={themePalette('--puzzles-in-progress-icon')}
		/>
		<path
			d="M5.375 1.66295C4.81833 1.89384 4.29797 2.19638 3.82589 2.55915L3.12946 1.65402C3.6801 1.23077 4.2869 0.876957 4.9375 0.607143L5.375 1.66295Z"
			fill={themePalette('--puzzles-in-progress-icon')}
		/>
		<path
			d="M8 1.14286C7.69542 1.14286 7.39577 1.16266 7.10268 1.20089L6.95536 0.0691964C7.29732 0.0245909 7.64587 0 8 0V1.14286Z"
			fill={themePalette('--puzzles-in-progress-icon')}
		/>
	</svg>
);

const PlayedLegendIcon = () => (
	<svg
		aria-hidden="true"
		width="13.3"
		height="13.3"
		viewBox="0 0 14 14"
		fill="none"
		focusable="false"
		xmlns="http://www.w3.org/2000/svg"
	>
		<mask id="puzzles-played-icon-mask" fill="white">
			<path d="M6.65039 0C10.3229 0.000211049 13.2998 2.97783 13.2998 6.65039C13.2996 10.3228 10.3228 13.2996 6.65039 13.2998C2.97783 13.2998 0.000211052 10.3229 0 6.65039C0 2.9777 2.9777 0 6.65039 0Z" />
		</mask>
		<path
			d="M6.65039 0L6.65045 -1H6.65039V0ZM13.2998 6.65039L14.2998 6.65045V6.65039H13.2998ZM6.65039 13.2998V14.2998H6.65045L6.65039 13.2998ZM0 6.65039H-1V6.65045L0 6.65039ZM6.65039 0L6.65033 1C9.77047 1.00018 12.2998 3.52998 12.2998 6.65039H13.2998H14.2998C14.2998 2.42568 10.8753 -0.999757 6.65045 -1L6.65039 0ZM13.2998 6.65039L12.2998 6.65033C12.2996 9.77048 9.77048 12.2996 6.65033 12.2998L6.65039 13.2998L6.65045 14.2998C10.8751 14.2996 14.2996 10.8751 14.2998 6.65045L13.2998 6.65039ZM6.65039 13.2998V12.2998C3.52998 12.2998 1.00018 9.77047 1 6.65033L0 6.65039L-1 6.65045C-0.999757 10.8753 2.42568 14.2998 6.65039 14.2998V13.2998ZM0 6.65039H1C1 3.52998 3.52998 1 6.65039 1V0V-1C2.42541 -1 -1 2.42541 -1 6.65039H0Z"
			fill={themePalette('--puzzles-completed-icon')}
			mask="url(#puzzles-played-icon-mask)"
		/>
		<path
			d="M10.5 4.56348L5.58496 10H5.28516L3.5 7.3291L4.02637 6.76562L5.52344 8.29395L9.95898 4L10.5 4.56348Z"
			fill={themePalette('--puzzles-completed-icon')}
		/>
	</svg>
);

export const daysInMonth = (year: number, month: number): number =>
	new Date(Date.UTC(year, month, 0)).getUTCDate();

export const mondayFirstOffset = (year: number, month: number): number =>
	(new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;

export const buildCalendarCells = (
	year: number,
	month: number,
	items: PuzzlesArchiveItem[],
): Array<CalendarCell | null> => {
	const byDate = new Map(items.map((item) => [item.date, item]));
	const prefix = Array<null>(mondayFirstOffset(year, month)).fill(null);
	const dates = Array.from(
		{ length: daysInMonth(year, month) },
		(_, index) => {
			const day = index + 1;
			const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
			return { day, date, item: byDate.get(date) };
		},
	);
	return [...prefix, ...dates];
};

export const archiveStatus = (
	item: PuzzlesArchiveItem | undefined,
): 'completed' | 'in-progress' | 'available' | 'unavailable' =>
	item === undefined
		? 'unavailable'
		: item.gameStatus === 'completed'
			? 'completed'
			: item.gameStatus === 'in-progress' &&
				  showsInProgress(item.puzzleType)
				? 'in-progress'
				: 'available';

const isArchiveItem = (value: unknown): value is PuzzlesArchiveItem => {
	if (typeof value !== 'object' || value === null) return false;
	const item = value as Record<string, unknown>;
	return (
		typeof item.puzzleType === 'string' &&
		typeof item.date === 'string' &&
		typeof item.progress === 'number' &&
		(item.isWithinFreeWindow === undefined ||
			typeof item.isWithinFreeWindow === 'boolean') &&
		(item.hasPremiumEntitlement === undefined ||
			typeof item.hasPremiumEntitlement === 'boolean') &&
		(item.gameStatus === undefined ||
			item.gameStatus === null ||
			isGameStatus(item.gameStatus)) &&
		typeof item.url === 'string'
	);
};

const isArchive = (value: unknown): value is PuzzlesArchive => {
	if (typeof value !== 'object' || value === null) return false;
	const archive = value as Record<string, unknown>;
	return (
		typeof archive.year === 'number' &&
		typeof archive.month === 'number' &&
		typeof archive.selectedPuzzle === 'object' &&
		archive.selectedPuzzle !== null &&
		'id' in archive.selectedPuzzle &&
		typeof archive.selectedPuzzle.id === 'string' &&
		Array.isArray(archive.puzzles) &&
		typeof archive.hasError === 'boolean' &&
		Array.isArray(archive.items) &&
		archive.items.every(isArchiveItem) &&
		(archive.recentItems === undefined ||
			(Array.isArray(archive.recentItems) &&
				archive.recentItems.every(isArchiveItem)))
	);
};

const sectionStyles = css`
	position: relative;
	min-width: 0;
	${from.leftCol} {
		padding-bottom: ${space[8]}px;
	}
`;

const linesStyles = css`
	height: 13px;
	margin-bottom: ${space[4]}px;
	background: repeating-linear-gradient(
		to bottom,
		${themePalette('--puzzles-border-colour')} 0,
		${themePalette('--puzzles-border-colour')} 1px,
		transparent 1px,
		transparent 4px
	);
`;

const CHIPS_FADE_WIDTH = space[10];

/**
 * From "tablet" the chips wrap onto extra lines, so none are ever hidden.
 * Below it they become a swipeable carousel (`tabsStyles`), faded at both
 * edges (`chipsFadeLeftStyles`, `chipsFadeRightStyles`). Same mechanism as the
 * "More from Puzzles & games" rail (`MorePuzzlesCard`): the carousel bleeds to
 * the page's vertical lines by undoing the page's side padding (`pageStyles`),
 * and the fades follow the chips' scroll position.
 */
const chipsStyles = css`
	--chips-edge-padding: ${space[3]}px;
	position: relative;
	/* Lets the fades follow the scroll position of the chips. */
	timeline-scope: --puzzles-chips-scroll;
	${until.tablet} {
		margin: 0 calc(var(--chips-edge-padding) * -1);
	}
`;

const chipsFadeInKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const chipsFadeStyles = css`
	display: none;
	${until.tablet} {
		position: absolute;
		top: 0;
		bottom: ${space[3]}px;
		width: ${CHIPS_FADE_WIDTH}px;
		pointer-events: none;
	}
`;

/**
 * Always visible, since the list's right padding lets the last chip scroll
 * clear of it.
 */
const chipsFadeRightStyles = css`
	${until.tablet} {
		display: block;
		right: 0;
		background: linear-gradient(
			to right,
			transparent 0%,
			${themePalette('--puzzles-page-background')} 100%
		);
	}
`;

/**
 * Must not cover the first chip at rest, so it only appears once the reader
 * has scrolled (a scroll-driven animation). Browsers without scroll-driven
 * animations don't show it.
 */
const chipsFadeLeftStyles = css`
	@supports (animation-timeline: scroll()) {
		${until.tablet} {
			display: block;
			left: 0;
			background: linear-gradient(
				to left,
				transparent 0%,
				${themePalette('--puzzles-page-background')} 100%
			);
			opacity: 0;
			animation-name: ${chipsFadeInKeyframes};
			animation-duration: 1ms;
			animation-timing-function: linear;
			animation-fill-mode: both;
			animation-timeline: --puzzles-chips-scroll;
			animation-range: 0 ${CHIPS_FADE_WIDTH}px;
		}
	}
`;

const tabsStyles = css`
	display: flex;
	flex-wrap: wrap;
	gap: ${space[3]}px;
	padding: 0 0 ${space[3]}px;
	${until.tablet} {
		flex-wrap: nowrap;
		overflow-x: auto;
		padding: 0 ${CHIPS_FADE_WIDTH}px ${space[3]}px var(--chips-edge-padding);
		scroll-padding: 0 ${CHIPS_FADE_WIDTH}px 0 var(--chips-edge-padding);
		scroll-timeline: --puzzles-chips-scroll inline;
		scrollbar-width: none;
		white-space: nowrap;
		::-webkit-scrollbar {
			display: none;
		}
	}
	a {
		flex: none;
		${textSans14};
		border: 1px solid ${themePalette('--puzzles-primary')};
		border-radius: 18px;
		padding: 2px ${space[3]}px;
		color: ${themePalette('--puzzles-primary')};
		font-weight: bold;
		line-height: 18px;
		text-decoration: none;
	}
	a:hover {
		background: ${themePalette('--puzzles-hover')};
	}
	a[aria-current='page'],
	a[aria-current='page']:hover {
		background: ${themePalette('--puzzles-primary')};
		color: ${themePalette('--puzzles-on-primary')};
		font-weight: bold;
	}
`;

const titleStyles = css`
	${headlineMedium28};
	margin: ${space[3]}px 0 ${space[3]}px;
	color: ${themePalette('--puzzles-headline-colour')};
	${from.tablet} {
		${headlineMedium34};
	}
`;

const publicationSubtitleStyles = css`
	${textEgyptian17};
	line-height: 1.3;
	color: ${themePalette('--puzzles-calendar-subtitle')};
	margin: 0 0 ${space[4]}px;
`;

const publicationSubtitle = (category: string, set: string): string => {
	if (category === 'crosswords') {
		switch (set) {
			case 'quick':
				return 'This puzzle is published from Monday to Saturday.';
			case 'cryptic':
				return 'This puzzle is published from Monday to Friday.';
			case 'quick-cryptic':
			case 'weekend':
			case 'prize':
				return 'This puzzle is published every Saturday.';
			case 'quiptic':
			case 'sunday-quick':
				return 'This puzzle is published every Sunday.';
		}
	}
	return 'This puzzle is published daily.';
};

const recentStyles = css`
	--recent-gap: 16px;
	display: flex;
	gap: var(--recent-gap);
	margin: 0 0 ${space[6]}px;
	overflow-x: auto;
	scrollbar-width: none;
	::-webkit-scrollbar {
		display: none;
	}
	${from.phablet} {
		--recent-gap: 24px;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		overflow: visible;
	}
	a {
		position: relative;
		box-sizing: border-box;
		flex: 0 0 calc((100% - var(--recent-gap)) / 2);
		min-height: 104px;
		padding: ${space[1]}px ${space[2]}px 30px;
		background: var(
			--puzzles-card-background,
			${themePalette('--puzzles-tint')}
		);
		color: ${themePalette('--puzzles-card-text-colour')};
		text-decoration: none;
		${from.phablet} {
			min-width: 0;
		}
	}
	.setter {
		display: block;
		color: ${themePalette('--puzzles-primary')};
	}
	a + a::before {
		position: absolute;
		top: 0;
		bottom: 0;
		left: calc(var(--recent-gap) / -2);
		border-left: 1px solid ${themePalette('--puzzles-border-colour')};
		content: '';
		pointer-events: none;
	}
	strong {
		display: block;
		color: var(
			--puzzles-card-headline-colour,
			${themePalette('--puzzles-primary')}
		);
		${headlineBold20};
	}
	a:hover strong {
		text-decoration: underline;
	}
	span {
		${textSans14};
	}
	.played {
		position: absolute;
		bottom: ${space[2]}px;
		left: ${space[2]}px;
		display: inline-flex;
		align-items: center;
		gap: ${space[1]}px;
		font-weight: bold;
		line-height: 1;
	}
	.played.in-progress {
		flex-direction: column;
		align-items: flex-start;
	}
	.progress-track {
		display: block;
		width: 80px;
		height: 3px;
		border-radius: 2px;
		background: color-mix(in srgb, currentColor 20%, transparent);
		span {
			display: block;
			height: 100%;
			border-radius: inherit;
			background: currentColor;
		}
	}
	.completed-icon {
		display: inline-flex;
		width: 14px;
		height: 14px;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: ${themePalette('--puzzles-played-badge-background')};
		color: ${themePalette('--puzzles-played-badge-icon')};
		svg {
			width: 11px;
			height: 11px;
			fill: currentColor;
		}
	}
`;

const controlsStyles = css`
	display: grid;
	grid-template-columns: 44px 1fr 44px;
	align-items: center;
	border-top: 1px solid ${themePalette('--puzzles-border-colour')};
	padding-top: ${space[3]}px;
	button,
	a {
		display: flex;
		width: 40px;
		height: 40px;
		align-items: center;
		justify-content: center;
		padding: 0;
		border: 1px solid ${themePalette('--puzzles-calendar-nav-border')};
		border-radius: 50%;
		background: ${themePalette('--puzzles-calendar-nav-background')};
		color: ${themePalette('--puzzles-text-colour')};
		cursor: pointer;
		text-decoration: none;
		svg {
			width: 26px;
			height: 26px;
			/* The icon has no fill of its own, so it would stay black. */
			fill: currentColor;
		}
		:last-child {
			justify-self: end;
		}
		:disabled,
		&[aria-disabled='true'] {
			border-color: ${themePalette('--puzzles-border-colour')};
			color: ${themePalette('--puzzles-calendar-nav-disabled')};
			cursor: not-allowed;
		}
	}
	strong {
		text-align: center;
		${textSans17};
		color: ${themePalette('--puzzles-headline-colour')};
		font-weight: bold;
	}
`;

const calendarStyles = css`
	--calendar-gap: 8px;
	--calendar-day-padding-block: 3px;
	--calendar-day-padding-inline: 6px;
	display: grid;
	grid-template-columns: repeat(7, minmax(0, 1fr));
	column-gap: var(--calendar-gap);
	row-gap: ${space[3]}px;
	margin-top: ${space[5]}px;
	.weekday {
		${textSans14};
		padding-bottom: ${space[2]}px;
		text-align: center;
	}
	.weekday.is-today {
		font-weight: bold;
	}
	.empty,
	.day {
		aspect-ratio: 1;
	}
	.day {
		position: relative;
		box-sizing: border-box;
		min-width: 0;
		padding: var(--calendar-day-padding-block)
			var(--calendar-day-padding-inline);
		border: 1px solid transparent;
		background: ${themePalette('--puzzles-calendar-day-background')};
		color: ${themePalette('--puzzles-card-text-colour')};
		text-decoration: none;
		${textSans14};
	}
	.day-number {
		display: block;
		font-size: 10px;
	}
	.day.is-today .day-number {
		font-weight: 700;
	}
	.day[data-status='available']:not([data-supporter-exclusive])::after {
		position: absolute;
		top: 4px;
		right: 4px;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: ${themePalette('--puzzles-supporter-exclusive-dot')};
		content: '';
	}
	.supporter-exclusive-icon {
		position: absolute;
		top: 8px;
		right: 8px;
		width: 12px;
		height: 12px;
		svg {
			display: block;
		}
	}
	.day[data-status='completed'] {
		background: ${themePalette('--puzzles-completed-day-background')};
	}
	.day[data-status='in-progress'] {
		background: ${themePalette('--puzzles-in-progress-day-background')};
	}
	.setter-name {
		display: none;
		position: absolute;
		top: 50%;
		left: 2px;
		right: 2px;
		overflow: hidden;
		font-size: 8px;
		line-height: 10px;
		text-align: center;
		text-overflow: ellipsis;
		transform: translateY(-50%);
		white-space: nowrap;
	}
	.completed-icon,
	.in-progress-icon {
		position: absolute;
		right: ${space[1]}px;
		bottom: ${space[1]}px;
		display: flex;
		width: 18px;
		height: 15px;
		align-items: center;
		justify-content: center;
		svg {
			display: block;
		}
	}
	.completed-icon svg > path {
		fill: ${themePalette('--puzzles-completed-day-icon')};
	}
	.in-progress-icon {
		width: 16px;
		height: 16px;
	}
	.day[data-status='unavailable'] {
		border-color: ${themePalette('--puzzles-unavailable-day-border')};
		background: ${themePalette('--puzzles-page-background')};
		color: ${themePalette('--puzzles-unavailable-day-text')};
	}
	${from.phablet} {
		grid-template-columns: repeat(7, 60px);
		justify-content: space-between;
		.setter-name {
			font-size: 10px;
			line-height: 12px;
		}
	}
	${from.tablet} {
		--calendar-day-padding-block: 4px;
		--calendar-day-padding-inline: 4px;
		grid-template-columns: repeat(7, 68px);
		.day-number {
			font-size: 12px;
		}
		.setter-name {
			display: block;
		}
	}
	${from.desktop} {
		grid-template-columns: repeat(7, 78px);
	}
`;

const premiumCalendarStyles = css`
	--calendar-gap: 4px;
	--calendar-day-padding-block: 4px;
	--calendar-day-padding-inline: 4px;
	grid-template-columns: repeat(7, minmax(0, 44px));
	justify-content: space-between;
	.day {
		border-radius: 3px;
	}
	.day[data-status='available'] {
		background: ${themePalette('--puzzles-page-background')};
		border-color: ${themePalette('--puzzles-border-colour')};
	}
	.day[data-status='available']:not([data-supporter-exclusive])::after {
		top: 8px;
		right: 8px;
		width: 8px;
		height: 8px;
	}
	.completed-icon,
	.in-progress-icon {
		right: 8px;
		bottom: 8px;
	}
	.completed-icon {
		width: 16px;
		height: 13.35119px;
	}
	${from.mobileMedium} {
		--calendar-gap: 8px;
	}
	${from.phablet} {
		grid-template-columns: repeat(7, 60px);
	}
	${from.tablet} {
		grid-template-columns: repeat(7, 72px);
		.day-number {
			font-size: 14px;
		}
		.completed-icon,
		.in-progress-icon {
			right: 12px;
			bottom: 12px;
		}
	}
`;

const monthLabelStyles = css`
	position: relative;
	justify-self: center;
	padding: 0 28px;
	text-align: center;
`;

const loadingIndicatorStyles = css`
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	width: 20px;
	height: 20px;
`;

const emptyMonthStyles = css`
	${textSans14};
	margin-top: ${space[4]}px;
	a {
		color: ${themePalette('--puzzles-primary')};
		text-decoration: underline;
	}
`;

const legendStyles = css`
	display: flex;
	flex-wrap: wrap;
	gap: ${space[4]}px;
	margin-top: ${space[8]}px;
	${textSans14};
	span {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	.available::before {
		display: inline-flex;
		flex: 0 0 auto;
		width: 13.3px;
		height: 13.3px;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		content: '';
		background: ${themePalette('--puzzles-supporter-exclusive-dot')};
	}
	svg {
		display: block;
		flex: 0 0 auto;
	}
	.completed svg > path {
		fill: ${themePalette('--puzzles-completed-day-icon')};
	}
	${from.leftCol} {
		position: absolute;
		bottom: 0;
		left: -160px;
		margin-top: 0;
		flex-direction: column;
		gap: ${space[1]}px;
	}
	${from.wide} {
		left: -240px;
	}
`;

const premiumLegendStyles = css`
	.available::before {
		width: 11px;
		height: 11px;
	}
	.completed {
		height: 16px;
		padding-left: 3px;
	}
	${from.leftCol} {
		gap: ${space[3]}px;
		> span {
			display: grid;
			grid-template-columns: 16px 1fr;
		}
		svg,
		.available::before {
			justify-self: center;
		}
		.completed {
			padding-left: 0;
		}
	}
`;

const subscriberMessageStyles = css`
	${textEgyptian17};
	font-size: 12px;
	line-height: 1.3;
	color: ${themePalette('--puzzles-calendar-subtitle')};
	margin: 0;
	flex-basis: 100%;
	${from.leftCol} {
		max-width: 140px;
	}
	${from.wide} {
		max-width: 220px;
	}
`;

const signInMessageStyles = css`
	${textSans17};
	display: flex;
	align-items: center;
	gap: ${space[3]}px;
	padding: ${space[3]}px ${space[4]}px;
	margin-top: ${space[6]}px;
	background-color: ${themePalette('--puzzles-sign-in-message-background')};
	color: ${themePalette('--puzzles-sign-in-message-text')};
	svg {
		flex: 0 0 auto;
	}
	p {
		margin: 0;
	}
	a {
		color: inherit;
		text-decoration: underline;
	}
`;

const monthName = (year: number, month: number) =>
	new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(
		new Date(Date.UTC(year, month - 1, 1)),
	);

const londonDateFormatter = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Europe/London',
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
});

const archiveDateFormatter = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Europe/London',
	weekday: 'short',
	month: 'short',
	day: 'numeric',
});

const datePart = (
	parts: Intl.DateTimeFormatPart[],
	type: 'year' | 'month' | 'day' | 'weekday',
) => parts.find((part) => part.type === type)?.value;

const londonDate = (date: Date): string | undefined => {
	const parts = londonDateFormatter.formatToParts(date);
	const year = datePart(parts, 'year');
	const month = datePart(parts, 'month');
	const day = datePart(parts, 'day');
	return year && month && day ? `${year}-${month}-${day}` : undefined;
};

const previousDate = (date: string): string | undefined => {
	const value = new Date(`${date}T12:00:00Z`);
	if (Number.isNaN(value.getTime())) return undefined;
	value.setUTCDate(value.getUTCDate() - 1);
	return value.toISOString().slice(0, 10);
};

export const archiveCardDate = (date: string, today = new Date()): string => {
	const todayDate = londonDate(today);
	if (date === todayDate) return 'Today';
	if (todayDate && date === previousDate(todayDate)) return 'Yesterday';

	const value = new Date(`${date}T12:00:00Z`);
	if (Number.isNaN(value.getTime())) return date;
	const parts = archiveDateFormatter.formatToParts(value);
	const weekday = datePart(parts, 'weekday');
	const day = datePart(parts, 'day');
	const month = datePart(parts, 'month')?.slice(0, 3);
	return weekday && day && month ? `${weekday} ${day} ${month}` : date;
};

export const currentWeekdayLabel = (today = new Date()): string =>
	new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Europe/London',
		weekday: 'short',
	})
		.format(today)
		.slice(0, 2);

const moveMonth = (year: number, month: number, delta: number) => {
	const value = new Date(Date.UTC(year, month - 1 + delta, 1));
	return { year: value.getUTCFullYear(), month: value.getUTCMonth() + 1 };
};

export const canNavigateToNextMonth = (
	year: number,
	month: number,
	today = new Date(),
): boolean =>
	year < today.getFullYear() ||
	(year === today.getFullYear() && month < today.getMonth() + 1);

const cacheKey = (puzzleId: string, year: number, month: number): string =>
	`${puzzleId}-${year}-${month}`;

export const archivePageUrl = (
	puzzle: Pick<PuzzlesArchive['selectedPuzzle'], 'path'>,
	year: number,
	month: number,
): string => {
	const search = new URLSearchParams({
		year: String(year),
		month: String(month),
	});
	return `${puzzle.path}?${search.toString()}`;
};

const archiveLinkName = (
	archive: PuzzlesArchive,
	action: string,
	...details: string[]
): string =>
	[
		'archive',
		action,
		archive.category,
		`puzzle-${archive.selectedPuzzle.id}`,
		...details,
	].join(' | ');

const archiveMonth = (year: number, month: number): string =>
	`${year}-${String(month).padStart(2, '0')}`;

export const PuzzlesArchiveCalendar = ({
	initialArchive,
	showPremiumIndicators = false,
	idUrl = 'https://profile.theguardian.com',
}: {
	initialArchive: PuzzlesArchive;
	showPremiumIndicators?: boolean;
	idUrl?: string;
}) => {
	const [archive, setArchive] = useState(initialArchive);
	const [isSignedIn, setIsSignedIn] = useState<boolean>();
	const isPremiumSubscriber =
		isSignedIn === true &&
		[...archive.items, ...(archive.recentItems ?? [])].some(
			(item) => item.hasPremiumEntitlement === true,
		);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(initialArchive.hasError);
	const requests = useRef({ id: 0 });
	const navigationTimer = useRef<number | undefined>(undefined);
	const cache = useRef(
		new Map([
			[
				cacheKey(
					initialArchive.selectedPuzzle.id,
					initialArchive.year,
					initialArchive.month,
				),
				initialArchive,
			],
		]),
	);
	const cells = buildCalendarCells(
		archive.year,
		archive.month,
		archive.items,
	);
	const hasItemsInMonth = cells.some((cell) => cell?.item !== undefined);
	const puzzleLabel =
		archive.category === 'crosswords'
			? `${archive.selectedPuzzle.title.replace(/ crosswords?$/i, '')} crosswords`
			: `${archive.selectedPuzzle.title} puzzles`;
	const puzzleHeading =
		archive.category === 'crosswords' &&
		!/\bcrosswords?\b/i.test(archive.selectedPuzzle.title)
			? `${archive.selectedPuzzle.title} crossword`
			: archive.selectedPuzzle.title;
	// Fall back for Frontend versions that have not yet added recentItems.
	const recent = [...(archive.recentItems ?? archive.items)]
		.sort((left, right) => right.date.localeCompare(left.date))
		.slice(0, 3);
	const canSelectNextMonth = canNavigateToNextMonth(
		archive.year,
		archive.month,
	);
	const today = new Date();
	const todayDate = londonDate(today);
	const displayedMonth = archiveMonth(archive.year, archive.month);
	const todayWeekday = todayDate?.startsWith(`${displayedMonth}-`)
		? currentWeekdayLabel(today)
		: undefined;

	const loadArchive = useCallback(
		async (
			year: number,
			month: number,
			puzzleId: string,
			force = false,
		): Promise<PuzzlesArchive | undefined> => {
			const currentRequest = ++requests.current.id;
			const key = cacheKey(puzzleId, year, month);
			const cached = cache.current.get(key);
			if (!force && cached && !cached.hasError) {
				setArchive(cached);
				setError(cached.hasError);
				setLoading(false);
				return cached;
			}

			setLoading(true);
			setError(false);
			try {
				// Query parameters are stripped by the CDN in CODE/PROD.
				const url = new URL(
					`${window.guardian.config.page.ajaxUrl}/puzzles-and-games/${initialArchive.category}/archive-data/${encodeURIComponent(puzzleId)}/${year}/${month}`,
					window.location.origin,
				);
				const authStatus = await getAuthStatus();
				const headers: Record<string, string> = {
					Accept: 'application/json',
				};
				if (authStatus.kind === 'SignedIn') {
					headers.Authorization = `Bearer ${authStatus.accessToken.accessToken}`;
				}
				const response = await fetch(url, {
					cache: 'no-store',
					credentials: 'same-origin',
					headers,
				});
				if (!response.ok) {
					throw new Error(
						`Archive request failed: ${response.status}`,
					);
				}
				const value: unknown = await response.json();
				if (
					!isArchive(value) ||
					value.category !== initialArchive.category ||
					value.selectedPuzzle.id !== puzzleId ||
					value.year !== year ||
					value.month !== month ||
					value.hasError
				) {
					throw new Error('Invalid archive response');
				}
				if (currentRequest !== requests.current.id) return undefined;
				if (showPremiumIndicators) {
					setIsSignedIn(authStatus.kind === 'SignedIn');
				}
				cache.current.set(key, value);
				setArchive(value);
				setError(value.hasError);
				return value;
			} catch {
				if (currentRequest === requests.current.id) setError(true);
				return undefined;
			} finally {
				if (currentRequest === requests.current.id) setLoading(false);
			}
		},
		[initialArchive.category, showPremiumIndicators],
	);

	useEffect(() => {
		const pendingRequests = requests.current;
		// The browser retains the query even when the CDN removes it upstream.
		// Restore deep links after hydration, and Back/Forward without a reload.
		const restoreSelection = async (force = false) => {
			const requestAtStart = requests.current.id;
			const params = new URLSearchParams(window.location.search);
			const pathname = window.location.pathname.replace(/\/$/, '');
			const selectedPuzzle =
				initialArchive.puzzles.find(
					(candidate) => candidate.path === pathname,
				) ?? initialArchive.selectedPuzzle;
			const year = Number(params.get('year'));
			const month = Number(params.get('month'));
			const selectionDate = new Date();
			const validMonth =
				Number.isInteger(year) &&
				year > 0 &&
				Number.isInteger(month) &&
				month >= 1 &&
				month <= 12 &&
				(year < selectionDate.getFullYear() ||
					(year === selectionDate.getFullYear() &&
						month <= selectionDate.getMonth() + 1));
			const authStatus = await getAuthStatus();
			if (requestAtStart !== requests.current.id) return;
			if (showPremiumIndicators) {
				setIsSignedIn(authStatus.kind === 'SignedIn');
			}
			void loadArchive(
				validMonth ? year : initialArchive.year,
				validMonth ? month : initialArchive.month,
				selectedPuzzle.id,
				force || authStatus.kind === 'SignedIn',
			);
		};
		void restoreSelection();
		const onPopState = () => void restoreSelection();
		const onPageShow = (event: PageTransitionEvent) => {
			if (!event.persisted) return;
			// BFCache restores the mounted island and its stale month cache.
			++pendingRequests.id;
			cache.current.clear();
			void restoreSelection(true);
		};
		window.addEventListener('popstate', onPopState);
		window.addEventListener('pageshow', onPageShow);
		return () => {
			window.removeEventListener('popstate', onPopState);
			window.removeEventListener('pageshow', onPageShow);
			if (navigationTimer.current !== undefined) {
				window.clearTimeout(navigationTimer.current);
			}
			++pendingRequests.id;
		};
	}, [initialArchive, loadArchive, showPremiumIndicators]);

	const selectMonth = async (delta: number, pageUrl: string) => {
		if (delta > 0 && !canSelectNextMonth) return;
		const next = moveMonth(archive.year, archive.month, delta);
		const selected = await loadArchive(
			next.year,
			next.month,
			archive.selectedPuzzle.id,
		);
		if (selected) window.history.pushState({}, '', pageUrl);
	};

	const selectPuzzle = async (puzzleId: string, pageUrl: string) => {
		if (puzzleId === archive.selectedPuzzle.id && !error && !loading) {
			return;
		}
		const selected = await loadArchive(
			archive.year,
			archive.month,
			puzzleId,
		);
		if (selected) window.history.pushState({}, '', pageUrl);
	};

	const navigateAfterClick = (navigate: () => Promise<void>) => {
		if (navigationTimer.current !== undefined) {
			window.clearTimeout(navigationTimer.current);
		}
		// Let Ophan's document listener read the clicked link before React
		// removes its tracking name while loading or changes a cached selection.
		navigationTimer.current = window.setTimeout(() => {
			navigationTimer.current = undefined;
			void navigate();
		}, 0);
	};

	const previousMonth = moveMonth(archive.year, archive.month, -1);
	const previousMonthUrl = archivePageUrl(
		archive.selectedPuzzle,
		previousMonth.year,
		previousMonth.month,
	);
	const nextMonth = moveMonth(archive.year, archive.month, 1);
	const nextMonthUrl = archivePageUrl(
		archive.selectedPuzzle,
		nextMonth.year,
		nextMonth.month,
	);

	return (
		<section
			aria-label={`${archive.selectedPuzzle.title} archive`}
			css={sectionStyles}
			data-component="puzzles-archive-calendar"
		>
			<div aria-hidden="true" css={linesStyles} />
			<div css={chipsStyles}>
				<nav
					aria-label="Puzzle types"
					css={tabsStyles}
					data-component="puzzles-archive-types"
				>
					{archive.puzzles.map((puzzle) => {
						const href = archivePageUrl(
							puzzle,
							archive.year,
							archive.month,
						);
						return (
							<a
								aria-current={
									puzzle.id === archive.selectedPuzzle.id
										? 'page'
										: undefined
								}
								href={href}
								key={puzzle.id}
								data-link-name={archiveLinkName(
									archive,
									'puzzle-type',
									`target-puzzle-${puzzle.id}`,
									`month-${displayedMonth}`,
								)}
								onClick={(event) => {
									if (
										event.button !== 0 ||
										event.metaKey ||
										event.ctrlKey ||
										event.shiftKey ||
										event.altKey
									) {
										return;
									}
									event.preventDefault();
									navigateAfterClick(() =>
										selectPuzzle(puzzle.id, href),
									);
								}}
							>
								{puzzle.title}
							</a>
						);
					})}
				</nav>
				<div
					aria-hidden="true"
					css={[chipsFadeStyles, chipsFadeLeftStyles]}
				/>
				<div
					aria-hidden="true"
					css={[chipsFadeStyles, chipsFadeRightStyles]}
				/>
			</div>
			<h2 css={titleStyles}>{puzzleHeading}</h2>
			{showPremiumIndicators && (
				<p css={publicationSubtitleStyles}>
					{publicationSubtitle(
						archive.category,
						archive.selectedPuzzle.set,
					)}
				</p>
			)}
			<div css={recentStyles} data-component="puzzles-archive-recent">
				{recent.map((item, index) => (
					<a
						href={item.url}
						key={`${item.date}-${item.puzzleType}`}
						data-link-name={archiveLinkName(
							archive,
							'recent',
							`date-${item.date}`,
							`card-@${index + 1}`,
						)}
					>
						<strong>
							{index === 0
								? `Latest ${archive.selectedPuzzle.title}`
								: archive.selectedPuzzle.title}
						</strong>
						<span>
							<time dateTime={item.date}>
								{archiveCardDate(item.date, today)}
							</time>
						</span>
						{item.setterName && (
							<span className="setter">
								By: {item.setterName}
							</span>
						)}
						{item.gameStatus === 'in-progress' &&
							showsInProgress(item.puzzleType) && (
								<span className="played in-progress">
									<span
										aria-hidden="true"
										className="progress-track"
									>
										<span
											style={{
												width: `${IN_PROGRESS_BAR_PERCENTAGE}%`,
											}}
										/>
									</span>
									In progress
								</span>
							)}
						{item.gameStatus === 'completed' && (
							<span className="played">
								Played
								<span
									aria-hidden="true"
									className="completed-icon"
								>
									<SvgCheckmark />
								</span>
							</span>
						)}
					</a>
				))}
			</div>
			<div css={controlsStyles}>
				<a
					aria-label="Previous month"
					aria-disabled={loading}
					href={previousMonthUrl}
					data-link-name={
						loading
							? undefined
							: archiveLinkName(
									archive,
									'previous-month',
									`month-${archiveMonth(previousMonth.year, previousMonth.month)}`,
								)
					}
					onClick={(event) => {
						if (loading) {
							event.preventDefault();
							return;
						}
						if (
							event.button !== 0 ||
							event.metaKey ||
							event.ctrlKey ||
							event.shiftKey ||
							event.altKey
						) {
							return;
						}
						event.preventDefault();
						navigateAfterClick(() =>
							selectMonth(-1, previousMonthUrl),
						);
					}}
				>
					<SvgArrowLeftStraight />
				</a>
				<div css={monthLabelStyles}>
					<strong aria-live="polite">
						{monthName(archive.year, archive.month)}
					</strong>
					<span css={loadingIndicatorStyles} role="status">
						<span
							css={css`
								${visuallyHidden}
							`}
						>
							{loading ? 'Loading archive…' : ''}
						</span>
						{loading && (
							<span aria-hidden="true">
								<Spinner size="small" />
							</span>
						)}
					</span>
				</div>
				{canSelectNextMonth ? (
					<a
						aria-label="Next month"
						aria-disabled={loading}
						href={nextMonthUrl}
						data-link-name={
							loading
								? undefined
								: archiveLinkName(
										archive,
										'next-month',
										`month-${archiveMonth(nextMonth.year, nextMonth.month)}`,
									)
						}
						onClick={(event) => {
							if (loading) {
								event.preventDefault();
								return;
							}
							if (
								event.button !== 0 ||
								event.metaKey ||
								event.ctrlKey ||
								event.shiftKey ||
								event.altKey
							) {
								return;
							}
							event.preventDefault();
							navigateAfterClick(() =>
								selectMonth(1, nextMonthUrl),
							);
						}}
					>
						<SvgArrowRightStraight />
					</a>
				) : (
					<button
						aria-label="Next month"
						disabled={true}
						type="button"
					>
						<SvgArrowRightStraight />
					</button>
				)}
			</div>
			<div
				css={[
					calendarStyles,
					showPremiumIndicators && premiumCalendarStyles,
				]}
				data-testid="archive-calendar"
				aria-busy={loading}
			>
				{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
					<div
						className={`weekday${day === todayWeekday ? ' is-today' : ''}`}
						key={day}
					>
						{day}
					</div>
				))}
				{cells.map((cell, index) => {
					if (cell === null) {
						return (
							<span className="empty" key={`empty-${index}`} />
						);
					}
					const status = archiveStatus(cell.item);
					const statusText =
						status === 'in-progress' ? 'in progress' : status;
					const supporterExclusive =
						showPremiumIndicators &&
						cell.item?.isWithinFreeWindow === false &&
						cell.item.hasPremiumEntitlement !== true;
					const isToday = cell.date === todayDate;
					return cell.item ? (
						<a
							aria-label={`${cell.date}, ${supporterExclusive ? 'Supporter exclusive' : statusText}${supporterExclusive && (status === 'completed' || status === 'in-progress') ? `, ${statusText}` : ''}`}
							className={`day${isToday ? ' is-today' : ''}`}
							data-date={cell.date}
							data-status={status}
							data-supporter-exclusive={
								supporterExclusive || undefined
							}
							href={cell.item.url}
							key={cell.date}
							data-link-name={archiveLinkName(
								archive,
								'date',
								`date-${cell.date}`,
							)}
						>
							{cell.item.setterName !== undefined &&
								cell.item.setterName !== '' && (
									<span
										aria-hidden="true"
										className="setter-name"
										title={cell.item.setterName}
									>
										{cell.item.setterName}
									</span>
								)}
							<span className="day-number">{cell.day}</span>
							{supporterExclusive && (
								<span className="supporter-exclusive-icon">
									<SupporterExclusiveIcon />
								</span>
							)}
							{status === 'in-progress' && (
								<span
									aria-hidden="true"
									className="in-progress-icon"
								>
									<InProgressIcon />
								</span>
							)}
							{status === 'completed' && (
								<span
									aria-hidden="true"
									className="completed-icon"
								>
									{showPremiumIndicators ? (
										<PremiumCompletedIcon />
									) : (
										<CalendarCompletedIcon />
									)}
								</span>
							)}
						</a>
					) : (
						<span
							aria-disabled="true"
							className={`day${isToday ? ' is-today' : ''}`}
							data-date={cell.date}
							data-status="unavailable"
							key={cell.date}
						>
							<span className="day-number">{cell.day}</span>
						</span>
					);
				})}
			</div>
			{error && (
				<p role="alert">
					The archive could not be loaded. Please try another month.
				</p>
			)}
			{!hasItemsInMonth && !archive.hasError && (
				<div
					css={emptyMonthStyles}
					hidden={error}
					style={{ visibility: loading ? 'hidden' : 'visible' }}
				>
					<p>
						No {puzzleLabel} are available for{' '}
						{monthName(archive.year, archive.month)}.
					</p>
					<a
						href={previousMonthUrl}
						data-link-name={
							loading
								? undefined
								: archiveLinkName(
										archive,
										'previous-month-empty',
										`month-${archiveMonth(previousMonth.year, previousMonth.month)}`,
									)
						}
						onClick={(event) => {
							if (
								event.button !== 0 ||
								event.metaKey ||
								event.ctrlKey ||
								event.shiftKey ||
								event.altKey
							) {
								return;
							}
							event.preventDefault();
							navigateAfterClick(() =>
								selectMonth(-1, previousMonthUrl),
							);
						}}
					>
						View previous month
					</a>
				</div>
			)}
			<div
				css={[
					legendStyles,
					showPremiumIndicators && premiumLegendStyles,
				]}
			>
				{showPremiumIndicators && !isPremiumSubscriber && (
					<span className="supporter-exclusive">
						<SupporterExclusiveIcon size={14} />
						Supporter exclusive
					</span>
				)}
				<span className="available">Available</span>
				{showsInProgress(archive.selectedPuzzle.puzzleType) && (
					<span className="in-progress">
						<InProgressIcon
							size={showPremiumIndicators ? 11 : 13.3}
						/>
						In progress
					</span>
				)}
				<span className="completed">
					{showPremiumIndicators ? (
						<PremiumCompletedIcon
							width={10.28516}
							height={8.57096}
						/>
					) : (
						<PlayedLegendIcon />
					)}
					Played
				</span>
				{showPremiumIndicators && isPremiumSubscriber && (
					<p css={subscriberMessageStyles}>
						Supporter exclusive - you have ad-free access to the
						puzzles archive
					</p>
				)}
			</div>
			{showPremiumIndicators && isSignedIn === false && (
				<div
					css={signInMessageStyles}
					data-component="puzzles-archive-progress-sign-in"
				>
					<ProgressInformationIcon />
					<p>
						Want to track your progress?{' '}
						<a
							href={getHeaderSignInUrl(idUrl)}
							data-link-name="puzzles | archive | progress-sign-in"
						>
							Sign in or create an account
						</a>
					</p>
				</div>
			)}
		</section>
	);
};

import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold34,
	palette,
	space,
	textSans14,
	textSans17,
	visuallyHidden,
} from '@guardian/source/foundations';
import {
	Spinner,
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
	SvgCheckmark,
} from '@guardian/source/react-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAuthStatus } from '../lib/identity';
import type { PuzzlesArchive, PuzzlesArchiveItem } from '../types/puzzlesPage';

export type CalendarCell = {
	day: number;
	date: string;
	item?: PuzzlesArchiveItem;
};

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
			fill="#22874D"
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
			fill="#22874D"
			mask="url(#puzzles-played-icon-mask)"
		/>
		<path
			d="M10.5 4.56348L5.58496 10H5.28516L3.5 7.3291L4.02637 6.76562L5.52344 8.29395L9.95898 4L10.5 4.56348Z"
			fill="#22874D"
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
): 'completed' | 'available' | 'unavailable' =>
	item === undefined
		? 'unavailable'
		: item.progress === 100
			? 'completed'
			: 'available';

const isArchiveItem = (value: unknown): value is PuzzlesArchiveItem => {
	if (typeof value !== 'object' || value === null) return false;
	const item = value as Record<string, unknown>;
	return (
		typeof item.puzzleType === 'string' &&
		typeof item.date === 'string' &&
		typeof item.progress === 'number' &&
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
		archive.items.every(isArchiveItem)
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
	height: 10px;
	margin-bottom: ${space[4]}px;
	background: repeating-linear-gradient(
		to bottom,
		var(--puzzles-border-colour, ${palette.neutral[86]}) 0,
		var(--puzzles-border-colour, ${palette.neutral[86]}) 1px,
		transparent 1px,
		transparent 3px
	);
`;

const tabsStyles = css`
	display: flex;
	gap: ${space[3]}px;
	overflow-x: auto;
	padding: 0 0 ${space[3]}px;
	scrollbar-width: none;
	white-space: nowrap;
	::-webkit-scrollbar {
		display: none;
	}
	a {
		${textSans14};
		border: 1px solid ${palette.news[400]};
		border-radius: 18px;
		padding: 2px ${space[3]}px;
		color: ${palette.news[400]};
		font-weight: bold;
		line-height: 18px;
		text-decoration: none;
	}
	a[aria-current='page'] {
		background: ${palette.news[400]};
		color: ${palette.neutral[100]};
		font-weight: bold;
	}
`;

const titleStyles = css`
	${headlineBold34};
	margin: ${space[3]}px 0 ${space[3]}px;
	color: var(--puzzles-headline-colour, ${palette.neutral[7]});
	line-height: 1.05;
`;

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
		padding: ${space[2]}px ${space[2]}px 30px;
		background: var(--puzzles-card-background, ${palette.news[800]});
		color: var(--puzzles-card-text-colour, ${palette.neutral[7]});
		text-decoration: none;
		${from.phablet} {
			min-width: 0;
		}
	}
	a + a::before {
		position: absolute;
		top: 0;
		bottom: 0;
		left: calc(var(--recent-gap) / -2);
		border-left: 1px solid
			var(--puzzles-border-colour, ${palette.neutral[86]});
		content: '';
		pointer-events: none;
	}
	strong {
		display: block;
		color: var(--puzzles-card-headline-colour, ${palette.news[400]});
		${headlineBold20};
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
	.completed-icon {
		display: inline-flex;
		width: 14px;
		height: 14px;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: ${palette.success[400]};
		color: ${palette.neutral[100]};
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
	border-top: 1px solid var(--puzzles-border-colour, ${palette.neutral[86]});
	padding-top: ${space[3]}px;
	button,
	a {
		display: flex;
		width: 40px;
		height: 40px;
		align-items: center;
		justify-content: center;
		padding: 0;
		border: 1px solid ${palette.neutral[20]};
		border-radius: 50%;
		background: var(--puzzles-card-background, ${palette.neutral[100]});
		color: var(--puzzles-text-colour, ${palette.neutral[7]});
		cursor: pointer;
		text-decoration: none;
		svg {
			width: 26px;
			height: 26px;
		}
		:last-child {
			justify-self: end;
		}
		:disabled,
		&[aria-disabled='true'] {
			border-color: var(--puzzles-border-colour, ${palette.neutral[86]});
			color: ${palette.neutral[60]};
			cursor: not-allowed;
		}
	}
	strong {
		text-align: center;
		${textSans17};
		color: var(--puzzles-headline-colour, ${palette.neutral[7]});
		font-weight: bold;
	}
`;

const calendarAvailableDot = '#0a8ced';
const calendarPlayedBackground = '#effbf5';

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
		background: var(--puzzles-card-background, ${palette.neutral[97]});
		color: var(--puzzles-card-text-colour, ${palette.neutral[7]});
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
	.day[data-status='available']::after {
		position: absolute;
		top: 4px;
		right: 4px;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: ${calendarAvailableDot};
		content: '';
	}
	.day[data-status='completed'] {
		background: ${calendarPlayedBackground};
	}
	.setter-name {
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
	.completed-icon {
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
	.day[data-status='unavailable'] {
		border-color: ${palette.neutral[97]};
		background: var(--puzzles-page-background, ${palette.neutral[100]});
		color: ${palette.neutral[60]};
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
	}
	${from.desktop} {
		grid-template-columns: repeat(7, 78px);
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
		color: ${palette.news[400]};
		text-decoration: underline;
	}
`;

const legendStyles = css`
	display: flex;
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
		background: ${calendarAvailableDot};
	}
	.completed svg {
		display: block;
		flex: 0 0 auto;
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
	category: PuzzlesArchive['category'],
	puzzleId: string,
	year: number,
	month: number,
): string => {
	const search = new URLSearchParams({
		puzzle: puzzleId,
		year: String(year),
		month: String(month),
	});
	return `/puzzles-and-games/${category}/archive?${search.toString()}`;
};

export const PuzzlesArchiveCalendar = ({
	initialArchive,
}: {
	initialArchive: PuzzlesArchive;
}) => {
	const [archive, setArchive] = useState(initialArchive);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(initialArchive.hasError);
	const requests = useRef({ id: 0 });
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
	const recent = [...archive.items]
		.sort((left, right) => right.date.localeCompare(left.date))
		.slice(0, 3);
	const canSelectNextMonth = canNavigateToNextMonth(
		archive.year,
		archive.month,
	);
	const today = new Date();
	const todayDate = londonDate(today);
	const displayedMonth = `${archive.year}-${String(archive.month).padStart(2, '0')}`;
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
					`/puzzles-and-games/${initialArchive.category}/archive-data/${encodeURIComponent(puzzleId)}/${year}/${month}`,
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
		[initialArchive.category],
	);

	useEffect(() => {
		const pendingRequests = requests.current;
		// The browser retains the query even when the CDN removes it upstream.
		// Restore deep links after hydration, and Back/Forward without a reload.
		const restoreSelection = async () => {
			const requestAtStart = requests.current.id;
			const params = new URLSearchParams(window.location.search);
			const puzzle = params.get('puzzle');
			const selectedPuzzle =
				initialArchive.puzzles.find(
					(candidate) =>
						candidate.id === puzzle ||
						candidate.set === puzzle ||
						candidate.slug?.split('/').pop() === puzzle,
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
			void loadArchive(
				validMonth ? year : initialArchive.year,
				validMonth ? month : initialArchive.month,
				selectedPuzzle.id,
				authStatus.kind === 'SignedIn',
			);
		};
		void restoreSelection();
		const onPopState = () => void restoreSelection();
		window.addEventListener('popstate', onPopState);
		return () => {
			window.removeEventListener('popstate', onPopState);
			++pendingRequests.id;
		};
	}, [initialArchive, loadArchive]);

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

	const previousMonth = moveMonth(archive.year, archive.month, -1);
	const previousMonthUrl = archivePageUrl(
		archive.category,
		archive.selectedPuzzle.id,
		previousMonth.year,
		previousMonth.month,
	);
	const nextMonth = moveMonth(archive.year, archive.month, 1);
	const nextMonthUrl = archivePageUrl(
		archive.category,
		archive.selectedPuzzle.id,
		nextMonth.year,
		nextMonth.month,
	);

	return (
		<section
			aria-label={`${archive.selectedPuzzle.title} archive`}
			css={sectionStyles}
		>
			<div aria-hidden="true" css={linesStyles} />
			<nav aria-label="Puzzle types" css={tabsStyles}>
				{archive.puzzles.map((puzzle) => {
					const href = archivePageUrl(
						archive.category,
						puzzle.id,
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
								void selectPuzzle(puzzle.id, href);
							}}
						>
							{puzzle.title}
						</a>
					);
				})}
			</nav>
			<h2 css={titleStyles}>{puzzleHeading}</h2>
			<div css={recentStyles}>
				{recent.map((item, index) => (
					<a href={item.url} key={`${item.date}-${item.puzzleType}`}>
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
							<span> · By: {item.setterName}</span>
						)}
						{item.progress === 100 && (
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
						void selectMonth(-1, previousMonthUrl);
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
							void selectMonth(1, nextMonthUrl);
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
				css={calendarStyles}
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
					const isToday = cell.date === todayDate;
					return cell.item ? (
						<a
							aria-label={`${cell.date}, ${status}`}
							className={`day${isToday ? ' is-today' : ''}`}
							data-date={cell.date}
							data-status={status}
							href={cell.item.url}
							key={cell.date}
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
							{status === 'completed' && (
								<span
									aria-hidden="true"
									className="completed-icon"
								>
									<CalendarCompletedIcon />
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
							void selectMonth(-1, previousMonthUrl);
						}}
					>
						View previous month
					</a>
				</div>
			)}
			<div css={legendStyles}>
				<span className="available">Available</span>
				<span className="completed">
					<PlayedLegendIcon />
					Played
				</span>
			</div>
		</section>
	);
};

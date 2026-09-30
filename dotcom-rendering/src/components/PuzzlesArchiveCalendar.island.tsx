import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold34,
	palette,
	space,
	textSans14,
	textSans17,
} from '@guardian/source/foundations';
import {
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
	SvgCheckmark,
} from '@guardian/source/react-components';
import { useRef, useState } from 'react';
import type { PuzzlesArchive, PuzzlesArchiveItem } from '../types/puzzlesPage';

export type CalendarCell = {
	day: number;
	date: string;
	item?: PuzzlesArchiveItem;
};

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
		${palette.neutral[86]} 0,
		${palette.neutral[86]} 1px,
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
		padding: ${space[2]}px;
		background: ${palette.news[800]};
		color: ${palette.neutral[7]};
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
		border-left: 1px solid ${palette.neutral[86]};
		content: '';
		pointer-events: none;
	}
	strong {
		display: block;
		color: ${palette.news[400]};
		${headlineBold20};
	}
	span {
		${textSans14};
	}
`;

const controlsStyles = css`
	display: grid;
	grid-template-columns: 44px 1fr 44px;
	align-items: center;
	border-top: 1px solid ${palette.neutral[86]};
	padding-top: ${space[3]}px;
	button {
		display: flex;
		width: 40px;
		height: 40px;
		align-items: center;
		justify-content: center;
		padding: 0;
		border: 1px solid ${palette.neutral[20]};
		border-radius: 50%;
		background: ${palette.neutral[100]};
		cursor: pointer;
		svg {
			width: 26px;
			height: 26px;
		}
		:last-of-type {
			justify-self: end;
		}
	}
	strong {
		text-align: center;
		${textSans17};
	}
`;

const calendarStyles = css`
	--calendar-gap: 8px;
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
	.empty,
	.day {
		aspect-ratio: 1;
	}
	.day {
		position: relative;
		display: flex;
		box-sizing: border-box;
		align-items: flex-end;
		justify-content: center;
		min-width: 0;
		padding-bottom: ${space[1]}px;
		border: 1px solid ${palette.neutral[93]};
		background: ${palette.neutral[97]};
		color: ${palette.neutral[7]};
		text-decoration: none;
		${textSans14};
	}
	.day[data-status='available']::after {
		position: absolute;
		top: 4px;
		right: 4px;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: ${palette.brand[500]};
		content: '';
	}
	.day[data-status='completed'] {
		border: 1px solid ${palette.success[400]};
		background: #c3f1d5;
	}
	.completed-icon {
		position: absolute;
		top: ${space[1]}px;
		left: 50%;
		display: flex;
		width: clamp(12px, 3.5vw, 18px);
		height: clamp(12px, 3.5vw, 18px);
		transform: translateX(-50%);
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: ${palette.success[400]};
		color: ${palette.neutral[100]};
		svg {
			width: 75%;
			height: 75%;
			fill: currentColor;
		}
	}
	.day[data-status='unavailable'] {
		border-color: transparent;
		background: transparent;
		color: ${palette.neutral[60]};
	}
	${from.phablet} {
		grid-template-columns: repeat(7, 60px);
		justify-content: space-between;
	}
	${from.tablet} {
		grid-template-columns: repeat(7, 68px);
	}
	${from.desktop} {
		grid-template-columns: repeat(7, 78px);
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
	span::before {
		display: inline-flex;
		flex: 0 0 auto;
		width: 16px;
		height: 16px;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		content: '';
	}
	.available::before {
		background: ${palette.brand[500]};
	}
	.completed::before {
		background: ${palette.success[400]};
		color: ${palette.neutral[100]};
		content: '✓';
		font-size: 11px;
		font-weight: bold;
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

const moveMonth = (year: number, month: number, delta: number) => {
	const value = new Date(Date.UTC(year, month - 1 + delta, 1));
	return { year: value.getUTCFullYear(), month: value.getUTCMonth() + 1 };
};

export const PuzzlesArchiveCalendar = ({
	initialArchive,
}: {
	initialArchive: PuzzlesArchive;
}) => {
	const [archive, setArchive] = useState(initialArchive);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(initialArchive.hasError);
	const cache = useRef(
		new Map([
			[`${initialArchive.year}-${initialArchive.month}`, initialArchive],
		]),
	);
	const cells = buildCalendarCells(
		archive.year,
		archive.month,
		archive.items,
	);
	const recent = [...archive.items]
		.sort((left, right) => right.date.localeCompare(left.date))
		.slice(0, 3);

	const selectMonth = async (delta: number) => {
		const next = moveMonth(archive.year, archive.month, delta);
		const key = `${next.year}-${next.month}`;
		const cached = cache.current.get(key);
		if (cached) {
			setArchive(cached);
			setError(cached.hasError);
			return;
		}

		setLoading(true);
		setError(false);
		try {
			const url = new URL(archive.dataUrl, window.location.origin);
			url.searchParams.set('year', String(next.year));
			url.searchParams.set('month', String(next.month));
			const response = await fetch(url, { credentials: 'same-origin' });
			if (!response.ok) {
				throw new Error(`Archive request failed: ${response.status}`);
			}
			const value: unknown = await response.json();
			if (!isArchive(value)) {
				throw new Error('Invalid archive response');
			}
			cache.current.set(key, value);
			setArchive(value);
			setError(value.hasError);
		} catch {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section
			aria-label={`${archive.selectedPuzzle.title} archive`}
			css={sectionStyles}
		>
			<div aria-hidden="true" css={linesStyles} />
			<nav aria-label="Puzzle types" css={tabsStyles}>
				{archive.puzzles.map((puzzle) => (
					<a
						aria-current={
							puzzle.id === archive.selectedPuzzle.id
								? 'page'
								: undefined
						}
						href={`/puzzles-and-games/${archive.category}/archive?puzzle=${encodeURIComponent(puzzle.id)}`}
						key={puzzle.id}
					>
						{puzzle.title}
					</a>
				))}
			</nav>
			<h2 css={titleStyles}>{archive.selectedPuzzle.title}</h2>
			<div css={recentStyles}>
				{recent.map((item, index) => (
					<a href={item.url} key={`${item.date}-${item.puzzleType}`}>
						<strong>
							{index === 0
								? `Latest ${archive.selectedPuzzle.title}`
								: archive.selectedPuzzle.title}
						</strong>
						<span>
							{item.setterName
								? `By: ${item.setterName}`
								: item.date}
						</span>
					</a>
				))}
			</div>
			<div css={controlsStyles}>
				<button
					aria-label="Previous month"
					onClick={() => void selectMonth(-1)}
					type="button"
				>
					<SvgArrowLeftStraight />
				</button>
				<strong aria-live="polite">
					{monthName(archive.year, archive.month)}
				</strong>
				<button
					aria-label="Next month"
					onClick={() => void selectMonth(1)}
					type="button"
				>
					<SvgArrowRightStraight />
				</button>
			</div>
			{loading && <p role="status">Loading archive…</p>}
			{error && (
				<p role="alert">
					The archive could not be loaded. Please try another month.
				</p>
			)}
			<div css={calendarStyles} data-testid="archive-calendar">
				{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
					<div className="weekday" key={day}>
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
					return cell.item ? (
						<a
							aria-label={`${cell.date}, ${status}`}
							className="day"
							data-date={cell.date}
							data-status={status}
							href={cell.item.url}
							key={cell.date}
						>
							{cell.day}
							{status === 'completed' && (
								<span
									aria-hidden="true"
									className="completed-icon"
								>
									<SvgCheckmark />
								</span>
							)}
						</a>
					) : (
						<span
							aria-disabled="true"
							className="day"
							data-date={cell.date}
							data-status="unavailable"
							key={cell.date}
						>
							{cell.day}
						</span>
					);
				})}
			</div>
			<div css={legendStyles}>
				<span className="available">Available</span>
				<span className="completed">Played</span>
			</div>
		</section>
	);
};

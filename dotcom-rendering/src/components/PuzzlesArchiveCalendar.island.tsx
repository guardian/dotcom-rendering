import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	palette,
	space,
	textSans14,
} from '@guardian/source/foundations';
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
		typeof item.puzzleId === 'string' &&
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

const tabsStyles = css`
	display: flex;
	gap: ${space[2]}px;
	overflow-x: auto;
	padding: ${space[2]}px 0;
	border-top: 1px solid ${palette.neutral[86]};
	border-bottom: 1px solid ${palette.neutral[86]};
	white-space: nowrap;
	a {
		${textSans14};
		border: 1px solid ${palette.news[400]};
		border-radius: 16px;
		padding: 2px ${space[2]}px;
		color: ${palette.news[400]};
		text-decoration: none;
	}
	a[aria-current='page'] {
		background: ${palette.news[400]};
		color: ${palette.neutral[100]};
		font-weight: bold;
	}
`;

const recentStyles = css`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1px;
	margin: ${space[2]}px 0 ${space[4]}px;
	background: ${palette.neutral[86]};
	${from.tablet} {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	a {
		min-height: 72px;
		padding: ${space[2]}px;
		background: ${palette.news[800]};
		color: ${palette.neutral[7]};
		text-decoration: none;
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
	grid-template-columns: 36px 1fr 36px;
	align-items: center;
	border-top: 1px solid ${palette.neutral[86]};
	padding-top: ${space[2]}px;
	button {
		width: 32px;
		height: 32px;
		border: 1px solid ${palette.neutral[20]};
		border-radius: 50%;
		background: transparent;
		font-size: 20px;
		cursor: pointer;
	}
	strong {
		text-align: center;
		${textSans14};
	}
`;

const calendarStyles = css`
	--calendar-gap: 6px;
	display: grid;
	grid-template-columns: repeat(7, minmax(0, 1fr));
	gap: var(--calendar-gap);
	margin-top: ${space[3]}px;
	.weekday {
		${textSans14};
		padding-bottom: ${space[1]}px;
		text-align: center;
		font-weight: bold;
	}
	.empty,
	.day {
		aspect-ratio: 1 / 0.78;
	}
	.day {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 42px;
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
		background: #d7f5e2;
	}
	.day[data-status='completed']::after {
		position: absolute;
		top: 4px;
		right: 4px;
		content: '✓';
		color: ${palette.success[400]};
		font-weight: bold;
	}
	.day[data-status='unavailable'] {
		background: transparent;
		color: ${palette.neutral[60]};
	}
	${from.tablet} {
		--calendar-gap: 10px;
		.day {
			min-height: 54px;
		}
	}
`;

const legendStyles = css`
	display: flex;
	gap: ${space[4]}px;
	margin-top: ${space[3]}px;
	${textSans14};
	span::before {
		display: inline-block;
		width: 8px;
		height: 8px;
		margin-right: 5px;
		border-radius: 50%;
		content: '';
	}
	.available::before {
		background: ${palette.brand[500]};
	}
	.completed::before {
		background: ${palette.success[400]};
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
		<section aria-label={`${archive.selectedPuzzle.title} archive`}>
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
			<h2>{archive.selectedPuzzle.title}</h2>
			<div css={recentStyles}>
				{recent.map((item, index) => (
					<a href={item.url} key={`${item.date}-${item.puzzleId}`}>
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
					←
				</button>
				<strong aria-live="polite">
					{monthName(archive.year, archive.month)}
				</strong>
				<button
					aria-label="Next month"
					onClick={() => void selectMonth(1)}
					type="button"
				>
					→
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

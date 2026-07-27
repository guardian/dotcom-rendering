import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
import {
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';

type PuzzleStatus = 'not-started' | 'in-progress' | 'completed';

type Props = {
	initialMonth: string;
	puzzleSlug: string;
	today: string;
	progress?: Record<string, PuzzleStatus>;
};

const statusColours: Record<PuzzleStatus, string> = {
	'not-started': palette.neutral[100],
	'in-progress': '#FFE500',
	completed: '#54C954',
};

const legendStyles = css`
	display: flex;
	flex-wrap: wrap;
	gap: ${space[4]}px ${space[8]}px;
	padding: ${space[5]}px 0 ${space[8]}px;

	${from.desktop} {
		gap: ${space[12]}px;
	}
`;

const legendItemStyles = css`
	display: flex;
	align-items: center;
	gap: ${space[2]}px;
	${textSans14};
`;

const statusMarkerStyles = (status: PuzzleStatus) => css`
	width: 28px;
	height: 28px;
	border: ${status === 'not-started' ? `1px solid ${palette.neutral[0]}` : 0};
	border-radius: 50%;
	background: ${statusColours[status]};
	box-sizing: border-box;
`;

const monthHeaderStyles = css`
	display: grid;
	grid-template-columns: 40px 1fr 40px;
	align-items: center;
	margin-bottom: ${space[8]}px;
`;

const monthTitleStyles = css`
	margin: 0;
	text-align: center;
	${textSansBold14};
`;

const monthControlStyles = css`
	display: inline-flex;
	width: 36px;
	height: 36px;
	align-items: center;
	justify-content: center;
	padding: 0;
	border: 1px solid ${palette.neutral[0]};
	border-radius: 50%;
	background: transparent;
	color: ${palette.neutral[0]};
	cursor: pointer;
	text-decoration: none;

	&[aria-disabled='true'] {
		border-color: ${palette.neutral[86]};
		color: ${palette.neutral[86]};
		cursor: default;
	}

	svg {
		width: 22px;
		height: 22px;
	}
`;

const calendarStyles = css`
	display: grid;
	grid-template-columns: repeat(7, minmax(0, 1fr));
	row-gap: ${space[5]}px;
	align-items: center;
`;

const weekdayStyles = css`
	text-align: center;
	${textSans14};
`;

const dayCellStyles = css`
	display: flex;
	min-height: 34px;
	align-items: center;
	justify-content: center;

	${from.desktop} {
		min-height: 42px;
	}
`;

const dayStyles = (
	status: PuzzleStatus,
	isToday: boolean,
	isDisabled: boolean,
) => css`
	display: inline-flex;
	width: 30px;
	height: 30px;
	align-items: center;
	justify-content: center;
	border: ${isDisabled || status !== 'not-started'
		? 0
		: `1px solid ${palette.neutral[0]}`};
	border-radius: 50%;
	background: ${isToday ? palette.neutral[60] : statusColours[status]};
	box-sizing: border-box;
	color: ${isDisabled ? palette.neutral[73] : palette.neutral[0]};
	text-decoration: none;
	${textSans14};

	:hover {
		text-decoration: ${isDisabled ? 'none' : 'underline'};
	}

	${from.desktop} {
		width: 38px;
		height: 38px;
	}
`;

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const parseDate = (value: string): Date => new Date(`${value}T00:00:00Z`);

const toDateString = (year: number, month: number, day: number): string =>
	`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(
		2,
		'0',
	)}`;

const addMonths = (date: Date, amount: number): Date =>
	new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1));

const archiveMonthUrl = (puzzleSlug: string, date: Date): string =>
	`/puzzles/${puzzleSlug}/archive/${date.getUTCFullYear()}/${String(
		date.getUTCMonth() + 1,
	).padStart(2, '0')}`;

export const PuzzleArchiveCalendar = ({
	initialMonth,
	puzzleSlug,
	today,
	progress = {},
}: Props) => {
	const todayDate = parseDate(today);
	const requestedMonth = parseDate(`${initialMonth}-01`);
	const visibleMonth = Number.isNaN(requestedMonth.getTime())
		? new Date(
				Date.UTC(
					todayDate.getUTCFullYear(),
					todayDate.getUTCMonth(),
					1,
				),
			)
		: requestedMonth;
	const year = visibleMonth.getUTCFullYear();
	const month = visibleMonth.getUTCMonth();
	const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	const leadingEmptyDays =
		(new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
	const currentMonth = new Date(
		Date.UTC(todayDate.getUTCFullYear(), todayDate.getUTCMonth(), 1),
	);
	const isLatestMonth = visibleMonth.getTime() >= currentMonth.getTime();
	const previousMonth = addMonths(visibleMonth, -1);
	const nextMonth = addMonths(visibleMonth, 1);
	const monthLabel = visibleMonth.toLocaleDateString('en-GB', {
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	});

	return (
		<div>
			<div aria-label="Puzzle progress key" css={legendStyles}>
				{(['not-started', 'in-progress', 'completed'] as const).map(
					(status) => (
						<div css={legendItemStyles} key={status}>
							<span css={statusMarkerStyles(status)} />
							<span>
								{status === 'not-started'
									? 'Not started'
									: status === 'in-progress'
										? 'In progress'
										: 'Completed'}
							</span>
						</div>
					),
				)}
			</div>

			<div css={monthHeaderStyles}>
				<a
					aria-label="Previous month"
					css={monthControlStyles}
					href={archiveMonthUrl(puzzleSlug, previousMonth)}
				>
					<SvgChevronLeftSingle />
				</a>
				<h2 aria-live="polite" css={monthTitleStyles}>
					{monthLabel}
				</h2>
				{isLatestMonth ? (
					<span
						aria-disabled="true"
						aria-label="Next month"
						css={monthControlStyles}
					>
						<SvgChevronRightSingle />
					</span>
				) : (
					<a
						aria-label="Next month"
						css={monthControlStyles}
						href={archiveMonthUrl(puzzleSlug, nextMonth)}
					>
						<SvgChevronRightSingle />
					</a>
				)}
			</div>

			<div aria-label={monthLabel} css={calendarStyles} role="grid">
				{weekdays.map((weekday) => (
					<div css={weekdayStyles} key={weekday} role="columnheader">
						{weekday}
					</div>
				))}
				{Array.from({ length: leadingEmptyDays }, (_, index) => (
					<div
						aria-hidden="true"
						css={dayCellStyles}
						key={`empty-${index}`}
						role="gridcell"
					/>
				))}
				{Array.from({ length: daysInMonth }, (_, index) => {
					const day = index + 1;
					const date = toDateString(year, month, day);
					const isFuture =
						parseDate(date).getTime() > todayDate.getTime();
					const status = progress[date] ?? 'not-started';
					const isToday = date === today;

					return (
						<div css={dayCellStyles} key={date} role="gridcell">
							{isFuture ? (
								<span
									aria-label={`${date}, unavailable`}
									css={dayStyles(status, false, true)}
								>
									{day}
								</span>
							) : (
								<a
									aria-current={isToday ? 'date' : undefined}
									aria-label={`${date}, ${status.replace(
										'-',
										' ',
									)}`}
									css={dayStyles(status, isToday, false)}
									href={`/puzzles/${puzzleSlug}?date=${date}`}
								>
									{day}
								</a>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

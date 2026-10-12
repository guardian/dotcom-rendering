import { useEffect, useRef, useState } from 'react';
import { getAuthStatus, subscribeToAuthStateChange } from '../lib/identity';
import type {
	PuzzleContainer,
	PuzzleItem,
	PuzzlesLayoutType,
} from '../types/puzzlesPage';
import { PuzzlesDirectory } from './PuzzlesDirectory';

type Props = {
	layout: PuzzlesLayoutType;
	renderAds: boolean;
};

export type PuzzleProgressItem = {
	puzzleType: string;
	publishDate: string;
	progress: number;
	setterName?: string;
	gameUrl?: string;
};

const londonDateFormatter = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Europe/London',
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
});

const puzzleDateFormatter = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Europe/London',
	weekday: 'short',
	month: 'short',
	day: 'numeric',
});

const part = (
	parts: Intl.DateTimeFormatPart[],
	type: 'year' | 'month' | 'day' | 'weekday',
) => parts.find((value) => value.type === type)?.value;

const londonDate = (date: Date): string | undefined => {
	const parts = londonDateFormatter.formatToParts(date);
	const year = part(parts, 'year');
	const month = part(parts, 'month');
	const day = part(parts, 'day');
	return year && month && day ? `${year}-${month}-${day}` : undefined;
};

const puzzleDate = (publishDate: string): string | undefined => {
	const date = publishDate.slice(0, 10);
	return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined;
};

export const puzzleCardCadence = (
	publishDate: string,
	today = new Date(),
): string | undefined => {
	const date = puzzleDate(publishDate);
	if (!date) return undefined;
	if (date === londonDate(today)) return 'Today';

	const publishedDate = new Date(`${date}T12:00:00Z`);
	if (Number.isNaN(publishedDate.getTime())) return undefined;
	const parts = puzzleDateFormatter.formatToParts(publishedDate);
	const weekday = part(parts, 'weekday');
	const day = part(parts, 'day');
	const month = part(parts, 'month')?.slice(0, 3);
	return weekday && day && month ? `${weekday} ${day} ${month}` : undefined;
};

const puzzleTypesByCard = new Map<string, string>([
	['crossword:quick', 'CROSSWORD_QUICK'],
	['crossword:mini', 'CROSSWORD_MINI'],
	['crossword:cryptic', 'CROSSWORD_CRYPTIC'],
	['crossword:quick-cryptic', 'CROSSWORD_QUICKCRYPTIC'],
	['crossword:weekend', 'CROSSWORD_WEEKEND'],
	['crossword:prize', 'CROSSWORD_PRIZE'],
	['crossword:quiptic', 'CROSSWORD_QUIPTIC'],
	['crossword:sunday-quick', 'CROSSWORD_SUNDAYQUICK'],
	['sudoku:easy', 'SUDOKU_EASY'],
	['sudoku:medium', 'SUDOKU_MEDIUM'],
	['sudoku:hard', 'SUDOKU_HARD'],
	['sudoku:killer', 'SUDOKU_KILLER'],
	['word-wheel:all', 'WORDWHEEL'],
	['wordiply:all', 'WORDIPLY'],
]);

export const puzzleTypeForCard = (item: PuzzleItem): string | undefined =>
	puzzleTypesByCard.get(`${item.type}:${item.set}`);

const puzzlePath = (
	gameUrl: string | undefined,
	crosswordSet?: string,
): string | undefined => {
	const url = gameUrl?.trim();
	if (!url) return undefined;
	try {
		const parsed = new URL(url, 'https://puzzles.invalid');
		const crosswordNumber = parsed.pathname.match(
			/^\/crosswords\/[^/]+\/(\d+)\/?$/,
		)?.[1];
		if (crosswordSet !== undefined && crosswordNumber !== undefined) {
			return `/crosswords/${crosswordSet}/${crosswordNumber}${parsed.search}${parsed.hash}`;
		}
		return `${parsed.pathname}${parsed.search}${parsed.hash}`;
	} catch {
		return undefined;
	}
};

const enrichItem = (
	item: PuzzleItem,
	progressByType: Map<string, PuzzleProgressItem>,
	today: Date,
): PuzzleItem => {
	const puzzleType = puzzleTypeForCard(item);
	if (!puzzleType) return item;
	const progress = progressByType.get(puzzleType);
	if (!progress) return item;

	const setter = progress.setterName?.trim();
	return {
		...item,
		cadence: puzzleCardCadence(progress.publishDate, today) ?? item.cadence,
		progress: progress.progress,
		setter: setter || item.setter,
		date:
			item.variant === 'iframe-page'
				? (puzzleDate(progress.publishDate) ?? item.date)
				: item.date,
		url:
			item.type === 'crossword'
				? (puzzlePath(progress.gameUrl, item.set) ?? item.url)
				: item.url,
	};
};

const enrichContainer = (
	container: PuzzleContainer,
	progressByType: Map<string, PuzzleProgressItem>,
	today: Date,
): PuzzleContainer => ({
	...container,
	content: {
		...container.content,
		items: container.content.items.map((row) =>
			row.map((item) => enrichItem(item, progressByType, today)),
		),
		nestedContainers: container.content.nestedContainers.map((nested) =>
			enrichContainer(nested, progressByType, today),
		),
	},
});

export const enrichLayoutWithProgress = (
	layout: PuzzlesLayoutType,
	items: PuzzleProgressItem[],
	today = new Date(),
): PuzzlesLayoutType => {
	const progressByType = new Map(
		items.map((item) => [item.puzzleType, item]),
	);
	return {
		...layout,
		containers: layout.containers.map((container) =>
			enrichContainer(container, progressByType, today),
		),
	};
};

const progressItems = (value: unknown): PuzzleProgressItem[] | undefined => {
	if (typeof value !== 'object' || value === null) return undefined;
	const results = (value as Record<string, unknown>).results;
	if (!Array.isArray(results)) return undefined;

	const items: PuzzleProgressItem[] = [];
	for (const result of results) {
		if (typeof result !== 'object' || result === null) return undefined;
		const item = result as Record<string, unknown>;
		if (
			typeof item.puzzleType !== 'string' ||
			typeof item.publishDate !== 'string' ||
			typeof item.progress !== 'number' ||
			(item.setterName != null && typeof item.setterName !== 'string') ||
			(item.gameUrl != null && typeof item.gameUrl !== 'string')
		) {
			return undefined;
		}
		items.push({
			puzzleType: item.puzzleType,
			publishDate: item.publishDate,
			progress: item.progress,
			...(typeof item.setterName === 'string'
				? { setterName: item.setterName }
				: {}),
			...(typeof item.gameUrl === 'string'
				? { gameUrl: item.gameUrl }
				: {}),
		});
	}
	return items;
};

export const PuzzlesDirectoryProgress = ({ layout, renderAds }: Props) => {
	const [progressLayout, setProgressLayout] = useState(layout);
	const requests = useRef(0);

	useEffect(() => {
		let active = true;

		const loadProgress = async () => {
			const request = ++requests.current;
			try {
				const authStatus = await getAuthStatus();
				const headers: Record<string, string> = {
					Accept: 'application/json',
				};
				if (authStatus.kind === 'SignedIn') {
					headers.Authorization = `Bearer ${authStatus.accessToken.accessToken}`;
				}

				const response = await fetch('/puzzles-and-games/progress', {
					cache: 'no-store',
					credentials: 'same-origin',
					headers,
				});
				if (!response.ok) return;
				const items = progressItems(await response.json());
				if (active && request === requests.current && items) {
					setProgressLayout(enrichLayoutWithProgress(layout, items));
				}
			} catch {
				// Keep the server-rendered cards when identity or progress is unavailable.
			}
		};

		void loadProgress();
		const unsubscribe = subscribeToAuthStateChange(() => {
			void loadProgress();
		});
		return () => {
			active = false;
			unsubscribe();
		};
	}, [layout]);

	return <PuzzlesDirectory layout={progressLayout} renderAds={renderAds} />;
};

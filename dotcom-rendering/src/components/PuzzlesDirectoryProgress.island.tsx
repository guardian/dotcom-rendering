import { useMemo } from 'react';
import type { PuzzleProgressItem } from '../lib/puzzleCardProgress';
import { puzzleTypeForCard } from '../lib/puzzleCardProgress';
import { usePuzzleProgress } from '../lib/usePuzzleProgress';
import type {
	PuzzleContainer,
	PuzzleItem,
	PuzzlesLayoutType,
} from '../types/puzzlesPage';
import { PuzzlesDirectory } from './PuzzlesDirectory';

export { puzzleTypeForCard };
export type { PuzzleProgressItem };

type Props = {
	layout: PuzzlesLayoutType;
	renderAds: boolean;
	hideTopRule?: boolean;
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
		gameStatus: progress.gameStatus,
		setter: setter || item.setter,
		date:
			item.variant === 'iframe-page'
				? (puzzleDate(progress.publishDate) ?? item.date)
				: item.date,
		url:
			item.type === 'crossword'
				? progress.gameUrl?.trim() || item.url
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

export const PuzzlesDirectoryProgress = ({
	layout,
	renderAds,
	hideTopRule,
}: Props) => {
	const progress = usePuzzleProgress();
	const progressLayout = useMemo(
		() => (progress ? enrichLayoutWithProgress(layout, progress) : layout),
		[layout, progress],
	);

	return (
		<PuzzlesDirectory
			layout={progressLayout}
			renderAds={renderAds}
			hideTopRule={hideTopRule}
		/>
	);
};

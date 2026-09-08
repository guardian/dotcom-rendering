import { breakpoints } from '@guardian/source/foundations';
import type { PuzzlesLayoutType } from '../types/puzzlesPage';
import { PuzzlesDirectory } from './PuzzlesDirectory';

const layout: PuzzlesLayoutType = {
	containers: [
		{
			id: 'featured',
			title: 'Today’s featured puzzles',
			variant: 'featured',
			content: {
				nestedContainers: [],
				items: [
					[
						{
							id: 'ball',
							title: 'On the ball',
							type: 'quiz',
							set: 'all',
							cardVariant: 'large',
							cadence: 'Daily',
							slug: 'on-the-ball',
							variant: 'iframe-page',
							backgroundColour: '#e5e5e5',
						},
						{
							id: 'film',
							title: 'Film reveal',
							type: 'quiz',
							set: 'all',
							cardVariant: 'large',
							cadence: 'Daily',
							slug: 'film-reveal',
							variant: 'iframe-page',
							backgroundColour: '#e5e5e5',
						},
					],
				],
			},
		},
		{
			id: 'ad-one',
			title: '',
			variant: 'ad',
			adSlot: 'inline1',
			content: { items: [], nestedContainers: [] },
		},
		{
			id: 'crosswords',
			title: 'Crosswords',
			variant: 'standard',
			content: {
				nestedContainers: [],
				items: [
					['Mini', 'Quick', 'Cryptic', 'Quick cryptic'].map(
						(title, index) => ({
							id: `primary-${index}`,
							title,
							type: 'crossword',
							set: title.toLowerCase(),
							cardVariant: 'primary' as const,
							cadence: 'Daily',
							url: `/puzzles/crosswords/quick/${index + 1}`,
							backgroundColour: '#e5e5e5',
						}),
					),
					[
						'Quiptic',
						'Prize',
						'Weekend',
						'Sunday quick',
						'Genius',
					].map((title, index) => ({
						id: `compact-${index}`,
						title,
						type: 'crossword',
						set: title.toLowerCase(),
						cardVariant: 'compact' as const,
						cadence: index === 4 ? 'Monthly' : 'Every Saturday',
						url: `/puzzles/crosswords/quick/${index + 10}`,
						backgroundColour: '#f1f1f1',
					})),
				],
				archiveChoices: ['Mini', 'Quick', 'Cryptic'].map((title) => ({
					id: `archive-${title.toLowerCase()}`,
					title,
					type: 'crossword',
					set: title.toLowerCase(),
					cardVariant: 'archive' as const,
					url: `/puzzles/crosswords/archive?type=${title.toLowerCase()}`,
				})),
			},
		},
	],
};

export default {
	title: 'Components/PuzzlesDirectory',
	component: PuzzlesDirectory,
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet, 1300],
		},
	},
};

export const BlueprintDirectory = () => (
	<PuzzlesDirectory layout={layout} renderAds={true} />
);
export const AdFree = () => (
	<PuzzlesDirectory layout={layout} renderAds={false} />
);

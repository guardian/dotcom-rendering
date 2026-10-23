import { breakpoints } from '@guardian/source/foundations';
import { puzzlesBranding } from '../../fixtures/manual/puzzlesBranding';
import { createPuzzlesPage } from '../../fixtures/manual/puzzlesPage';
import { PuzzlesLayout } from '../layouts/PuzzlesLayout';
import { extractNAV } from '../model/extract-nav';
import type { PuzzlesLayoutType } from '../types/puzzlesPage';
import { PuzzlesDirectory } from './PuzzlesDirectory';

const layout: PuzzlesLayoutType = {
	containers: [
		{
			id: 'featured',
			title: 'Featured today',
			variant: 'featured',
			enabled: true,
			content: {
				nestedContainers: [],
				items: [
					[
						{
							id: 'featured-mini',
							title: 'Mini crossword',
							type: 'crossword',
							set: 'mini',
							cardVariant: 'large',
							cadence: 'Daily',
							image: 'https://i.guim.co.uk/img/uploads/2026/09/15/crossword-MINI.png?width=440&dpr=2&s=none',
							imageAlt: 'Mini crossword illustration',
							setter: 'Example setter',
							url: '/puzzles-and-games/crosswords/mini/1',
							backgroundColour: '#e5e5e5',
						},
						{
							id: 'featured-word-wheel',
							title: 'Word wheel',
							type: 'word-wheel',
							set: 'all',
							cardVariant: 'large',
							cadence: 'Daily',
							image: 'https://i.guim.co.uk/img/uploads/2026/09/15/word-games-WORD-WHEEL.png?width=440&dpr=2&s=none',
							imageAlt: 'Word wheel illustration',
							slug: 'word-wheel',
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
							url: `/puzzles-and-games/crosswords/quick/${index + 1}`,
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
						url: `/puzzles-and-games/crosswords/quick/${index + 10}`,
						backgroundColour: '#f1f1f1',
					})),
				],
				archiveChoices: ['Mini', 'Quick', 'Cryptic'].map((title) => ({
					id: `archive-${title.toLowerCase()}`,
					title,
					type: 'crossword',
					set: title.toLowerCase(),
					cardVariant: 'archive' as const,
					url: `/puzzles-and-games/crosswords/archive?type=${title.toLowerCase()}`,
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
			viewports: [
				320,
				breakpoints.mobileMedium,
				breakpoints.mobileLandscape,
				breakpoints.phablet,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

export const BlueprintDirectory = () => (
	<PuzzlesDirectory layout={layout} renderAds={true} />
);
export const AdFree = () => (
	<PuzzlesDirectory layout={layout} renderAds={false} />
);

/** The newsletter should align with both edges of the right-hand puzzle card. */
export const WithNewsletter = () => (
	<PuzzlesDirectory
		renderAds={false}
		layout={{
			containers: [
				...layout.containers,
				{
					id: 'useful-links',
					title: 'Useful links',
					variant: 'supporting',
					content: { items: [], nestedContainers: [] },
					supporting: {
						usefulLinksTitle: 'Useful links',
						usefulLinks: [
							{
								title: 'Support the Guardian',
								url: 'https://support.theguardian.com',
							},
							{
								title: 'Help centre',
								url: 'https://help.theguardian.com',
							},
						],
						newsletter: {
							identityName: 'cluesletter',
							name: 'Cluesletter',
							frequency: 'Weekly',
							description:
								'Get our puzzles news, clues, competitions and our exclusive Letter Adder game direct to your inbox',
							illustrationSquare:
								'https://uploads.guim.co.uk/2026/10/08/5_3_(eeb3139d4b747fcb8cc3674b62e545e961be7b8e).png',
						},
						popularTitle: 'Most popular puzzles',
						popularGroups: [],
					},
				},
			],
		}}
	/>
);

export const SponsoredContainer = () => (
	<PuzzlesDirectory
		layout={layout}
		renderAds={false}
		containerBranding={{ crosswords: puzzlesBranding }}
	/>
);

export const Sponsored = () => {
	const page = createPuzzlesPage({ layout, isAdFreeUser: true });
	return (
		<PuzzlesLayout
			puzzlesPage={page}
			NAV={extractNAV(page.nav)}
			branding={puzzlesBranding}
		/>
	);
};

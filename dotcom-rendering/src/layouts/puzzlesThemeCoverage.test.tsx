import { palette } from '@guardian/source/foundations';
import { cleanup, render } from '@testing-library/react';
import { Standard as StandardFixture } from '../../fixtures/generated/fe-articles/Standard';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import { ConfigProvider } from '../components/ConfigContext';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleTheme,
	Pillar,
} from '../lib/articleFormat';
import {
	puzzlesHubV1Experiment,
	puzzlesHubV1Participation,
	puzzlesHubV2Experiment,
	puzzlesHubV2Participation,
} from '../lib/puzzlesHubVersionExperiment';
import { puzzleAccentVariables } from '../lib/puzzlesTheme';
import { extractNAV } from '../model/extract-nav';
import { getPuzzleConfig } from '../model/puzzles/puzzleConfigs';
import { paletteDeclarations } from '../paletteDeclarations';
import { enhanceArticleType } from '../types/article';
import { CrosswordLayout } from './CrosswordLayout';
import { puzzlePageFormat, PuzzlePageLayout } from './PuzzlePageLayout';

let mockSignedIn = false;
jest.mock('../lib/bridgetApi', () => jest.fn());
jest.mock('../lib/useMatchMedia', () => ({
	...jest.requireActual('../lib/useMatchMedia'),
	useMatchMedia: jest.fn(() => true),
}));
jest.mock('../lib/usePageViewId', () => ({
	usePageViewId: jest.fn(() => 'test-page-view-id'),
}));
jest.mock('../lib/useAuthStatus', () => ({
	useAuthStatus: jest.fn(() =>
		mockSignedIn
			? {
					kind: 'SignedIn',
					accessToken: { claims: {} },
					idToken: { claims: { legacy_identity_id: '1' } },
				}
			: { kind: 'SignedOut' },
	),
	useIsSignedIn: jest.fn(() => mockSignedIn),
}));
jest.mock('../lib/useBraze', () => ({
	useBraze: jest.fn().mockReturnValue({
		brazeMessages: {},
		brazeCards: undefined,
		braze: null,
	}),
}));
jest.mock('../lib/useAB', () => ({
	useAB: jest.fn().mockReturnValue(null),
}));

/**
 * The Puzzles & games game pages take their accent colours from
 * `puzzleAccentStyles` and everything else from the page theme. These tests
 * fail when a theme-dependent variable the pages use is not covered by the
 * helper, so a change to the shared palette (or to what the pages render)
 * shows up here rather than as a wrong colour on the page.
 */

const pillars = [
	Pillar.News,
	Pillar.Opinion,
	Pillar.Sport,
	Pillar.Culture,
	Pillar.Lifestyle,
];

const declarations = (theme: ArticleTheme, mode: 'light' | 'dark') =>
	Object.fromEntries(
		paletteDeclarations(
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Crossword,
				theme,
			},
			mode,
		).map((line) => {
			const [name = '', ...value] = line.split(':');
			return [name.trim(), value.join(':').replace(/;\s*$/, '').trim()];
		}),
	) as Record<string, string>;

/** Variables whose value differs between pillar themes, in either mode. */
const themeDependentVariables = () => {
	const names = new Set<string>();
	for (const mode of ['light', 'dark'] as const) {
		const byPillar = pillars.map((theme) => declarations(theme, mode));
		for (const name of Object.keys(byPillar[0] ?? {})) {
			if (new Set(byPillar.map((values) => values[name])).size > 1) {
				names.add(name);
			}
		}
	}
	return names;
};

/** Every `var(--name)` in the CSS Emotion has injected so far. */
const usedVariables = () => {
	const css = Array.from(document.querySelectorAll('style'))
		.map((style) => {
			const rules = Array.from(style.sheet?.cssRules ?? []);
			return [style.textContent, ...rules.map((rule) => rule.cssText)];
		})
		.flat()
		.join('\n');
	return new Set(
		Array.from(css.matchAll(/var\((--[\w-]+)/g), (match) => match[1] ?? ''),
	);
};

const uncovered = (used: Set<string>, accepted: string[] = []) => {
	const themed = themeDependentVariables();
	return [...used].filter(
		(name) =>
			themed.has(name) &&
			!puzzleAccentVariables.includes(name) &&
			!accepted.includes(name),
	);
};

const config = {
	renderingTarget: 'Web' as const,
	darkModeAvailable: true,
	assetOrigin: '/' as const,
	editionId: 'UK' as const,
};

const hubOn = {
	...puzzlesHubV1Participation(puzzlesHubV1Experiment.variant),
	...puzzlesHubV2Participation(puzzlesHubV2Experiment.variant),
};

describe('Puzzles & games theme coverage', () => {
	it('keeps a neutral background and lines on the puzzle page', () => {
		const light = declarations(puzzlePageFormat.theme, 'light');
		const dark = declarations(puzzlePageFormat.theme, 'dark');
		expect([
			light['--article-background'],
			light['--article-border'],
			light['--straight-lines'],
		]).toEqual([
			palette.neutral[100],
			palette.neutral[86],
			palette.neutral[86],
		]);
		expect([
			dark['--article-background'],
			dark['--article-border'],
			dark['--straight-lines'],
		]).toEqual([
			palette.neutral[10],
			palette.neutral[20],
			palette.neutral[20],
		]);
	});

	it('covers every theme-dependent variable the puzzle page uses', () => {
		for (const slug of ['sudoku-easy', 'wordiply', 'film-reveal']) {
			for (const signedIn of [false, true]) {
				for (const serverSideABTests of [{}, hubOn]) {
					mockSignedIn = signedIn;
					const puzzleConfig = getPuzzleConfig(slug);
					if (!puzzleConfig) throw new Error(`missing ${slug}`);
					const page = createPuzzlePage(slug);
					render(
						<ConfigProvider value={config}>
							<PuzzlePageLayout
								puzzlePage={{
									...page,
									config: {
										...page.config,
										serverSideABTests,
									},
									puzzleConfig,
								}}
								NAV={extractNAV(page.nav)}
								darkModeAvailable={true}
							/>
						</ConfigProvider>,
					);
					cleanup();
				}
			}
		}
		expect(uncovered(usedVariables())).toEqual([]);
	});

	it('covers every theme-dependent variable the crossword page uses', () => {
		for (const signedIn of [false, true]) {
			mockSignedIn = signedIn;
			const article = enhanceArticleType(
				{
					...StandardFixture,
					moreFromPuzzlesAndGames: [
						{
							id: 'quick',
							title: 'Quick crossword',
							type: 'crossword',
							set: 'quick',
							cardVariant: 'compact',
							cadence: 'Previous',
							url: '/crosswords/quick/1',
							backgroundColour: '#FCE1CE',
						},
					],
					crossword: {
						crosswordType: 'quick',
						entries: [],
						creator: {
							name: 'Setter',
							webUrl: 'https://www.theguardian.com/profile/setter',
						},
					} as unknown as typeof StandardFixture.crossword,
					config: {
						...StandardFixture.config,
						serverSideABTests: hubOn,
					},
				},
				'Web',
			);
			render(
				<ConfigProvider value={config}>
					<CrosswordLayout
						article={article.frontendData}
						format={{
							design: ArticleDesign.Crossword,
							display: ArticleDisplay.Standard,
							theme: Pillar.News,
						}}
						NAV={extractNAV(StandardFixture.nav)}
					/>
				</ConfigProvider>,
			);
			cleanup();
		}
		// Only Opinion has a different comments background, and crosswords
		// are never Opinion.
		expect(
			uncovered(usedVariables(), ['--discussion-section-background']),
		).toEqual([]);
	});
});

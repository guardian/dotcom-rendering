import { render, screen } from '@testing-library/react';
import { ConfigProvider } from '../components/ConfigContext';
import type {
	FEElement,
	RecipeBlockElement,
	SubheadingBlockElement,
	TextBlockElement,
} from '../types/content';
import type { TagType } from '../types/tag';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from './articleFormat';
import { ArticleRenderer, getFeastNudgeIndex } from './ArticleRenderer';

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock('../components/FeastContextualNudge.island', () => ({
	FeastContextualNudge: ({
		recipe,
		nudgeIndex,
	}: {
		recipe: { id: string };
		nudgeIndex: number;
	}) => (
		<div
			data-testid="feast-nudge"
			data-recipe-id={recipe.id}
			data-nudge-index={nudgeIndex}
		/>
	),
}));

jest.mock('./renderElement', () => ({
	RenderArticleElement: ({ index }: { index: number }) => (
		<div data-testid={`article-element-${index}`} />
	),
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Wraps the component with a ConfigProvider using the Apps rendering target,
 * which bypasses the withSignInGateSlot path and keeps tests focused on
 * augmentedElements logic.
 */
const renderWithConfig = (ui: React.ReactElement) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Apps',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			{ui}
		</ConfigProvider>,
	);

const recipeFormat: ArticleFormat = {
	design: ArticleDesign.Recipe,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

const standardFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

const defaultProps = {
	pageId: 'test/page-id',
	webTitle: 'Test Article',
	ajaxUrl: 'https://api.test',
	contentType: 'Article',
	sectionId: 'food',
	tags: [] as TagType[],
	isPaidContent: false,
	idUrl: 'https://id.test',
	switches: {},
	isDev: false,
	isAdFreeUser: false,
	isSensitive: false,
	editionId: 'UK' as const,
	contributionsServiceUrl: 'https://contributions.test',
	shouldHideAds: false,
} as const;

const makeSubheading = (html: string, index = 0): SubheadingBlockElement => ({
	_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
	elementId: `subheading-${index}`,
	html,
});

const makeRecipe = (id: string): RecipeBlockElement => ({
	_type: 'model.dotcomrendering.pageElements.RecipeBlockElement',
	id,
	title: `Recipe ${id}`,
});

const makeText = (index = 0): TextBlockElement => ({
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: `text-${index}`,
	html: '<p>Body text</p>',
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('ArticleRenderer — augmentedElements', () => {
	it('passes elements through unchanged for non-Recipe formats', () => {
		const elements: FEElement[] = [makeText(0), makeText(1)];

		renderWithConfig(
			<ArticleRenderer
				{...defaultProps}
				format={standardFormat}
				elements={elements}
			/>,
		);

		expect(screen.getByTestId('article-element-0')).toBeInTheDocument();
		expect(screen.getByTestId('article-element-1')).toBeInTheDocument();
		expect(screen.queryByTestId('feast-nudge')).not.toBeInTheDocument();
	});

	it('renders pre-section elements that appear before the first subheading', () => {
		const elements: FEElement[] = [
			makeText(0),
			makeSubheading('<h2>Recipe One</h2>'),
		];

		renderWithConfig(
			<ArticleRenderer
				{...defaultProps}
				format={recipeFormat}
				elements={elements}
			/>,
		);

		expect(screen.getByTestId('article-element-0')).toBeInTheDocument();
	});

	it('renders FeastContextualNudge after the subheading when a RecipeBlockElement is present', () => {
		const elements: FEElement[] = [
			makeSubheading('<h2>Pasta Recipe</h2>'),
			makeRecipe('recipe-001'),
			makeText(0),
		];

		renderWithConfig(
			<ArticleRenderer
				{...defaultProps}
				format={recipeFormat}
				elements={elements}
			/>,
		);

		const nudge = screen.getByTestId('feast-nudge');
		expect(nudge).toBeInTheDocument();
		expect(nudge).toHaveAttribute('data-recipe-id', 'recipe-001');
	});

	it('does not render FeastContextualNudge when no RecipeBlockElement is in the section', () => {
		const elements: FEElement[] = [
			makeSubheading('<h2>Pasta Recipe</h2>'),
			makeText(0),
		];

		renderWithConfig(
			<ArticleRenderer
				{...defaultProps}
				format={recipeFormat}
				elements={elements}
			/>,
		);

		expect(screen.queryByTestId('feast-nudge')).not.toBeInTheDocument();
	});

	it('suppresses the RecipeBlockElement from body rendering', () => {
		// index 0 = subheading, index 1 = recipe (suppressed), index 2 = text
		const elements: FEElement[] = [
			makeSubheading('<h2>Pasta Recipe</h2>'),
			makeRecipe('recipe-001'),
			makeText(0),
		];

		renderWithConfig(
			<ArticleRenderer
				{...defaultProps}
				format={recipeFormat}
				elements={elements}
			/>,
		);

		expect(
			screen.queryByTestId('article-element-1'),
		).not.toBeInTheDocument();
		expect(screen.getByTestId('article-element-2')).toBeInTheDocument();
	});

	it('handles multiple sections, each with its own nudge', () => {
		const elements: FEElement[] = [
			makeSubheading('<h2>Recipe One</h2>', 0),
			makeRecipe('recipe-001'),
			makeText(0),
			makeSubheading('<h2>Recipe Two</h2>', 1),
			makeRecipe('recipe-002'),
			makeText(1),
		];

		renderWithConfig(
			<ArticleRenderer
				{...defaultProps}
				format={recipeFormat}
				elements={elements}
			/>,
		);

		const nudges = screen.getAllByTestId('feast-nudge');
		expect(nudges).toHaveLength(2);
		expect(nudges[0]).toHaveAttribute('data-recipe-id', 'recipe-001');
		expect(nudges[1]).toHaveAttribute('data-recipe-id', 'recipe-002');
		expect(nudges[0]).toHaveAttribute('data-nudge-index', '1');
		expect(nudges[1]).toHaveAttribute('data-nudge-index', '2');
	});

	it('distributes exactly five numbered placements across a long recipe article', () => {
		const elements: FEElement[] = Array.from({ length: 10 }, (_, index) => [
			makeSubheading(`<h2>Recipe ${index}</h2>`, index),
			makeRecipe(`recipe-${index}`),
		]).flat();

		renderWithConfig(
			<ArticleRenderer
				{...defaultProps}
				format={recipeFormat}
				elements={elements}
			/>,
		);

		const nudges = screen.getAllByTestId('feast-nudge');
		expect(nudges).toHaveLength(5);
		expect(nudges.map((nudge) => nudge.dataset.recipeId)).toEqual([
			'recipe-0',
			'recipe-2',
			'recipe-5',
			'recipe-7',
			'recipe-9',
		]);
		expect(nudges.map((nudge) => nudge.dataset.nudgeIndex)).toEqual([
			'1',
			'2',
			'3',
			'4',
			'5',
		]);
	});

	it('renders body elements within each section in order', () => {
		const elements: FEElement[] = [
			makeSubheading('<h2>Recipe</h2>'),
			makeRecipe('recipe-001'),
			makeText(0), // index 2
			makeText(1), // index 3
		];

		renderWithConfig(
			<ArticleRenderer
				{...defaultProps}
				format={recipeFormat}
				elements={elements}
			/>,
		);

		expect(screen.getByTestId('article-element-2')).toBeInTheDocument();
		expect(screen.getByTestId('article-element-3')).toBeInTheDocument();
	});
});

describe('getFeastNudgeIndex', () => {
	it('assigns every section when there are at most five', () => {
		expect([0, 1, 2].map((index) => getFeastNudgeIndex(index, 3))).toEqual([
			1, 2, 3,
		]);
	});

	it('returns null for invalid section indexes', () => {
		expect(getFeastNudgeIndex(-1, 3)).toBeNull();
		expect(getFeastNudgeIndex(3, 3)).toBeNull();
		expect(getFeastNudgeIndex(0, 0)).toBeNull();
	});
});

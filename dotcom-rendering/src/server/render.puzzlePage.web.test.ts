import {
	createPuzzleConfigWithImage,
	samplePuzzleImageUrl,
} from '../../fixtures/manual/puzzlePage';
import { puzzleConfigs } from '../model/puzzles/puzzleConfigs';
import { buildPuzzlePageMetaData } from './render.puzzlePage.web';

describe('buildPuzzlePageMetaData', () => {
	const withoutImage = puzzleConfigs.wordiply!;
	const withImage = createPuzzleConfigWithImage('wordiply');
	const puzzleDate = '2026-09-15';

	it('resolves the date-templated title/description for the given puzzleDate', () => {
		const { title, description } = buildPuzzlePageMetaData(
			withoutImage,
			puzzleDate,
		);

		expect(title).toBe('Wordiply 15 Sep 26 - word game | The Guardian');
		expect(description).toBe(
			'Wordiply 15 Sep 26. Guess the longest word in five guesses that includes the starter word. The closer you are, the higher your length score.',
		);
	});

	it('tidies up the template when puzzleDate is undefined', () => {
		const { title, description } = buildPuzzlePageMetaData(
			withoutImage,
			undefined,
		);

		expect(title).toBe('Wordiply - word game | The Guardian');
		expect(description).toBe(
			'Wordiply. Guess the longest word in five guesses that includes the starter word. The closer you are, the higher your length score.',
		);
	});

	it('builds og:title/og:description and twitter:title/twitter:description from the resolved title/description', () => {
		const { title, description, openGraphData, twitterData } =
			buildPuzzlePageMetaData(withoutImage, puzzleDate);

		expect(openGraphData['og:title']).toBe(title);
		expect(openGraphData['og:description']).toBe(description);
		expect(twitterData['twitter:title']).toBe(title);
		expect(twitterData['twitter:description']).toBe(description);
	});

	it('omits og:image/twitter:image entirely when puzzleConfig.image is unset', () => {
		const { openGraphData, twitterData } = buildPuzzlePageMetaData(
			withoutImage,
			puzzleDate,
		);

		expect(openGraphData).not.toHaveProperty('og:image');
		expect(twitterData).not.toHaveProperty('twitter:image');
	});

	it('includes og:image/twitter:image when puzzleConfig.image is set', () => {
		const { openGraphData, twitterData } = buildPuzzlePageMetaData(
			withImage,
			puzzleDate,
		);

		expect(openGraphData['og:image']).toBe(samplePuzzleImageUrl);
		expect(twitterData['twitter:image']).toBe(samplePuzzleImageUrl);
	});
});

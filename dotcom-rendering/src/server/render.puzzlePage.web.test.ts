import {
	createPuzzleConfigWithImage,
	samplePuzzleImageUrl,
} from '../../fixtures/manual/puzzlePage';
import { puzzleConfigs } from '../model/puzzles/puzzleConfigs';
import { buildPuzzlePageMetaData } from './render.puzzlePage.web';

describe('buildPuzzlePageMetaData', () => {
	const withoutImage = puzzleConfigs.wordiply!;
	const withImage = createPuzzleConfigWithImage('wordiply');

	it('uses the puzzle config description as the page description', () => {
		const { description } = buildPuzzlePageMetaData(
			'wordiply | The Guardian',
			withoutImage,
		);
		expect(description).toBe(withoutImage.description);
	});

	it('builds og:title/og:description and twitter:title/twitter:description from webTitle/description', () => {
		const { openGraphData, twitterData } = buildPuzzlePageMetaData(
			'wordiply | The Guardian',
			withoutImage,
		);

		expect(openGraphData['og:title']).toBe('wordiply | The Guardian');
		expect(openGraphData['og:description']).toBe(withoutImage.description);
		expect(twitterData['twitter:title']).toBe('wordiply | The Guardian');
		expect(twitterData['twitter:description']).toBe(
			withoutImage.description,
		);
	});

	it('omits og:image/twitter:image entirely when puzzleConfig.image is unset', () => {
		const { openGraphData, twitterData } = buildPuzzlePageMetaData(
			'wordiply | The Guardian',
			withoutImage,
		);

		expect(openGraphData).not.toHaveProperty('og:image');
		expect(twitterData).not.toHaveProperty('twitter:image');
	});

	it('includes og:image/twitter:image when puzzleConfig.image is set', () => {
		const { openGraphData, twitterData } = buildPuzzlePageMetaData(
			'wordiply | The Guardian',
			withImage,
		);

		expect(openGraphData['og:image']).toBe(samplePuzzleImageUrl);
		expect(twitterData['twitter:image']).toBe(samplePuzzleImageUrl);
	});
});

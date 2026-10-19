import { storylinesExample } from '../../fixtures/manual/storylines';
import { getDataLinkNameCard } from '../lib/getDataLinkName';
import type { MainMedia } from '../types/mainMedia';
import type {
	ArticleData,
	StorylinesContent,
} from '../types/storylinesContent';
import { parseStorylinesContentToStorylines } from './enhanceTagPageStorylinesContent';

const fixture =
	storylinesExample.storylinesContent as unknown as StorylinesContent;

const youtubeMedia: MainMedia = {
	type: 'YoutubeVideo',
	id: 'id',
	videoId: 'videoId',
	height: 0,
	width: 0,
	origin: '',
	title: '',
	duration: 0,
	expired: false,
};

const selfHostedMedia: MainMedia = {
	type: 'SelfHostedVideo',
	videoStyle: 'Default',
	atomId: '',
	sources: [],
	aspectRatio: 0,
	duration: 0,
	image: { aspectRatio: '5:4' },
};

const audioMedia: MainMedia = { type: 'Audio', duration: '14:33' };

const galleryMedia: MainMedia = { type: 'Gallery', count: '10' };

/** Build a minimal StorylinesContent with a single storyline/category for focused tests */
const makeContent = (
	category: string,
	articles: ArticleData[],
): StorylinesContent => ({
	created: '2026-01-01T00:00:00Z',
	tag: 'test/tag',
	storylines: [
		{
			title: 'A storyline',
			content: [{ category, articles }],
		},
	],
});

const makeArticle = (overrides: Partial<ArticleData> = {}): ArticleData => ({
	url: 'https://www.theguardian.com/example',
	headline: 'An example headline',
	byline: 'Reporter Name',
	publicationTime: '2026-01-01T12:00:00Z',
	...overrides,
});

describe('parseStorylinesContentToStorylines (integration with Frontend fixture)', () => {
	const parsed = parseStorylinesContentToStorylines(fixture);

	it('maps each storyline to a sequentially numbered id and preserves the title', () => {
		expect(parsed).toHaveLength(3);
		expect(parsed.map((s) => s.id)).toEqual([
			'storyline-1',
			'storyline-2',
			'storyline-3',
		]);
		expect(parsed[0]?.title).toBe(
			'AI extinction risk warnings and calls for a development slowdown',
		);
	});

	it('maps category names to their display titles', () => {
		expect(parsed[0]?.categories.map((c) => c.title)).toEqual([
			'Key Stories',
			'Opinions',
			'Explainers',
			'Deep Reads',
			'Multimedia',
			'Profiles and Interviews',
		]);
	});

	describe('Key Stories category', () => {
		const keyStories = parsed[0]?.categories[0]?.groupedTrails;

		it('produces a single splash card and no snap/standard cards', () => {
			expect(keyStories?.splash).toHaveLength(1);
			expect(keyStories?.snap).toHaveLength(0);
			expect(keyStories?.standard).toHaveLength(0);
		});

		it('builds a boosted key-stories card with the expected data link name', () => {
			const card = keyStories?.splash[0];
			expect(card?.boostLevel).toBe('boost');
			expect(card?.headline).toBe('');
			expect(card?.dataLinkName).toBe('storyline-1 | key-stories');
			expect(card?.format).toEqual({ design: 0, display: 0, theme: 0 });
		});

		it('uses the first article for the card url and image', () => {
			const card = keyStories?.splash[0];
			expect(card?.url).toBe(
				'https://www.theguardian.com/technology/2026/sep/13/too-little-too-late-critics-perplexed-and-suspicious-of-ai-leaders-call-for-a-slowdown',
			);
			expect(card?.image?.src).toBe(
				'https://media.guim.co.uk/a4fc80e643187b6b66f98b0e0f64193afdc28f1e/428_0_3331_2667/master/3331.jpg',
			);
		});

		it('exposes the first four articles as supporting content including publication dates', () => {
			const card = keyStories?.splash[0];
			// The fixture category has 5 articles; only 4 should be shown
			expect(card?.supportingContent).toHaveLength(4);
			expect(card?.supportingContent?.[0]).toMatchObject({
				headline:
					'‘Too little, too late’: critics perplexed and suspicious of AI leaders’ call for a slowdown',
				url: 'https://www.theguardian.com/technology/2026/sep/13/too-little-too-late-critics-perplexed-and-suspicious-of-ai-leaders-call-for-a-slowdown',
				kickerText: '',
				webPublicationDate: '2026-09-13T16:54:58Z',
				format: { design: 0, display: 0, theme: 0 },
			});
		});

		it('falls back to an empty byline when the lead article has none', () => {
			// The lead Key Stories article in the fixture has a null byline
			expect(keyStories?.splash[0]?.byline).toBe('');
		});
	});

	describe('Contrasting opinions category', () => {
		const opinions = parsed[0]?.categories[1]?.groupedTrails;

		it('produces up to two standard cards', () => {
			expect(opinions?.standard).toHaveLength(2);
			expect(opinions?.splash).toHaveLength(0);
		});

		it('applies the opinion format and shows the byline', () => {
			const card = opinions?.standard[0];
			expect(card?.format).toEqual({ design: 8, display: 0, theme: 1 });
			expect(card?.showByline).toBe(true);
			expect(card?.boostLevel).toBe('default');
			expect(card?.isImmersive).toBe(false);
		});

		it('builds the data link name from the category index and card format', () => {
			const card = opinions?.standard[0];
			// Contrasting opinions is the second category (index 1)
			expect(card?.dataLinkName).toBe(
				`storyline-1 | opinions | ${getDataLinkNameCard(
					{ design: 8, display: 0, theme: 1 },
					'1',
					0,
				)}`,
			);
		});

		it('sets the avatar url only for articles flagged as avatars', () => {
			// First opinion article has isAvatar: true, the second isAvatar: false
			expect(opinions?.standard[0]?.avatarUrl).toBe(
				'https://static.guim.co.uk/sys-images/Guardian/Pix/contributor/2014/9/12/1410533773838/Gaby-Hinsliff.jpg',
			);
			expect(opinions?.standard[1]?.avatarUrl).toBeUndefined();
		});
	});

	describe('Explainers category', () => {
		it('applies the explainer format to standard cards', () => {
			const explainers = parsed[0]?.categories[2]?.groupedTrails;
			expect(explainers?.standard).toHaveLength(2);
			expect(explainers?.standard[0]?.format).toEqual({
				design: 0,
				display: 0,
				theme: 2,
			});
		});
	});

	describe('Deep Reads category', () => {
		it('produces a single megaboosted immersive standard card', () => {
			const deepReads = parsed[0]?.categories[3]?.groupedTrails;
			expect(deepReads?.standard).toHaveLength(1);
			const card = deepReads?.standard[0];
			expect(card?.format).toEqual({ design: 10, display: 0, theme: 0 });
			expect(card?.boostLevel).toBe('megaboost');
			expect(card?.isImmersive).toBe(true);
		});
	});

	describe('Find multimedia category', () => {
		it('maps audio articles to the audio format and carries media metadata', () => {
			const multimedia = parsed[0]?.categories[4]?.groupedTrails;
			expect(multimedia?.standard).toHaveLength(2);
			const card = multimedia?.standard[0];
			expect(card?.format).toEqual({ design: 3, display: 0, theme: 7 });
			expect(card?.mainMedia).toMatchObject({
				type: 'Audio',
				duration: '27:47',
			});
			expect(card?.articleMedia).toEqual({
				type: 'Audio',
				duration: '27:47',
			});
		});
	});

	describe('Profiles and Interviews category', () => {
		it('produces a single megaboosted immersive card with the interview format', () => {
			const profiles = parsed[0]?.categories[5]?.groupedTrails;
			expect(profiles?.standard).toHaveLength(1);
			const card = profiles?.standard[0];
			expect(card?.format).toEqual({ design: 18, display: 1, theme: 0 });
			expect(card?.boostLevel).toBe('megaboost');
			expect(card?.isImmersive).toBe(true);
		});
	});
});

describe('parseStorylinesContentToStorylines (category-specific behaviour)', () => {
	it('decides the Find multimedia format from the media type', () => {
		const cases: Array<[MainMedia | null, number, number]> = [
			[youtubeMedia, 4, 7],
			[selfHostedMedia, 4, 7],
			[audioMedia, 3, 7],
			[galleryMedia, 2, 7],
			// No media data falls back to a standard article design within the media theme
			[null, 0, 7],
		];

		for (const [mediaData, design, theme] of cases) {
			const parsed = parseStorylinesContentToStorylines(
				makeContent('Find multimedia', [
					makeArticle({
						image: {
							src: 's',
							altText: 'a',
							isAvatar: false,
							mediaData,
						},
					}),
				]),
			);
			const card = parsed[0]?.categories[0]?.groupedTrails.standard[0];
			expect(card?.format).toEqual({ design, display: 0, theme });
		}
	});

	/**
	 * Known aliases (e.g. 'Opinions') are now canonicalised, but a genuinely
	 * unrecognised label still falls through to a plain Standard card with no
	 * error or warning. This test is a tripwire: if category-matching becomes
	 * stricter (e.g. throws or logs on unknown input), update it deliberately.
	 */
	it('renders genuinely unknown categories with a safe standard format and preserves their label', () => {
		const warn = jest
			.spyOn(console, 'warn')
			.mockImplementation(() => undefined);
		const parsed = parseStorylinesContentToStorylines(
			makeContent('Something New', [makeArticle()]),
		);
		expect(parsed[0]?.categories[0]?.title).toBe('Something New');
		const card = parsed[0]?.categories[0]?.groupedTrails.standard[0];
		expect(card?.format).toEqual({ design: 0, display: 0, theme: 0 });
		expect(card?.showByline).toBe(false);
		expect(card?.boostLevel).toBe('default');
		warn.mockRestore();
	});

	it('limits Key Stories supporting content to four articles', () => {
		const articles = Array.from({ length: 6 }, (_, i) =>
			makeArticle({
				url: `https://example.com/${i}`,
				headline: `Headline ${i}`,
			}),
		);
		const parsed = parseStorylinesContentToStorylines(
			makeContent('Key Stories', articles),
		);
		const card = parsed[0]?.categories[0]?.groupedTrails.splash[0];
		expect(card?.supportingContent).toHaveLength(4);
	});

	it('limits non-boosted categories to two standard cards', () => {
		const articles = Array.from({ length: 5 }, (_, i) =>
			makeArticle({ url: `https://example.com/${i}` }),
		);
		const parsed = parseStorylinesContentToStorylines(
			makeContent('Explainers', articles),
		);
		expect(parsed[0]?.categories[0]?.groupedTrails.standard).toHaveLength(
			2,
		);
	});

	it('limits megaboosted categories to a single standard card', () => {
		const articles = Array.from({ length: 3 }, (_, i) =>
			makeArticle({ url: `https://example.com/${i}` }),
		);
		const parsed = parseStorylinesContentToStorylines(
			makeContent('Deep Reads', articles),
		);
		expect(parsed[0]?.categories[0]?.groupedTrails.standard).toHaveLength(
			1,
		);
	});

	it('falls back to an empty byline when an article byline is null', () => {
		const parsed = parseStorylinesContentToStorylines(
			makeContent('Explainers', [makeArticle({ byline: null })]),
		);
		expect(
			parsed[0]?.categories[0]?.groupedTrails.standard[0]?.byline,
		).toBe('');
	});

	it('treats the "Opinions" label as equivalent to "Contrasting opinions"', () => {
		// Frontend may send either the raw category ('Contrasting opinions') or
		// its display label ('Opinions'); both must produce identical opinion
		// styling (comment format, byline shown, avatar) and the 'Opinions' title.
		const article = makeArticle({
			byline: 'A Columnist',
			image: {
				src: 'https://example.com/avatar.jpg',
				altText: 'a',
				isAvatar: true,
				mediaData: null,
			},
		});

		const fromDisplayLabel = parseStorylinesContentToStorylines(
			makeContent('Opinions', [article]),
		);
		const fromRawLabel = parseStorylinesContentToStorylines(
			makeContent('Contrasting opinions', [article]),
		);

		const displayCategory = fromDisplayLabel[0]?.categories[0];
		const rawCategory = fromRawLabel[0]?.categories[0];
		const displayCard = displayCategory?.groupedTrails.standard[0];

		expect(displayCategory?.title).toBe('Opinions');
		expect(displayCard?.format).toEqual({
			design: 8,
			display: 0,
			theme: 1,
		});
		expect(displayCard?.showByline).toBe(true);
		expect(displayCard?.avatarUrl).toBe('https://example.com/avatar.jpg');

		// Both labels should yield equivalent parsed output
		expect(displayCategory).toEqual(rawCategory);
	});

	it('only sets an avatar url for Contrasting opinions articles flagged as avatars', () => {
		const withAvatar = parseStorylinesContentToStorylines(
			makeContent('Contrasting opinions', [
				makeArticle({
					image: {
						src: 'https://example.com/avatar.jpg',
						altText: 'a',
						isAvatar: true,
						mediaData: null,
					},
				}),
			]),
		);
		expect(
			withAvatar[0]?.categories[0]?.groupedTrails.standard[0]?.avatarUrl,
		).toBe('https://example.com/avatar.jpg');

		const withoutAvatar = parseStorylinesContentToStorylines(
			makeContent('Contrasting opinions', [
				makeArticle({
					image: {
						src: 'https://example.com/photo.jpg',
						altText: 'a',
						isAvatar: false,
						mediaData: null,
					},
				}),
			]),
		);
		expect(
			withoutAvatar[0]?.categories[0]?.groupedTrails.standard[0]
				?.avatarUrl,
		).toBeUndefined();
	});

	it('only attaches main media for the Find multimedia category', () => {
		const opinion = parseStorylinesContentToStorylines(
			makeContent('Contrasting opinions', [
				makeArticle({
					image: {
						src: 's',
						altText: 'a',
						isAvatar: false,
						mediaData: audioMedia,
					},
				}),
			]),
		);
		expect(
			opinion[0]?.categories[0]?.groupedTrails.standard[0]?.mainMedia,
		).toBeUndefined();
	});
});

/**
 * Regression tests for the guards that harden Storylines data handling against
 * malformed or unexpected input from Frontend.
 */
describe('parseStorylinesContentToStorylines (data-handling guards)', () => {
	it('drops a Key Stories category that has no articles instead of emitting an empty-url splash card', () => {
		const parsed = parseStorylinesContentToStorylines(
			makeContent('Key Stories', []),
		);
		// The category produced no renderable cards, so it is removed entirely
		// rather than rendering a section heading with an empty-url splash card.
		expect(parsed[0]?.categories).toHaveLength(0);
	});

	it('warns when an unknown category label is received', () => {
		const warn = jest
			.spyOn(console, 'warn')
			.mockImplementation(() => undefined);
		parseStorylinesContentToStorylines(
			makeContent('Totally New Category', [makeArticle()]),
		);
		expect(warn).toHaveBeenCalledWith(
			'Unknown storyline category received: "Totally New Category"',
		);
		warn.mockRestore();
	});
});

import { validateAsPuzzlesPageType } from './validate';

const validPage = () => ({
	id: 'puzzles',
	webTitle: 'Puzzles and Games',
	editionId: 'UK',
	canonicalUrl: 'https://www.theguardian.com/puzzles-and-games',
	isAdFreeUser: false,
	config: { serverSideABTests: { 'puzzles-new-hub': 'variant' } },
	nav: {},
	pageFooter: {},
	layout: {
		containers: [
			{
				id: 'word-games',
				title: 'Word games',
				variant: 'standard',
				content: {
					nestedContainers: [],
					items: [
						[
							{
								id: 'word-wheel',
								title: 'Word wheel',
								type: 'word-game',
								set: 'all',
								cardVariant: 'primary',
								cadence: 'Daily',
								slug: 'word-wheel',
								variant: 'iframe-page',
							},
						],
					],
				},
			},
		],
	},
});

describe('validateAsPuzzlesPageType', () => {
	it('accepts a valid recursive blueprint contract', () => {
		expect(
			validateAsPuzzlesPageType(validPage()).layout.containers[0]?.id,
		).toBe('word-games');
	});

	it('accepts enabled on featured containers and rejects it elsewhere', () => {
		const featuredPage = validPage();
		featuredPage.layout.containers[0]!.variant = 'featured';
		(featuredPage.layout.containers[0] as { enabled?: boolean }).enabled =
			true;
		expect(validateAsPuzzlesPageType(featuredPage)).toBeDefined();

		featuredPage.layout.containers[0]!.variant = 'standard';
		expect(() => validateAsPuzzlesPageType(featuredPage)).toThrow();
	});

	it.each([
		[
			'unknown card variant',
			(page: ReturnType<typeof validPage>) => {
				page.layout.containers[0]!.content.items[0]![0]!.cardVariant =
					'hero';
			},
		],
		[
			'missing cadence',
			(page: ReturnType<typeof validPage>) => {
				const card = page.layout.containers[0]!.content
					.items[0]![0]! as {
					cadence?: string;
				};
				delete card.cadence;
			},
		],
		[
			'invalid colour',
			(page: ReturnType<typeof validPage>) => {
				const card = page.layout.containers[0]!.content
					.items[0]![0]! as {
					backgroundColour?: string;
				};
				card.backgroundColour = 'red';
			},
		],
		[
			'unsupported span',
			(page: ReturnType<typeof validPage>) => {
				const container = page.layout.containers[0]! as {
					desktopSpan?: number;
				};
				container.desktopSpan = 13;
			},
		],
		[
			'duplicate stable ID',
			(page: ReturnType<typeof validPage>) => {
				page.layout.containers[0]!.content.items[0]!.push({
					...page.layout.containers[0]!.content.items[0]![0]!,
				});
			},
		],
	])('rejects %s', (_, mutate) => {
		const page = validPage();
		mutate(page);
		expect(() => validateAsPuzzlesPageType(page)).toThrow(
			'Unable to validate request body for puzzles page',
		);
	});

	it('accepts supporting content with valid puzzle references', () => {
		const page = validPage();
		page.layout.containers.push({
			id: 'supporting',
			title: '',
			variant: 'supporting',
			adSlot: 'mostpop',
			content: { items: [], nestedContainers: [] },
			supporting: {
				usefulLinksTitle: 'Useful links',
				usefulLinks: [
					{ title: 'Archive', url: '/puzzles/word-wheel/archive' },
				],
				popularTitle: 'Most popular puzzles',
				popularGroups: [
					{ title: 'Most played', itemIds: ['word-wheel'] },
				],
			},
		} as never);

		expect(validateAsPuzzlesPageType(page).layout.containers).toHaveLength(
			2,
		);
	});

	it('rejects supporting content which references an unknown puzzle', () => {
		const page = validPage();
		page.layout.containers.push({
			id: 'supporting',
			title: '',
			variant: 'supporting',
			content: { items: [], nestedContainers: [] },
			supporting: {
				usefulLinksTitle: 'Useful links',
				usefulLinks: [],
				popularTitle: 'Most popular puzzles',
				popularGroups: [{ title: 'Most played', itemIds: ['missing'] }],
			},
		} as never);

		expect(() => validateAsPuzzlesPageType(page)).toThrow();
	});

	it('accepts a valid top-level ad placement and rejects one nested inside content', () => {
		const page = validPage();
		const ad = {
			id: 'inline-ad',
			title: '',
			variant: 'ad',
			adSlot: 'inline1',
			content: { items: [], nestedContainers: [] },
		};
		page.layout.containers.push(ad as never);
		expect(validateAsPuzzlesPageType(page).layout.containers).toHaveLength(
			2,
		);
		page.layout.containers.pop();
		page.layout.containers[0]!.content.nestedContainers.push(ad as never);
		expect(() => validateAsPuzzlesPageType(page)).toThrow();
	});
});

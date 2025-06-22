import {
	brandedTestCollections,
	largeFlexibleGeneralCollection,
	largeFlexibleSpecialCollection,
	smallFlexibleGeneralCollection,
	smallFlexibleSpecialCollection,
	testCollectionsUk,
	testCollectionsUs,
	testCollectionsWithSecondaryLevel,
} from '../../fixtures/manual/frontCollections';
import type { DCRCollectionType } from '../types/front';
import {
	type AdCandidate,
	getDesktopAdPositions,
	getMobileAdPositions,
	removeConsecutiveAdSlotsReducer,
} from './getFrontsAdPositions';

const testCollection: AdCandidate = {
	collectionType: 'fixed/large/slow-XIV',
	displayName: 'Test Collection',
	containerLevel: 'Primary',
	containerPalette: 'EventPalette',
	grouped: {
		snap: [],
		splash: [],
		huge: [],
		veryBig: [],
		big: [],
		standard: [],
	},
};

const defaultTestCollections: AdCandidate[] = [...Array<number>(12)].map(
	() => ({ ...testCollection }),
);

describe('Mobile Ads', () => {
	it(`Should not insert ad after container if it's the first one and it's a thrasher`, () => {
		const testCollections = [
			{ ...testCollection, collectionType: 'fixed/thrasher' },
			...defaultTestCollections,
		] satisfies AdCandidate[];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).not.toContain(0);
	});

	it(`should not insert an ad in the merchandising-high position`, () => {
		const testCollections = [
			...defaultTestCollections.slice(0, 3),
			{ ...testCollection, collectionType: 'news/most-popular' },
		] satisfies AdCandidate[];
		const mobileAdPositions = getMobileAdPositions(testCollections);
		expect(mobileAdPositions).not.toContain(3);
	});

	it('Should not insert ad before a thrasher container', () => {
		const testCollections = [...defaultTestCollections];
		testCollections.splice(6, 0, {
			...testCollection,
			collectionType: 'fixed/thrasher',
		});
		testCollections.splice(9, 0, {
			...testCollection,
			collectionType: 'fixed/thrasher',
		});

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).not.toContain(5);
		expect(mobileAdPositions).not.toContain(8);
	});

	// We used https://www.theguardian.com/uk/commentisfree as a blueprint
	it('Non-network front, with more than 4 collections, without thrashers', () => {
		const testCollections: AdCandidate[] = [
			{ ...testCollection, collectionType: 'fixed/large/slow-XIV' }, // Ad position (0)
			{ ...testCollection, collectionType: 'fixed/medium/slow-VI' },
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ad position (2)
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' },
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ad position (4)
			{ ...testCollection, collectionType: 'fixed/small/slow-I' }, // Ad position (6)
			{ ...testCollection, collectionType: 'fixed/medium/slow-VI' },
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ad position (8)
			{ ...testCollection, collectionType: 'fixed/small/slow-III' },
			{ ...testCollection, collectionType: 'fixed/small/fast-VIII' }, // Ignored - is merch high position
			{ ...testCollection, collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 4, 6, 8]);
	});

	// We used https://www.theguardian.com/uk as a blueprint
	it('UK Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: AdCandidate[] = [
			{ ...testCollection, collectionType: 'dynamic/fast' }, // Ad position (0)
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' },
			{ ...testCollection, collectionType: 'dynamic/slow' }, // Ad position (2)
			{ ...testCollection, collectionType: 'dynamic/slow' },
			{ ...testCollection, collectionType: 'fixed/small/slow-V-mpu' }, // Ad position (4)
			{ ...testCollection, collectionType: 'dynamic/slow' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' },
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ad position (8)
			{ ...testCollection, collectionType: 'dynamic/fast' },
			{ ...testCollection, collectionType: 'dynamic/fast' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ad position (11)
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ad position (14)
			{ ...testCollection, collectionType: 'fixed/thrasher' },
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' },
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ad position (19)
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ignored - is before merch high position
			{ ...testCollection, collectionType: 'fixed/medium/slow-VI' }, // Ignored - is merch high position
			{ ...testCollection, collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 4, 8, 11, 14, 17, 19]);
	});

	// We used https://www.theguardian.com/international as a blueprint
	it('International Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: AdCandidate[] = [
			{ ...testCollection, collectionType: 'dynamic/fast' }, // Ad position (0)
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' },
			{ ...testCollection, collectionType: 'dynamic/slow' }, // Ad position (2)
			{ ...testCollection, collectionType: 'dynamic/slow' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ad position (5)
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' },
			{ ...testCollection, collectionType: 'dynamic/fast' }, // Ad position (7)
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' },
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ad position (11)
			{ ...testCollection, collectionType: 'fixed/thrasher' },
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' },
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ad position (16)
			{ ...testCollection, collectionType: 'fixed/medium/slow-VI' }, // Ignored - is merch high position
			{ ...testCollection, collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 5, 7, 11, 14, 16]);
	});

	// We used https://www.theguardian.com/us as a blueprint
	it('US Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: AdCandidate[] = [
			{ ...testCollection, collectionType: 'dynamic/fast' }, // Ad position (0)
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' },
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ad position (2)
			{ ...testCollection, collectionType: 'fixed/thrasher' },
			{ ...testCollection, collectionType: 'dynamic/slow' }, // Ad position (5)
			{ ...testCollection, collectionType: 'dynamic/slow' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' },
			{ ...testCollection, collectionType: 'fixed/small/slow-III' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ad position (9)
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' },
			{ ...testCollection, collectionType: 'dynamic/fast' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ad position (12)
			{ ...testCollection, collectionType: 'fixed/medium/slow-VI' },
			{ ...testCollection, collectionType: 'dynamic/fast' }, // Ad position (14)
			{ ...testCollection, collectionType: 'dynamic/fast' },
			{ ...testCollection, collectionType: 'fixed/small/slow-V-mpu' }, // Ad position (16)
			{ ...testCollection, collectionType: 'fixed/small/slow-III' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ignored - is merch high position
			{ ...testCollection, collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 5, 9, 12, 14, 16]);
	});

	// We used https://www.theguardian.com/uk/lifeandstyle as a blueprint
	it('Lifeandstyle front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: AdCandidate[] = [
			{ ...testCollection, collectionType: 'dynamic/slow' }, // Ad position (0)
			{ ...testCollection, collectionType: 'fixed/medium/slow-VI' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' },
			{ ...testCollection, collectionType: 'fixed/medium/slow-VI' }, // Ad position (3)
			{ ...testCollection, collectionType: 'fixed/small/slow-V-third' },
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ad position (6)
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' },
			{ ...testCollection, collectionType: 'fixed/medium/slow-VI' }, // Ad position (9)
			{ ...testCollection, collectionType: 'fixed/medium/slow-XII-mpu' },
			{ ...testCollection, collectionType: 'fixed/small/fast-VIII' }, // Ignored - before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ad position (12)
			{ ...testCollection, collectionType: 'fixed/small/slow-III' },
			{ ...testCollection, collectionType: 'fixed/small/slow-I' }, // Ignored - is merch high position
			{ ...testCollection, collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 3, 6, 9, 12]);
	});

	// We used https://www.theguardian.com/tone/recipes as a blueprint
	it('Recipes front, with more than 4 collections, with thrasher at the first position', () => {
		const testCollections: AdCandidate[] = [
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ignored - is first container and thrasher
			{ ...testCollection, collectionType: 'fixed/medium/slow-VI' }, // Ad position (1)
			{ ...testCollection, collectionType: 'fixed/small/slow-V-third' },
			{ ...testCollection, collectionType: 'fixed/medium/slow-XII-mpu' }, // Ad position (3)
			{ ...testCollection, collectionType: 'fixed/small/slow-V-third' }, // Ad position (5)
			{ ...testCollection, collectionType: 'fixed/small/fast-VIII' },
			{ ...testCollection, collectionType: 'fixed/medium/fast-XI' }, // Ad position (7)
			{ ...testCollection, collectionType: 'fixed/small/slow-III' },
			{ ...testCollection, collectionType: 'fixed/small/slow-IV' }, // Ad position (9)
			{ ...testCollection, collectionType: 'fixed/small/slow-V-third' }, // Ignored - is before merch high position
			{ ...testCollection, collectionType: 'fixed/small/fast-VIII' }, // Ignored - is merch high position
			{ ...testCollection, collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([1, 3, 5, 7, 9]);
	});

	it('Europe Network Front, with beta containers and more than 4 collections, with thrashers in various places', () => {
		const testCollections: AdCandidate[] = [
			{
				...testCollection,
				collectionType: 'flexible/general',
				containerLevel: 'Primary',
			}, // Ignored - is before secondary container and is not large enough
			{
				...testCollection,
				collectionType: 'scrollable/small',
				containerLevel: 'Secondary',
			}, // Ignored - is before secondary container
			{
				...testCollection,
				collectionType: 'scrollable/small',
				containerLevel: 'Secondary',
			}, // Ignored - is before secondary container
			{
				...testCollection,
				collectionType: 'scrollable/medium',
				containerLevel: 'Secondary',
			}, // Ignored - is before secondary container
			{
				...testCollection,
				collectionType: 'scrollable/feature',
				containerLevel: 'Secondary',
			}, // Ad position (4)
			{
				...testCollection,
				collectionType: 'static/feature/2',
				containerLevel: 'Primary',
			}, // Ignored - is before secondary container
			{
				...testCollection,
				collectionType: 'scrollable/medium',
				containerLevel: 'Secondary',
			}, // Ad position (6)
			{
				...testCollection,
				collectionType: 'flexible/special',
				containerLevel: 'Primary',
			}, // Ignored - is before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ad position (8)
			{
				...testCollection,
				collectionType: 'flexible/general',
				containerLevel: 'Primary',
			}, // Ignored is consecutive ad after position 8
			{
				...testCollection,
				collectionType: 'static/feature/2',
				containerLevel: 'Primary',
			}, // Ignored - is before secondary container
			{
				...testCollection,
				collectionType: 'scrollable/small',
				containerLevel: 'Secondary',
			}, // Ignored - is before secondary container
			{
				...testCollection,
				collectionType: 'scrollable/small',
				containerLevel: 'Secondary',
			}, // Ignored - is before secondary container
			{
				...testCollection,
				collectionType: 'scrollable/small',
				containerLevel: 'Secondary',
			}, // Ad position (13)
			{
				...testCollection,
				collectionType: 'static/feature/2',
				containerLevel: 'Primary',
			}, // Ignored - is before secondary container
			{
				...testCollection,
				collectionType: 'scrollable/medium',
				containerLevel: 'Secondary',
			}, // Ignored - is before secondary container
			{
				...testCollection,
				collectionType: 'scrollable/medium',
				containerLevel: 'Secondary',
			}, // Ignored - is before secondary container
			{
				...testCollection,
				collectionType: 'scrollable/small',
				containerLevel: 'Secondary',
			}, // Ignored - is before thrasher
			{ ...testCollection, collectionType: 'fixed/thrasher' }, // Ad position (18)
			{
				...testCollection,
				collectionType: 'flexible/general',
				containerLevel: 'Primary',
			}, // Ignored - is before secondary container
			{
				...testCollection,
				collectionType: 'scrollable/feature',
				containerLevel: 'Secondary',
			}, // Ignored - is merch high position
			{ ...testCollection, collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([4, 6, 8, 13, 18]);
	});
});

describe('Desktop Ads', () => {
	it('calculates ad positions correctly for an example of the UK network front', () => {
		const adPositions = getDesktopAdPositions(testCollectionsUk, 'uk');

		expect(adPositions).toEqual([3, 6, 8, 11, 14, 17]);
	});

	it('calculates ad positions correctly for an example of the US network front', () => {
		const adPositions = getDesktopAdPositions(testCollectionsUs, 'us');

		expect(adPositions).toEqual([3, 6, 8, 11, 13, 18]);
	});

	it('does NOT insert ads above or below branded content', () => {
		const adPositions = getDesktopAdPositions(brandedTestCollections, 'uk');

		expect(adPositions).toEqual([]);
	});

	it('does NOT insert ads above secondary level containers', () => {
		const adPositions = getDesktopAdPositions(
			testCollectionsWithSecondaryLevel,
			'europe',
		);

		expect(adPositions).toEqual([]);
	});

	it('inserts a maximum of 6 ads for standard fronts', () => {
		const adPositions = getDesktopAdPositions(
			// Double number of UK collections in fixture to reach maximum
			[...testCollectionsUk, ...testCollectionsUk],
			'europe',
		);

		expect(adPositions.length).toEqual(6);
	});

	it('inserts a maximum of 8 ads for fronts with beta collections', () => {
		const adPositions = getDesktopAdPositions(
			// 10x number of test collections in fixture to reach maximum level
			new Array<DCRCollectionType[]>(10)
				.fill(testCollectionsWithSecondaryLevel)
				.flat(),
			'europe',
		);

		expect(adPositions.length).toEqual(8);
	});
});

describe('inserting an ad after the first collection', () => {
	describe('on mobile', () => {
		it('inserts an ad after the first collection if it is a LARGE flexible general container', () => {
			const adPositions = getMobileAdPositions([
				...largeFlexibleGeneralCollection,
				{
					...testCollection,
					collectionType: 'scrollable/small',
					containerLevel: 'Secondary',
				},
				{
					...testCollection,
					collectionType: 'scrollable/medium',
					containerLevel: 'Secondary',
				},
			]);

			expect(adPositions).toContain(0);
			expect(adPositions).not.toContain(1);
		});

		it('inserts an ad after the first collection if it is a LARGE flexible special container', () => {
			const adPositions = getMobileAdPositions([
				...largeFlexibleSpecialCollection,
				{
					...testCollection,
					collectionType: 'scrollable/small',
					containerLevel: 'Secondary',
				},
				{
					...testCollection,
					collectionType: 'scrollable/medium',
					containerLevel: 'Secondary',
				},
			]);

			expect(adPositions).toContain(0);
			expect(adPositions).not.toContain(1);
		});

		it('does NOT insert an ad after the first collection if it is a SMALL flexible general container', () => {
			const adPositions = getMobileAdPositions([
				...smallFlexibleGeneralCollection,
				{
					...testCollection,
					collectionType: 'scrollable/small',
					containerLevel: 'Secondary',
				},
			]);

			expect(adPositions).not.toContain(0);
		});

		it('does NOT insert an ad after the first collection if it is a SMALL flexible special container', () => {
			const adPositions = getMobileAdPositions([
				...smallFlexibleSpecialCollection,
				{
					...testCollection,
					collectionType: 'scrollable/small',
					containerLevel: 'Secondary',
				},
			]);

			expect(adPositions).not.toContain(0);
		});
	});

	describe('on desktop', () => {
		it('inserts an ad before the second collection if it is preceded by a LARGE flexible general container', () => {
			const adPositions = getDesktopAdPositions(
				[
					...largeFlexibleGeneralCollection,
					{
						...testCollection,
						collectionType: 'scrollable/small',
						containerLevel: 'Secondary',
					},
					{
						...testCollection,
						collectionType: 'scrollable/medium',
						containerLevel: 'Secondary',
					},
				],
				'uk',
			);

			expect(adPositions).toContain(1);
			expect(adPositions).not.toContain(2);
		});

		it('inserts an ad before the second collection if it is preceded by a LARGE flexible special container', () => {
			const adPositions = getDesktopAdPositions(
				[
					...largeFlexibleSpecialCollection,
					{
						...testCollection,
						collectionType: 'scrollable/small',
						containerLevel: 'Secondary',
					},
					{
						...testCollection,
						collectionType: 'scrollable/medium',
						containerLevel: 'Secondary',
					},
				],
				'uk',
			);

			expect(adPositions).toContain(1);
			expect(adPositions).not.toContain(2);
		});

		it('does NOT insert an ad before the second collection if it is preceded by a SMALL flexible general container', () => {
			const adPositions = getDesktopAdPositions(
				[
					...smallFlexibleGeneralCollection,
					{
						...testCollection,
						collectionType: 'scrollable/small',
						containerLevel: 'Secondary',
					},
					{
						...testCollection,
						collectionType: 'scrollable/medium',
						containerLevel: 'Secondary',
					},
				],
				'uk',
			);

			expect(adPositions).not.toContain(1);
		});

		it('does NOT insert an ad before the second collection if it is preceded by a SMALL flexible special container', () => {
			const adPositions = getDesktopAdPositions(
				[
					...smallFlexibleSpecialCollection,
					{
						...testCollection,
						collectionType: 'scrollable/small',
						containerLevel: 'Secondary',
					},
					{
						...testCollection,
						collectionType: 'scrollable/medium',
						containerLevel: 'Secondary',
					},
				],
				'uk',
			);

			expect(adPositions).not.toContain(1);
		});
	});
});

describe('removeConsecutiveAdSlotsReducer', () => {
	it('removes consecutive slots from array of all consecutive numbers', () => {
		const arr = [0, 1, 2, 3, 4, 5];
		const result = arr.reduce(removeConsecutiveAdSlotsReducer, []);
		expect(result).toEqual([0, 2, 4]);
	});

	it('removes consecutive slots from array of some consecutive numbers', () => {
		const arr = [0, 3, 7, 11, 12, 13, 19, 20];
		const result = arr.reduce(removeConsecutiveAdSlotsReducer, []);
		expect(result).toEqual([0, 3, 7, 11, 13, 19]);
	});

	it('handles empty array', () => {
		const arr: number[] = [];
		const result = arr.reduce(removeConsecutiveAdSlotsReducer, []);
		expect(result).toEqual([]);
	});
});

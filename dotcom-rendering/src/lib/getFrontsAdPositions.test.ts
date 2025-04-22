import {
	brandedTestCollections,
	testCollectionsUk,
	testCollectionsUs,
	testCollectionsWithSecondaryLevel,
} from '../../fixtures/manual/frontCollections';
import type { DCRCollectionType } from '../types/front';
import {
	type AdCandidateMobile,
	getFrontsBannerAdPositions,
	getMobileAdPositions,
	removeConsecutiveAdSlotsReducer,
} from './getFrontsAdPositions';

const defaultTestCollections: AdCandidateMobile[] = [...Array<number>(12)].map(
	() => ({ collectionType: 'fixed/large/slow-XIV' }),
);

describe('Mobile Ads', () => {
	it(`Should not insert ad after container if it's the first one and it's a thrasher`, () => {
		const testCollections = [
			{ collectionType: 'fixed/thrasher' },
			...defaultTestCollections,
		] satisfies AdCandidateMobile[];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).not.toContain(0);
	});

	it(`should not insert an ad in the merchandising-high position`, () => {
		const testCollections = [
			...defaultTestCollections.slice(0, 3),
			{ collectionType: 'news/most-popular' },
		] satisfies AdCandidateMobile[];
		const mobileAdPositions = getMobileAdPositions(testCollections);
		expect(mobileAdPositions).not.toContain(3);
	});

	it('Should not insert ad before a thrasher container', () => {
		const testCollections = [...defaultTestCollections];
		testCollections.splice(6, 0, { collectionType: 'fixed/thrasher' });
		testCollections.splice(9, 0, { collectionType: 'fixed/thrasher' });

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).not.toContain(5);
		expect(mobileAdPositions).not.toContain(8);
	});

	// We used https://www.theguardian.com/uk/commentisfree as a blueprint
	it('Non-network front, with more than 4 collections, without thrashers', () => {
		const testCollections: AdCandidateMobile[] = [
			{ collectionType: 'fixed/large/slow-XIV' }, // Ad position (0)
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'fixed/small/slow-IV' }, // Ad position (2)
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/small/slow-IV' }, // Ad position (4)
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/small/slow-I' }, // Ad position (6)
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'fixed/small/slow-IV' }, // Ad position (8)
			{ collectionType: 'fixed/small/slow-III' },
			{ collectionType: 'fixed/medium/fast-XII' }, // Ignored - is before merch high position
			{ collectionType: 'fixed/small/fast-VIII' }, // Ignored - is merch high position
			{ collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 4, 6, 8]);
	});

	// We used https://www.theguardian.com/uk as a blueprint
	it('UK Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: AdCandidateMobile[] = [
			{ collectionType: 'dynamic/fast' }, // Ad position (0)
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'dynamic/slow' }, // Ad position (2)
			{ collectionType: 'dynamic/slow' },
			{ collectionType: 'fixed/small/slow-V-mpu' }, // Ad position (4)
			{ collectionType: 'dynamic/slow' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/small/slow-IV' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ad position (8)
			{ collectionType: 'dynamic/fast' },
			{ collectionType: 'dynamic/fast' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ad position (11)
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/small/slow-IV' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ad position (14)
			{ collectionType: 'dynamic/slow-mpu' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/video' }, // Ad position (17)
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/small/slow-IV' }, // Ad position (19)
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/small/slow-IV' }, // Ignored - is before merch high position
			{ collectionType: 'fixed/medium/slow-VI' }, // Ignored - is merch high position
			{ collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 4, 8, 11, 14, 17, 19]);
	});

	// We used https://www.theguardian.com/international as a blueprint
	it('International Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: AdCandidateMobile[] = [
			{ collectionType: 'dynamic/fast' }, // Ad position (0)
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'dynamic/slow' }, // Ad position (2)
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'dynamic/slow' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ad position (5)
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'dynamic/fast' }, // Ad position (7)
			{ collectionType: 'fixed/small/slow-IV' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'dynamic/slow-mpu' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ad position (11)
			{ collectionType: 'dynamic/slow-mpu' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'dynamic/slow-mpu' }, // Ad position (14)
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/small/slow-IV' }, // Ad position (16)
			{ collectionType: 'fixed/video' },
			{ collectionType: 'fixed/medium/slow-VI' }, // Ignored - is merch high position
			{ collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 5, 7, 11, 14, 16]);
	});

	// We used https://www.theguardian.com/us as a blueprint
	it('US Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: AdCandidateMobile[] = [
			{ collectionType: 'dynamic/fast' }, // Ad position (0)
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/small/slow-IV' }, // Ad position (2)
			{ collectionType: 'dynamic/slow-mpu' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'dynamic/slow' }, // Ad position (5)
			{ collectionType: 'dynamic/slow' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/small/slow-III' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ad position (9)
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'dynamic/fast' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ad position (12)
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'dynamic/fast' }, // Ad position (14)
			{ collectionType: 'dynamic/fast' },
			{ collectionType: 'fixed/small/slow-V-mpu' }, // Ad position (16)
			{ collectionType: 'fixed/video' },
			{ collectionType: 'fixed/small/slow-III' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ignored - is merch high position
			{ collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 5, 9, 12, 14, 16]);
	});

	// We used https://www.theguardian.com/uk/lifeandstyle as a blueprint
	it('Lifeandstyle front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: AdCandidateMobile[] = [
			{ collectionType: 'dynamic/slow' }, // Ad position (0)
			{ collectionType: 'fixed/medium/slow-VI' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/medium/slow-VI' }, // Ad position (3)
			{ collectionType: 'fixed/small/slow-V-third' },
			{ collectionType: 'fixed/small/slow-IV' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ad position (6)
			{ collectionType: 'fixed/small/slow-IV' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/medium/slow-VI' }, // Ad position (9)
			{ collectionType: 'fixed/medium/slow-XII-mpu' },
			{ collectionType: 'fixed/small/fast-VIII' }, // Ignored - before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ad position (12)
			{ collectionType: 'fixed/small/slow-III' },
			{ collectionType: 'fixed/small/slow-I' }, // Ignored - is merch high position
			{ collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 3, 6, 9, 12]);
	});

	// We used https://www.theguardian.com/tone/recipes as a blueprint
	it('Recipes front, with more than 4 collections, with thrasher at the first position', () => {
		const testCollections: AdCandidateMobile[] = [
			{ collectionType: 'fixed/thrasher' }, // Ignored - is first container and thrasher
			{ collectionType: 'fixed/medium/slow-VI' }, // Ad position (1)
			{ collectionType: 'fixed/small/slow-V-third' },
			{ collectionType: 'fixed/medium/slow-XII-mpu' }, // Ad position (3)
			{ collectionType: 'fixed/medium/fast-XII' },
			{ collectionType: 'fixed/small/slow-V-third' }, // Ad position (5)
			{ collectionType: 'fixed/small/fast-VIII' },
			{ collectionType: 'fixed/medium/fast-XI' }, // Ad position (7)
			{ collectionType: 'fixed/small/slow-III' },
			{ collectionType: 'fixed/small/slow-IV' }, // Ad position (9)
			{ collectionType: 'fixed/small/slow-V-half' },
			{ collectionType: 'fixed/small/slow-V-third' }, // Ignored - is before merch high position
			{ collectionType: 'fixed/small/fast-VIII' }, // Ignored - is merch high position
			{ collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([1, 3, 5, 7, 9]);
	});

	it('Europe Network Front, with beta containers and more than 4 collections, with thrashers in various places', () => {
		const testCollections: AdCandidateMobile[] = [
			{ collectionType: 'flexible/general', containerLevel: 'Primary' }, // Ignored - is before secondary container
			{ collectionType: 'scrollable/small', containerLevel: 'Secondary' }, // Ignored - is before secondary container
			{ collectionType: 'scrollable/small', containerLevel: 'Secondary' }, // Ignored - is before secondary container
			{
				collectionType: 'scrollable/medium',
				containerLevel: 'Secondary',
			}, // Ignored - is before secondary container
			{
				collectionType: 'scrollable/feature',
				containerLevel: 'Secondary',
			}, // Ad position (4)
			{ collectionType: 'static/feature/2', containerLevel: 'Primary' }, // Ignored - is before secondary container
			{
				collectionType: 'scrollable/medium',
				containerLevel: 'Secondary',
			}, // Ad position (6)
			{ collectionType: 'flexible/special', containerLevel: 'Primary' }, // Ignored - is before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ad position (8)
			{ collectionType: 'flexible/general', containerLevel: 'Primary' }, // Ignored is consecutive ad after position 8
			{ collectionType: 'static/feature/2', containerLevel: 'Primary' }, // Ignored - is before secondary container
			{ collectionType: 'scrollable/small', containerLevel: 'Secondary' }, // Ignored - is before secondary container
			{ collectionType: 'scrollable/small', containerLevel: 'Secondary' }, // Ignored - is before secondary container
			{ collectionType: 'scrollable/small', containerLevel: 'Secondary' }, // Ad position (13)
			{ collectionType: 'static/feature/2', containerLevel: 'Primary' }, // Ignored - is before secondary container
			{
				collectionType: 'scrollable/medium',
				containerLevel: 'Secondary',
			}, // Ignored - is before secondary container
			{
				collectionType: 'scrollable/medium',
				containerLevel: 'Secondary',
			}, // Ignored - is before secondary container
			{ collectionType: 'scrollable/small', containerLevel: 'Secondary' }, // Ignored - is before thrasher
			{ collectionType: 'fixed/thrasher' }, // Ad position (18)
			{ collectionType: 'flexible/general', containerLevel: 'Primary' }, // Ignored - is before secondary container
			{
				collectionType: 'scrollable/feature',
				containerLevel: 'Secondary',
			}, // Ignored - is merch high position
			{ collectionType: 'news/most-popular' }, // Ignored - is most viewed container
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([4, 6, 8, 13, 18]);
	});
});

describe('Standard fronts fronts-banner ad slots', () => {
	it('calculates ad positions correctly for an example of the UK network front', () => {
		const adPositions = getFrontsBannerAdPositions(testCollectionsUk, 'uk');

		expect(adPositions).toEqual([3, 6, 8, 11, 14, 17]);
	});

	it('calculates ad positions correctly for an example of the US network front', () => {
		const adPositions = getFrontsBannerAdPositions(testCollectionsUs, 'us');

		expect(adPositions).toEqual([3, 6, 8, 11, 13, 18]);
	});

	it('does NOT insert ads above or below branded content', () => {
		const adPositions = getFrontsBannerAdPositions(
			brandedTestCollections,
			'uk',
		);

		expect(adPositions).toEqual([]);
	});

	it('does NOT insert ads above secondary level containers', () => {
		const adPositions = getFrontsBannerAdPositions(
			testCollectionsWithSecondaryLevel,
			'europe',
		);

		expect(adPositions).toEqual([]);
	});

	it('inserts a maximum of 6 ads for standard fronts', () => {
		const adPositions = getFrontsBannerAdPositions(
			// Double number of UK collections in fixture to reach maximum
			[...testCollectionsUk, ...testCollectionsUk],
			'europe',
		);

		expect(adPositions.length).toEqual(6);
	});

	it('inserts a maximum of 8 ads for fronts with beta collections', () => {
		const adPositions = getFrontsBannerAdPositions(
			// 10x number of test collections in fixture to reach maximum level
			new Array<DCRCollectionType[]>(10)
				.fill(testCollectionsWithSecondaryLevel)
				.flat(),
			'europe',
		);

		expect(adPositions.length).toEqual(8);
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

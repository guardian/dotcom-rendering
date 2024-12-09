import {
	brandedTestCollections,
	testCollectionsUk,
	testCollectionsUs,
} from '../../fixtures/manual/frontCollections';
import type { DCRCollectionType } from '../types/front';
import {
	getFrontsBannerAdPositions,
	getMobileAdPositions,
} from './getFrontsAdPositions';

const generateTestCollection = (
	collectionData: Partial<DCRCollectionType>,
): DCRCollectionType => {
	const randomInt = Math.round(Math.random() * 1000);
	return {
		id: `collection-${randomInt}`,
		collectionType: 'fixed/large/slow-XIV',
		config: { showDateHeader: false, containerLevel: undefined },
		displayName: `Collection ${randomInt}`,
		grouped: {
			snap: [],
			huge: [],
			veryBig: [],
			big: [],
			standard: [],
			splash: [],
		},
		curated: [],
		backfill: [],
		treats: [],
		...collectionData,
	};
};

const defaultTestCollections: DCRCollectionType[] = [
	...Array<DCRCollectionType>(12),
].map(generateTestCollection);

describe('Mobile Ads', () => {
	it(`Should not insert ad after container if it's the first one and it's a thrasher`, () => {
		const testCollections = [
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			...defaultTestCollections.slice(0, 4),
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).not.toContain(0);
	});

	// MerchandiseHigh is in position:
	// 2: when it's a network front and collections are equal or more than 4
	// 0: when collections are less than 4
	it.each([
		[4, 2],
		[5, 2],
		[99, 2],
		[3, 0],
		[2, 0],
		[0, 0],
	])(
		`should not insert an ad in the merchandising-high position when there are %i collections and merchandising-high is in position %i`,
		(numCollections, merchHighPosition) => {
			const mobileAdPositions = getMobileAdPositions(
				defaultTestCollections.slice(0, numCollections),
			);
			expect(mobileAdPositions).not.toContain(merchHighPosition);
		},
	);

	it('Should not insert ad after a thrasher container', () => {
		const testCollections = [...defaultTestCollections];
		testCollections.splice(
			6,
			0,
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
		);
		testCollections.splice(
			9,
			0,
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
		);

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).not.toContain(7);
		expect(mobileAdPositions).not.toContain(10);
	});

	// We used https://www.theguardian.com/uk/commentisfree as a blueprint
	it('Non-network front, with more than 4 collections, without thrashers', () => {
		const mobileAdPositions = getMobileAdPositions(defaultTestCollections);

		expect(mobileAdPositions).toEqual([0, 3, 5, 7, 9, 11]);
	});

	// We used https://www.theguardian.com/uk as a blueprint
	it('UK Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: DCRCollectionType[] = [
			generateTestCollection({ collectionType: 'dynamic/fast' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'dynamic/slow' }),
			generateTestCollection({ collectionType: 'dynamic/slow' }),
			generateTestCollection({
				collectionType: 'fixed/small/slow-V-mpu',
			}),
			generateTestCollection({ collectionType: 'dynamic/slow' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'dynamic/fast' }),
			generateTestCollection({ collectionType: 'dynamic/fast' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'dynamic/slow-mpu' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'dynamic/slow-mpu' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'fixed/video' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'dynamic/slow-mpu' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'fixed/medium/slow-VI' }),
			generateTestCollection({ collectionType: 'news/most-popular' }),
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 3, 6, 9, 12, 16, 18, 20, 22]);
	});

	// We used https://www.theguardian.com/international as a blueprint
	it('International Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: DCRCollectionType[] = [
			generateTestCollection({ collectionType: 'dynamic/fast' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'dynamic/slow' }),
			generateTestCollection({ collectionType: 'dynamic/slow-mpu' }),
			generateTestCollection({ collectionType: 'dynamic/slow' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'dynamic/fast' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'dynamic/slow-mpu' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'dynamic/slow-mpu' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'dynamic/slow-mpu' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'fixed/video' }),
			generateTestCollection({ collectionType: 'fixed/medium/slow-VI' }),
			generateTestCollection({ collectionType: 'news/most-popular' }),
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 3, 6, 9, 13, 15, 17]);
	});

	// We used https://www.theguardian.com/us as a blueprint
	it('US Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: DCRCollectionType[] = [
			generateTestCollection({ collectionType: 'dynamic/fast' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'dynamic/slow-mpu' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'dynamic/slow' }),
			generateTestCollection({ collectionType: 'dynamic/slow' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-III' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'dynamic/fast' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'fixed/medium/slow-VI' }),
			generateTestCollection({ collectionType: 'dynamic/fast' }),
			generateTestCollection({ collectionType: 'dynamic/fast' }),
			generateTestCollection({
				collectionType: 'fixed/small/slow-V-mpu',
			}),
			generateTestCollection({ collectionType: 'fixed/video' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-III' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'news/most-popular' }),
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 4, 7, 10, 13, 15, 17]);
	});

	// We used https://www.theguardian.com/uk/lifeandstyle as a blueprint
	it('Lifeandstyle front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: DCRCollectionType[] = [
			generateTestCollection({ collectionType: 'dynamic/slow' }),
			generateTestCollection({ collectionType: 'fixed/medium/slow-VI' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'fixed/medium/slow-VI' }),
			generateTestCollection({
				collectionType: 'fixed/small/slow-V-third',
			}),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'fixed/medium/slow-VI' }),
			generateTestCollection({
				collectionType: 'fixed/medium/slow-XII-mpu',
			}),
			generateTestCollection({ collectionType: 'fixed/small/fast-VIII' }),
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-III' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-I' }),
			generateTestCollection({ collectionType: 'news/most-popular' }),
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 4, 8, 10, 13]);
	});

	// We used https://www.theguardian.com/tone/recipes as a blueprint
	it('Recipes front, with more than 4 collections, with thrasher at the first position', () => {
		const testCollections: DCRCollectionType[] = [
			generateTestCollection({ collectionType: 'fixed/thrasher' }),
			generateTestCollection({ collectionType: 'fixed/medium/slow-VI' }),
			generateTestCollection({
				collectionType: 'fixed/small/slow-V-third',
			}),
			generateTestCollection({
				collectionType: 'fixed/medium/slow-XII-mpu',
			}),
			generateTestCollection({ collectionType: 'fixed/medium/fast-XII' }),
			generateTestCollection({
				collectionType: 'fixed/small/slow-V-third',
			}),
			generateTestCollection({ collectionType: 'fixed/small/fast-VIII' }),
			generateTestCollection({ collectionType: 'fixed/medium/fast-XI' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-III' }),
			generateTestCollection({ collectionType: 'fixed/small/slow-IV' }),
			generateTestCollection({
				collectionType: 'fixed/small/slow-V-half',
			}),
			generateTestCollection({
				collectionType: 'fixed/small/slow-V-third',
			}),
			generateTestCollection({ collectionType: 'fixed/small/fast-VIII' }),
			generateTestCollection({ collectionType: 'news/most-popular' }),
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([1, 4, 6, 8, 10, 12]);
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
});

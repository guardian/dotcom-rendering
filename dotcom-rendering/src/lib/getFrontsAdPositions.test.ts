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

const defaultTestCollections: Pick<DCRCollectionType, 'collectionType'>[] = [
	...Array<number>(12),
].map(() => ({
	collectionType: 'fixed/large/slow-XIV',
}));

describe('Mobile Ads', () => {
	it(`Should not insert ad after container if it's the first one and it's a thrasher`, () => {
		const testCollections = [...defaultTestCollections];
		testCollections.unshift({ collectionType: 'fixed/thrasher' });

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).not.toContain(0);
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
		const testCollections: Pick<DCRCollectionType, 'collectionType'>[] = [
			{ collectionType: 'fixed/large/slow-XIV' },
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/small/slow-I' },
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/small/slow-III' },
			{ collectionType: 'fixed/medium/fast-XII' },
			{ collectionType: 'fixed/small/fast-VIII' },
			{ collectionType: 'news/most-popular' },
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 4, 6, 8, 10]);
	});

	// We used https://www.theguardian.com/uk as a blueprint
	it('UK Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: Pick<DCRCollectionType, 'collectionType'>[] = [
			{ collectionType: 'dynamic/fast' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'dynamic/slow' },
			{ collectionType: 'dynamic/slow' },
			{ collectionType: 'fixed/small/slow-V-mpu' },
			{ collectionType: 'dynamic/slow' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'dynamic/fast' },
			{ collectionType: 'dynamic/fast' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/video' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'news/most-popular' },
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 4, 8, 11, 14, 17, 19, 21]);
	});

	// We used https://www.theguardian.com/international as a blueprint
	it('International Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: Pick<DCRCollectionType, 'collectionType'>[] = [
			{ collectionType: 'dynamic/fast' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'dynamic/slow' },
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'dynamic/slow' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'dynamic/fast' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/video' },
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'news/most-popular' },
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 5, 7, 11, 14, 16, 18]);
	});

	// We used https://www.theguardian.com/us as a blueprint
	it('US Network Front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: Pick<DCRCollectionType, 'collectionType'>[] = [
			{ collectionType: 'dynamic/fast' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'dynamic/slow' },
			{ collectionType: 'dynamic/slow' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/small/slow-III' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'dynamic/fast' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'dynamic/fast' },
			{ collectionType: 'dynamic/fast' },
			{ collectionType: 'fixed/small/slow-V-mpu' },
			{ collectionType: 'fixed/video' },
			{ collectionType: 'fixed/small/slow-III' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'news/most-popular' },
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 2, 5, 9, 12, 14, 16, 19]);
	});

	// We used https://www.theguardian.com/uk/lifeandstyle as a blueprint
	it('Lifeandstyle front, with more than 4 collections, with thrashers at various places', () => {
		const testCollections: Pick<DCRCollectionType, 'collectionType'>[] = [
			{ collectionType: 'dynamic/slow' },
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'fixed/small/slow-V-third' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'fixed/medium/slow-XII-mpu' },
			{ collectionType: 'fixed/small/fast-VIII' },
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/small/slow-III' },
			{ collectionType: 'fixed/small/slow-I' },
			{ collectionType: 'news/most-popular' },
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([0, 3, 6, 9, 12, 14]);
	});

	// We used https://www.theguardian.com/tone/recipes as a blueprint
	it('Recipes front, with more than 4 collections, with thrasher at the first position', () => {
		const testCollections: Pick<DCRCollectionType, 'collectionType'>[] = [
			{ collectionType: 'fixed/thrasher' },
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'fixed/small/slow-V-third' },
			{ collectionType: 'fixed/medium/slow-XII-mpu' },
			{ collectionType: 'fixed/medium/fast-XII' },
			{ collectionType: 'fixed/small/slow-V-third' },
			{ collectionType: 'fixed/small/fast-VIII' },
			{ collectionType: 'fixed/medium/fast-XI' },
			{ collectionType: 'fixed/small/slow-III' },
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/small/slow-V-half' },
			{ collectionType: 'fixed/small/slow-V-third' },
			{ collectionType: 'fixed/small/fast-VIII' },
			{ collectionType: 'news/most-popular' },
		];

		const mobileAdPositions = getMobileAdPositions(testCollections);

		expect(mobileAdPositions).toEqual([1, 3, 5, 7, 9, 11]);
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

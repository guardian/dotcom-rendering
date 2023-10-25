import type { DCRCollectionType } from '../types/front';
import {
	getDesktopMpuAdPositions,
	getMerchHighPosition,
	getMobileAdPositions,
} from './getAdPositions';

const defaultTestCollections: Pick<DCRCollectionType, 'collectionType'>[] = [
	...Array<number>(12),
].map(() => ({
	collectionType: 'fixed/large/slow-XIV',
}));

describe('Mobile Ads', () => {
	it(`Should not insert ad after container if it's the first one and it's a thrasher`, () => {
		const merchHighPosition = 2;
		const testCollections = [...defaultTestCollections];
		testCollections.unshift({ collectionType: 'fixed/thrasher' });

		const mobileAdPositions = getMobileAdPositions(
			testCollections,
			merchHighPosition,
		);

		expect(mobileAdPositions).not.toContain(0);
	});

	// MerchandiseHigh is in position:
	// 2: when it's a network front and collections are equal or more than 4
	// 1: when collections are equal or more than 4 and is not a network front
	// 0: when collections are less than 4
	it.each([2, 1, 0])(
		`should not insert ad when merchandise high is in position %i`,
		(merchHighPosition) => {
			const mobileAdPositions = getMobileAdPositions(
				defaultTestCollections,
				merchHighPosition,
			);
			expect(mobileAdPositions).not.toContain(merchHighPosition);
		},
	);

	it('Should not insert ad after a thrasher container', () => {
		const merchHighPosition = getMerchHighPosition(
			defaultTestCollections.length,
		);
		const testCollections = [...defaultTestCollections];
		testCollections.splice(6, 0, { collectionType: 'fixed/thrasher' });
		testCollections.splice(9, 0, { collectionType: 'fixed/thrasher' });

		const mobileAdPositions = getMobileAdPositions(
			testCollections,
			merchHighPosition,
		);

		expect(mobileAdPositions).not.toContain(7);
		expect(mobileAdPositions).not.toContain(10);
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

		const merchHighPosition = getMerchHighPosition(testCollections.length);

		const mobileAdPositions = getMobileAdPositions(
			testCollections,
			merchHighPosition,
		);

		expect(mobileAdPositions).toEqual([0, 3, 5, 7, 9, 11]);
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

		const merchHighPosition = getMerchHighPosition(testCollections.length);

		const mobileAdPositions = getMobileAdPositions(
			testCollections,
			merchHighPosition,
		);

		expect(mobileAdPositions).toEqual([0, 3, 6, 9, 12, 16, 18, 20, 22]);
	});

	// We used https://www.theguardian.com/international as a blueprint
	it('International Network Front, with more than 4 collections, with thrashers at various places', () => {
		const merchHighPosition = 3;
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

		const mobileAdPositions = getMobileAdPositions(
			testCollections,
			merchHighPosition,
		);

		expect(mobileAdPositions).toEqual([0, 2, 6, 9, 13, 15, 17]);
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

		const merchHighPosition = getMerchHighPosition(testCollections.length);

		const mobileAdPositions = getMobileAdPositions(
			testCollections,
			merchHighPosition,
		);

		expect(mobileAdPositions).toEqual([0, 4, 7, 10, 13, 15, 17]);
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

		const merchHighPosition = getMerchHighPosition(testCollections.length);

		const mobileAdPositions = getMobileAdPositions(
			testCollections,
			merchHighPosition,
		);

		expect(mobileAdPositions).toEqual([0, 4, 8, 10, 13]);
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

		const merchHighPosition = getMerchHighPosition(testCollections.length);

		const mobileAdPositions = getMobileAdPositions(
			testCollections,
			merchHighPosition,
		);

		expect(mobileAdPositions).toEqual([1, 4, 6, 8, 10, 12]);
	});
});

describe('Desktop Ads', () => {
	it('should return a list of the MPU ads/containers in correct positions', () => {
		const testCollections: Pick<DCRCollectionType, 'collectionType'>[] = [
			{ collectionType: 'fixed/small/slow-IV' },
			{ collectionType: 'fixed/medium/slow-VI' },
			{ collectionType: 'fixed/small/slow-V-third' },
			{ collectionType: 'fixed/medium/slow-XII-mpu' },
			{ collectionType: 'fixed/medium/fast-XII' },
			{ collectionType: 'fixed/small/slow-V-third' },
			{ collectionType: 'dynamic/slow-mpu' },
			{ collectionType: 'fixed/medium/fast-XI' },
			{ collectionType: 'fixed/small/slow-III' },
			{ collectionType: 'fixed/small/slow-V-mpu' },
			{ collectionType: 'fixed/small/slow-V-half' },
			{ collectionType: 'fixed/medium/slow-XII-mpu' },
			{ collectionType: 'fixed/small/fast-VIII' },
			{ collectionType: 'news/most-popular' },
		];

		const desktopAdPositions = getDesktopMpuAdPositions(testCollections);

		expect(desktopAdPositions).toEqual([3, 6, 9, 11]);
	});
});

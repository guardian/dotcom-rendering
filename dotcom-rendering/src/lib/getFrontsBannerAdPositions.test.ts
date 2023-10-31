import type { DCRCollectionType } from '../types/front';
import {
	getFrontsBannerAdPositions,
	getTaggedFrontsBannerAdPositions,
} from './getFrontsBannerAdPositions';

const defaultGrouped = {
	snap: [],
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
};

describe('Standard fronts fronts-banner ad slots', () => {
	// We used https://www.theguardian.com/uk as a blueprint
	const testCollections: Pick<
		DCRCollectionType,
		'collectionType' | 'containerPalette' | 'displayName' | 'grouped'
	>[] = [
		{
			collectionType: 'dynamic/package',
			containerPalette: 'EventPalette',
			displayName: 'Israel-Hamas war',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'dynamic/fast',
			containerPalette: undefined,
			displayName: 'Headlines',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/small/slow-V-mpu',
			containerPalette: undefined,
			displayName: 'News extra',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'dynamic/slow',
			containerPalette: undefined,
			displayName: 'Spotlight',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/thrasher',
			containerPalette: undefined,
			displayName: 'Morning Mail newsletter (web only)',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'dynamic/slow',
			containerPalette: undefined,
			displayName: 'Sport',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'dynamic/slow',
			containerPalette: undefined,
			displayName: 'Opinion',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/thrasher',
			containerPalette: undefined,
			displayName: 'Wordiply Thrasher',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/medium/slow-VI',
			containerPalette: undefined,
			displayName: 'Lifestyle',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/medium/slow-VII',
			containerPalette: undefined,
			displayName: 'Culture',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/thrasher',
			containerPalette: undefined,
			displayName: 'Guardian Labs',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'dynamic/fast',
			containerPalette: undefined,
			displayName: 'Across the country',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/small/slow-IV',
			containerPalette: undefined,
			displayName: 'The rural network',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'dynamic/fast',
			containerPalette: undefined,
			displayName: 'Around the world',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/thrasher',
			containerPalette: undefined,
			displayName: 'Contact the Guardian',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/video',
			containerPalette: undefined,
			displayName: 'Videos',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/medium/slow-VI',
			containerPalette: undefined,
			displayName: 'Multimedia',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/small/slow-IV',
			containerPalette: 'Branded',
			displayName: 'Guardian Labs',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/medium/slow-XII-mpu',
			containerPalette: undefined,
			displayName: 'Explore',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'fixed/small/slow-I',
			containerPalette: undefined,
			displayName: 'The big picture',
			grouped: defaultGrouped,
		},
		{
			collectionType: 'news/most-popular',
			containerPalette: undefined,
			displayName: 'Most viewed',
			grouped: defaultGrouped,
		},
	];

	it('calculates ad positions correctly', () => {
		const adPositions = getFrontsBannerAdPositions(testCollections, 'uk');

		expect(adPositions).toEqual([3, 6, 9, 12, 16, 19]);
	});

	it('does NOT insert ads above or below branded content', () => {
		const brandedTestCollections: Pick<
			DCRCollectionType,
			'collectionType' | 'containerPalette' | 'displayName' | 'grouped'
		>[] = [
			{
				collectionType: 'dynamic/fast',
				containerPalette: undefined,
				displayName: 'Headlines',
				grouped: defaultGrouped,
			},
			{
				collectionType: 'fixed/small/slow-IV',
				containerPalette: 'Branded',
				displayName: 'Guardian Labs',
				grouped: defaultGrouped,
			},
			{
				collectionType: 'dynamic/fast',
				containerPalette: undefined,
				displayName: 'Headlines',
				grouped: defaultGrouped,
			},
			{
				collectionType: 'fixed/small/slow-IV',
				containerPalette: 'Branded',
				displayName: 'Guardian Labs',
				grouped: defaultGrouped,
			},
			{
				collectionType: 'dynamic/fast',
				containerPalette: undefined,
				displayName: 'Headlines',
				grouped: defaultGrouped,
			},
			{
				collectionType: 'fixed/small/slow-IV',
				containerPalette: 'Branded',
				displayName: 'Guardian Labs',
				grouped: defaultGrouped,
			},
			{
				collectionType: 'dynamic/fast',
				containerPalette: undefined,
				displayName: 'Headlines',
				grouped: defaultGrouped,
			},
		];

		const adPositions = getFrontsBannerAdPositions(
			brandedTestCollections,
			'uk',
		);

		expect(adPositions).toEqual([]);
	});
});

describe.only('Tagged fronts fronts-banner ad slots', () => {
	it('should insert 0 ads if there are less than 5 containers', () => {
		expect(getTaggedFrontsBannerAdPositions(1)).toEqual([]);
		expect(getTaggedFrontsBannerAdPositions(3)).toEqual([]);
	});

	it('should insert 1 ad if there are 5-7 containers', () => {
		expect(getTaggedFrontsBannerAdPositions(4)).toEqual([2]);
		expect(getTaggedFrontsBannerAdPositions(6)).toEqual([2]);
	});

	it('should insert 2 ads if there are 8-10 containers', () => {
		expect(getTaggedFrontsBannerAdPositions(7)).toEqual([2, 5]);
		expect(getTaggedFrontsBannerAdPositions(9)).toEqual([2, 5]);
	});

	it('should insert no more than 6 ads if there are more than 18 containers', () => {
		expect(getTaggedFrontsBannerAdPositions(19)).toEqual([
			2, 5, 8, 11, 14, 17,
		]);
		expect(getTaggedFrontsBannerAdPositions(25)).toEqual([
			2, 5, 8, 11, 14, 17,
		]);
	});
});

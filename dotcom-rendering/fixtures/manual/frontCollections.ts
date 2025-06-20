import type { DCRCollectionType } from '../../src/types/front';
import { trails } from './trails';

const defaultGrouped = {
	snap: [],
	splash: [],
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
};

const defaultValues = {
	backfill: [],
	collectionType: 'fixed/small/slow-IV',
	config: {
		showDateHeader: false,
	},
	curated: [],
	displayName: 'Display name',
	id: 'container-id',
	treats: [],
	grouped: defaultGrouped,
} satisfies DCRCollectionType;

export const testCollectionsUk = [
	{
		...defaultValues,
		collectionType: 'dynamic/package',
		containerPalette: 'EventPalette',
		displayName: 'Israel-Hamas war',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/fast',
		displayName: 'Headlines',
		grouped: defaultGrouped,
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-IV',
		containerPalette: 'LongRunningAltPalette',
		displayName: 'Ukraine invasion',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-V-mpu',
		displayName: 'News extra',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/slow',
		displayName: 'Spotlight',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Morning Mail newsletter (web only)',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/slow',
		displayName: 'Sport',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/slow',
		displayName: 'Opinion',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Wordiply Thrasher',
	},
	{
		...defaultValues,
		collectionType: 'fixed/medium/slow-VI',
		displayName: 'Lifestyle',
	},
	{
		...defaultValues,
		collectionType: 'fixed/medium/slow-VII',
		displayName: 'Culture',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Guardian Labs',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/fast',
		displayName: 'Across the country',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-IV',
		displayName: 'The rural network',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/fast',
		displayName: 'Around the world',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Contact the Guardian',
	},
	{
		...defaultValues,
		collectionType: 'fixed/medium/slow-VI',
		displayName: 'Multimedia',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-IV',
		containerPalette: 'Branded',
		displayName: 'Guardian Labs',
	},
	{
		...defaultValues,
		collectionType: 'fixed/medium/slow-XII-mpu',
		displayName: 'Explore',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-I',
		displayName: 'The big picture',
	},
	{
		...defaultValues,
		collectionType: 'news/most-popular',
		displayName: 'Most viewed',
	},
] satisfies DCRCollectionType[];

export const testCollectionsWithSecondaryLevel = [
	...testCollectionsUk.slice(0, 3),
	{ ...defaultValues, containerLevel: 'Secondary' },
] satisfies DCRCollectionType[];

export const testCollectionsUs = [
	{
		...defaultValues,
		collectionType: 'dynamic/package',
		containerPalette: 'EventPalette',
		displayName: 'Israel-Hamas war',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/package',
		containerPalette: 'EventPalette',
		displayName: 'Israel-Hamas war',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/fast',
		displayName: 'Headlines',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-IV',
		displayName: 'In depth',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/slow',
		displayName: 'Spotlight',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-IV',
		containerPalette: 'LongRunningAltPalette',
		displayName: 'Ukraine invasion',
	},
	{
		...defaultValues,
		collectionType: 'fixed/medium/slow-VI',
		displayName: 'Opinion',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/slow',
		displayName: 'Sports',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Wordiply thrasher',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-IV',
		displayName: 'Climate crisis',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/fast',
		displayName: 'Across the country',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/fast',
		displayName: 'Around the world',
		grouped: {
			...defaultGrouped,
			veryBig: [trails[0]],
		},
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'First Thing email newsletter',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Documentaries',
	},
	{
		...defaultValues,
		collectionType: 'fixed/medium/slow-VI',
		displayName: 'Culture',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-IV',
		containerPalette: 'Branded',
		displayName: 'Business briefs',
	},
	{
		...defaultValues,
		collectionType: 'fixed/medium/slow-VI',
		displayName: 'Lifestyle',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-IV',
		displayName: 'Take part',
	},
	{
		...defaultValues,
		collectionType: 'fixed/medium/slow-VI',
		displayName: 'Explore',
	},
	{
		...defaultValues,
		collectionType: 'fixed/medium/slow-VI',
		displayName: 'In pictures',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Contact the Guardian',
	},
	{
		...defaultValues,
		collectionType: 'news/most-popular',
		displayName: 'Most viewed',
	},
] satisfies DCRCollectionType[];

export const brandedTestCollections = [
	{
		...defaultValues,
		collectionType: 'dynamic/fast',
		displayName: 'Headlines',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-IV',
		containerPalette: 'Branded',
		displayName: 'Guardian Labs',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/fast',
		displayName: 'Headlines',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-IV',
		containerPalette: 'Branded',
		displayName: 'Guardian Labs',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/fast',
		displayName: 'Headlines',
	},
	{
		...defaultValues,
		collectionType: 'fixed/small/slow-IV',
		containerPalette: 'Branded',
		displayName: 'Guardian Labs',
	},
	{
		...defaultValues,
		collectionType: 'dynamic/fast',
		displayName: 'Headlines',
	},
] satisfies DCRCollectionType[];

export const largeFlexibleGeneralCollection = [
	{
		...defaultValues,
		grouped: {
			...defaultGrouped,
			splash: [trails[0]],
			veryBig: [trails[1]],
			big: [trails[2]],
			standard: [trails[3], trails[4], trails[5], trails[6]],
		},
		collectionType: 'flexible/general',
		containerLevel: 'Primary',
	},
] satisfies DCRCollectionType[];

export const smallFlexibleGeneralCollection = [
	{
		...defaultValues,
		grouped: {
			...defaultGrouped,
			standard: [trails[0]],
		},
		collectionType: 'flexible/general',
		containerLevel: 'Primary',
	},
] satisfies DCRCollectionType[];

export const smallFlexibleSpecialCollection = [
	{
		...defaultValues,
		collectionType: 'flexible/special',
		containerLevel: 'Primary',
		grouped: {
			...defaultGrouped,
			standard: [trails[0]],
		},
	},
] satisfies DCRCollectionType[];

export const largeFlexibleSpecialCollection = [
	{
		...defaultValues,
		collectionType: 'flexible/special',
		containerLevel: 'Primary',
		grouped: {
			...defaultGrouped,
			snap: [trails[0]],
			standard: [trails[1], trails[2], trails[3], trails[4]],
		},
	},
] satisfies DCRCollectionType[];

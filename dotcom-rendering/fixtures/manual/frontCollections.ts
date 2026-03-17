import type { DCRCollectionType } from '../../src/types/front';
import { trails } from './trails';

const defaultGrouped = {
	snap: [],
	splash: [],
	standard: [],
};

const defaultValues = {
	backfill: [],
	collectionType: 'static/medium/4',
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
		collectionType: 'static/medium/4',
		containerPalette: 'EventPalette',
		displayName: 'Israel-Hamas war',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Headlines',
		grouped: defaultGrouped,
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		containerPalette: 'LongRunningAltPalette',
		displayName: 'Ukraine invasion',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		displayName: 'News extra',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Spotlight',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Morning Mail newsletter (web only)',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Sport',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Opinion',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Wordiply Thrasher',
	},
	{
		...defaultValues,
		collectionType: 'flexible/general',
		displayName: 'Lifestyle',
	},
	{
		...defaultValues,
		collectionType: 'flexible/general',
		displayName: 'Culture',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Guardian Labs',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Across the country',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		displayName: 'The rural network',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Around the world',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Contact the Guardian',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Videos',
	},
	{
		...defaultValues,
		collectionType: 'flexible/general',
		displayName: 'Multimedia',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		containerPalette: 'Branded',
		displayName: 'Guardian Labs',
	},
	{
		...defaultValues,
		collectionType: 'flexible/general',
		displayName: 'Explore',
	},
	{
		...defaultValues,
		collectionType: 'flexible/general',
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
		collectionType: 'static/medium/4',
		containerPalette: 'EventPalette',
		displayName: 'Israel-Hamas war',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		containerPalette: 'EventPalette',
		displayName: 'Israel-Hamas war',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Headlines',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		displayName: 'In depth',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Spotlight',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		containerPalette: 'LongRunningAltPalette',
		displayName: 'Ukraine invasion',
	},
	{
		...defaultValues,
		collectionType: 'flexible/general',
		displayName: 'Opinion',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Sports',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Wordiply thrasher',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		displayName: 'Climate crisis',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Across the country',
	},
	{
		...defaultValues,
		collectionType: 'flexible/special',
		displayName: 'Around the world',
		grouped: {
			...defaultGrouped,
			splash: [trails[0]],
			standard: [trails[1]],
		},
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'First Thing email newsletter',
	},
	{
		...defaultValues,
		collectionType: 'flexible/general',
		displayName: 'Podcasts',
	},
	{
		...defaultValues,
		collectionType: 'fixed/thrasher',
		displayName: 'Documentaries',
	},
	{
		...defaultValues,
		collectionType: 'flexible/general',
		displayName: 'Culture',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		containerPalette: 'Branded',
		displayName: 'Business briefs',
	},
	{
		...defaultValues,
		collectionType: 'flexible/general',
		displayName: 'Lifestyle',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		displayName: 'Take part',
	},
	{
		...defaultValues,
		collectionType: 'flexible/general',
		displayName: 'Explore',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Video',
	},
	{
		...defaultValues,
		collectionType: 'flexible/general',
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
		collectionType: 'scrollable/feature',
		displayName: 'Headlines',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		containerPalette: 'Branded',
		displayName: 'Guardian Labs',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Headlines',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		containerPalette: 'Branded',
		displayName: 'Guardian Labs',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Headlines',
	},
	{
		...defaultValues,
		collectionType: 'static/medium/4',
		containerPalette: 'Branded',
		displayName: 'Guardian Labs',
	},
	{
		...defaultValues,
		collectionType: 'scrollable/feature',
		displayName: 'Headlines',
	},
] satisfies DCRCollectionType[];

export const largeFlexibleGeneralCollection = [
	{
		...defaultValues,
		grouped: {
			...defaultGrouped,
			splash: [trails[0]],
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

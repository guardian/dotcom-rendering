import type { DCRCollectionType } from '../../src/types/front';
import { trails } from './trails';

const defaultGrouped = {
	snap: [],
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
};

const testCollectionsUk: Pick<
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
		collectionType: 'fixed/small/slow-IV',
		containerPalette: 'LongRunningAltPalette',
		displayName: 'Ukraine invasion',
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

const testCollectionsUs: Pick<
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
		collectionType: 'fixed/small/slow-IV',
		containerPalette: undefined,
		displayName: 'In depth',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'dynamic/slow',
		containerPalette: undefined,
		displayName: 'Spotlight',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/small/slow-IV',
		containerPalette: 'LongRunningAltPalette',
		displayName: 'Ukraine invasion',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/medium/slow-VI',
		containerPalette: undefined,
		displayName: 'Opinion',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'dynamic/slow',
		containerPalette: undefined,
		displayName: 'Sports',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/thrasher',
		containerPalette: undefined,
		displayName: 'Wordiply thrasher',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/small/slow-IV',
		containerPalette: undefined,
		displayName: 'Climate crisis',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'dynamic/fast',
		containerPalette: undefined,
		displayName: 'Across the country',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'dynamic/fast',
		containerPalette: undefined,
		displayName: 'Around the world',
		grouped: {
			...defaultGrouped,
			veryBig: [trails[0]],
		},
	},
	{
		collectionType: 'fixed/thrasher',
		containerPalette: undefined,
		displayName: 'First Thing email newsletter',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/medium/slow-VII',
		containerPalette: 'PodcastPalette',
		displayName: 'Podcasts',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/thrasher',
		containerPalette: undefined,
		displayName: 'Documentaries',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/medium/slow-VI',
		containerPalette: undefined,
		displayName: 'Culture',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/small/slow-IV',
		containerPalette: 'Branded',
		displayName: 'Business briefs',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/medium/slow-VI',
		containerPalette: undefined,
		displayName: 'Lifestyle',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/small/slow-IV',
		containerPalette: undefined,
		displayName: 'Take part',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/medium/slow-VI',
		containerPalette: undefined,
		displayName: 'Explore',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/video',
		containerPalette: undefined,
		displayName: 'Video',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/medium/slow-VI',
		containerPalette: undefined,
		displayName: 'In pictures',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'fixed/thrasher',
		containerPalette: undefined,
		displayName: 'Contact the Guardian',
		grouped: defaultGrouped,
	},
	{
		collectionType: 'news/most-popular',
		containerPalette: undefined,
		displayName: 'Most viewed',
		grouped: defaultGrouped,
	},
];

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

export { testCollectionsUk, testCollectionsUs, brandedTestCollections };

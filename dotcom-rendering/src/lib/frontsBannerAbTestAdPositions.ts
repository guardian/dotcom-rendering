/**
 * This file is temporary.
 *
 * For the Fronts banner AB test, we will target
 * specific collections on the page to insert ads above.
 *
 * When we go live with fronts-banner ads, there will be a setting in
 * the fronts config tool which will decide whether a section has an ad
 * inserted above it. At the time of this AB test, the setting does not yet exist.
 */

type FrontsBannerAdCollections = {
	[key: string]: string[];
};

export const networkFrontsBannerAdCollections: FrontsBannerAdCollections = {
	uk: [
		'Spotlight',
		'Opinion',
		"Women's World Cup 2023",
		'Sport',
		'Around the world',
		'Take part',
		'Explore',
		'In pictures',
	],
	us: [
		'Spotlight',
		'Opinion',
		'Sports',
		'Around the world',
		'Culture',
		'Take part',
		'In pictures',
	],
	au: [
		'Women’s World Cup 2023', // Apostrophe is intentionally U+2019 "’" instead of the more common ASCII character U+0060 "`",
		'Spotlight',
		'Opinion',
		'Culture',
		'Around the world',
		'The big picture',
	],
	international: [
		'Spotlight',
		'Opinion',
		'Sport',
		'Culture',
		'Around the world',
		'Take part',
	],
};

export const sectionFrontsBannerAdCollections: FrontsBannerAdCollections = {
	'uk/sport': [
		'News and features',
		// 'football', has football weekly thrasher above atm
		'Video',
		'Other sports',
	],
	football: [
		// multiline array
		'In depth',
		'Regulars',
		'Next generation',
	],
	'uk/culture': [
		// multiline array
		'News',
		'You may have missed',
	],
	'uk/lifeandstyle': [
		// multiline array
		'Fashion',
		'Health & wellbeing',
		'Money',
		'The big picture',
	],
	'uk/commentisfree': [
		'The Heat or Eat Diaries',
		'Why I quit',
		'The Guardian view',
		'You may have missed',
		'Cartoons',
		'Letters',
	],
	'uk-news': [
		// multiline array
		'UK politics',
		'Culture',
		'Society',
	],
	world: [
		// multiline array
		'Americas',
		'Australia',
		'Middle East',
		'UK',
	],
	'us-news': [
		// multiline array
		'Opinion',
		'US politics',
		'Video',
	],
	'uk/business': [
		// multiline array
		'Opinion & analysis',
		'Multimedia',
	],
	'australia-news': [
		// multiline array
		'Australian politics',
		'Video',
	],
};

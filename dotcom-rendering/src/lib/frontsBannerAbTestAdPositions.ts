/**
 * This file is temporary.
 *
 * For the Fronts banner AB test, we will target
 * specific sections on the page to insert ads above.
 *
 * When we go live with fronts-banner ads, there will be a setting in
 * the fronts config tool which will decide whether a section has an ad
 * inserted above it. At the time of this AB test, the setting does not yet exist.
 */

type FrontsBannerAdSections = {
	[key: string]: string[];
};

export const frontsBannerAdSections: FrontsBannerAdSections = {
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

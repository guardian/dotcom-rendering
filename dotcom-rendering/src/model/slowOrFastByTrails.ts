import type { FEFrontCard } from '../types/front';

const slowTags = [
	'type/cartoon',
	'type/gallery',
	'type/picture',
	'lifeandstyle/series/last-bites',
	'artanddesign/photography',
];

const frequencyThreshold = 0.8;

export const getSpeedFromTrails = (trails: FEFrontCard[]): 'slow' | 'fast' => {
	// <tag id, number of occurrences>
	const tagMap: Record<string, number> = {};

	trails.forEach((trail) => {
		const tags = trail.properties.maybeContent?.tags.tags;
		if (tags) {
			tags.forEach((tag) => {
				const existingItem = tagMap[tag.properties.id];
				if (existingItem !== undefined) {
					tagMap[tag.properties.id] = existingItem + 1;
				} else {
					tagMap[tag.properties.id] = 1;
				}
			});
		}
	});

	const matchingSlowTag = slowTags.find(
		(tag) => (tagMap[tag] ?? 0) > frequencyThreshold,
	);

	return matchingSlowTag !== undefined ? 'slow' : 'fast';
};

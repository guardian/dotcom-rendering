import type { FEFrontCard } from '../types/front';

/**
 * An 'arbitrary list of slow tags' once defined in Frontend.
 * If you have enough of one of these tags on a Tag page then your tag page is considered 'slow'
 *
 * The reasoning behind why it's these tags remains unclear, so I've written a small song
 * to help you come to terms this
 *
 * 🎶🎵🎶🎵🎶
 * And you may find yourself working on DCR
 * And you may find yourself looking at the tag page code
 * And you may ask yourself "What is the reason these tags are slow?"
 * And you may tell yourself "The reasoning must be documented somewhere"
 * And you may say to yourself "My god, why are there so many arbitrary rules?"
 *
 * Letting the trails go by, let the front speed hold me down...
 * 🎶🎵🎶🎵🎶
 */
const slowTags = [
	'type/cartoon',
	'type/gallery',
	'type/picture',
	'lifeandstyle/series/last-bites',
	'artanddesign/photography',
] as const;

const frequencyThreshold = 0.8;

export const getSpeedFromTrails = (trails: FEFrontCard[]): 'slow' | 'fast' => {
	// <tag id, number of occurrences>
	const tagMap = new Map<string, number>();

	for (const trail of trails) {
		const tags = trail.properties.maybeContent?.tags.tags;
		if (tags) {
			for (const tag of tags) {
				const count = tagMap.get(tag.properties.id) ?? 0;
				tagMap.set(tag.properties.id, count + 1);
			}
		}
	}

	const matchingSlowTag = slowTags.find(
		(tagId) =>
			(tagMap.get(tagId) ?? 0) / trails.length > frequencyThreshold,
	);

	return matchingSlowTag !== undefined ? 'slow' : 'fast';
};

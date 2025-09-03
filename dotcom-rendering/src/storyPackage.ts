import type { FEStoryPackage } from './frontend/feArticle';
import { decideTrail } from './lib/decideTrail';
import type { TrailType } from './types/trails';

export type StoryPackage = {
	heading: string;
	trails: TrailType[];
};

export const parse = (
	feStoryPackage: FEStoryPackage | undefined,
): StoryPackage | undefined => {
	if (feStoryPackage === undefined) {
		return undefined;
	}

	return {
		heading: feStoryPackage.heading,
		trails: feStoryPackage.trails.map(decideTrail),
	};
};

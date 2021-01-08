import { Design } from '@guardian/types/Format';

export const designTypes: Design[] = [
	Design.Article,
	Design.Media,
	Design.Review,
	Design.Analysis,
	Design.Comment,
	Design.Feature,
	Design.Live,
	Design.Recipe,
	Design.MatchReport,
	Design.Interview,
	Design.GuardianView,
	Design.Quiz,
	Design.AdvertisementFeature,
	Design.PhotoEssay,
];

// Return an object of all designTypes that uses the defaultVal
// Useful for extending overrides
export const designTypeDefault = (defaultVal: any) =>
	designTypes.reduce(
		(prev, curr) => ({ ...prev, [curr]: defaultVal }),
		{} as DesignTypesObj,
	);

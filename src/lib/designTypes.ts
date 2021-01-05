export const designTypes: DesignType[] = [
	'Article',
	'Media',
	'Review',
	'Analysis',
	'Comment',
	'Feature',
	'Live',
	'Recipe',
	'MatchReport',
	'Interview',
	'GuardianView',
	'Quiz',
	'AdvertisementFeature',
	'PhotoEssay',
];

// Return an object of all designTypes that uses the defaultVal
// Useful for extending overrides
export const designTypeDefault = (defaultVal: any) =>
	designTypes.reduce(
		(prev, curr) => ({ ...prev, [curr]: defaultVal }),
		{} as DesignTypesObj,
	);

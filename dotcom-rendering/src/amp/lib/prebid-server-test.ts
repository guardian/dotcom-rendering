// Variants for the Prebid server test
// Assign each variant 6 groups e.g. 50% of content types each
const variants = {
	'relevant-yield': new Set([0, 1, 4, 5, 6, 7]),
	pubmatic: new Set([2, 3, 8, 9, 10, 11]),
};

// Determine participation in a variant from group
export const isInVariant = (
	variantName: 'relevant-yield' | 'pubmatic',
	group: number | undefined,
) => group !== undefined && variants[variantName].has(group);

import { pillarNames } from '@root/src/lib/pillars';

export const findPillar: (name: string) => CAPIPillar | undefined = (name) => {
	const pillar: string = name.toLowerCase();
	// The pillar name is "arts" in CAPI, but "culture" everywhere else,
	// therefore we perform this substitution here.
	if (pillar === 'arts') {
		return 'culture';
	}
	// This is unlikely to happen but adding this guard here as we no longer
	// support the labs pillar
	if (pillar === 'labs') {
		return 'lifestyle';
	}
	return pillarNames.find((_) => _ === pillar);
};

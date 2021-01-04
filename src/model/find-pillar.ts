import { pillarNames } from '@root/src/lib/pillars';

export const findPillar: (
	name: string,
	tags?: TagType[],
) => CAPIPillar | undefined = (name, tags?) => {
	// Flag paid content for Labs pillar (for styling purposes)
	const isPaidContent = (tag: any) =>
		tag.type === 'Tone' && tag.id === 'tone/advertisement-features';

	if (tags && tags.some(isPaidContent)) {
		return 'labs';
	}

	const pillar: string = name.toLowerCase();
	// The pillar name is "arts" in CAPI, but "culture" everywhere else,
	// therefore we perform this substitution here.
	if (pillar === 'arts') {
		return 'culture';
	}
	return pillarNames.find((_) => _ === pillar);
};

import { Pillar, Special } from '@guardian/types';

export const findPillar: (
	name: string,
	tags?: TagType[],
) => Theme | undefined = (name, tags?) => {
	// Flag paid content for Labs pillar (for styling purposes)
	const isPaidContent = (tag: TagType) =>
		tag.type === 'Tone' && tag.id === 'tone/advertisement-features';

	if (tags && tags.some(isPaidContent)) {
		return Special.Labs;
	}

	const pillar: string = name.toLowerCase();

	switch (pillar) {
		// The pillar name is "arts" in CAPI, but "culture" everywhere else
		case 'arts':
		case 'culture':
			return Pillar.Culture;
		case 'opinion':
			return Pillar.Opinion;
		case 'news':
			return Pillar.News;
		case 'sport':
			return Pillar.Sport;
		case 'lifestyle':
			return Pillar.Lifestyle;
	}
};

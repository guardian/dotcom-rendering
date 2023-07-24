import { ArticleSpecial, Pillar } from '@guardian/libs';
import type { TagType } from '../types/tag';

export const findPillar: (
	name: string,
	tags?: TagType[],
) => ArticleTheme | undefined = (name, tags?) => {
	// Flag paid content for Labs pillar (for styling purposes)
	const hasPaidContent = !!tags?.some(
		({ type, id }) =>
			type === 'Tone' && id === 'tone/advertisement-features',
	);

	if (hasPaidContent) {
		return ArticleSpecial.Labs;
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
		default:
			return undefined;
	}
};

import { ArticlePillar, ArticleSpecial } from '@guardian/libs';

export const findPillar: (
	name: string,
	tags?: TagType[],
) => ArticleTheme | undefined = (name, tags?) => {
	// Flag paid content for Labs pillar (for styling purposes)
	const isPaidContent = (tag: TagType) =>
		tag.type === 'Tone' && tag.id === 'tone/advertisement-features';

	if (tags && tags.some(isPaidContent)) {
		return ArticleSpecial.Labs;
	}

	const pillar: string = name.toLowerCase();

	switch (pillar) {
		// The pillar name is "arts" in CAPI, but "culture" everywhere else
		case 'arts':
		case 'culture':
			return ArticlePillar.Culture;
		case 'opinion':
			return ArticlePillar.Opinion;
		case 'news':
			return ArticlePillar.News;
		case 'sport':
			return ArticlePillar.Sport;
		case 'lifestyle':
			return ArticlePillar.Lifestyle;
		default:
			return undefined;
	}
};

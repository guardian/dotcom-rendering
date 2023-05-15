import type { TagType } from '../types/tag';
import type { Pillar } from './extract-nav';

export const findPillar: (
	name: string,
	tags?: TagType[],
) => Pillar | undefined = (name, tags?) => {
	// Flag paid content for Labs pillar (for styling purposes)
	const hasPaidContent = !!tags?.some(
		({ type, id }) =>
			type === 'Tone' && id === 'tone/advertisement-features',
	);

	if (hasPaidContent) {
		return 'labs';
	}

	const pillar: string = name.toLowerCase();

	switch (pillar) {
		// The pillar name is "arts" in CAPI, but "culture" everywhere else
		case 'arts':
		case 'culture':
			return 'culture';
		case 'opinion':
			return 'opinion';
		case 'news':
			return 'news';
		case 'sport':
			return 'sport';
		case 'lifestyle':
			return 'lifestyle';
		default:
			return undefined;
	}
};

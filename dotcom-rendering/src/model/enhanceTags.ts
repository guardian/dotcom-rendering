import type { FETagType, TagType } from '../types/tag';

export const enhanceTags = (tags: FETagType[]): TagType[] =>
	tags.map((tag) => enhanceTag(tag));

const enhanceTag = ({ properties }: FETagType): TagType => {
	const {
		id,
		tagType: type,
		webTitle: title,
		twitterHandle,
		bylineImageUrl,
		contributorLargeImagePath: bylineLargeImageUrl,
	} = properties;

	return {
		id,
		type,
		title,
		twitterHandle,
		bylineImageUrl,
		bylineLargeImageUrl,
	};
};

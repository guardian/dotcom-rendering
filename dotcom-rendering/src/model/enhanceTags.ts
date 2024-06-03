import type { FETagType, TagType } from '../types/tag';

export const enhanceTags = (tags: FETagType[]): TagType[] =>
	tags.map((tag) => enhanceTag(tag));

const enhanceTag = ({ properties }: FETagType): TagType => {
	const {
		id,
		tagType,
		webTitle,
		twitterHandle,
		bylineImageUrl,
		contributorLargeImagePath,
	} = properties;

	return {
		id,
		type: tagType,
		title: webTitle,
		twitterHandle,
		bylineImageUrl,
		bylineLargeImageUrl: contributorLargeImagePath,
	};
};

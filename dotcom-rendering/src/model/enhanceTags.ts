import type { FETagType, TagType } from '../types/tag';

export const enhanceTags = (tags: FETagType[]): TagType[] => {
	return tags.map(({ properties }) => {
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
	});
};

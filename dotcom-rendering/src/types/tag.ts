/**
 * This type comes from `frontend`, hence the FE prefix.
 *
 * @see https://github.com/guardian/frontend/blob/5b987289/common/app/model/Tag.scala#L156-L179
 */
export type FETagType = {
	properties: {
		id: string;
		tagType: string;
		webTitle: string;
		/* bio is html */
		bio?: string;
		description?: string;
		bylineImageUrl?: string;
		bylineLargeImageUrl?: string;
		contributorLargeImagePath?: string;
		paidContentType?: string;
		sectionId?: string;
		sectionName?: string;
		twitterHandle?: string;
		url?: string;
		webUrl?: string;
	};
	pagination?: {
		currentPage: number;
		lastPage: number;
		totalContent: number;
	};
};

export type TagType = {
	id: string;
	type: string;
	title: string;
	twitterHandle?: string;
	paidContentType?: string;
	bylineImageUrl?: string;
	bylineLargeImageUrl?: string;
};

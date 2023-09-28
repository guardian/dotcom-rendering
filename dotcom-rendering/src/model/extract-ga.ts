// All GA fields should  fall back to default values -

import type { EditionId } from '../lib/edition';
import type { DCRArticle } from '../types/frontend';
import type { TagType } from '../types/tag';

const filterTags = (
	tags: DCRArticle['tags'],
	tagType: 'Contributor' | 'Keyword' | 'Tone' | 'Series', // Let’s make a decision to keep this tag getter small and well defined, we don't really want to use tags
): TagType['id'] | '' => {
	const tagArr = tags.filter((tag) => tag.type === tagType);
	const arrOfvalues =
		tagArr.length > 0 &&
		tagArr.reduce(
			(prev: Array<TagType['id']>, tag) => prev.concat(tag.id),
			[],
		);

	return (Array.isArray(arrOfvalues) && arrOfvalues.join(',')) || '';
};

// Annoyingly we ping GA with commissioningdesk as the title of the tag, not the id so handle that separately
const getCommissioningDesk = (
	tags: DCRArticle['tags'],
): TagType['title'] | '' => {
	const tag = tags.find((thisTag) =>
		thisTag.id.includes('tracking/commissioningdesk'),
	);
	return tag?.title ?? '';
};

const convertToLegacyPillar = (theme: FETheme): LegacyPillar => {
	switch (theme) {
		case 'NewsPillar':
			return 'news';
		case 'OpinionPillar':
			return 'opinion';
		case 'SportPillar':
			return 'sport';
		case 'CulturePillar':
			return 'culture';
		case 'LifestylePillar':
			return 'lifestyle';
		default:
			return 'news';
	}
};

const formatStringForGa = (string: string): string =>
	string.toLowerCase().split(' ').join('');

export interface GADataType {
	pillar: LegacyPillar;
	webTitle: string;
	section: string;
	contentType: string;
	commissioningDesks: string;
	contentId: string;
	authorIds: string;
	keywordIds: string;
	toneIds: string;
	seriesId: string;
	isHosted: string;
	edition: string;
	beaconUrl: string;
}

export const extractGA = ({
	webTitle,
	format,
	sectionName,
	contentType,
	tags,
	pageId,
	editionId,
	beaconURL,
}: {
	webTitle: string;
	format: FEFormat;
	sectionName?: string;
	contentType: string;
	tags: TagType[];
	pageId: string;
	editionId: EditionId;
	beaconURL: string;
}): GADataType => ({
	webTitle,
	pillar: convertToLegacyPillar(format.theme),
	section: sectionName ?? '',
	contentType: formatStringForGa(contentType),
	commissioningDesks: formatStringForGa(getCommissioningDesk(tags)),
	contentId: pageId,
	authorIds: filterTags(tags, 'Contributor'),
	keywordIds: filterTags(tags, 'Keyword'),
	toneIds: filterTags(tags, 'Tone'),
	seriesId: filterTags(tags, 'Series'),
	isHosted: 'false', // TODO - This is missing from the Frontend Data model
	edition: editionId.toLowerCase(),
	beaconUrl: beaconURL,
});

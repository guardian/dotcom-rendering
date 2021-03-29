// All GA fields should  fall back to default values -
import { findCAPIPillar } from './find-pillar';

const filterTags = (
	tags: CAPIType['tags'],
	tagType: 'Contributor' | 'Keyword' | 'Tone' | 'Series', // Lets make a decision to keep this tag getter small and well defined, we don't really want to use tags
): TagType['id'] | '' => {
	const tagArr = tags.filter((tag) => tag.type === tagType);
	const arrOfvalues =
		tagArr.length > 0 &&
		tagArr.reduce(
			(prev: Array<TagType['id']>, tag) => prev.concat(tag.id),
			[],
		);

	return (arrOfvalues && arrOfvalues.join(',')) || '';
};

// Annoyingly we ping GA with commissioningdesk as the title of the tag, not the id so handle that seprate
const getCommissioningDesk = (
	tags: CAPIType['tags'],
): TagType['title'] | '' => {
	const tag = tags.find((thisTag) =>
		thisTag.id.includes('tracking/commissioningdesk'),
	);
	return (tag && tag.title) || '';
};

const formatStringForGa = (string: string): string =>
	string.toLowerCase().split(' ').join('');

// we should not bring down the website if a trackable field is missing!
export const extract = (data: CAPIType): GADataType => ({
	webTitle: data.webTitle,
	pillar: findCAPIPillar(data.pillar) || 'news',
	section: data.sectionName || '',
	contentType: formatStringForGa(data.contentType),
	commissioningDesks: formatStringForGa(getCommissioningDesk(data.tags)),
	contentId: data.pageId,
	authorIds: filterTags(data.tags, 'Contributor'),
	keywordIds: filterTags(data.tags, 'Keyword'),
	toneIds: filterTags(data.tags, 'Tone'),
	seriesId: filterTags(data.tags, 'Series'),
	isHosted: 'false', // TODO - This is missing from the Frontend Data model
	edition: data.editionId.toLowerCase() as Edition,
	beaconUrl: data.beaconURL,
});

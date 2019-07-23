// All GA fields should  fall back to default values -
import { findPillar } from './find-pillar';

const getMultipleTags = (
    tags: CAPIType['tags'],
    tagTypeIs: 'Contributor' | 'Keyword' | 'Tone' | 'Series', // Lets make a decision to keep this tag getter small and well defined, we don't really want to use tags
): TagType['id'] | '' => {
    const tagArr = tags.filter(tag => tag.type === tagTypeIs);
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
    const tag = tags.find(thisTag =>
        thisTag.id.includes('tracking/commissioningdesk'),
    );
    return (tag && tag.title) || '';
};

// we should not bring down the website if a trackable field is missing!
export const extract = (data: CAPIType): GADataType => {
    return {
        webTitle: data.webTitle,
        pillar: findPillar(data.pillar) || 'news',
        section: data.sectionName || '',
        contentType: data.contentType
            .toLowerCase()
            .split(' ')
            .join(''),
        commissioningDesks: getCommissioningDesk(data.tags)
            .toLowerCase()
            .split(' ')
            .join('-'),
        contentId: data.pageId,
        authorIds: getMultipleTags(data.tags, 'Contributor'),
        keywordIds: getMultipleTags(data.tags, 'Keyword'),
        toneIds: getMultipleTags(data.tags, 'Tone'),
        seriesId: getMultipleTags(data.tags, 'Series'),
        isHosted: 'false', // TODO - This is missing from the Frontend Data model
        edition: data.editionId.toLowerCase() as EditionLower,
        beaconUrl: data.beaconURL,
    };
};

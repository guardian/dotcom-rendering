export const filterForTagsOfType = (
    tags: TagType[],
    tagType: string,
): TagType[] => {
    return tags.filter(
        tag =>
            tag.type === tagType ||
            (tag.type === 'PaidContent' && tag.paidContentType === tagType),
    );
};

export type StyledTone =
    | 'tone/advertisement-features'
    | 'tone/comment'
    | 'default-tone';

export const getToneType = (tags: TagType[]): StyledTone => {
    const defaultTone = 'default-tone';
    const tone = filterForTagsOfType(tags, 'Tone')[0];

    if (!tone) {
        return defaultTone;
    }

    switch (tone.id) {
        case 'tone/advertisement-features':
            return 'tone/advertisement-features';
        case 'tone/comment':
            return 'tone/comment';
        default:
            return defaultTone;
    }
};

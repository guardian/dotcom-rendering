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
    const tone: string = filterForTagsOfType(tags, 'Tone')[0].id;

    switch (tone) {
        case 'tone/advertisement-features':
            return 'tone/advertisement-features';
        case 'tone/comment':
            return 'tone/comment';
        default:
            return 'default-tone';
    }
};

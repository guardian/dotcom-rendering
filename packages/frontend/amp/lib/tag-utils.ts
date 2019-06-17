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
    const tones = filterForTagsOfType(tags, 'Tone').map(tone => tone.id);

    if (!tones) {
        return defaultTone;
    }

    switch (tones[0]) {
        case 'tone/advertisement-features':
            return tones[0] as StyledTone;
        case 'tone/comment':
            return tones[0] as StyledTone;
        case 'tone/editorials':
            return 'tone/comment'
        default:
            return defaultTone;
    }
};

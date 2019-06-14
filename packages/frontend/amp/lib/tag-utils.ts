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

    // Editorials have two tones - tone/editorials and tone/comment
    // We defer to tone/comment for styling
    if (tones.includes('tone/editorials')) {
        return 'tone/comment';
    }

    switch (tones[0]) {
        case 'tone/advertisement-features':
            return tones[0] as StyledTone;
        case 'tone/comment':
            return tones[0] as StyledTone;
        default:
            return defaultTone;
    }
};

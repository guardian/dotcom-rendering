export const selectBestImgFromWidth = (
    desiredWidth: number,
    inlineSrcSets: SrcSetItem[] | PosterImageType[],
): SrcSetItem | PosterImageType => {
    const sorted = inlineSrcSets.sort((a, b) => b.width - a.width);

    return sorted.reduce((best, current) => {
        if (current.width < best.width && current.width >= desiredWidth) {
            return current;
        }

        return best;
    });
};

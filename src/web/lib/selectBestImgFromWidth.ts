type imgObjectType = {
    width: number;
    [key: string]: any;
};

export const selectBestImgFromWidth = (
    desiredWidth: number,
    inlineSrcSets: imgObjectType[],
): imgObjectType => {
    const sorted = inlineSrcSets.sort(
        (a: imgObjectType, b: imgObjectType): number => b.width - a.width,
    );

    return sorted.reduce(
        (best: imgObjectType, current: imgObjectType): imgObjectType => {
            if (current.width < best.width && current.width >= desiredWidth) {
                return current;
            }

            return best;
        },
        inlineSrcSets[0],
    );
};

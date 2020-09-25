export const filterUnsafeBlockElements = (data: CAPIType): CAPIType => {
    const elements: CAPIElement[] = data.blocks[0].elements.reduce(
        (acc: CAPIElement[], cur: CAPIElement) => {
            if (
                cur._type ===
                    'model.dotcomrendering.pageElements.EmbedBlockElement' &&
                !cur.safe
            ) {
                acc.push({
                    html: cur.html,
                    _type:
                        'model.dotcomrendering.pageElements.UnsafeEmbedBlockElement',
                });
            } else {
                acc.push(cur);
            }
            return acc;
        },
        [],
    );

    return {
        ...data,
        blocks: [
            {
                ...data.blocks[0],
                elements,
            },
        ],
    };
};

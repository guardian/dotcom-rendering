const enhancedElement = (element: CAPIElement): CAPIElement => {
    return element;
};

export const enhanceCAPI = (data: any): CAPIType => {
    const enhancedBlocks = data.blocks.map((block: Block) => {
        return {
            ...block,
            elements: block.elements.map(element => enhancedElement(element)),
        };
    });

    return {
        ...data,
        blocks: enhancedBlocks,
    } as CAPIType;
};

const enhancedElement = (element: CAPIElement): CAPIElement => {
    switch (element._type) {
        case 'model.dotcomrendering.pageElements.TextBlockElement':
        case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
        case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
        case 'model.dotcomrendering.pageElements.ImageBlockElement':
        case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
        case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
        case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
        case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
        case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
        case 'model.dotcomrendering.pageElements.InstagramBlockElement':
        case 'model.dotcomrendering.pageElements.TweetBlockElement':
        case 'model.dotcomrendering.pageElements.CommentBlockElement':
        case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
        case 'model.dotcomrendering.pageElements.EmbedBlockElement':
        case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
        case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
        case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
        case 'model.dotcomrendering.pageElements.QABlockElement':
        case 'model.dotcomrendering.pageElements.GuideBlockElement':
        case 'model.dotcomrendering.pageElements.ProfileBlockElement':
        case 'model.dotcomrendering.pageElements.TimelineBlockElement':
        case 'model.dotcomrendering.pageElements.AtomEmbedMarkupBlockElement':
        case 'model.dotcomrendering.pageElements.AtomEmbedUrlBlockElement':
        case 'model.dotcomrendering.pageElements.MapBlockElement':
        case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
        case 'model.dotcomrendering.pageElements.ContentAtomBlockElement':
        case 'model.dotcomrendering.pageElements.AudioBlockElement':
        case 'model.dotcomrendering.pageElements.VideoBlockElement':
        case 'model.dotcomrendering.pageElements.CodeBlockElement':
        default:
            return element;
    }
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

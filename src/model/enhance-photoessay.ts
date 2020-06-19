import { JSDOM } from 'jsdom';

const extractCaption = (element: TextBlockElement): string | null => {
    // An essay caption: <ul><li><p>Caption text</p></li></ul>
    const frag = JSDOM.fragment(element.html);
    if (!frag || !frag.firstChild || !frag.firstElementChild) return null;
    const hasULwrapper = frag.firstChild.nodeName === 'UL';
    const containsLIandPtags = frag.firstElementChild.outerHTML.includes(
        '<li><p>',
    );
    if (hasULwrapper && containsLIandPtags) {
        // element is an essay caption
        return frag.textContent && frag.textContent.trim();
    }
    return null;
};

const extractTitle = (element: SubheadingBlockElement): string | null => {
    // An essay title: <h2>Title text</h2>
    const frag = JSDOM.fragment(element.html);
    if (!frag || !frag.firstChild) return null;
    const isH2tag = frag.firstChild.nodeName === 'H2';
    if (isH2tag) {
        // element is an essay title
        return frag.textContent && frag.textContent.trim();
    }
    return null;
};

const enhanceImages = (elements: CAPIElement[]): CAPIElement[] => {
    let imageBuffer: ImageBlockElement[] = [];
    const enhanced: CAPIElement[] = [];

    elements.forEach(element => {
        switch (element._type) {
            case 'model.dotcomrendering.pageElements.ImageBlockElement':
                imageBuffer.push({
                    ...element,
                    data: {
                        ...element.data,
                        caption: '',
                    },
                    displayCredit: false,
                });
                break;
            case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
                const title = extractTitle(element);
                console.log('title', title);
                if (imageBuffer.length === 1 && title) {
                    enhanced.push({
                        ...imageBuffer[0],
                        title,
                    });
                    imageBuffer = [];
                } else {
                    enhanced.push(element);
                }
                break;
            case 'model.dotcomrendering.pageElements.TextBlockElement':
                const caption = extractCaption(element);
                switch (imageBuffer.length) {
                    case 0:
                        enhanced.push(element);
                        break;
                    case 1:
                        if (caption) {
                            enhanced.push({
                                ...imageBuffer[0],
                                data: {
                                    ...imageBuffer[0].data,
                                    caption,
                                },
                            });
                        } else {
                            enhanced.push(imageBuffer[0], element);
                        }
                        imageBuffer = [];
                        break;
                    default: {
                        if (caption) {
                            enhanced.push({
                                _type:
                                    'model.dotcomrendering.pageElements.MultiImageBlockElement',
                                images: imageBuffer,
                                caption,
                            });

                            imageBuffer = [];
                        } else {
                            enhanced.push(element);
                        }
                        break;
                    }
                }
                break;
            default:
                if (imageBuffer.length === 1) {
                    // There was no caption found but we still an image in the buffer
                    enhanced.push(imageBuffer[0]);
                } else if (imageBuffer.length > 1) {
                    // There was no caption found but we still have multiple images
                    enhanced.push({
                        _type:
                            'model.dotcomrendering.pageElements.MultiImageBlockElement',
                        images: imageBuffer,
                    });
                }
                imageBuffer = [];
                enhanced.push(element);
        }
    });
    return enhanced;
};

export const enhancePhotoEssay = (data: CAPIType): CAPIType => {
    // Exit immediately if not a photo essay
    if (!data.config.isPhotoEssay) return data;

    const enhancedBlocks = data.blocks.map((block: Block) => {
        return {
            ...block,
            elements: enhanceImages(block.elements),
        };
    });

    return {
        ...data,
        designType: 'PhotoEssay',
        blocks: enhancedBlocks,
    } as CAPIType;
};

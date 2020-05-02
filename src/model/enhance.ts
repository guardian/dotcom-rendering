import { JSDOM } from 'jsdom';

const TEXT = 'model.dotcomrendering.pageElements.TextBlockElement';
const SUBHEADING = 'model.dotcomrendering.pageElements.SubheadingBlockElement';

const isDropCapFlag = (element: SubheadingBlockElement): boolean => {
    const frag = JSDOM.fragment(element.html);
    if (!frag || !frag.firstChild) return false;
    return frag.firstChild.nodeName === 'H2' && frag.textContent === '* * *';
};

const enhanceElements = (elements: CAPIElement[]): CAPIElement[] => {
    let lastElementWasDropCapFlag = false;

    const enhanced: CAPIElement[] = [];
    elements.forEach(element => {
        if (element._type === TEXT && lastElementWasDropCapFlag) {
            // The previous element was the drop cap * * * flag so set the
            // dropCap property on this, the next, element to true
            element.dropCap = true;
            enhanced.push(element);
            lastElementWasDropCapFlag = false;
        } else if (element._type === SUBHEADING && isDropCapFlag(element)) {
            // This element is the * * * drop cap flag so just set our variable
            // and don't include this element in the enhanced array
            lastElementWasDropCapFlag = true;
        } else {
            // Otherwise pass it though
            enhanced.push(element);
            // We also reset this flag here just to be sure
            lastElementWasDropCapFlag = false;
        }
    });
    return enhanced;
};

export const enhanceCAPI = (data: any): CAPIType => {
    const enhancedBlocks = data.blocks.map((block: Block) => {
        return {
            ...block,
            elements: enhanceElements(block.elements),
        };
    });

    return {
        ...data,
        blocks: enhancedBlocks,
    } as CAPIType;
};

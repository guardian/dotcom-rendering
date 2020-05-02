import { JSDOM } from 'jsdom';

const TEXT = 'model.dotcomrendering.pageElements.TextBlockElement';
const SUBHEADING = 'model.dotcomrendering.pageElements.SubheadingBlockElement';

const isDropCapFlag = (element: SubheadingBlockElement): boolean => {
    // A drop cap flag: <h2><strong>* * *</strong></h2>
    const frag = JSDOM.fragment(element.html);
    if (!frag || !frag.firstChild) return false;
    return frag.firstChild.nodeName === 'H2' && frag.textContent === '* * *';
};

const enhanceElements = (elements: CAPIElement[]): CAPIElement[] => {
    // enhanceElements loops the array of article elements making 'enhancements' (read hacks)
    // to allow us to support the data model coming out of CAPI. Similar logic exists in frontend
    // here: https://github.com/guardian/frontend/blob/08b3732d113c28c5165ab2ce8e9b7b52909da336/common/app/views/support/HtmlCleaner.scala
    // TODO: Take these changes and push them up the stack so that we don't need to make logic
    // overrides in the rendering tier.
    //
    // The current list of enhancements are:
    //
    // 1. Drop Cap
    //    If a h2 tag containing * * * is found, then the proceeding element should be givin drop
    //    cap styling (so long as it's a text element).
    //
    let dropCapFlagSeen = false;

    const enhanced: CAPIElement[] = [];
    elements.forEach(element => {
        if (element._type === TEXT && dropCapFlagSeen) {
            // The previous element was the drop cap * * * flag so set the
            // dropCap property to true on this, the next, element
            element.dropCap = true;
            enhanced.push(element);
            dropCapFlagSeen = false;
        } else if (element._type === SUBHEADING && isDropCapFlag(element)) {
            // This element is the * * * drop cap flag so just set our variable
            // and don't include this element in the enhanced array, removing it
            dropCapFlagSeen = true;
        } else {
            // Otherwise pass this element though unchanged
            enhanced.push(element);
            // We also reset this flag here just in case the next element wasn't text
            dropCapFlagSeen = false;
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

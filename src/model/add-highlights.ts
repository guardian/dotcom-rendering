import { JSDOM } from 'jsdom';

const isHighlight = (element: BlockquoteBlockElement): boolean => {
    // A highlight blockquote: <blockquote><p>Blah</p></blockquote>
    // A quoted blockquote: <blockquote class="quoted"><p>Blah</p></blockquote>
    console.log(element.html)
    const frag = JSDOM.fragment(element.html);
    if (!frag) return false; // Not anything
    const isQuoted = !!frag.querySelector('.quoted');
    if (isQuoted) return false; // This blockquote is a quote
    return true; // This blockquote is not a quote, so it's a highlight
};

const checkForHighlights = (elements: CAPIElement[]): CAPIElement[] => {
    // checkForHighlights loops the array of article elements looking for
    // BlockquoteBlockElements. If the element has the class "quoted" it
    // is left as a BlockquoteBlockElement but if not then it is transformed
    // into a HighlightBlockElement
    const enhanced: CAPIElement[] = [];
    elements.forEach((element, i) => {
        switch (element._type) {
            case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
                if (isHighlight(element)) {
                    enhanced.push({
                        _type: 'model.dotcomrendering.pageElements.HighlightBlockElement',
                        html: element.html,
                    });
                } else {
                    enhanced.push(element);
                }
                break;
            default:
                enhanced.push(element);
        }
    });
    return enhanced;
};

export const addHighlights = (data: CAPIType): CAPIType => {
    const enhancedBlocks = data.blocks.map((block: Block) => {
        return {
            ...block,
            elements: checkForHighlights(block.elements),
        };
    });

    return {
        ...data,
        blocks: enhancedBlocks,
    } as CAPIType;
};

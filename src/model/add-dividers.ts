import { JSDOM } from 'jsdom';

const isDividerFlag = (element: CAPIElement): boolean => {
    // A star flag: <h2><strong>* * *</strong></h2>
    if (
        element._type !==
        'model.dotcomrendering.pageElements.SubheadingBlockElement'
    )
        return false;
    const frag = JSDOM.fragment(element.html);
    if (!frag || !frag.firstChild) return false;
    return frag.firstChild.nodeName === 'H2' && frag.textContent === '* * *';
};

const isSubheading = (element: CAPIElement): boolean => {
    return (
        element._type ===
        'model.dotcomrendering.pageElements.SubheadingBlockElement'
    );
};

const prevElementWasDropCapFlag = (
    elements: CAPIElement[],
    i: number,
): boolean => {
    return isSubheading(elements[i - 1]) && isDividerFlag(elements[i - 1]);
};

const checkForDividers = (elements: CAPIElement[]): CAPIElement[] => {
    // checkForDividers loops the array of article elements looking for star flags and
    // enhancing the data accordingly. In short, if a h2 tag is equal to * * * then we
    // insert a divider and any the text element immediately aftwards should have dropCap
    // set to true
    const enhanced: CAPIElement[] = [];
    elements.forEach((element, i) => {
        switch (element._type) {
            case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
                if (isDividerFlag(element)) {
                    enhanced.push({
                        _type:
                            'model.dotcomrendering.pageElements.DividerBlockElement',
                    });
                } else {
                    enhanced.push(element);
                }
                break;
            case 'model.dotcomrendering.pageElements.TextBlockElement':
                // Always pass first element through
                if (i === 0) enhanced.push(element);
                else if (prevElementWasDropCapFlag(elements, i))
                    enhanced.push({
                        ...element,
                        dropCap: true,
                    });
                else enhanced.push(element);
                break;
            default:
                enhanced.push(element);
        }
    });
    return enhanced;
};

export const addDividers = (data: CAPIType): CAPIType => {
    const enhancedBlocks = data.blocks.map((block: Block) => {
        return {
            ...block,
            elements: checkForDividers(block.elements),
        };
    });

    return {
        ...data,
        blocks: enhancedBlocks,
    } as CAPIType;
};

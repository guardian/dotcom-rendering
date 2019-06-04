/**
 * Find ad slots
 *
 * Returns a list of indexes *after* which ads should be directly
 * placed.
 *
 * Ads are placed:
 *
 * * sufficiently far from other ads (MIN_CHAR_BUFFER characters away)
 * * sufficiently far from non-text (p) elements (IMG_BUFFER_[FWD|BWD])
 * * non adjacent to small (SMALL_PARA_CHARS) paragraphs
 *
 * These tests apply forwards and backwards, though in the case of
 * non-text buffers, the values differ.
 *
 * Where the above tests are met, we say there is adequate 'buffer'
 * around the ad and it can be placed.
 */

interface ElementWithLength {
    element: CAPIElement;
    length: number;
}

export const AD_LIMIT = 8;
export const SMALL_PARA_CHARS = 50;
export const MIN_CHAR_BUFFER = 700;
const IMG_BUFFER_FWD = 300; // really any non-p element type
const IMG_BUFFER_BWD = 200;

const isTextElement = (e: CAPIElement): boolean => {
    return e._type === 'model.dotcomrendering.pageElements.TextBlockElement';
};

const getElementLength = (element: CAPIElement): number => {
    switch (element._type) {
        case 'model.dotcomrendering.pageElements.TextBlockElement':
            return element.html.length;
        default:
            return 0; // for the purposes of ads we don't care how long other elements are
    }
};

const getElementsWithLength = (
    elements: CAPIElement[],
): ElementWithLength[] => {
    return elements.map(e => {
        return {
            element: e,
            length: getElementLength(e),
        };
    });
};

const getLengthOfFollowingTextElements = (
    elements: ElementWithLength[],
): number => {
    const firstNonTextIndex = elements.findIndex(
        e => !isTextElement(e.element),
    );
    return elements
        .slice(0, firstNonTextIndex)
        .map(e => e.length)
        .reduce((a, b) => a + b, 0);
};

const suitableAdNeighbour = (e: ElementWithLength): boolean => {
    return isTextElement(e.element) && e.length > SMALL_PARA_CHARS;
};

const hasForwardBuffer = (
    elements: ElementWithLength[],
    index: number,
): boolean => {
    const forwardElements = elements.slice(-1 * index);
    const meetsThreshold =
        getLengthOfFollowingTextElements(forwardElements) >= IMG_BUFFER_FWD;
    const noForwardsEmbeds =
        forwardElements.filter(e => isTextElement(e.element)).length ===
        forwardElements.length;

    const enoughCharsForward = meetsThreshold || noForwardsEmbeds;

    const neighbourSuitable = elements[index + 1]
        ? suitableAdNeighbour(elements[index + 1])
        : false;
    return enoughCharsForward && neighbourSuitable;
};

const hasBackwardBuffer = (
    elements: ElementWithLength[],
    index: number,
    textSinceLastAd: number,
): boolean => {
    const backwardsElements = elements.slice(0, index + 1).reverse();
    const meetsThreshold =
        getLengthOfFollowingTextElements(backwardsElements) >= IMG_BUFFER_BWD;
    const noBackwardsEmbeds =
        backwardsElements.filter(e => isTextElement(e.element)).length ===
        backwardsElements.length;

    const enoughCharsBackward = meetsThreshold || noBackwardsEmbeds;

    return (
        suitableAdNeighbour(elements[index]) &&
        textSinceLastAd >= MIN_CHAR_BUFFER &&
        enoughCharsBackward
    );
};

const hasSpaceForAd = (
    elements: ElementWithLength[],
    index: number,
    charsScannedSinceLastAd: number,
): boolean => {
    return (
        hasBackwardBuffer(elements, index, charsScannedSinceLastAd) &&
        hasForwardBuffer(elements, index)
    );
};

// Returns index of items to place ads *after*
export const findAdSlots = (elements: CAPIElement[]): number[] => {
    let charsScannedSinceLastAd = 0;
    const adSlots = [];
    let adCount = 0;

    const elementsWithLength = getElementsWithLength(elements);

    for (let i = 0; i < elementsWithLength.length; i = i + 1) {
        if (adCount < AD_LIMIT && isTextElement(elements[i])) {
            charsScannedSinceLastAd += elementsWithLength[i].length;

            if (hasSpaceForAd(elementsWithLength, i, charsScannedSinceLastAd)) {
                adSlots.push(i);
                charsScannedSinceLastAd = 0;
                adCount += 1;
            }
        }
    }
    return adSlots;
};

// Returns index of items to place ads *after*
export const findBlockAdSlots = (blocks: any[]): number[] => {
    const maxAds = 8;

    // Place slots every five elements, but not at the beginning. Limit to
    // maxAds.
    return blocks
        .map((_, i) => i)
        .filter(i => i !== 0 && i % 5 === 0)
        .map(i => i - 1)
        .slice(0, maxAds);
};

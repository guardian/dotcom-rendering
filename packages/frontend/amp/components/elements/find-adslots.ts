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

const AD_LIMIT = 8;
const SMALL_PARA_CHARS = 50;
const MIN_CHAR_BUFFER = 700;
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

const getLengthOfFollowingTextElements = (elements: CAPIElement[]): number => {
    const firstNonTextIndex = elements.findIndex(e => !isTextElement(e));
    return elements
        .slice(0, firstNonTextIndex)
        .map(getElementLength)
        .reduce((a, b) => a + b, 0);
};

const suitableAdNeighbour = (e: CAPIElement): boolean => {
    return isTextElement(e) && getElementLength(e) > SMALL_PARA_CHARS;
};

const hasForwardBuffer = (elements: CAPIElement[], index: number): boolean => {
    const forwardElements = elements.slice(-1 * index);
    const meetsThreshold =
        getLengthOfFollowingTextElements(forwardElements) >= IMG_BUFFER_FWD;
    const noForwardsEmbeds =
        forwardElements.filter(isTextElement).length === forwardElements.length;

    const enoughCharsForward = meetsThreshold || noForwardsEmbeds;

    const neighbourSuitable = elements[index + 1]
        ? suitableAdNeighbour(elements[index + 1])
        : false;
    return enoughCharsForward && neighbourSuitable;
};

const hasBackwardBuffer = (
    elements: CAPIElement[],
    index: number,
    textSinceLastAd: number,
): boolean => {
    const backwardsElements = elements.slice(0, index).reverse();
    const meetsThreshold =
        getLengthOfFollowingTextElements(backwardsElements) >= IMG_BUFFER_BWD;
    const noBackwardsEmbeds =
        backwardsElements.filter(isTextElement).length ===
        backwardsElements.length;

    const enoughCharsBackward = meetsThreshold || noBackwardsEmbeds;

    return (
        suitableAdNeighbour(elements[index]) &&
        textSinceLastAd >= MIN_CHAR_BUFFER &&
        enoughCharsBackward
    );
};

export const findAdSlots = (elements: CAPIElement[]): number[] => {
    let charsScannedSinceLastAd = 0;
    const adSlots = [];
    let adCount = 0;

    for (let i = 0; i < elements.length; i = i + 1) {
        if (adCount < AD_LIMIT) {
            if (isTextElement(elements[i])) {
                charsScannedSinceLastAd += getElementLength(elements[i]);

                if (
                    hasBackwardBuffer(elements, i, charsScannedSinceLastAd) &&
                    hasForwardBuffer(elements, i)
                ) {
                    adSlots.push(i);
                    charsScannedSinceLastAd = 0;
                    adCount += 1;
                }
            }
        }
    }
    return adSlots;
};

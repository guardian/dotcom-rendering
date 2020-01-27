export const hasShowcase = (elements: CAPIElement[]) => {
    function isShowcase(element: CAPIElement) {
        switch (element._type) {
            case 'model.dotcomrendering.pageElements.ImageBlockElement':
                return element.role === 'showcase';
            default:
                return false;
        }
    }

    // Return true is any element in the array is an ImageBlockElement
    // with the 'showcase' role
    return elements.find(isShowcase);
};

export const decideLineEffect = (
    designType: DesignType,
    pillar: Pillar,
): LineEffectType => {
    if (designType === 'Comment') {
        return 'straight';
    }
    if (designType === 'Feature') {
        return 'squiggly';
    }
    if (pillar === 'sport') {
        return 'dotted';
    }
    return 'straight';
};

export const decideLineCount = (designType?: DesignType): 8 | 4 => {
    if (designType === 'Comment') {
        return 8;
    }
    return 4;
};

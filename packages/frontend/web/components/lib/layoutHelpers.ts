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

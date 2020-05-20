// ----- Imports ----- //

import { JSDOM } from 'jsdom';

import { parseImage, Image } from 'image';
import {
    IBlockElement as BlockElement,
    ElementType,
    AssetType,
} from 'mapiThriftModels';
import { None } from 'types/option';


// ----- Mocks ----- //

const imageData = {
    caption: 'Caption',
    credit: 'Credit',
    displayCredit: true,
};

const imageBlock: BlockElement = {
    type: ElementType.IMAGE,
    assets: [{
        type: AssetType.IMAGE,
        file: 'http://gu.com/url',
        typeData: {
            isMaster: true,
            width: 5,
            height: 5,
        },
    }],
    imageTypeData: imageData,
}

const image: Image = {
    src: '',
    srcset: '',
    alt: new None(),
    width: 0,
    height: 0,
    caption: new None(),
    credit: new None(),
    nativeCaption: new None(),
    role: new None(),
}


// ----- Tests ----- //

describe('image', () => {
    test('includes credit when displayCredit is true', () => {
        const parsed = parseImage({
            docParser: JSDOM.fragment,
            salt: 'mockSalt',
        })(imageBlock);

        expect(parsed.withDefault(image).credit.withDefault('')).toBe('Credit');
    });

    test('does not include credit when displayCredit is false', () => {
        const parsed = parseImage({
            docParser: JSDOM.fragment,
            salt: 'mockSalt',
        })({
            ...imageBlock,
            imageTypeData: {
                ...imageData,
                displayCredit: false,
            }
        });

        expect(parsed.withDefault(image).credit.withDefault('')).toBe('');
    });
});

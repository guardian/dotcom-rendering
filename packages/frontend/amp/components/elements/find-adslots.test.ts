import {
    findAdSlots,
    AD_LIMIT,
    SMALL_PARA_CHARS,
    MIN_CHAR_BUFFER,
} from './find-adslots';

describe('ampadslots', () => {
    describe('findAdSlots', () => {
        const getTextBlockElement = (length: number): TextBlockElement => {
            return {
                _type: 'model.dotcomrendering.pageElements.TextBlockElement',
                html: `${'.'.repeat(length)}`,
            };
        };

        const imageBlockElement: ImageBlockElement = {
            _type: 'model.dotcomrendering.pageElements.ImageBlockElement',
            media: { allImages: [] },
            data: { alt: 'img', credit: 'nobody' },
            imageSources: [],
            displayCredit: false,
            role: 'lol',
        };
        const tenCharTextBlock = getTextBlockElement(10);
        const fiveHundredCharTextBlock = getTextBlockElement(500);

        it('should have these values for ad spacing (or tests other than this one need updating)', () => {
            expect(AD_LIMIT).toEqual(8);
            expect(SMALL_PARA_CHARS).toEqual(50);
            expect(MIN_CHAR_BUFFER).toEqual(700);
        });

        it('adds an advert after 700 chars', () => {
            const data: CAPIElement[] = [
                {
                    _type:
                        'model.dotcomrendering.pageElements.TextBlockElement',
                    html: `Mr and Mrs Dursley of number 4 privet drive were proud to say${'.'.repeat(
                        700,
                    )}`,
                },
                {
                    _type:
                        'model.dotcomrendering.pageElements.TextBlockElement',
                    html: `that they were perfectly normal${'.'.repeat(700)}`,
                },
            ];

            expect(findAdSlots(data)).toEqual([0]);
        });

        it('does not add an advert after 699 chars', () => {
            const data = [getTextBlockElement(699), getTextBlockElement(700)];

            expect(findAdSlots(data)).toEqual([]);
        });

        it('should not add more than 8 adverts', () => {
            const data = Array(30).fill(fiveHundredCharTextBlock, 0, 30);

            expect(findAdSlots(data).length).toEqual(8);
        });

        it('should not break up small paragraphs with ads', () => {
            const data = Array(50).fill(tenCharTextBlock, 0, 50);

            expect(findAdSlots(data).length).toEqual(0);
        });

        it('should not put an advert directly before a non text element', () => {
            const data = [
                getTextBlockElement(700),
                getTextBlockElement(29),
                imageBlockElement,
            ];
            expect(findAdSlots(data).length).toEqual(0);
        });

        it('should not put an advert directly after a non text element', () => {
            const data = [
                getTextBlockElement(700),
                imageBlockElement,
                getTextBlockElement(29),
            ];
            expect(findAdSlots(data).length).toEqual(0);
        });

        it('should place an advert sufficiently far away from a non text element', () => {
            const data = [
                getTextBlockElement(700),
                imageBlockElement,
                getTextBlockElement(200),
                getTextBlockElement(200),
            ];

            expect(findAdSlots(data).length).toEqual(1);
        });
    });
});

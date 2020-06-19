import { enhancePhotoEssay } from './enhance-photoessay';
import { bodyJSON } from './exampleBodyJSON';
import { exampleImage } from '../../fixtures/exampleImage';

const article = JSON.parse(bodyJSON);
const photoEssay = {
    ...article,
    config: {
        ...article.config,
        isPhotoEssay: true,
    },
};

describe('Enhance Photo Essays', () => {
    it('simplay passes through the same object if not a photo essay', () => {
        // example.designType does not equal 'PhotoEssay'
        expect(enhancePhotoEssay(article)).toBe(article); // We created a new object
        expect(enhancePhotoEssay(article)).toEqual(article); // The new object is what we expect
    });

    it('creates a multi image element and sets the caption', () => {
        const input = {
            ...photoEssay,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2>Example text</h2>',
                        },
                        exampleImage,
                        exampleImage,
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html:
                                '<ul> \n <li><p>Judy, just sitting in the square on her own in Walworth.</p></li> \n</ul>',
                        },
                    ],
                },
            ],
        };

        const expectedOutput = {
            ...photoEssay,
            designType: 'PhotoEssay',
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2>Example text</h2>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.MultiImageBlockElement',
                            images: [exampleImage, exampleImage],
                            caption:
                                'Judy, just sitting in the square on her own in Walworth.',
                        },
                    ],
                },
            ],
        };

        expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
    });

    it('does not use a multi block element for a single image', () => {
        const input = {
            ...photoEssay,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2>Example text</h2>',
                        },
                        exampleImage,
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html:
                                '<ul> \n <li><p>Judy, just sitting in the square on her own in Walworth.</p></li> \n</ul>',
                        },
                    ],
                },
            ],
        };

        const expectedOutput = {
            ...photoEssay,
            designType: 'PhotoEssay',
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2>Example text</h2>',
                        },
                        exampleImage,
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html:
                                '<ul> \n <li><p>Judy, just sitting in the square on her own in Walworth.</p></li> \n</ul>',
                        },
                    ],
                },
            ],
        };

        expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
    });

    it('sets the title prop for the previous image  when a h2 caption is found', () => {
        const input = {
            ...photoEssay,
            blocks: [
                {
                    elements: [
                        exampleImage,
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2>Example text</h2>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>Just some normal text</p>',
                        },
                    ],
                },
            ],
        };

        const expectedOutput = {
            ...photoEssay,
            designType: 'PhotoEssay',
            blocks: [
                {
                    elements: [
                        {
                            ...exampleImage,
                            // fancy title goes here
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>Just some normal text</p>',
                        },
                    ],
                },
            ],
        };

        expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
    });
});

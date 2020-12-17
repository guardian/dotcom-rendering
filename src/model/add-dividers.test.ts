import { addDividers } from './add-dividers';
import { bodyJSON } from './exampleBodyJSON';

const example = JSON.parse(bodyJSON);

describe('Drop Caps', () => {
    it('creates an identical but new object when no changes are needed', () => {
        expect(addDividers(example)).not.toBe(example); // We created a new object
        expect(addDividers(example)).toEqual(example); // The new object is what we expect
    });

    it('sets the divider flag correctly', () => {
        const input = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2><strong>* * *</strong></h2>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should become a drop cap.</p>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should NOT become a drop cap.</p>',
                        },
                    ],
                },
            ],
        };

        const expectedOutput = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.DividerBlockElement',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            dropCap: true,
                            html: '<p>I should become a drop cap.</p>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should NOT become a drop cap.</p>',
                        },
                    ],
                },
            ],
        };

        expect(addDividers(input)).toEqual(expectedOutput);
    });

    it('handles multiple divider flags', () => {
        const input = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2><strong>* * *</strong></h2>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should become a drop cap.</p>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2><strong>* * *</strong></h2>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should also become a drop cap.</p>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should NOT become a drop cap.</p>',
                        },
                    ],
                },
            ],
        };

        const expectedOutput = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.DividerBlockElement',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            dropCap: true,
                            html: '<p>I should become a drop cap.</p>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.DividerBlockElement',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            dropCap: true,
                            html: '<p>I should also become a drop cap.</p>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should NOT become a drop cap.</p>',
                        },
                    ],
                },
            ],
        };

        expect(addDividers(input)).toEqual(expectedOutput);
    });

    it('handles divider flags being put before elements that are not text', () => {
        const input = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2><strong>* * *</strong></h2>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.InstagramBlockElement',
                            html: '',
                            url: '',
                            hasCaption: false,
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should NOT become a drop cap.</p>',
                        },
                    ],
                },
            ],
        };

        const expectedOutput = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.DividerBlockElement',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.InstagramBlockElement',
                            html: '',
                            url: '',
                            hasCaption: false,
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should NOT become a drop cap.</p>',
                        },
                    ],
                },
            ],
        };

        expect(addDividers(input)).toEqual(expectedOutput);
    });

    it('handles multiple divider flags in sequence', () => {
        const input = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should NOT become a drop cap.</p>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2><strong>* * *</strong></h2>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2><strong>* * *</strong></h2>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.SubheadingBlockElement',
                            html: '<h2><strong>* * *</strong></h2>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should become a drop cap.</p>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should NOT become a drop cap.</p>',
                        },
                    ],
                },
            ],
        };

        const expectedOutput = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should NOT become a drop cap.</p>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.DividerBlockElement',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.DividerBlockElement',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.DividerBlockElement',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            dropCap: true,
                            html: '<p>I should become a drop cap.</p>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should NOT become a drop cap.</p>',
                        },
                    ],
                },
            ],
        };

        expect(addDividers(input)).toEqual(expectedOutput);
    });
});

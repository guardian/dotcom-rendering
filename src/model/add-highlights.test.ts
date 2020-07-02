import { addHighlights } from './add-highlights';
import { bodyJSON } from './exampleBodyJSON';

const example = JSON.parse(bodyJSON);

describe('Drop Caps', () => {
    it('creates an identical but new object when no changes are needed', () => {
        expect(addHighlights(example)).not.toBe(example); // We created a new object
        expect(addHighlights(example)).toEqual(example); // The new object is what we expect
    });

    it('creates highlight elements as expected', () => {
        const input = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.BlockquoteBlockElement',
                            html:
                                '<blockquote>This is not a quote</blockquote>',
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
                                'model.dotcomrendering.pageElements.HighlightBlockElement',
                            html:
                                '<blockquote>This is not a quote</blockquote>',
                        },
                    ],
                },
            ],
        };

        expect(addHighlights(input)).toEqual(expectedOutput);
    });

    it('creates passes through quotes as expected', () => {
        const input = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.BlockquoteBlockElement',
                            html:
                                '<blockquote class="quoted">This is a quote</blockquote>',
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
                                'model.dotcomrendering.pageElements.BlockquoteBlockElement',
                            html:
                                '<blockquote class="quoted">This is a quote</blockquote>',
                        },
                    ],
                },
            ],
        };

        expect(addHighlights(input)).toEqual(expectedOutput);
    });

    it('ignores blockquotes with other classnames, still creating highlight elements', () => {
        const input = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.BlockquoteBlockElement',
                            html:
                                '<blockquote class="somethingelse">This is not a quote</blockquote>',
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
                                'model.dotcomrendering.pageElements.HighlightBlockElement',
                            html:
                                '<blockquote class="somethingelse">This is not a quote</blockquote>',
                        },
                    ],
                },
            ],
        };

        expect(addHighlights(input)).toEqual(expectedOutput);
    });

    it('handles both highlights and blockquotes in the same array', () => {
        const input = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            _type:
                                'model.dotcomrendering.pageElements.BlockquoteBlockElement',
                            html:
                                '<blockquote class="quoted">This is a quote</blockquote>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.BlockquoteBlockElement',
                            html:
                                '<blockquote>This is not a quote</blockquote>',
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
                                'model.dotcomrendering.pageElements.BlockquoteBlockElement',
                            html:
                                '<blockquote class="quoted">This is a quote</blockquote>',
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.HighlightBlockElement',
                            html:
                                '<blockquote>This is not a quote</blockquote>',
                        },
                    ],
                },
            ],
        };

        expect(addHighlights(input)).toEqual(expectedOutput);
    });
});

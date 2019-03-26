import { extract as extractLinkedData } from '@frontend/model/extract-linked-data';

describe('linked data', () => {
    it('extracts data from page.linkedData', () => {
        const input = {
            page: {
                meta: {
                    linkedData: [
                        {
                            '@type': 'NewsArticle',
                        },
                    ],
                },
            },
        };
        const output = extractLinkedData(input);

        expect(output).toEqual([
            {
                '@type': 'NewsArticle',
            },
        ]);
    });

    it('returns empty object if it cannot find data from page.linkedData', () => {
        const invalidInput = {
            config: {},
        };

        expect(extractLinkedData(invalidInput)).toEqual([]);
    });
});

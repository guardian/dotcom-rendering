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


});

import { extract as extractLinkedData } from '@frontend/model/extract-linked-data';

describe('linked data', () => {
    it('extracts data from config.page.linkedData', () => {
        const input = {
            config: {
                page: {
                    linkedData: {
                        '@type': 'NewsArticle',
                    },
                },
            },
        };
        const output = extractLinkedData(input);

        expect(output).toEqual({
            '@type': 'NewsArticle',
        });
    });
});

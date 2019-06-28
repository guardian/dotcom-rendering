import cloneDeep from 'lodash.clonedeep';
import { data as fixtureData } from '@root/fixtures/article';

import { validateRequestData } from '@frontend/model/validate';
describe('JSON SCHEMA validation of linkedData', () => {
    let testData: any;
    let validatedData: any;
    beforeEach(() => {
        testData = cloneDeep(fixtureData);
        validatedData = undefined;
    });
    afterAll(() => {
        validatedData = undefined;
    });
    it('validates Articles with undefined page.linkedData by defaulting to []', () => {
        testData.page.meta.linkedData = undefined;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.meta.linkedData).toEqual([]);
    });
});

describe('JSON SCHEMA validation of GoogleAnalytics GA', () => {
    let testData: any;
    let validatedData: any;
    beforeEach(() => {
        testData = cloneDeep(fixtureData);
        validatedData = undefined;
    });
    afterAll(() => {
        validatedData = undefined;
    });
    it('validates Articles with missing webTitle by defaulting to empty string', () => {
        testData.page.webTitle = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.webTitle).toEqual('');
    });
    it('validates Articles with missing section by defaulting to empty string', () => {
        testData.page.section = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.section).toEqual('');
    });
    // TODO Conflicts with CAPI requirement to throw
    // it('validates Articles with missing contentType by defaulting to empty string', () => {
    //     testData.page.contentType = null;
    //     expect(() => {
    //         validatedData = validateRequestData(testData, '');
    //     }).not.toThrow();
    //     expect(validatedData.page.contentType).toEqual('');
    // });
    it('validates Articles with missing tags.commissioningDesks by defaulting to empty string', () => {
        testData.page.tags.commissioningDesks = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.tags.commissioningDesks).toEqual('');
    });
    it('validates Articles with missing tags.authorIds by defaulting to empty string', () => {
        testData.page.tags.authorIds = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.tags.authorIds).toEqual('');
    });
    it('validates Articles with missing tags.keywordIds by defaulting to empty string', () => {
        testData.page.tags.keywordIds = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.tags.keywordIds).toEqual('');
    });
    it('validates Articles with missing tags.toneIds by defaulting to empty string', () => {
        testData.page.tags.toneIds = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.tags.toneIds).toEqual('');
    });
    it('validates Articles with missing contentId by defaulting to empty string', () => {
        testData.page.contentId = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.contentId).toEqual('');
    });
    it('validates Articles with missing seriesId by defaulting to empty string', () => {
        testData.page.seriesId = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.seriesId).toEqual('');
    });
    it('validates Articles with missing edition by defaulting to empty string', () => {
        testData.page.edition = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.edition).toEqual('');
    });
    it('validates Articles with missing site.beaconUrl by defaulting to empty string', () => {
        testData.site.beaconUrl = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.site.beaconUrl).toEqual('');
    });
    it('validates Articles with missing meta.isHosted value by defaulting to false', () => {
        testData.page.meta.isHosted = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.meta.isHosted).toEqual(false);
    });
});

describe('JSON SCHEMA validation of config', () => {
    let testData: any;
    let validatedData: any;
    beforeEach(() => {
        testData = cloneDeep(fixtureData);
        validatedData = undefined;
    });
    afterAll(() => {
        validatedData = undefined;
    });
    it('throws error if site.ajaxUrl unavailable', () => {
        testData.site.ajaxUrl = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).toThrow();
    });
    it('throws error if site.commercialUrl unavailable', () => {
        testData.site.commercialUrl = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).toThrow();
    });
    it('validates Articles with missing site.sentryPublicApiKey value by defaulting to empty string', () => {
        testData.site.sentryPublicApiKey = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.site.sentryPublicApiKey).toEqual('');
    });
    it('validates Articles with missing site.sentryHost value by defaulting to empty string', () => {
        testData.site.sentryHost = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.site.sentryHost).toEqual('');
    });
});

describe('JSON SCHEMA validation of CAPI', () => {
    let testData: any;
    let validatedData: any;
    beforeEach(() => {
        testData = cloneDeep(fixtureData);
        validatedData = undefined;
    });
    it('throws error if webPublicationDate unavailable', () => {
        testData.page.webPublicationDate = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).toThrow();
    });
    it('throws error if tags missing id', () => {
        testData.page.tags.all = [
            {
                properties: {
                    tagType: 'Keyword',
                    webTitle: 'Ticket prices',
                },
            },
        ];
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).toThrow();
    });
    it('throws error if tags missing tagType', () => {
        testData.page.tags.all = [
            {
                properties: {
                    id: 'Keyword',
                    webTitle: 'Ticket prices',
                },
            },
        ];
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).toThrow();
    });
    it('throws error if content.headline unavailable', () => {
        testData.page.content.headline = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).toThrow();
    });
    it('throws error if pageId unavailable', () => {
        testData.page.pageId = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).toThrow();
    });
    it('throws error if contentType unavailable', () => {
        testData.page.contentType = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).toThrow();
    });
    it('validates Articles with missing edition by defaulting to empty string', () => {
        testData.page.edition = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.edition).toEqual('');
    });
    it('validates Articles with missing content.standfirst by defaulting to empty string', () => {
        testData.page.content.standfirst = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.content.standfirst).toEqual('');
    });
    it('validates Articles with missing content.main by defaulting to empty string', () => {
        testData.page.content.main = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.content.main).toEqual('');
    });
});

describe('JSON SCHEMA validation of edge cases', () => {
    let testData: any;
    let validatedData: any;
    beforeEach(() => {
        testData = cloneDeep(fixtureData);
        validatedData = undefined;
    });

    // Edge Cases
    it('validates Articles with undefined pillar by defaulting to empty string', () => {
        testData.page.pillar = undefined;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.pillar).toEqual('');
    });
    it('validates Articles with empty string pillar', () => {
        testData.page.pillar = '';
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.pillar).toEqual('');
    });
    it('validates Articles with undefined pagination', () => {
        testData.page.pagination = undefined;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.paginational).toBe(undefined);
    });

    // Removed articles or 'Corrections and Clarifications'
    it('validates Articles with missing page.content.blocks.main', () => {
        testData.page.content.blocks.main = undefined;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
    });
});

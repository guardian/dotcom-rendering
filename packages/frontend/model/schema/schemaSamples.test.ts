// tslint:disable-next-line:no-var-requires
const glob = require('glob');
// tslint:disable-next-line:no-var-requires
const fs = require('fs');
import cloneDeep from 'lodash.clonedeep';
import { data as fixtureData } from '@root/fixtures/article';
// JSON Schema validation layer
import { validateRequestData } from '@frontend/model/validate';
// NEW extraction functions without validation
import { extract as extractCAPI } from '@frontend/model/extract-capi';
import { extract as extractConfig } from '@frontend/model/extract-config';
import { extract as extractLinkedData } from '@frontend/model/extract-linked-data';
import { extract as extractGA } from '@frontend/model/extract-ga';
//  OLD data cleaner and extraction functions
import { extract as oldExtractCAPI } from '@frontend/model/old-extract/extract-capi';
import { extract as oldExtractConfig } from '@frontend/model/old-extract/extract-config';
import { extract as oldExtractLinkedData } from '@frontend/model/old-extract/extract-linked-data';
import { extract as oldExtractGA } from '@frontend/model/old-extract/extract-ga';

const validateNew = (data: any) => {
    let validatedBody;
    try {
        validatedBody = validateRequestData(data, '/AMPArticle');
    } catch (err) {
        return err;
    }

    const CAPI = extractCAPI(validatedBody);
    const linkedData = extractLinkedData(validatedBody);
    const config = extractConfig(validatedBody);
    const ga = extractGA(validatedBody); // WEB ONLY

    return {
        CAPI,
        linkedData,
        config,
        ga,
    };
};

const validateOld = (data: any) => {
    const CAPI = oldExtractCAPI(data);
    const linkedData = oldExtractLinkedData(data);
    const config = oldExtractConfig(data);
    const ga = oldExtractGA(data); // WEB ONLY

    return {
        CAPI,
        linkedData,
        config,
        ga,
    };
};

const runTest = (samples: string[]) => {
    let count = 0;
    const rootIndex = __dirname.split('/').indexOf('dotcom-rendering');
    const root = __dirname
        .split('/')
        .slice(0, rootIndex + 1)
        .join('/');

    const results = samples.map((sample: string) => {
        count = count + 1;
        const path = `${root}/${sample}`;
        const sampleJson = JSON.parse(fs.readFileSync(path, 'utf-8'));
        const name = sample.split('/').slice(3);
        try {
            const newRes = validateNew(sampleJson);
            const oldRes = validateOld(sampleJson);
            return [count, name, { error: null, new: newRes, old: oldRes }];
        } catch (error) {
            return [count, name, { error, new: null, old: null }];
        }
    });
    return results;
};

describe('JSON SCHEMA validation layer sample comparison test', () => {
    //  NOTE: Run scripts / validation / sampleCollection.js to collect json samples for testing
    const files = glob.sync('scripts/validation/samples/*.json', {});
    if (files.length > 1) {
        const results = runTest(files);

        it.each(results)(
            `test %i of ${files.length}, %s`,
            (count, name, sample) => {
                !!sample.error
                    ? expect(sample.error).toEqual(null)
                    : expect(sample.new).toMatchObject(sample.old);
            },
        );
    }
});

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
    it('validates Articles with missing contentType by defaulting to empty string', () => {
        testData.page.contentType = null;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.contentType).toEqual('');
    });
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
            validatedData = validateRequestData(testData, ''); // TODO can schema default to news?
        }).not.toThrow();
        expect(validatedData.site.sentryPublicApiKey).toEqual('');
    });

    it('validates Articles with missing site.sentryHost value by defaulting to empty string', () => {
        testData.site.sentryHost = null;
        expect(() => {
            validatedData = validateRequestData(testData, ''); // TODO can schema default to news?
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
            validatedData = validateRequestData(testData, ''); // TODO can schema default to news?
        }).not.toThrow();
        expect(validatedData.page.edition).toEqual('');
    });
    it('validates Articles with missing content.standfirst by defaulting to empty string', () => {
        testData.page.content.standfirst = null;
        expect(() => {
            validatedData = validateRequestData(testData, ''); // TODO can schema default to news?
        }).not.toThrow();
        expect(validatedData.page.content.standfirst).toEqual('');
    });
    it('validates Articles with missing content.main by defaulting to empty string', () => {
        testData.page.content.main = null;
        expect(() => {
            validatedData = validateRequestData(testData, ''); // TODO can schema default to news?
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
    it('should validate Articles with undefined pillar by defaulting to empty string', () => {
        testData.page.pillar = undefined;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.pillar).toEqual('');
    });

    it('should validate Articles with empty string pillar', () => {
        testData.page.pillar = undefined;
        expect(() => {
            validatedData = validateRequestData(testData, ''); // TODO can schema default to news?
        }).not.toThrow();
        expect(validatedData.page.pillar).toEqual('');
    });

    // it('Should validate Articles with undefined pagination)
    // it('Should validate Liveblogs with defined pagination)
});

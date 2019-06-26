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
    // NOTE: Run scripts/validation/sampleCollection.js to collect json samples for testing
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

    let testData: any;
    let validatedData: any;
    beforeEach(() => {
        testData = cloneDeep(fixtureData);
        validatedData = undefined;
    });

    // // Linked Data
    it('should validate Articles with undefined page.linkedData by defaulting to []', () => {
        testData.page.meta.linkedData = undefined;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.meta.linkedData).toEqual([]);
    });
    it('should validate Articles with undefined pillar by defaulting to ""', () => {
        testData.page.pillar = undefined;
        expect(() => {
            validatedData = validateRequestData(testData, '');
        }).not.toThrow();
        expect(validatedData.page.pillar).toEqual('');
    });

    it('should validate Articles with "" pillar', () => {
        testData.page.pillar = undefined;
        expect(() => {
            validatedData = validateRequestData(testData, ''); // TODO can schema default to news?
        }).not.toThrow();
        expect(validatedData.page.pillar).toEqual('');
    });

    // it('Should validate Articles with undefined pagination)
    // it('Should validate Liveblogs with defined pagination)
});

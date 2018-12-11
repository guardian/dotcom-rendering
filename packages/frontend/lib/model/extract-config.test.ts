import cloneDeep from 'lodash.clonedeep';
import { extract } from './extract-config';
import { data } from '@root/fixtures/article';

describe('extract-config', () => {
    let testData: any;

    beforeEach(() => {
        testData = cloneDeep(data);
    });

    it('returns ajaxUrl if available', () => {
        const testAjaxUrl = 'https://fetchMeSomething.com';

        testData.config.page.ajaxUrl = testAjaxUrl;

        const { ajaxUrl } = extract(testData);

        expect(ajaxUrl).toBe(testAjaxUrl);
    });

    it('throws error if ajaxUrl unavailable', () => {
        testData.config.page.ajaxUrl = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });
});

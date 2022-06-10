import { getCountryName, getLocalCurrencySymbol, addRegionIdToSupportUrl } from './geolocation';

describe('getLocalCurrencySymbol', () => {
    const currencySymbolTests = [
        { input: undefined, output: '£' },
        { input: 'XX', output: '$' },
        { input: 'FR', output: '€' },
        { input: 'NZ', output: 'NZ$' },
    ];

    currencySymbolTests.forEach(({ input, output }) => {
        it(`returns ${output}, given ${input}`, () => {
            expect(getLocalCurrencySymbol(input)).toEqual(output);
        });
    });
});

describe('getCountryName', () => {
    const countryNameTests = [
        { input: 'GB', output: 'the UK' },
        { input: 'CZ', output: 'the Czech Republic' },
        { input: undefined, output: undefined },
        { input: 'XX', output: undefined },
    ];

    countryNameTests.forEach(({ input, output }) => {
        it(`returns ${output}, given ${input}`, () => {
            expect(getCountryName(input)).toEqual(output);
        });
    });
});

describe('addRegionIdToSupportUrl', () => {
    const originalUrl = 'https://support.theguardian.com/contribute';
    it('should modify the URL to include UK if country code is GB', () => {
        const countryCode = 'GB';
        const modifiedUrl = addRegionIdToSupportUrl(originalUrl, countryCode);
        expect(modifiedUrl).toEqual('https://support.theguardian.com/uk/contribute');
    });

    it('should modify the URL to include EU if country code is PT', () => {
        const countryCode = 'PT';
        const modifiedUrl = addRegionIdToSupportUrl(originalUrl, countryCode);
        expect(modifiedUrl).toEqual('https://support.theguardian.com/eu/contribute');
    });

    it('should modify the URL to include INT if country code is unknown', () => {
        const countryCode = 'asdasd';
        const modifiedUrl = addRegionIdToSupportUrl(originalUrl, countryCode);
        expect(modifiedUrl).toEqual('https://support.theguardian.com/int/contribute');
    });

    it('should not modify the URL if country code is missing', () => {
        const countryCode = undefined;
        const modifiedUrl = addRegionIdToSupportUrl(originalUrl, countryCode);
        expect(modifiedUrl).toEqual('https://support.theguardian.com/contribute');
    });

    it('should not modify the URL if it does not follow the expected pattern', () => {
        const countryCode = 'GB';
        const nonconformingUrl = 'https://www.theguardian.com/uk';
        const modifiedUrl = addRegionIdToSupportUrl(nonconformingUrl, countryCode);
        expect(modifiedUrl).toEqual(nonconformingUrl);
    });
});

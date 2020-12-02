import { hasRequiredConsents, canShowPreChecks } from './BrazeBanner';

const brazeVendorId = '5ed8c49c4b8ce4571c7ad801';

let mockOnConsentChangeResult: any;
jest.mock('@guardian/consent-management-platform', () => ({
    onConsentChange: (callback: any) => {
        callback(mockOnConsentChangeResult);
    },
    getConsentFor: jest.requireActual('@guardian/consent-management-platform')
        .getConsentFor,
}));

afterEach(() => {
    mockOnConsentChangeResult = undefined;
});

describe('hasRequiredConsents', () => {
    describe('when the user is covered by tcfv2 and consent is given', () => {
        it('returns a promise which resolves with true', async () => {
            mockOnConsentChangeResult = {
                tcfv2: {
                    vendorConsents: {
                        [brazeVendorId]: true,
                    },
                },
            };
            await expect(hasRequiredConsents()).resolves.toBe(true);
        });
    });

    describe('when the user is covered by tcfv2 and consent is not given', () => {
        it('returns a promise which resolves with false', async () => {
            mockOnConsentChangeResult = {
                tcfv2: {
                    vendorConsents: {
                        [brazeVendorId]: false,
                    },
                },
            };

            await expect(hasRequiredConsents()).resolves.toBe(false);
        });
    });

    describe('when the user is covered by ccpa and consent is given', () => {
        it('returns a promise which resolves with true', async () => {
            mockOnConsentChangeResult = {
                ccpa: {
                    doNotSell: false,
                },
            };

            await expect(hasRequiredConsents()).resolves.toBe(true);
        });
    });

    describe('when the user is covered by ccpa and consent is not given', () => {
        it('returns a promise which resolves with false', async () => {
            mockOnConsentChangeResult = {
                ccpa: {
                    doNotSell: true,
                },
            };

            await expect(hasRequiredConsents()).resolves.toBe(false);
        });
    });

    describe('when the user is covered by aus and consent is given', () => {
        it('returns a promise which resolves with true', async () => {
            mockOnConsentChangeResult = {
                aus: {
                    personalisedAdvertising: true,
                },
            };

            await expect(hasRequiredConsents()).resolves.toBe(true);
        });
    });

    describe('when the user is covered by aus and consent is not given', () => {
        it('returns a promise which resolves with false', async () => {
            mockOnConsentChangeResult = {
                aus: {
                    personalisedAdvertising: false,
                },
            };

            await expect(hasRequiredConsents()).resolves.toBe(false);
        });
    });
});

describe('canShowPreChecks', () => {
    describe('when the switch is off', () => {
        it('returns false', () => {
            const result = canShowPreChecks({
                brazeSwitch: false,
                apiKey: 'abcde',
                isDigitalSubscriber: true,
                pageConfig: { isPaidContent: false },
            });

            expect(result).toBe(false);
        });
    });

    describe('when the api key is empty', () => {
        it('returns false', () => {
            const result = canShowPreChecks({
                brazeSwitch: true,
                apiKey: '',
                isDigitalSubscriber: true,
                pageConfig: { isPaidContent: false },
            });

            expect(result).toBe(false);
        });
    });

    describe('when not a digital subscriber', () => {
        it('returns false', () => {
            const result = canShowPreChecks({
                brazeSwitch: true,
                apiKey: 'abcde',
                isDigitalSubscriber: false,
                pageConfig: { isPaidContent: false },
            });

            expect(result).toBe(false);
        });
    });

    describe('when viewing paid content', () => {
        it('returns false', () => {
            const result = canShowPreChecks({
                brazeSwitch: true,
                apiKey: 'abcde',
                isDigitalSubscriber: true,
                pageConfig: { isPaidContent: true },
            });

            expect(result).toBe(false);
        });
    });

    describe('when all checks pass', () => {
        it('returns true', () => {
            const result = canShowPreChecks({
                brazeSwitch: true,
                apiKey: 'abcde',
                isDigitalSubscriber: true,
                pageConfig: { isPaidContent: false },
            });

            expect(result).toBe(true);
        });
    });
});

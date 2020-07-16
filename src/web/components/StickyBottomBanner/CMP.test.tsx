import { cmp } from '@guardian/consent-management-platform';

jest.mock('@guardian/consent-management-platform', () => ({
    cmp: {
        showPrivacyManager: jest.fn(),
    },
}));

describe('CMP', () => {
    it('It should render the Sourcepoint CMP', async () => {
        // TODO: implement test
        cmp.showPrivacyManager();
        expect(true).toBeTruthy();
    });
});

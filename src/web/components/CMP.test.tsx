import React from 'react';
import { render } from '@testing-library/react';
import { shouldShow as shouldShow_ } from '@guardian/consent-management-platform';
import { ConsentManagementPlatform as ConsentManagementPlatform_ } from '@guardian/consent-management-platform/lib/ConsentManagementPlatform';
import { CMP } from './CMP';

const shouldShow: any = shouldShow_;
const ConsentManagementPlatform: any = ConsentManagementPlatform_;
const globalAny: any = global;

jest.mock('@guardian/consent-management-platform', () => ({
    shouldShow: jest.fn(),
}));

jest.mock(
    '@guardian/consent-management-platform/lib/ConsentManagementPlatform',
);

describe('CMP', () => {
    beforeAll(() => {
        ConsentManagementPlatform.mockImplementation(() => ({
            render: () => {
                return <div />;
            },
        }));
    });

    beforeEach(() => {
        shouldShow.mockReset();
        globalAny.guardian = {
            app: {
                data: {
                    CAPI: {
                        config: {
                            switches: {
                                cmpUi: true,
                            },
                        },
                    },
                },
            },
        };
    });

    afterEach(() => {
        delete globalAny.guardian;
    });

    it('It should render null if shouldShow returns false', () => {
        shouldShow.mockImplementation(() => false);

        const { container } = render(<CMP />);

        expect(container.firstChild).toBeNull();
    });

    it('It should not render null if shouldShow returns true', () => {
        shouldShow.mockImplementation(() => true);

        const { container } = render(<CMP />);

        expect(container.firstChild).not.toBeNull();
    });
});

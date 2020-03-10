import React from 'react';
import { render } from '@testing-library/react';
import { shouldShow as shouldShow_ } from '@guardian/consent-management-platform';
import { ConsentManagementPlatform as ConsentManagementPlatform_ } from '@guardian/consent-management-platform/lib/ConsentManagementPlatform';

import { CMP } from './CMP';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shouldShow: any = shouldShow_;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ConsentManagementPlatform: any = ConsentManagementPlatform_;

jest.mock('@guardian/consent-management-platform', () => ({
    shouldShow: jest.fn(),
    setErrorHandler: jest.fn(),
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
    });

    it('It should render null if shouldShow returns false', () => {
        shouldShow.mockImplementation(() => false);

        const { container } = render(<CMP cmpUi={true} />);

        expect(container.firstChild).toBeNull();
    });

    it('It should render null if shouldShow ireturns true but cmpUi switch is false', () => {
        shouldShow.mockImplementation(() => true);

        const { container } = render(<CMP cmpUi={false} />);

        expect(container.firstChild).toBeNull();
    });

    it('It should not render null if shouldShow returns true', () => {
        shouldShow.mockImplementation(() => true);

        const { container } = render(<CMP cmpUi={true} />);

        expect(container.firstChild).not.toBeNull();
    });
});

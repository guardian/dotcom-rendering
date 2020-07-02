import React from 'react';
import { render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { ConsentManagementPlatform as ConsentManagementPlatform_ } from '@guardian/consent-management-platform/dist/ConsentManagementPlatform';

import { CMP } from './CMP';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ConsentManagementPlatform: any = ConsentManagementPlatform_;

jest.mock('@guardian/consent-management-platform', () => ({
    setErrorHandler: jest.fn(),
}));

jest.mock(
    '@guardian/consent-management-platform/dist/ConsentManagementPlatform',
);

describe('CMP', () => {
    beforeAll(() => {
        ConsentManagementPlatform.mockImplementation(() => ({
            render: () => {
                return <div />;
            },
        }));
        // stub window.performace as it is not defined on Node
        Object.defineProperty(window, 'performance', {
            value: {
                mark: () => {},
                measure: () => {},
                getEntriesByName: () => {},
            },
        });
    });

    it('It should render the CMP', async () => {
        const { container } = render(<CMP />);

        await waitFor(() =>
            expect(container.firstChild).toBeInstanceOf(HTMLDivElement),
        );
    });
});

import React from 'react';
import { render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';

import { cmp } from '@guardian/consent-management-platform';
import { shouldUseSourcepointCmp as shouldUseSourcepointCmp_ } from '@root/src/web/lib/sourcepoint';
import { CMP } from './CMP';

const shouldUseSourcepointCmp: any = shouldUseSourcepointCmp_;
jest.mock('@guardian/consent-management-platform', () => ({
    cmp: {
        showPrivacyManager: jest.fn(),
    },
    oldCmp: {
        ConsentManagementPlatform: jest.fn(() => ({
            render: () => {
                return <div />;
            },
        })),
        setErrorHandler: jest.fn(),
    },
}));

jest.mock('@root/src/web/lib/sourcepoint', () => ({
    shouldUseSourcepointCmp: jest.fn(),
}));

describe('CMP', () => {
    beforeAll(() => {
        // stub window.performace as it is not defined on Node
        Object.defineProperty(window, 'performance', {
            value: {
                mark: () => {},
                measure: () => {},
                getEntriesByName: () => {},
            },
        });
    });
    it('It should render the Sourcepoint CMP', async () => {
        // TODO: implement test
        // TODO: add shouldUseSourcepointCmp
        shouldUseSourcepointCmp.mockImplementation(() => true);
        cmp.showPrivacyManager();
        expect(true).toBeTruthy();
    });

    it('It should render the old CMP', async () => {
        const { container } = render(<CMP />);

        await waitFor(() =>
            expect(container.firstChild).toBeInstanceOf(HTMLDivElement),
        );
    });
});

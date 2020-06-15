/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';

// Used to mock getCookie
import { getCookie as getCookie_ } from '../browser/cookie';

import { useAB, ABProvider } from './ab';

const getCookie: any = getCookie_;

jest.mock('../browser/cookie', () => ({
    getCookie: jest.fn(),
}));

const DummyTest = {
    id: 'DummyTest',
    audienceCriteria: 'n/a',
    audienceOffset: 0,
    audience: 1,
    author: 'n/a',
    canRun: (): boolean => {
        return true;
    },
    description: 'n/a',
    start: '0001-01-01',
    expiry: '9999-12-12',
    successMeasure: 'n/a',
    variants: [
        { id: 'control', test: () => {} },
        { id: 'variant', test: () => {} },
    ],
};

const Example = () => {
    const AB = useAB();
    if (AB === null) return <p>IhaveNoMvtCookie</p>;
    if (AB.isUserInVariant('DummyTest', 'variant')) return <p>InTheTest</p>;
    return <p>NotInTest</p>;
};

describe('AB', () => {
    beforeEach(() => {
        getCookie.mockReset();
    });

    it('throws an error if you try to use AB outside of a provider', () => {
        // We disable console.error for this test to keep our jest output clean

        // eslint-disable-next-line @typescript-eslint/unbound-method
        const originalError = console.error;
        // eslint-disable-next-line @typescript-eslint/unbound-method
        console.error = jest.fn();

        expect(() => render(<Example />)).toThrow(
            'useAB must be used within the ABProvider',
        );

        // eslint-disable-next-line @typescript-eslint/unbound-method
        console.error = originalError;
    });

    it('returns null if no mvt cookie was set', () => {
        render(
            <ABProvider
                tests={[DummyTest]}
                switches={{ DummyTest: true }}
                isSensitive={false}
            >
                <Example />
            </ABProvider>,
        );

        expect(screen.getByText('IhaveNoMvtCookie')).toBeTruthy();
    });

    it('puts a user in the test bucket when test is valid and cookie value is in scope', () => {
        getCookie.mockReturnValue('19');

        render(
            <ABProvider
                tests={[DummyTest]}
                switches={{ DummyTest: true }}
                isSensitive={false}
            >
                <Example />
            </ABProvider>,
        );

        expect(screen.getByText('InTheTest')).toBeTruthy();
    });

    it('does not put user in bucket when cookie out of scope', () => {
        getCookie.mockReturnValue('20');

        render(
            <ABProvider
                tests={[DummyTest]}
                switches={{ DummyTest: true }}
                isSensitive={false}
            >
                <Example />
            </ABProvider>,
        );

        expect(screen.getByText('NotInTest')).toBeTruthy();
    });

    it('does not put user in bucket when test is turned off with a switch', () => {
        getCookie.mockReturnValue('19');

        render(
            <ABProvider
                tests={[DummyTest]}
                switches={{ DummyTest: false }}
                isSensitive={false}
            >
                <Example />
            </ABProvider>,
        );

        expect(screen.getByText('NotInTest')).toBeTruthy();
    });

    it('does not put user in bucket when isSensitive is true', () => {
        getCookie.mockReturnValue('19');

        render(
            <ABProvider
                tests={[DummyTest]}
                switches={{ DummyTest: true }}
                isSensitive={true}
            >
                <Example />
            </ABProvider>,
        );

        expect(screen.getByText('NotInTest')).toBeTruthy();
    });

    it('does not put user in bucket when test is expired', () => {
        getCookie.mockReturnValue('19');

        render(
            <ABProvider
                tests={[{ ...DummyTest, expiry: '2001-01-01' }]}
                switches={{ DummyTest: true }}
                isSensitive={false}
            >
                <Example />
            </ABProvider>,
        );

        expect(screen.getByText('NotInTest')).toBeTruthy();
    });
});

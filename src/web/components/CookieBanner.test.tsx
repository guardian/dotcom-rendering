import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
    getCookie as getCookie_,
    addCookie as addCookie_,
} from '@root/src/web/browser/cookie';
import { CookieBanner } from './CookieBanner';

const getCookie: any = getCookie_;
const addCookie: any = addCookie_;

jest.mock('@frontend/web/browser/cookie', () => ({
    getCookie: jest.fn(() => null),
    addCookie: jest.fn(() => null),
}));

describe('CookieBanner', () => {
    // const consentCookie = 'GU_TK';

    beforeEach(() => {
        addCookie.mockReset();
        getCookie.mockReset();
    });

    afterEach(() => {
        // Below tests are temporarily being skipped.
        // See https://github.com/guardian/dotcom-rendering/pull/1097
        // expect(getCookie).toHaveBeenCalledWith(consentCookie);
    });

    it('It should render null', () => {
        const { container } = render(<CookieBanner />);
        expect(container.firstChild).toBeNull();
    });

    // Below tests are temporarily being skipped in favour of the test above.
    // See https://github.com/guardian/dotcom-rendering/pull/1097
    it.skip('It should render null if consentCookie set', () => {
        getCookie.mockImplementation(() => true);

        const { container } = render(<CookieBanner />);

        expect(container.firstChild).toBeNull();
    });

    it.skip('It should not render null if consentCookie not set', () => {
        getCookie.mockImplementation(() => false);

        const { container } = render(<CookieBanner />);

        expect(container.firstChild).not.toBeNull();
    });

    it.skip('It should add consentCookie on button click', () => {
        getCookie.mockImplementation(() => false);

        const { container, getByText } = render(<CookieBanner />);

        expect(container.firstChild).not.toBeNull();

        fireEvent.click(getByText("I'm OK with that"));

        expect(container.firstChild).toBeNull();
        expect(addCookie).toHaveBeenCalled();
    });
});

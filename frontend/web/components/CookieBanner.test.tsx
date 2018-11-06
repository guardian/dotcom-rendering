import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import CookieBanner from './CookieBanner';
import {
    getCookie as getCookie_,
    addCookie as addCookie_,
} from '../lib/cookie';

const getCookie: any = getCookie_;
const addCookie: any = addCookie_;

jest.mock('../lib/cookie', () => ({
    getCookie: jest.fn(() => null),
    addCookie: jest.fn(() => null),
}));

describe('CookieBanner', () => {
    const consentCookie = 'GU_TK';

    beforeEach(() => {
        addCookie.mockReset();
        getCookie.mockReset();
    });

    afterEach(() => {
        expect(getCookie).toHaveBeenCalledWith(consentCookie);
    });

    describe('snapshots', () => {
        it('It should render if consentCookie not set', () => {
            getCookie.mockImplementation(() => false);

            const { container } = render(<CookieBanner />);

            expect(container.firstChild).toMatchSnapshot();
        });

        it('It should not render if consentCookie set', () => {
            getCookie.mockImplementation(() => true);

            const { container } = render(<CookieBanner />);

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    it('It should render null if consentCookie set', () => {
        getCookie.mockImplementation(() => true);

        const { container } = render(<CookieBanner />);

        expect(container.firstChild).toBeNull();
    });

    it('It should not render null if consentCookie not set', () => {
        getCookie.mockImplementation(() => false);

        const { container } = render(<CookieBanner />);

        expect(container.firstChild).not.toBeNull();
    });

    it('It should add consentCookie on button click', () => {
        getCookie.mockImplementation(() => false);

        const { container, getByText } = render(<CookieBanner />);

        expect(container.firstChild).not.toBeNull();

        fireEvent.click(getByText('OK'));

        expect(container.firstChild).toBeNull();
        expect(addCookie).toHaveBeenCalled();
    });
});

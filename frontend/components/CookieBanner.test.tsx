import React from 'react';
import { shallow } from 'enzyme';
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
        it('It should render correctly if consentCookie not set', () => {
            getCookie.mockImplementation(() => false);

            const component = shallow(<CookieBanner />);

            expect(component).toMatchSnapshot();
        });

        it('It should render correctly if consentCookie set', () => {
            getCookie.mockImplementation(() => true);

            const component = shallow(<CookieBanner />);

            expect(component).toMatchSnapshot();
        });
    });

    it('It should render null if consentCookie set', () => {
        getCookie.mockImplementation(() => true);

        const component = shallow(<CookieBanner />);

        expect(component.type()).toBeNull();
        expect(component.state('show')).toBe(false);
    });

    it('It should not render null if consentCookie not set', () => {
        getCookie.mockImplementation(() => false);

        const component = shallow(<CookieBanner />);

        expect(component.type()).not.toBeNull();
        expect(component.state('show')).toBe(true);
    });

    it('It should add consentCookie on button click', () => {
        getCookie.mockImplementation(() => false);

        const component = shallow(<CookieBanner />);
        const buttonElem = component.find('button').first();

        expect(component.type()).not.toBeNull();
        expect(component.state('show')).toBe(true);

        buttonElem.simulate('click');

        expect(component.state('show')).toBe(false);
        expect(addCookie).toHaveBeenCalled();
    });
});

import React from 'react';
import { render, wait } from '@testing-library/react';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';
import {
    getCookie as getCookie_,
    addCookie as addCookie_,
} from '@frontend/web/browser/cookie';

const getCookie: any = getCookie_;
const addCookie: any = addCookie_;

jest.mock('@frontend/web/browser/cookie', () => ({
    getCookie: jest.fn(() => null),
    addCookie: jest.fn(() => null),
}));

describe('ReaderRevenueLinks', () => {
    const contributionsCookie = 'gu.contributions.contrib-timestamp';
    const payingMemberCookie = 'gu_paying_member';
    const urls = {
        contribute: 'https://www.theguardian.com/contribute',
        subscribe: 'https://www.theguardian.com/subscribe',
        support: 'https://www.theguardian.com/support',
    };
    const edition: Edition = 'UK';

    beforeEach(() => {
        addCookie.mockReset();
        getCookie.mockReset();
    });

    it('should not render if recent contributor', async () => {
        const contributionDate = new Date();

        // set a contribution date of 1 week ago
        contributionDate.setDate(contributionDate.getDate() - 7);

        getCookie.mockReturnValue(contributionDate);

        const { container } = render(
            <ReaderRevenueLinks
                urls={urls}
                edition={edition}
                dataLinkNamePrefix={'nav2 : '}
                noResponsive={false}
            />,
        );

        // expect nothing to be rendered
        await wait(() => expect(container.firstChild).toBeNull());

        expect(getCookie).toHaveBeenCalledTimes(1);
        expect(getCookie).toHaveBeenCalledWith(contributionsCookie);
    });

    it('should not render correctly if paying member', async () => {
        const contributionDate = new Date();

        // set a contribution date of 1 year ago
        contributionDate.setDate(contributionDate.getDate() - 365);

        getCookie
            .mockReturnValueOnce(contributionDate)
            .mockReturnValueOnce('true');

        const { container } = render(
            <ReaderRevenueLinks
                urls={urls}
                edition={edition}
                dataLinkNamePrefix={'nav2 : '}
                noResponsive={false}
            />,
        );

        // expect nothing to be rendered
        await wait(() => expect(container.firstChild).toBeNull());

        expect(getCookie).toHaveBeenCalledTimes(2);
        expect(getCookie).toHaveBeenCalledWith(contributionsCookie);
        expect(getCookie).toHaveBeenCalledWith(payingMemberCookie);
    });

    it('should render if neither paying member or recent contributor', async () => {
        const contributionDate = new Date();

        // set a contribution date of 1 year ago
        contributionDate.setDate(contributionDate.getDate() - 365);

        getCookie
            .mockReturnValueOnce(contributionDate)
            .mockReturnValueOnce('false');

        const { container, getByText } = render(
            <ReaderRevenueLinks
                urls={urls}
                edition={edition}
                dataLinkNamePrefix={'nav2 : '}
                noResponsive={false}
            />,
        );

        // expect something to be rendered
        await wait(() => expect(container.firstChild).not.toBeNull());

        expect(getByText('Support The Guardian')).toBeInTheDocument();
        expect(getCookie).toHaveBeenCalledTimes(2);
        expect(getCookie).toHaveBeenCalledWith(contributionsCookie);
        expect(getCookie).toHaveBeenCalledWith(payingMemberCookie);
    });
});

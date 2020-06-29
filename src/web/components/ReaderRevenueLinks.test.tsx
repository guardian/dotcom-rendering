import React from 'react';
import { render, wait } from '@testing-library/react';
import {
    getCookie as getCookie_,
    addCookie as addCookie_,
} from '@root/src/web/browser/cookie';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';

const getCookie: any = getCookie_;
const addCookie: any = addCookie_;

jest.mock('@frontend/web/browser/cookie', () => ({
    getCookie: jest.fn(() => null),
    addCookie: jest.fn(() => null),
}));

describe('ReaderRevenueLinks', () => {
    const contributionsCookie = 'gu.contributions.contrib-timestamp';
    const payingMemberCookie = 'gu_paying_member';
    const digitalSubscriberCookie = 'gu_digital_subscriber';
    const recentContributorCookie = 'gu.contributions.contrib-timestamp';

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
                dataLinkNamePrefix="nav2 : "
                inHeader={true}
            />,
        );

        // expect nothing to be rendered
        await wait(() => expect(container.firstChild).toBeNull());

        expect(getCookie).toHaveBeenCalledTimes(4);
        expect(getCookie).toHaveBeenCalledWith(contributionsCookie);
        expect(getCookie).toHaveBeenCalledWith(digitalSubscriberCookie);
        expect(getCookie).toHaveBeenCalledWith(payingMemberCookie);
        expect(getCookie).toHaveBeenCalledWith(recentContributorCookie);
    });

    it('should not render correctly if paying member', async () => {
        const contributionDate = new Date();

        // set a contribution date of 1 year ago
        contributionDate.setDate(contributionDate.getDate() - 365);

        getCookie.mockImplementation((name: string) => {
            if (name === contributionsCookie) return contributionDate;
            if (name === payingMemberCookie) return 'true';
        });

        const { container } = render(
            <ReaderRevenueLinks
                urls={urls}
                edition={edition}
                dataLinkNamePrefix="nav2 : "
                inHeader={true}
            />,
        );

        // expect nothing to be rendered
        await wait(() => expect(container.firstChild).toBeNull());

        expect(getCookie).toHaveBeenCalledTimes(4);
        expect(getCookie).toHaveBeenCalledWith(contributionsCookie);
        expect(getCookie).toHaveBeenCalledWith(payingMemberCookie);
        expect(getCookie).toHaveBeenCalledWith(digitalSubscriberCookie);
        expect(getCookie).toHaveBeenCalledWith(recentContributorCookie);
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
                dataLinkNamePrefix="nav2 : "
                inHeader={true}
            />,
        );

        // expect something to be rendered
        await wait(() => expect(container.firstChild).not.toBeNull());

        expect(getByText('Support The Guardian')).toBeInTheDocument();
        expect(getCookie).toHaveBeenCalledTimes(4);
        expect(getCookie).toHaveBeenCalledWith(contributionsCookie);
        expect(getCookie).toHaveBeenCalledWith(payingMemberCookie);
        expect(getCookie).toHaveBeenCalledWith(digitalSubscriberCookie);
        expect(getCookie).toHaveBeenCalledWith(recentContributorCookie);
    });
});

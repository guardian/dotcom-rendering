import React from 'react';
import { render, wait } from 'react-testing-library';
import SupportTheGuardian from './SupportTheGuardian';
import {
    getCookie as getCookie_,
    addCookie as addCookie_,
} from '../../../../lib/cookie';

const getCookie: any = getCookie_;
const addCookie: any = addCookie_;

jest.mock('../../../../lib/cookie', () => ({
    getCookie: jest.fn(() => null),
    addCookie: jest.fn(() => null),
}));

describe('SupportTheGuardian', () => {
    const contributionsCookie = 'gu.contributions.contrib-timestamp';
    const payingMemberCookie = 'gu_paying_member';
    const url = 'https://www.theguardian.com';

    beforeEach(() => {
        addCookie.mockReset();
        getCookie.mockReset();
    });

    describe('snapshots', () => {
        it('should not render if recent contributor', async () => {
            const contributionDate = new Date();

            // set a contribution date of 1 week ago
            contributionDate.setDate(contributionDate.getDate() - 7);

            getCookie.mockReturnValue(contributionDate);

            const { container } = render(<SupportTheGuardian url={url} />);

            // expect nothing to be rendered
            await wait(() => expect(container.firstChild).toBeNull());

            expect(container.firstChild).toMatchSnapshot();
        });

        it('should not render correctly if paying member', async () => {
            const contributionDate = new Date();

            // set a contribution date of 1 year ago
            contributionDate.setDate(contributionDate.getDate() - 365);

            getCookie
                .mockReturnValueOnce(contributionDate)
                .mockReturnValueOnce('true');

            const { container } = render(<SupportTheGuardian url={url} />);

            // expect nothing to be rendered
            await wait(() => expect(container.firstChild).toBeNull());

            expect(container.firstChild).toMatchSnapshot();
        });

        it('should render if neither paying member or recent contributor', async () => {
            const contributionDate = new Date();

            // set a contribution date of 1 year ago
            contributionDate.setDate(contributionDate.getDate() - 365);

            getCookie
                .mockReturnValueOnce(contributionDate)
                .mockReturnValueOnce('false');

            const { container } = render(<SupportTheGuardian url={url} />);

            // expect something to be rendered
            await wait(() => expect(container.firstChild).not.toBeNull());

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    it('should not render if recent contributor', async () => {
        const contributionDate = new Date();

        // set a contribution date of 1 week ago
        contributionDate.setDate(contributionDate.getDate() - 7);

        getCookie.mockReturnValue(contributionDate);

        const { container } = render(<SupportTheGuardian url={url} />);

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

        const { container } = render(<SupportTheGuardian url={url} />);

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
            <SupportTheGuardian url={url} />,
        );

        // expect something to be rendered
        await wait(() => expect(container.firstChild).not.toBeNull());

        expect(getByText('Support The Guardian')).toBeInTheDocument();
        expect(getCookie).toHaveBeenCalledTimes(2);
        expect(getCookie).toHaveBeenCalledWith(contributionsCookie);
        expect(getCookie).toHaveBeenCalledWith(payingMemberCookie);
    });
});

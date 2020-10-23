import React from 'react';
import { render, wait } from '@testing-library/react';
import { shouldHideSupportMessaging as shouldHideSupportMessaging_ } from '@root/src/web/lib/contributions';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';

const shouldHideSupportMessaging: any = shouldHideSupportMessaging_;

jest.mock('@root/src/web/lib/contributions', () => ({
    shouldHideSupportMessaging: jest.fn(() => true),
}));

describe('ReaderRevenueLinks', () => {
    const urls = {
        contribute: 'https://www.theguardian.com/contribute',
        subscribe: 'https://www.theguardian.com/subscribe',
        support: 'https://www.theguardian.com/support',
    };
    const edition: Edition = 'UK';

    it('should not render if shouldHideSupportMessaging() returns true', async () => {
        shouldHideSupportMessaging.mockReturnValue(true);

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
    });

    it('should render if shouldHideSupportMessaging() returns false', async () => {
        shouldHideSupportMessaging.mockReturnValue(false);

        const { container } = render(
            <ReaderRevenueLinks
                urls={urls}
                edition={edition}
                dataLinkNamePrefix="nav2 : "
                inHeader={true}
            />,
        );

        // expect links to be rendered
        await wait(() => expect(container.firstChild).not.toBeNull());
    });
});

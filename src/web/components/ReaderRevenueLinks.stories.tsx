import React from 'react';
import { css } from 'emotion';

import { brandBackground } from '@guardian/src-foundations/palette';

import { ReaderRevenueLinks } from './ReaderRevenueLinks';

export default {
    component: ReaderRevenueLinks,
    title: 'Components/ReaderRevenueLinks',
};

const revenueUrls = {
    subscribe: '',
    support: '',
    contribute: '',
};

const Container = ({ children }: { children: JSXElements }) => (
    <div
        className={css`
            margin: 40px;
            padding-top: 20px;
            padding-left: 20px;
            padding-bottom: 60px;
            background-color: ${brandBackground.primary};
        `}
    >
        {children}
    </div>
);

export const Header = () => {
    return (
        <Container>
            <ReaderRevenueLinks
                edition="UK"
                urls={revenueUrls}
                dataLinkNamePrefix=""
                inHeader={true}
                enableAusMoment2020Header={false}
            />
        </Container>
    );
};
Header.story = {
    name: 'Header - desktop',
    parameters: {
        viewport: { defaultViewport: 'desktop' },
        chromatic: { viewports: [1300] },
    },
};

export const HeaderMobile = () => {
    return (
        <Container>
            <ReaderRevenueLinks
                edition="UK"
                urls={revenueUrls}
                dataLinkNamePrefix=""
                inHeader={true}
                enableAusMoment2020Header={false}
            />
        </Container>
    );
};
HeaderMobile.story = {
    name: 'Header - mobileMedium',
    parameters: {
        viewport: { defaultViewport: 'mobileMedium' },
        chromatic: { viewports: [380] },
    },
};

export const Footer = () => {
    return (
        <Container>
            <ReaderRevenueLinks
                edition="UK"
                urls={revenueUrls}
                dataLinkNamePrefix=""
                inHeader={false}
                enableAusMoment2020Header={false}
            />
        </Container>
    );
};
Footer.story = {
    name: 'Footer - desktop',
    parameters: {
        viewport: { defaultViewport: 'desktop' },
        chromatic: { viewports: [1300] },
    },
};

export const FooterMobile = () => {
    return (
        <Container>
            <ReaderRevenueLinks
                edition="UK"
                urls={revenueUrls}
                dataLinkNamePrefix=""
                inHeader={false}
                enableAusMoment2020Header={false}
            />
        </Container>
    );
};
FooterMobile.story = {
    name: 'Footer - mobileMedium',
    parameters: {
        viewport: { defaultViewport: 'mobileMedium' },
        chromatic: { viewports: [380] },
    },
};

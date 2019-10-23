import React from 'react';
import { css, cx } from 'emotion';
import { palette, tablet } from '@guardian/src-foundations';
import { namedAdSlotParameters } from '@frontend/model/advertisement';
import { AdSlot } from '@frontend/web/components/AdSlot';
import { Hide } from '@frontend/web/components/Hide';

import { Nav } from './Nav/Nav';

const headerWrapper = css`
    position: static;
`;

const headerAdWrapper = css`
    z-index: 1080;
    width: 100%;
    background-color: white;

    position: sticky;
    top: 0;
`;

const headerAdWrapperHidden = css`
    display: none;
`;

const adSlotAboveNav = css`
    margin: 0 auto;
    height: 151px;
    padding-bottom: 18px;
    padding-top: 18px;
    text-align: left;
    display: table;
    border-bottom: 0.0625rem solid ${palette.neutral[86]};
    width: 728px;
`;

const header = css`
    margin-bottom: 0;
    background-color: ${palette.brand.main};
    position: relative;
    ${tablet} {
        display: block;
    }
`;

export const Header: React.FC<{
    nav: NavType;
    pillar: Pillar;
    edition: Edition;
    config: ConfigType;
    isAdFreeUser: boolean;
    shouldHideAds: boolean;
}> = ({ nav, pillar, edition, config, isAdFreeUser, shouldHideAds }) => (
    <div className={headerWrapper}>
        <Hide when="below" breakpoint="tablet">
            <div
                className={cx({
                    [headerAdWrapper]: true,
                    [headerAdWrapperHidden]: isAdFreeUser || shouldHideAds,
                })}
            >
                <AdSlot
                    asps={namedAdSlotParameters('top-above-nav')}
                    config={config}
                    className={adSlotAboveNav}
                />
            </div>
        </Hide>
        <header className={header}>
            <Nav nav={nav} pillar={pillar} edition={edition} />
        </header>
    </div>
);

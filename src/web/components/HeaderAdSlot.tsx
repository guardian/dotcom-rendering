import React from 'react';
import { css, cx } from 'emotion';
import { AdSlot } from '@root/src/web/components/AdSlot';
import { Hide } from '@root/src/web/components/Hide';

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
    width: 728px;
`;

export const HeaderAdSlot: React.FC<{
    isAdFreeUser: boolean;
    shouldHideAds: boolean;
}> = ({ isAdFreeUser, shouldHideAds }) => (
    <div className={headerWrapper}>
        <Hide when="below" breakpoint="tablet">
            <div
                className={cx({
                    [headerAdWrapper]: true,
                    [headerAdWrapperHidden]: isAdFreeUser || shouldHideAds,
                })}
            >
                <AdSlot position="top-above-nav" localStyles={adSlotAboveNav} />
            </div>
        </Hide>
    </div>
);

import React from 'react';
import { css, cx } from 'emotion';
import { namedAdSlotParameters } from '@root/src/model/advertisement';
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
    <>
        {/*
            Commercial script does not render this ad slot on mobile width
            if the element exists in the DOM. Therefore we need to remove it
            from the DOM
            TODO: find better work around working with commerical logic
        */}
        {/* 740 is the px width of tablet */}
        {document.documentElement.clientWidth >= 740 && (
            <div className={headerWrapper}>
                <Hide when="below" breakpoint="tablet">
                    <div
                        className={cx({
                            [headerAdWrapper]: true,
                            [headerAdWrapperHidden]:
                                isAdFreeUser || shouldHideAds,
                        })}
                    >
                        <AdSlot
                            asps={namedAdSlotParameters('top-above-nav')}
                            localStyles={adSlotAboveNav}
                        />
                    </div>
                </Hide>
            </div>
        )}
    </>
);

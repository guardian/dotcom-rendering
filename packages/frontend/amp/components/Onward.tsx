import React from 'react';
import { css } from 'react-emotion';
import Plus from '@guardian/pasteup/icons/plus.svg';
import InnerContainer from '@frontend/amp/components/InnerContainer';
import { OnwardContainer } from '@frontend/amp/components/OnwardContainer';
import { palette } from '@guardian/pasteup/palette';

const wrapper = css`
    background-color: white;
    padding-top: 24px;
`;

const container = css`
    border-top: 1px solid ${palette.neutral[86]};
    padding-bottom: 24px;
`;

const outbrain = css`
    ${container};
    border-top: none;
`;

export const Onward: React.SFC<{
    shouldHideAds: boolean;
    webURL: string;
    onwardURLs: string[];
    guardianBaseURL: string;
}> = ({ shouldHideAds, webURL, onwardURLs, guardianBaseURL }) => {
    const encodedWebURL = encodeURIComponent(`${webURL}`);
    const encodedAMPURL = encodeURIComponent(`${webURL}?amp`);

    const outbrainParams = `widgetIds=AMP_1&htmlURL=${encodedWebURL}&ampURL=${encodedAMPURL}`;
    const outbrainURL = `https://widgets.outbrain.com/hub/amp.html#${outbrainParams}`;

    const containers = onwardURLs.map(path => (
        <div key={path} className={container}>
            <OnwardContainer guardianBaseURL={guardianBaseURL} path={path} />
        </div>
    ));

    const outbrainContainer = (
        <amp-iframe
            key={outbrainURL}
            height="480"
            sandbox="allow-scripts allow-same-origin allow-popups"
            layout="fixed-height"
            frameborder="0"
            src={outbrainURL}
            class={outbrain}
        >
            <div overflow="true">
                More stories
                <Plus />
            </div>
        </amp-iframe>
    );

    // insert outbrain as second container if ads supported
    if (!shouldHideAds) {
        containers.splice(1, 0, outbrainContainer);
    }

    return <InnerContainer className={wrapper}>{containers}</InnerContainer>;
};

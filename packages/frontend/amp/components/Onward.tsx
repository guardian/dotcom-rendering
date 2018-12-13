import React from 'react';
import { css } from 'react-emotion';
import Plus from '@guardian/pasteup/icons/plus.svg';
import InnerContainer from '@frontend/amp/components/InnerContainer';

const container = css`
    background-color: white;
`;

const outbrain = css`
    padding-top: 24px;
`;

const Onward: React.SFC<{ shouldHideAds: boolean; webURL: string }> = ({
    shouldHideAds,
    webURL,
}) => {
    if (shouldHideAds) {
        return null;
    }

    const encodedWebURL = encodeURIComponent(`${webURL}`);
    const encodedAMPURL = encodeURIComponent(`${webURL}?amp`);

    const outbrainParams = `widgetIds=AMP_1&htmlURL=${encodedWebURL}&ampURL=${encodedAMPURL}`;
    const outbrainURL = `https://widgets.outbrain.com/hub/amp.html#${outbrainParams}`;

    return (
        <InnerContainer className={container}>
            <amp-iframe
                height="456"
                sandbox="allow-scripts allow-same-origin allow-popups"
                layout="fixed-height"
                frameborder="0"
                src={outbrainURL}
                class={outbrain}
            >
                <div overflow={true} className="cta cta--medium cta--show-more">
                    More stories
                    <Plus />
                </div>
            </amp-iframe>
        </InnerContainer>
    );
};

export default Onward;

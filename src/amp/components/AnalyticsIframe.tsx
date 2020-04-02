import React from 'react';
import { css } from 'emotion';

const analyticsIframeStyle = css`
    position: fixed;
    top: -1px;
`;

const prebidImg =
    'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
const ozoneImg = 'https://elb.the-ozone-project.com/';

export const AnalyticsIframe: React.FC<{ url: string }> = ({ url }) => {
    return (
        <amp-iframe
            class={analyticsIframeStyle}
            data-block-on-consent="_till_accepted"
            title="Analytics Iframe"
            height="1"
            width="1"
            sandbox="allow-scripts allow-same-origin"
            frameborder="0"
            src={url}
        >
            <amp-img layout="fill" src={prebidImg} placeholder="" />
            <amp-img layout="fill" src={ozoneImg} placeholder="" />
        </amp-iframe>
    );
};

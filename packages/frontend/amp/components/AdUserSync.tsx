import React from 'react';
import { css } from 'emotion';

const preBidSrc =
    'https://cdn.jsdelivr.net/npm/prebid-universal-creative@latest/dist/load-cookie.html';

const preBidImg =
    'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const iframeStyle = css`
    position: fixed;
    top: -1px;
`;

export const AdUserSync: React.FC<{}> = () => {
    return (
        <amp-iframe
            class={iframeStyle}
            data-block-on-consent="_till_accepted"
            title="User Sync"
            height="1"
            width="1"
            sandbox="allow-scripts"
            frameborder="0"
            src={preBidSrc}
        >
            <amp-img layout="fill" src={preBidImg} placeholder="" />
        </amp-iframe>
    );
};

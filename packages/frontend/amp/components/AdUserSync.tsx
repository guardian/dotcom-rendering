import React from 'react';
import { css } from 'emotion';

const prebidSrc =
    'https://cdn.jsdelivr.net/npm/prebid-universal-creative@latest/dist/load-cookie.html';

const prebidImg =
    'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const prebidIframeStyle = css`
    position: fixed;
    top: -1px;
`;

export const AdUserSync: React.FC<{}> = () => {
    return (
        <amp-iframe
            class={prebidIframeStyle}
            data-block-on-consent="_till_accepted"
            title="User Sync"
            height="1"
            width="1"
            sandbox="allow-scripts"
            frameborder="0"
            src={prebidSrc}
        >
            <amp-img layout="fill" src={prebidImg} placeholder="" />
        </amp-iframe>
    );
};

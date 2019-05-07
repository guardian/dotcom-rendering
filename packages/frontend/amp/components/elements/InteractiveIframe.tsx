import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/typography';
import PlusIcon from '@guardian/pasteup/icons/plus.svg';

const styles = css`
    margin-top: 16px;
    margin-bottom: 12px;
`;

const showMore = css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: ${palette.neutral[7]};
    background-color: ${palette.neutral[100]};
    padding: 0 10px;
    ${textSans(2)};
    line-height: 34px;
    height: 36px;
    font-weight: bold;

    svg {
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin-top: -2px;
        fill: ${palette.neutral[46]};
        padding-right: 4px;
    }

    :after {
        content: '';
        background-color: ${palette.neutral[86]};
        border-radius: 18px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 140px;
        z-index: -1;
        color: ${palette.neutral[100]};
    }
`;

export const InteractiveIframe: React.SFC<{ url: string }> = ({ url }) => {
    return (
        <amp-iframe
            class={styles}
            src={url}
            layout="responsive"
            sandbox="allow-scripts allow-same-origin"
            height="1"
            width="5"
            resizable=""
        >
            <div
                overflow=""
                className={showMore}
                aria-label="Load the full visual"
            >
                <PlusIcon />
                See the full visual
            </div>
        </amp-iframe>
    );
};

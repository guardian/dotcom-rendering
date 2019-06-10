import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/typography';
import PlusIcon from '@guardian/pasteup/icons/plus.svg';

const showMore = css`
    color: ${palette.neutral[7]};
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
        margin-right: 4px;
        margin-left: 5px;
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
        width: 130px;
        z-index: -1;
        color: ${palette.neutral[100]};
    }
`;

export const ShowMoreButton: React.SFC<{}> = () => (
    <div className={showMore} aria-label={'Show more'}>
        <PlusIcon />
        Show more
    </div>
);

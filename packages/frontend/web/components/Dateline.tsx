import React from 'react';

import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/typography';

const captionFont = css`
    ${textSans(1)};
    color: ${palette.neutral[46]};
`;

const dateline = css`
    ${captionFont};

    padding-top: 2px;
    margin-bottom: 6px;
`;

export const Dateline: React.FC<{
    dateDisplay: string;
    descriptionText: string;
}> = ({ dateDisplay, descriptionText }) => (
    <>
        <div
            className={dateline}
            aria-label={`${descriptionText} ${dateDisplay}`}
        >
            {dateDisplay}
        </div>
    </>
);

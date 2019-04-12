import React from 'react';

import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/typography';
import { screenReaderOnly } from '@guardian/pasteup/mixins';

const captionFont = css`
    ${textSans(1)};
    color: ${palette.neutral[46]};
`;

const dateline = css`
    ${captionFont};

    padding-top: 2px;
    margin-bottom: 6px;
`;

const description = css`
    ${screenReaderOnly}
`;

export const Dateline: React.FC<{
    dateDisplay: string;
    descriptionText: string;
}> = ({ dateDisplay, descriptionText }) => (
    <>
        <div
            className={dateline}
            // tslint:disable-next-line:react-a11y-role
            role="text"
        >
            <span className={description}>{descriptionText} </span>
            {dateDisplay}
        </div>
    </>
);

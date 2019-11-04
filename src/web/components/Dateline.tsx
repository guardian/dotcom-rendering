import React from 'react';

import { css } from 'emotion';
import { textSans, palette } from '@guardian/src-foundations';
import { visuallyHidden } from '@guardian/src-utilities';

const captionFont = css`
    ${textSans({ level: 1 })};
    color: ${palette.neutral[46]};
`;

const dateline = css`
    ${captionFont};

    padding-top: 2px;
    margin-bottom: 6px;
`;

const description = css`
    ${visuallyHidden}
`;

export const Dateline: React.FC<{
    dateDisplay: string;
    descriptionText: string;
}> = ({ dateDisplay, descriptionText }) => (
    <>
        <div className={dateline} role="textbox">
            <span className={description}>{descriptionText} </span>
            {dateDisplay}
        </div>
    </>
);

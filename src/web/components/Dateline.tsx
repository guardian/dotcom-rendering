import React from 'react';

import { css, cx } from 'emotion';
import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

const captionFont = css`
    ${textSans.xsmall()};
    color: ${text.supporting};
`;

const dateline = css`
    ${captionFont};

    padding-top: 2px;
    margin-bottom: 6px;
`;

// We use the 'Checkbox Hack' for the show-hide functionality of the secondary date line.
// https://css-tricks.com/the-checkbox-hack/
const toggleClass = css`
    input[type='checkbox'] {
        display: none;
    }

    input[type='checkbox']:checked ~ p {
        max-height: 80px;
    }
`;

const pStyle = css`
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
    ${from.leftCol} {
        width: 90%;
    }
`;

const labelStyles = css`
    cursor: pointer;

    :hover {
        text-decoration: underline;
    }
`;

// At the moment there is no way to tell from primaryDateline and secondaryDatline
// what the prepend should be (either 'Last modified on' or 'First published on ')
export const Dateline: React.FC<{
    primaryDateline: string;
    descriptionText: string;
    secondaryDateline: string;
}> = ({ primaryDateline, secondaryDateline }) => {
    return (
        <div className={dateline}>
            {primaryDateline !== secondaryDateline ? (
                <div className={cx(toggleClass, dateline)}>
                    <label className={labelStyles} htmlFor="dateToggle">
                        {primaryDateline}
                    </label>

                    <input
                        className={toggleClass}
                        type="checkbox"
                        id="dateToggle"
                    />
                    <p className={pStyle}>
                        Last modified on {secondaryDateline}
                    </p>
                </div>
            ) : (
                primaryDateline
            )}
        </div>
    );
};

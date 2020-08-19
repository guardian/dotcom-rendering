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

const secondaryDateWidth = css`
    ${from.leftCol} {
        width: 90%;
    }
`;

// Checkbox functionality
const toggleClass = css`
    input[type='checkbox'] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        display: none;
    }

    input[type='checkbox']:checked ~ span ~ p {
        max-height: 80px;
    }
`;

const pCheckboxStyle = css`
    p {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease;
    }
`;

const labelStyles = css`
    label {
        cursor: pointer;
    }
    label {
        position: relative;
        display: block;
    }
    label:hover {
        text-decoration: underline;
    }
    label::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: 50%;
        left: 10px;
    }
`;

// At the moment there is no way to tell from primaryDateline and secondaryDatline
// what the prepend should be (either 'Last modified on' or 'First published on ')
export const Dateline: React.FC<{
    primaryDateline: string;
    descriptionText: string;
    secondaryDateline?: string;
}> = ({ primaryDateline, secondaryDateline }) => {
    return (
        <div className={dateline}>
            {primaryDateline !== secondaryDateline ? (
                <div
                    className={cx(
                        toggleClass,
                        pCheckboxStyle,
                        labelStyles,
                        dateline,
                    )}
                >
                    <input type="checkbox" id="dateToggle" />
                    <span>
                        <label htmlFor="dateToggle">{primaryDateline}</label>
                    </span>
                    {secondaryDateline && (
                        <p className={secondaryDateWidth}>
                            Last modified on {secondaryDateline}
                        </p>
                    )}
                </div>
            ) : (
                primaryDateline
            )}
        </div>
    );
};

import React from 'react';
import { css, cx } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { brandText } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';

const hideDesktop = css`
    ${from.desktop} {
        display: none;
    }
`;

const showColumnLinksStyle = (CHECKBOX_ID: string) => css`
    ${`#${CHECKBOX_ID}:checked ~ & {
        :before {
            margin-top: 8px;
            transform: rotate(-135deg);
        }
    }`}
`;

const collapseColumnButton = css`
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    color: ${brandText.primary};
    display: block;
    ${headline.xsmall()};
    font-weight: 700;
    outline: none;
    padding: 6px 34px 18px 50px;
    position: relative;
    text-align: left;
    width: 100%;
    > * {
        pointer-events: none;
    }
    text-transform: capitalize;
    :before {
        margin-top: 4px;
        left: 25px;
        position: absolute;
        border: 2px solid currentColor;
        border-top: 0;
        border-left: 0;
        content: '';
        display: inline-block;
        height: 10px;
        transform: rotate(45deg);
        width: 10px;
    }
`;

export const CollapseColumnButton: React.FC<{
    title: string;
    CHECKBOX_ID: string;
    ariaControls: string;
}> = ({ title, CHECKBOX_ID, ariaControls }) => (
    // TODO: accessible
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/label-has-associated-control
    <label
        className={cx(
            collapseColumnButton,
            showColumnLinksStyle(CHECKBOX_ID),
            hideDesktop,
        )}
        htmlFor={CHECKBOX_ID}
        aria-label="Toggle main menu"
        key="OpenExpandedMenuLabel"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="menuitem"
        // TODO:
        // aria-haspopup="true"
        aria-controls={ariaControls}
    >
        <span>{title}</span>
    </label>
);

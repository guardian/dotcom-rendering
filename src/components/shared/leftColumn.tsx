// ----- Imports ----- //

import React from 'react';

import { css, SerializedStyles } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { wideContentWidth, wideColumnWidth } from 'styles';


// ----- Styles ----- //

const LeftColumnStyles = css`
    padding: 8px;

    ${from.phablet} {
        display: flex;
    }

    .column-content {
        ${from.phablet} {
            width: 33%;
        }

        ${from.leftCol} {
            width: ${wideColumnWidth}px;
        }
    }

    .main-content {        
        ${from.phablet} {
            width: 67%;
        }

        ${from.leftCol} {
            width: ${wideContentWidth}px;
        }
    }
`;


// ----- Props ----- //

interface LeftColumnProps {
    children: React.ReactNode;
    columnContent?: JSX.Element | null;
    className?: SerializedStyles | null;
};


// ----- Component ----- //

const LeftColumn =
    ({ children, columnContent = null, className = null }: LeftColumnProps): JSX.Element =>
        <div css={[className, LeftColumnStyles]}>
            <div className="column-content">{columnContent}</div>
            <div className="main-content">{children}</div>
        </div>


export default LeftColumn;

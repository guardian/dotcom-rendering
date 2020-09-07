// ----- Imports ----- //

import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { wideContentWidth, wideColumnWidth } from 'styles';
import { remSpace } from '@guardian/src-foundations';


// ----- Styles ----- //

const LeftColumnStyles = css`
    padding: ${remSpace[2]};

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
}


// ----- Component ----- //

const LeftColumn: FC<LeftColumnProps> =
    ({ children, columnContent = null, className = null }) =>
        <div css={[LeftColumnStyles, className]}>
            <div className="column-content">{columnContent}</div>
            <div className="main-content">{children}</div>
        </div>


export default LeftColumn;

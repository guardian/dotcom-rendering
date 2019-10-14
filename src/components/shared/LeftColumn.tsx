// ----- Imports ----- //

import React from 'react';

import { css, SerializedStyles } from '@emotion/core';
import { phablet, leftCol } from '@guardian/src-foundations';


// ----- Styles ----- //

const LeftColumnStyles = css`
    padding: 8px;

    ${phablet} {
        display: flex;
    }

    .column-content {
        ${phablet} {
            width: 33%;
        }

        ${leftCol} {
            width: 220px;
        }
    }

    .main-content {        
        ${phablet} {
            width: 67%;
        }

        ${leftCol} {
            width: 620px;
        }
    }
`;


// ----- Props ----- //

interface LeftColumnProps {
    columnContent: JSX.Element | null;
    mainContent: JSX.Element | null;
    className?: SerializedStyles | null;
};


// ----- Component ----- //

const LeftColumn =
    ({ columnContent, mainContent, className = null }: LeftColumnProps): JSX.Element =>
        <div css={[className, LeftColumnStyles]}>
            <div className="column-content">{columnContent}</div>
            <div className="main-content">{mainContent}</div>
        </div>


export default LeftColumn;
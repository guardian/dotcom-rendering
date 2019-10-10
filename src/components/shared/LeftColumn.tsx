// ----- Imports ----- //

import { css, SerializedStyles } from '@emotion/core';
import { until } from '@guardian/src-foundations';


// ----- Styles ----- //

const LeftColumnStyles = css`
    display: flex;
    padding: 8px;

    ${until.phablet} {
        display: block;
    }

    .column-content {
        width: 220px;

        ${until.leftCol} {
            width: 33%;
        }

        ${until.phablet} {
            width: unset;
        }
    }

    .main-content {
        width: 620px;

        ${until.leftCol} {
            width: 67%;
        }

        ${until.phablet} {
            width: unset;
        }
    }
`;


// ----- Props ----- //

interface LeftColumnProps {
    columnContent: JSX.Element | null;
    mainContent: JSX.Element | null;
    className?: SerializedStyles | null,
};


// ----- Component ----- //

export default ({ columnContent, mainContent, className = null }: LeftColumnProps): JSX.Element =>
    <div css={[className, LeftColumnStyles]}>
        <div className="column-content">{columnContent}</div>
        <div className="main-content">{mainContent}</div>
    </div>

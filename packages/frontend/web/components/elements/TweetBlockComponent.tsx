import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { body } from '@guardian/pasteup/typography';
const noJSStyling = css`
    .twitter-tweet :not(.twitter-tweet-rendered) {
        /* // We're going to style this like the upgraded embed */
        border: 1px solid ${palette.neutral[86]};
        border-radius: 4px;
        padding: 20px;
        /* End tweet embed styles  */

        display: inline-block;
        margin: 0;
        margin-bottom: $gs-baseline;
        width: 100%;
        ${body(1)};
    }

    .twitter-tweet p {
        padding-bottom: 10px;
    }
`;

// tslint:disable:react-no-dangerous-html
export const TweetBlockComponent: React.FC<{
    element: TweetBlockElement;
}> = ({ element }) => {
    return (
        <div>
            <div
                className={noJSStyling}
                dangerouslySetInnerHTML={{ __html: element.html }}
            />
            <script
                async={true}
                src="https://platform.twitter.com/widgets.js"
            />
        </div>
    );
};

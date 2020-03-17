import React from 'react';
import { css } from 'emotion';
import { border } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';
import { unescapeData } from '@root/src/lib/escapeData';

// fallback styling for when JS is disabled
const noJSStyling = css`
    .twitter-tweet :not(.twitter-tweet-rendered) {
        border: 1px solid ${border.secondary};
        border-radius: 4px;
        padding: 20px;
        width: 100%;
        margin-bottom: 16px;
        ${body.small()};
    }

    .twitter-tweet p {
        padding-bottom: 10px;
    }

    /* Why are we using important here? Because this is the only way to override
    the inline styles of the twitter-widget element and for some reason twitter
    is adding display: block and width: 500px on this embed causing it to overflow.
    I did think this might be caused by
    https://stackoverflow.com/questions/36247140/why-dont-flex-items-shrink-past-content-size
    but the solutions posted there did not help. Checking other sites with twitter embeds
    like the BBC, we saw that this important override was being used as well. */
    .twitter-tweet-rendered {
        display: inline !important;
    }

    a {
        /* stylelint-disable-next-line color-no-hex */
        color: #2b7bb9;
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
                dangerouslySetInnerHTML={{ __html: unescapeData(element.html) }}
            />
            <script
                async={true}
                src="https://platform.twitter.com/widgets.js"
            />
        </div>
    );
};

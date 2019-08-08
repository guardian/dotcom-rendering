import React from 'react';
import { css } from 'emotion';
import { body } from '@guardian/pasteup/typography';

// const makeFallback = (html: string): string | null => {
//     const { window } = new JSDOM(html);
//     const blockquotes = window.document.getElementsByTagName('blockquote');

//     if (blockquotes.length !== 1) {
//         return null;
//     }

//     const q = blockquotes[0];
//     return q.innerHTML;
// };

export const tweetStyle = (pillar: Pillar) => css`
    p {
        ${body(3)};
    }
`;

// tslint:disable:react-no-dangerous-html
export const TweetBlockComponent: React.FC<{
    element: TweetBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    return <div dangerouslySetInnerHTML={{ __html: element.html }} />;
};

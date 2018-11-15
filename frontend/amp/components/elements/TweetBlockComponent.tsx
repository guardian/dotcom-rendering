import React from 'react';
import { JSDOM } from 'jsdom';

const makePlaceholder = (html: string): string | null => {
    const { window } = new JSDOM(html);
    const blockquotes = window.document.getElementsByTagName('blockquote');
    if (blockquotes.length !== 1) return null;
    const q = blockquotes[0];
    return q.innerHTML;
};

// tslint:disable:react-no-dangerous-html
export const TweetBlockComponent: React.SFC<{
    element: TweetBlockElement;
}> = ({ element }) => {
    const placeholderHTML = makePlaceholder(element.html);
    return (
        <amp-twitter
            width="2"
            height={element.hasMedia ? 2 : 1}
            layout="responsive"
            data-tweetid={element.id}
        >
            {placeholderHTML && (
                <blockquote
                    placeholder="true"
                    dangerouslySetInnerHTML={{ __html: placeholderHTML }}
                />
            )}
        </amp-twitter>
    );
};

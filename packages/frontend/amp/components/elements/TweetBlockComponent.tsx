import React from 'react';
import { JSDOM } from 'jsdom';
import { AMPCommon } from '../primitives/primitives';

const makePlaceholder = (html: string): string | null => {
    const { window } = new JSDOM(html);
    const blockquotes = window.document.getElementsByTagName('blockquote');
    if (blockquotes.length !== 1) return null;
    const q = blockquotes[0];
    return q.innerHTML;
};

const DivAmp = (props: AMPCommon) => React.createElement('div', props);

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
                <DivAmp fallback={true}>
                    <blockquote
                        dangerouslySetInnerHTML={{ __html: placeholderHTML }}
                    />
                </DivAmp>
            )}
        </amp-twitter>
    );
};

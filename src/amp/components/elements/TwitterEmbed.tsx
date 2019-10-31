import React from 'react';
import { JSDOM } from 'jsdom';
import { TextStyle } from '@root/src/amp/components/elements/Text';

const makeFallback = (html: string): string | null => {
    const { window } = new JSDOM(html);
    const blockquotes = window.document.getElementsByTagName('blockquote');

    if (blockquotes.length !== 1) {
        return null;
    }

    const q = blockquotes[0];
    return q.innerHTML;
};

// tslint:disable:react-no-dangerous-html
export const TwitterEmbed: React.FC<{
    element: TweetBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const fallbackHTML = makeFallback(element.html);

    return (
        <amp-twitter
            width="2"
            height={element.hasMedia ? 2 : 1}
            layout="responsive"
            data-tweetid={element.id}
        >
            {fallbackHTML && (
                <div placeholder={''} className={TextStyle(pillar)}>
                    <blockquote
                        dangerouslySetInnerHTML={{ __html: fallbackHTML }}
                    />
                </div>
            )}
        </amp-twitter>
    );
};

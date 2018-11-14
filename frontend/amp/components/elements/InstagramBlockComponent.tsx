import React from 'react';

const getShortcode: (url: string) => string = url => {
    const match = /.*\/(.*)\//.exec(url);
    if (match == null) {
        throw new Error('No shortcode could be found for instagram embed.');
    }
    return match[1];
};

export const InstagramBlockComponent: React.SFC<{
    element: InstagramBlockElement;
}> = ({ element }) => {
    const shortcode = getShortcode(element.url);
    return (
        <amp-instagram
            width="1" // Magic numbers, we don't track aspect ratio and instagrams brand is somewhat square based
            height="1" // And if you remove them it'll fill the whole screen
            data-shortcode={shortcode}
            data-captioned={false}
            layout="responsive"
        />
    );
};
/*
About width and height.

The documentation says that these numbers account only for the image.

This doesn't seem correct, from observation, it appears these numbers represent
the total initial space made available for the element.

This space is used intially for the image, and then for the load in of the ig chrome.

The ig chrome is about 200px tall

*/

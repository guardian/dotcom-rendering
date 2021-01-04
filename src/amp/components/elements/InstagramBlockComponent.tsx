import React from 'react';

const getShortcode: (url: string) => string = (url) => {
	const match = /.*\/(.*)\//.exec(url);
	if (match == null) {
		throw new Error('No shortcode could be found for instagram embed.');
	}
	return match[1];
};
/*
About width and height.

The documentation says that these numbers account only for the image.

This doesn't seem correct, from observation, it appears these numbers represent
the total initial space made available for the element.

This space is used intially for the image, and then for the load in of the ig chrome.

The ig chrome is about 250px tall on a piece with caption excluding the text.

So the aspect ratio is either going to be 1.5:1 or 2:1. With hope it reduces jank?

*/
export const InstagramBlockComponent: React.FC<{
	element: InstagramBlockElement;
}> = ({ element }) => {
	const shortcode = getShortcode(element.url);
	return (
		<amp-instagram
			width="1"
			height={element.hasCaption ? '2' : '1.5'}
			data-shortcode={shortcode}
			data-captioned={element.hasCaption} // Not convinced this has an effect.
			layout="responsive"
		/>
	);
};

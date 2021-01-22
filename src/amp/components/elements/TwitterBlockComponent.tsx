import React from 'react';
import { JSDOM } from 'jsdom';
import { TextStyle } from '@root/src/amp/components/elements/TextBlockComponent';

const makeFallback = (html: string): string | null => {
	const { window } = new JSDOM(html);
	const blockquotes = window.document.getElementsByTagName('blockquote');

	if (blockquotes.length !== 1) {
		return null;
	}

	const q = blockquotes[0];
	return q.innerHTML;
};

export const TwitterBlockComponent: React.FC<{
	element: TweetBlockElement;
	pillar: Theme;
}> = ({ element, pillar }) => {
	const fallbackHTML = makeFallback(element.html);

	return (
		<amp-twitter
			width="2"
			height={element.hasMedia ? 2 : 1}
			layout="responsive"
			data-tweetid={element.id}
			data-dnt="true"
		>
			{fallbackHTML && (
				<div placeholder="" className={TextStyle(pillar)}>
					<blockquote
						dangerouslySetInnerHTML={{ __html: fallbackHTML }}
					/>
				</div>
			)}
		</amp-twitter>
	);
};

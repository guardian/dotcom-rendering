import type { FEElement } from '../types/content.ts';

const removeTweetClass = (elements: FEElement[]): FEElement[] =>
	elements.map<FEElement>((element) => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.TweetBlockElement': {
				// Parse the embed block element, find the iframe and add
				// the alt text as a title attribute if it exists
				// https://dequeuniversity.com/tips/provide-iframe-titles
				const withoutTweetClass = element.html.replace(
					'twitter-tweet',
					'nojs-tweet',
				);
				return {
					...element,
					html: withoutTweetClass,
				};
			}

			default:
				return element;
		}
	});

export const enhanceTweets = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: removeTweetClass(block.elements),
		};
	});

import { CAPIElement } from '../types/content';

const removeTweetClass = (elements: CAPIElement[]): CAPIElement[] => {
	const enhanced: CAPIElement[] = [];
	elements.forEach((element) => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.TweetBlockElement':
				// Parse the embed block element, find the iframe and add
				// the alt text as a title attribute if it exists
				// https://dequeuniversity.com/tips/provide-iframe-titles
				const withoutTweetClass = element.html.replace(
					'twitter-tweet',
					'nojs-tweet',
				);
				enhanced.push({
					...element,
					html: withoutTweetClass,
				});
				break;
			default:
				enhanced.push(element);
		}
	});
	return enhanced;
};

export const enhanceTweets = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: removeTweetClass(block.elements),
		};
	});

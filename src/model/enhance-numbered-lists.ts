import { JSDOM } from 'jsdom';

const isFalseH3 = (element: CAPIElement): boolean => {
	if (!element) return false;
	// Checks if this element is a 'false h3' based on the convention: <p><strong><H3 text</strong></p>
	if (
		element._type !== 'model.dotcomrendering.pageElements.TextBlockElement'
	) {
		return false;
	}
	const frag = JSDOM.fragment(element.html);
	if (!frag || !frag.firstElementChild) return false;
	const html = frag.firstElementChild.outerHTML;
	const text = frag.firstElementChild.textContent;
	// The following things must be true for an element to be a faux H3
	const hasPwrapper = frag.firstElementChild.nodeName === 'P';
	const containsStrongtags = frag.firstElementChild.outerHTML.includes(
		'<strong>',
	);
	const doesNotContainLinks = !frag.firstElementChild.outerHTML.includes(
		'<a>',
	);
	const textLength = text?.length;
	const htmlLength = html.length;
	const onlyHasOneStrongTag = textLength === htmlLength - 24;
	const endsStrong = html.substr(htmlLength - 13) === '</strong></p>';

	return (
		hasPwrapper &&
		containsStrongtags &&
		doesNotContainLinks &&
		onlyHasOneStrongTag &&
		endsStrong
	);
};

const extractH3 = (element: CAPIElement): string => {
	// Extract the text based on the convention: <p><strong><H3 text</strong></p>
	const textElement = element as TextBlockElement;
	const frag = JSDOM.fragment(textElement.html);
	if (isFalseH3(element)) {
		return frag.firstElementChild?.textContent || '';
	}
	return '';
};

const isStarRating = (element: CAPIElement): boolean => {
	const isStar = (charactor: string): boolean => {
		return charactor === '★' || charactor === '☆';
	};

	if (!element) return false;
	// Checks if this element is a 'star rating' based on the convention: <p>★★★★☆</p>
	if (element._type !== 'model.dotcomrendering.pageElements.TextBlockElement')
		return false;
	const frag = JSDOM.fragment(element.html);
	const hasPTags = frag?.firstElementChild?.nodeName === 'P';
	const text = frag.textContent || '';
	// Loop the string making sure each letter is a star
	for (const letter of text) {
		if (!isStar(letter)) return false;
	}
	const hasFiveStars = text.length === 5;
	return hasPTags && hasFiveStars;
};

const extractStarCount = (element: CAPIElement): number => {
	const isSelectedStar = (charactor: string): boolean => {
		return charactor === '★';
	};
	// Returns the count of stars
	const textElement = element as TextBlockElement;
	const frag = JSDOM.fragment(textElement.html);
	const text = frag.textContent || '';
	// Loop the string counting selected stars
	let starCount = 0;
	for (const letter of text) {
		if (isSelectedStar(letter)) starCount += 1;
	}
	return starCount;
};

const isImage = (element: CAPIElement): boolean => {
	return (
		element?._type ===
		'model.dotcomrendering.pageElements.ImageBlockElement'
	);
};

const starifyImages = (elements: CAPIElement[]): CAPIElement[] => {
	const starified: CAPIElement[] = [];
	let previousRating: number | undefined;
	elements.forEach((thisElement, index) => {
		switch (thisElement._type) {
			case 'model.dotcomrendering.pageElements.TextBlockElement':
				if (isStarRating(thisElement) && isImage(elements[index + 1])) {
					// Remember this rating so we can add it to the next element
					previousRating = extractStarCount(thisElement);
				} else {
					// Pass through
					starified.push(thisElement);
				}
				break;
			case 'model.dotcomrendering.pageElements.ImageBlockElement':
				if (previousRating !== undefined) {
					// Add this image using the rating we remembered
					starified.push({
						...thisElement,
						starRating: previousRating,
					});
					previousRating = undefined;
				} else {
					// Pass through
					starified.push(thisElement);
				}
				break;
			default:
				// Pass through
				starified.push(thisElement);
		}
	});
	return starified;
};

const inlineStarRatings = (elements: CAPIElement[]): CAPIElement[] => {
	const withStars: CAPIElement[] = [];
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			isStarRating(thisElement)
		) {
			const rating = extractStarCount(thisElement);
			// Inline this image
			withStars.push({
				_type:
					'model.dotcomrendering.pageElements.StarRatingBlockElement',
				elementId: thisElement.elementId,
				rating,
				size: 'large',
			});
		} else {
			// Pass through
			withStars.push(thisElement);
		}
	});
	return withStars;
};

const inlineImages = (elements: CAPIElement[]): CAPIElement[] => {
	// Inline all images
	// Why?
	// Because previously, in lagacy times when we used Frontend to render these articles,
	// we positioned images as thumbnails, off to the left. But more recent designs call for
	// images to be inline. This enhancer helps with legacy content still using `thumbnail`
	const inlined: CAPIElement[] = [];
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			// Inline this image
			inlined.push({
				...thisElement,
				role: 'inline',
			} as ImageBlockElement);
		} else {
			// Pass through
			inlined.push(thisElement);
		}
	});
	return inlined;
};

const addH3s = (elements: CAPIElement[]): CAPIElement[] => {
	/**
	 * Why not just add H3s in Composer?
	 * Truth is, you can't. So to get around this there's a convention that says if
	 * you insert <p><strong>Faux H3!</strong>,</p> then we replace it with a h3 tag
	 * instead.
	 *
	 * Note. H3s don't have any styles so we have to add them. In Frontend, they use
	 * a 'fauxH3' class for this. In DCR we add `globalH3Styles` which was added at
	 * the same time as this code.
	 */
	const withH3s: CAPIElement[] = [];
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			isFalseH3(thisElement)
		) {
			const h3Text = extractH3(thisElement);
			withH3s.push(
				{
					_type:
						'model.dotcomrendering.pageElements.DividerBlockElement',
				},
				{
					...thisElement,
					html: `<h3>${h3Text}</h3>`,
				},
			);
		} else {
			// Pass through
			withH3s.push(thisElement);
		}
	});
	return withH3s;
};

class Enhancer {
	elements: CAPIElement[];

	constructor(elements: CAPIElement[]) {
		this.elements = elements;
	}

	inlineImages() {
		this.elements = inlineImages(this.elements);
		return this;
	}

	addH3s() {
		this.elements = addH3s(this.elements);
		return this;
	}

	starifyImages() {
		this.elements = starifyImages(this.elements);
		return this;
	}

	inlineStarRatings() {
		this.elements = inlineStarRatings(this.elements);
		return this;
	}
}

const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	return (
		new Enhancer(elements)
			// Turn false h3s into real ones
			.addH3s()
			.starifyImages()
			// Turn ascii stars into components
			.inlineStarRatings()
			// Always use role `inline` for images
			.inlineImages().elements
	);
};

export const enhanceNumberedLists = (data: CAPIType): CAPIType => {
	const isNumberedList = data.format.display === 'NumberedListDisplay';

	if (!isNumberedList) {
		return data;
	}

	const enhancedBlocks = data.blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements),
		};
	});

	return {
		...data,
		blocks: enhancedBlocks,
	} as CAPIType;
};

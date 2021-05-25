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
	// The following things must be true for an element to be a faux H3
	const hasPwrapper = frag.firstElementChild.nodeName === 'P';
	const containsStrongtags = frag.firstElementChild.outerHTML.includes(
		'<strong>',
	);
	const doesNotContainLinks = !frag.firstElementChild.outerHTML.includes(
		'<a>',
	);
	const htmlLength = html.length;
	const startStrong = html.substr(0, 11) === '<p><strong>';
	const endsStrong = html.substr(htmlLength - 13) === '</strong></p>';

	return (
		hasPwrapper &&
		containsStrongtags &&
		doesNotContainLinks &&
		startStrong &&
		endsStrong
	);
};

const extractH3 = (element: CAPIElement): string => {
	// Extract the text based on the convention: <p><strong><H3 text</strong></p>
	const textElement = element as TextBlockElement;
	const frag = JSDOM.fragment(textElement.html);
	if (isFalseH3(element)) {
		return (
			frag.firstElementChild?.innerHTML
				.split('<strong>')
				.join('')
				.split('</strong>')
				.join('') || ''
		);
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

const isStarableImage = (element: CAPIElement): boolean => {
	return (
		element?._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement' &&
		element.role !== 'thumbnail'
	);
};

const starifyImages = (elements: CAPIElement[]): CAPIElement[] => {
	const starified: CAPIElement[] = [];
	let previousRating: number | undefined;
	elements.forEach((thisElement, index) => {
		switch (thisElement._type) {
			case 'model.dotcomrendering.pageElements.TextBlockElement':
				if (
					isStarRating(thisElement) &&
					isStarableImage(elements[index + 1])
				) {
					// Remember this rating so we can add it to the next element
					previousRating = extractStarCount(thisElement);
				} else {
					// Pass through
					starified.push(thisElement);
				}
				break;
			case 'model.dotcomrendering.pageElements.ImageBlockElement':
				if (
					previousRating !== undefined &&
					isStarableImage(thisElement)
				) {
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

const makeThumbnailsRound = (elements: CAPIElement[]): CAPIElement[] => {
	const inlined: CAPIElement[] = [];
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
				'model.dotcomrendering.pageElements.ImageBlockElement' &&
			thisElement.role === 'thumbnail'
		) {
			// Make this image round
			inlined.push({
				...thisElement,
				isAvatar: true,
			} as ImageBlockElement);
		} else {
			// Pass through
			inlined.push(thisElement);
		}
	});
	return inlined;
};

const isItemLink = (element: CAPIElement): boolean => {
	if (!element) return false;
	// Checks if this element is a 'item link' based on the convention: <ul> <li>...</li> </ul>
	if (
		element._type !== 'model.dotcomrendering.pageElements.TextBlockElement'
	) {
		return false;
	}
	const frag = JSDOM.fragment(element.html);
	if (!frag || !frag.firstElementChild) return false;

	const hasULWrapper = frag.firstElementChild.nodeName === 'UL';
	const hasOnlyOneChild = frag.firstElementChild.childElementCount === 1;
	const hasLINestedWrapper =
		frag.firstElementChild?.firstElementChild?.nodeName === 'LI';

	return hasULWrapper && hasOnlyOneChild && hasLINestedWrapper;
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
	let previousItem: CAPIElement | undefined;
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			isFalseH3(thisElement)
		) {
			const h3Text = extractH3(thisElement);

			// To avoid having to depend on the ordering of the enhancer (which could easily be a source of bugs)
			// We determine if previous items are `ItemLinkBlockElement` through type and `isItemLink` functions
			const isPreviousItemLink =
				previousItem?._type ===
					'model.dotcomrendering.pageElements.ItemLinkBlockElement' ||
				(previousItem && isItemLink(previousItem));

			withH3s.push(
				{
					_type:
						'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: isPreviousItemLink ? 'loose' : 'tight',
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
		previousItem = thisElement;
	});
	return withH3s;
};

const addItemLinks = (elements: CAPIElement[]): CAPIElement[] => {
	const withItemLink: CAPIElement[] = [];
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			isItemLink(thisElement)
		) {
			withItemLink.push(
				{
					_type:
						'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: 'tight',
				},
				{
					...thisElement,
					_type:
						'model.dotcomrendering.pageElements.ItemLinkBlockElement',
				},
			);
		} else {
			// Pass through
			withItemLink.push(thisElement);
		}
	});
	return withItemLink;
};

const addTitles = (
	elements: CAPIElement[],
	format: CAPIFormat,
): CAPIElement[] => {
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
	const withTitles: CAPIElement[] = [];
	let position = 1;
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.SubheadingBlockElement'
		) {
			const { html } = thisElement;
			withTitles.push(
				{
					_type:
						'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: 'loose',
				},
				{
					_type:
						'model.dotcomrendering.pageElements.NumberedTitleBlockElement',
					elementId: thisElement.elementId,
					position,
					html,
					format,
				},
			);
			position += 1;
		} else {
			// Pass through
			withTitles.push(thisElement);
		}
	});
	return withTitles;
};

class Enhancer {
	elements: CAPIElement[];

	format: CAPIFormat;

	constructor(elements: CAPIElement[], format: CAPIFormat) {
		this.elements = elements;
		this.format = format;
	}

	makeThumbnailsRound() {
		this.elements = makeThumbnailsRound(this.elements);
		return this;
	}

	addTitles() {
		this.elements = addTitles(this.elements, this.format);
		return this;
	}

	addH3s() {
		this.elements = addH3s(this.elements);
		return this;
	}

	addItemLinks() {
		this.elements = addItemLinks(this.elements);
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

const enhance = (
	elements: CAPIElement[],
	format: CAPIFormat,
): CAPIElement[] => {
	return (
		new Enhancer(elements, format)
			// Turn false h3s into real ones
			.addH3s()
			// Add item links
			.addItemLinks()
			// Add numbered titles
			.addTitles()
			// Overlay stars onto images
			.starifyImages()
			// Turn ascii stars into components
			.inlineStarRatings()
			// Thumbnail images should be round
			.makeThumbnailsRound().elements
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
			elements: enhance(block.elements, data.format),
		};
	});

	return {
		...data,
		blocks: enhancedBlocks,
	} as CAPIType;
};

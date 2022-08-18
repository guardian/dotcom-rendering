import { JSDOM } from 'jsdom';

const isStarRating = (element: CAPIElement): boolean => {
	const isStar = (charactor: string): boolean => {
		return charactor === '★' || charactor === '☆';
	};

	if (!element) return false;
	// Checks if this element is a 'star rating' based on the convention: <p>★★★★☆</p>
	if (element._type !== 'model.dotcomrendering.pageElements.TextBlockElement')
		return false;
	const frag = JSDOM.fragment(element.html);
	const hasPTags = frag.firstElementChild?.nodeName === 'P';
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

const isStarableImage = (element: CAPIElement | undefined): boolean => {
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
				_type: 'model.dotcomrendering.pageElements.StarRatingBlockElement',
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

export const isItemLink = (element: CAPIElement): boolean => {
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
		frag.firstElementChild.firstElementChild?.nodeName === 'LI';

	return hasULWrapper && hasOnlyOneChild && hasLINestedWrapper;
};

const removeGlobalH2Styles = (elements: CAPIElement[]): CAPIElement[] => {
	/**
	 * Article pages come with some global style rules, one of which affects h2
	 * tags. But for numbered lists we don't want these styles because we use
	 * these html elements to represents our special titles. Rather than start a
	 * css war, this enhancer uses the `data-ignore` attribute which is a contract
	 * established to allow global styles to be ignored.
	 *
	 * All h2 tags inside an article of Design: NumberedList have this attirbute
	 * set.
	 */
	const withH2StylesIgnored: CAPIElement[] = [];
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.SubheadingBlockElement'
		) {
			withH2StylesIgnored.push({
				...thisElement,
				html: thisElement.html.replace(
					'<h2>',
					'<h2 data-ignore="global-h2-styling">',
				),
			});
		} else {
			// Pass through
			withH2StylesIgnored.push(thisElement);
		}
	});
	return withH2StylesIgnored;
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
					_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: 'tight',
				},
				{
					...thisElement,
					_type: 'model.dotcomrendering.pageElements.ItemLinkBlockElement',
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
					_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: 'loose',
				},
				{
					_type: 'model.dotcomrendering.pageElements.NumberedTitleBlockElement',
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

	removeGlobalH2Styles() {
		this.elements = removeGlobalH2Styles(this.elements);
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
			// Add the data-ignore='global-h2-styling' attribute
			.removeGlobalH2Styles()
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

export const enhanceNumberedLists = (
	blocks: Block[],
	format: CAPIFormat,
): Block[] => {
	const isNumberedList = format.display === 'NumberedListDisplay';

	if (!isNumberedList) {
		return blocks;
	}

	return blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements, format),
		};
	});
};

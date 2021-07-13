import { sanitiseHTML } from '@root/src/model/clean';

// We look in the html field of the atom for a hint for the height of the atom
// We look for an html comment <!-- MobileHeight: 100 --> and if we find it use
// that value for the CSS height of the atom otherwise we use a default height
//
// 150px default height is a fairly safe arbitrary number to avoid excessive
// whitespace but give top-of-page atoms the chance to avoid resizing (or at
// least show a good portion of the atom)

const defaultInteractiveAtomHeight = 150;

// Using the MobileHeight comment is ok (lets be very aware we're creating a
// loosely-defined contract between interactive atoms and AMP here, that should
// really be in CAPI)

const heightRegex = /<!-- MobileHeight: (.*) -->/;

//  The value of <!-- MobileHeight: value --> should be the height of an
//  interactive atom at the widest mobile breakpoint to give a guesstimate to
//  AMP for a reasonable height
//
// It should only be used on interactive atoms that are at the top of articles,
// as it only matters when the bottom of the interactive atom is within the
// viewport (otherwise AMP will auto-resize)
//
// Placeholder images must always exist for atoms that require using the
// MobileHeight comment, otherwise the atom will not show on AMP
//
// Full page interactives should always have both

const getHeight = (html?: string): number => {
	if (html) {
		const getHeightFromComment = heightRegex.exec(html);
		if (
			getHeightFromComment &&
			typeof Number(getHeightFromComment[1]) === 'number'
		) {
			return Number(getHeightFromComment[1]); // Returns [ '<!-- MobileHeight: 100 -->', '100', index: 4, input: 'test<!-- MobileHeight: 100 -->', groups: undefined ]
		}
	}

	return defaultInteractiveAtomHeight;
};
// Some interactives contain HTML with unclosed tags etc. To
// preserve (approximate) parity with Frontend we perform some basic
// cleaning.

const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	elements.map((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.InteractiveAtomBlockElement'
		) {
			element.height = getHeight(element.html);
			element.html = element.html
				? // Allow iframes, this is for youtube embeds in interactives, etc
				  sanitiseHTML(element.html, { ADD_TAGS: ['iframe'] })
				: element.html;
		}
		return element;
	});

	return elements;
};

export const enhanceInteractiveAtomElements = (data: CAPIType): CAPIType => {
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

// The ts.dom interface for FontFaceSet does not contain the .add method
type FontFaceSetWithAdd = FontFaceSet & {
	add?: { (font: FontFace): void };
};

/**
 * clone the whole style element containing the `font-face` declarations
 * from the parent and append it to the iframe's document head.
 */
const cloneFontFaceElement = (
	parentDocument: Document,
	iframe: HTMLIFrameElement,
) => {
	const webfontStyleElementOnParent =
		parentDocument.querySelector('style.webfont');
	if (!webfontStyleElementOnParent) {
		return;
	}
	const clonedStyleElement = webfontStyleElementOnParent.cloneNode(true);
	iframe.contentWindow?.document.head.appendChild(clonedStyleElement);
};

/**
 * Copy a subset of fonts from the parent document to an iframe.
 * If the browser does not support the FontFace.add method,
 * clones the style element with the "webfont" class and appends
 * it to the iframe's document head.
 */
export const addFontsToIframe = (
	parentDocument: Document,
	iframe: HTMLIFrameElement,
	requiredFontNames: string[],
): void => {
	// FontFace.add is not supported (IE), clone the element instead
	const iframeFontFaceSet = iframe.contentDocument?.fonts as
		| undefined
		| FontFaceSetWithAdd;
	if (!iframeFontFaceSet?.add) {
		cloneFontFaceElement(parentDocument, iframe);
		return;
	}

	// get all the fontFaces on the parent matching the list of font names
	const requiredFonts: FontFace[] = [];
	parentDocument.fonts.forEach((fontFace) => {
		if (requiredFontNames.includes(fontFace.family)) {
			requiredFonts.push(fontFace);
		}
	});

	// add the fonts to the iframe
	let usingAddFailed = false;
	requiredFonts.forEach((font) => {
		try {
			if (usingAddFailed) {
				return;
			}
			iframeFontFaceSet.add(font);
		} catch (error) {
			// Safari throws an InvalidModificationError on the add(font) method
			// https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/add#exceptions

			// This may be a Safari bug - the error indicates that the FontFace is already
			// defining in the document with a css @font-face declaration. The parent window
			// has @font-face declarations, but the iframe does not.

			usingAddFailed = true;
			cloneFontFaceElement(parentDocument, iframe);
		}
	});
};

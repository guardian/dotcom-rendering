import { minify } from 'html-minifier';
import { sanitiseHTML } from '../../model/sanitise';

// We don't represent lists in InCopy, so things will just come across with bullet characters.
// These may also be used for emphasis, so bullet characters don't mean list.
const bigBullets = (s: string) =>
	s.replace(/•/g, '<span class="bullet">&bull;</span>');

const clean = (html: string) => {
	const sanitised = sanitiseHTML(html, {
		ADD_TAGS: ['#comment'],
		FORCE_BODY: true,
	});
	const transformed = bigBullets(sanitised);

	return minify(transformed, {
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJS: true,
	});
};

export const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	return elements.map((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.InteractiveAtomBlockElement'
		) {
			element.html = element.html ? clean(element.html) : element.html;
		}
		return element;
	});
};

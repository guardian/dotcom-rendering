import { JSDOM } from 'jsdom';

// Replace dot with empty span
const transformDot = (element: string): string => {
	if (element.includes('•')) {
		element = element.replace(
			new RegExp('[•]', 'g'),
			'<span data-dcr-style="bullet"></span>',
		);
	}
	return element;
};

// Wraps the last dot in a footer
const transformLastDot = (element: string): string => {
	const modified = `<footer>${element}</footer>`;
	return modified.replace(
		new RegExp('[•]', 'g'),
		'<span data-dcr-style="bullet"></span>',
	);
};

// Replace dot with list - This does assume the standfirst will split into 2 pieces
const transformStandFirstDot = (element: string): string => {
	if (element.includes('•')) {
		// Split string into fragments
		const frag = JSDOM.fragment(element);
		// Check for fragment validity
		if (frag.children.length > 0 && frag != null && frag.children != null) {
			for (let i = 0; i < frag.children.length; i += 1) {
				// Find the fragment with the dot
				if (frag.children.item(i)?.textContent?.includes('•')) {
					const temp = frag?.children?.item(i)?.textContent;
					if (temp != null) {
						// Create string array by splitting on the dot
						const stringFragments = temp.split('•');
						// Get last element which had the dot
						const listElement =
							stringFragments[stringFragments.length - 1];
						const finalString: string = '';
						// construct the return string
						return finalString.concat(
							'<p>',
							stringFragments[0],
							'<br ><br >',
							'<ul ><li>',
							listElement,
							'</li><ul>',
							'</p>',
						);
					}
				}
			}
		}
	}
	return element;
};

const checkForDots = (elements: CAPIElement[]): CAPIElement[] => {
	// Loop over elements and check if a dot is in the TextBlockElement
	const enhanced: CAPIElement[] = [];
	elements.map((element, i) => {
		if (
			element._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			element.html.includes('•')
		) {
			if (elements.length - 1 === i) {
				enhanced.push({
					...element,
					html: transformLastDot(element.html),
				});
			} else {
				enhanced.push({
					...element,
					html: transformDot(element.html),
				});
			}
		} else {
			enhanced.push(element);
		}
	});
	return enhanced;
};

export const addDots = (data: CAPIType): CAPIType => {
	data.standfirst = transformStandFirstDot(data.standfirst);
	const enhancedBlocks = data.blocks.map((block: Block) => {
		return {
			...block,
			elements: checkForDots(block.elements),
		};
	});

	return {
		...data,
		blocks: enhancedBlocks,
	} as CAPIType;
};

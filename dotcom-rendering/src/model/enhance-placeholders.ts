export const replacePlaceholders = (
	elem: InteractiveAtomBlockElement,
	variables: Map<string, string>,
): InteractiveAtomBlockElement => {
	if (!elem.html) {
		return elem;
	}

	const replacer = (substring: string, name: string): string => {
		return variables.get(name) || substring;
	};

	// Note: use str.replace with 'g' (global) flag as str.replaceAll not
	// supported in current node version (14.6).
	const re = /\[\[\s*(\w+)\s*\]\]/g;
	elem.html = elem.html.replace(re, replacer);

	return elem;
};

/**
 * generateVariables defines the templated variables we replace. As such, it
 * represents an ongoing contract with interactive atoms; fields should not be
 * removed from it once added so be cautious when thinking about adding new
 * ones.
 */
const buildPlaceholders = (data: CAPIType): Map<string, string> => {
	return new Map(
		Object.entries({
			webPublicationDate: data.webPublicationDateDisplay || '',
			byline: data.author.byline || '',
			webTitle: data.webTitle,
			trailText: data.trailText,
			sectionTag: data.sectionLabel,
			webURL: data.webURL,
			standfirst: data.standfirst,
			// shareLinks: TODO,
		}),
	);
};

/**
 * enhancePlaceholders replaces templated fields in interactive atom elements
 * for interactive pages (format.design === Design.Interactive) only.
 *
 * Supported variables will be replaced within the HTML of any interactive atom
 * elements. Note, this will therefore not work on dynamically loaded or
 * generated markup.
 *
 * Variables are wrapped in square brackets, e.g. [[ webPublicationDate ]].
 * Surrounding whitespace is ignored. E.g. [[webPublicationDate    ]] is fine.
 */
export const enhancePlaceholders = (
	blocks: Block[],
	format: CAPIFormat,
): Block[] => {
	if (format.design !== 'InteractiveDesign') return blocks;

	return blocks.map((block: Block) => {
		return {
			...block,
			elements: block.elements.map((el) => {
				if (
					el._type ===
					'model.dotcomrendering.pageElements.InteractiveAtomBlockElement'
				) {
					// const variables = buildPlaceholders(data);
					// return replacePlaceholders(el, variables);
					return el;
				}

				return el;
			}),
		};
	});
};

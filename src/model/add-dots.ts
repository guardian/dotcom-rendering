// Current fix for incorrect use of Middot

const transformDots = (html: string): string => {
	return html.replace(
		new RegExp('[•]', 'g'),
		'<span data-dcr-style="bullet"></span>',
	);
};

export const addDots = (data: CAPIType): CAPIType => {
	const enhancedBlocks = data.blocks.map((block: Block) => {
		return {
			...block,
			elements: block.elements.map((element: CAPIElement, i: number) => {
				if (
					element._type ===
					'model.dotcomrendering.pageElements.TextBlockElement'
				) {
					return {
						...element,
						html:
							block.elements.length - 1 === i
								? `<footer>${transformDots(
										element.html,
								  )}</footer>`
								: transformDots(element.html),
					};
				}
				return element;
			}),
		};
	});

	return {
		...data,
		blocks: enhancedBlocks,
		standfirst: transformDots(data.standfirst),
	} as CAPIType;
};

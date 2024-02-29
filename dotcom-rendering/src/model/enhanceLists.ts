import type { FEElement } from '../types/content';

const enhance = (element: FEElement): FEElement[] => {
	switch (element._type) {
		case 'model.dotcomrendering.pageElements.ListBlockElement': {
			switch (element.listElementType) {
				case 'KeyTakeaways':
					return [
						{
							_type: 'model.dotcomrendering.pageElements.KeyTakeawaysBlockElement',
							keyTakeaways: element.items.flatMap(
								({ title, list }) => {
									if (title !== undefined) {
										return [
											{
												title,
												/**
												 * @todo Enhance these. We'll probably have
												 * to rewrite `enhanceBlocks` to be
												 * `enhanceElements.
												 */
												body: list,
											},
										];
									}

									return [];
								},
							),
						},
					];
				/**
				 * If it's an unsupported list element, ignore the structure
				 * and return the body elements.
				 */
				default:
					return element.items.flatMap((i) => i.list);
			}
		}
		default:
			return [element];
	}
};

export const enhanceLists = (blocks: Block[]): Block[] =>
	blocks.map((block) => ({
		...block,
		elements: block.elements.flatMap(enhance),
	}));

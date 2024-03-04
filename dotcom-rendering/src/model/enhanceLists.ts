import type { FEElement } from '../types/content';

const enhance =
	(enhanceElements: (elements: FEElement[]) => FEElement[]) =>
	(element: FEElement): FEElement[] => {
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
													body: enhanceElements(list),
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

export const enhanceLists =
	(enhanceElements: (elements: FEElement[]) => FEElement[]) =>
	(elements: FEElement[]): FEElement[] =>
		elements.flatMap(enhance(enhanceElements));

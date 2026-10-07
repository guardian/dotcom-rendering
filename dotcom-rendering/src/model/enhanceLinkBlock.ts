import type { FEElement } from '../types/content';

export const enhanceLinkBlock =
	(livePricingEnabled: boolean) =>
	(elements: FEElement[]): FEElement[] =>
		elements.map((element) => {
			if (
				element._type ===
				'model.dotcomrendering.pageElements.LinkBlockElement'
			) {
				return {
					...element,
					latestPrice: livePricingEnabled
						? element.latestPrice
						: undefined,
				};
			}
			return element;
		});

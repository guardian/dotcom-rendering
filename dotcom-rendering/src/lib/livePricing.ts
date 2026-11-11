import type { FEElement } from '../types/content';

/** Ophan experience: at least one product on the page has a live price */
export const LIVE_PRICING_AVAILABLE = 'live-pricing-available';

/** Ophan experience: at least one live price was presented to the reader */
export const LIVE_PRICING_PRESENTED = 'live-pricing-presented';

/**
 * Whether any product CTA or product button in these elements has a live
 * price (`latestPrice`) supplied by Frontend.
 *
 * Product summaries (e.g. carousels) reference product elements in the
 * article body, so they are covered by checking those product elements.
 *
 * This does not mean the live price is displayed – see `LivePriceDisplay`.
 */
export const hasLivePricing = (elements: FEElement[]): boolean =>
	elements.some((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.ProductBlockElement'
		) {
			return (
				element.productCtas.some((cta) => !!cta.latestPrice) ||
				hasLivePricing(element.content)
			);
		}

		if (
			element._type ===
			'model.dotcomrendering.pageElements.LinkBlockElement'
		) {
			return !!element.latestPrice;
		}

		return false;
	});

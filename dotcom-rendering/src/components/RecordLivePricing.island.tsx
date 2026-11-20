import { useEffect } from 'react';
import { recordExperiences } from '../client/ophan/ophan';
import {
	LIVE_PRICING_AVAILABLE,
	LIVE_PRICING_PRESENTED,
} from '../lib/livePricing';

/**
 * Elements that render a live price are marked with `data-live-price`.
 * Some are in the DOM but hidden (e.g. product cards that swap at
 * breakpoints, or the closed lightbox), so only count visible ones.
 */
const isVisible = (element: Element): boolean =>
	typeof element.checkVisibility === 'function'
		? element.checkVisibility()
		: true;

/**
 * Records in Ophan, against the page view, whether live pricing was:
 * - available: at least one product on this article has a live price.
 *   This island is only rendered on such articles, so this is always sent.
 * - presented: at least one live price is visible on the page.
 *
 * ## Why does this need to be an Island?
 *
 * Ophan tracking and checking element visibility can only happen client side.
 */
export const RecordLivePricing = () => {
	useEffect(() => {
		const isLivePricePresented = [
			...document.querySelectorAll('[data-live-price]'),
		].some(isVisible);

		void recordExperiences('Web', [
			LIVE_PRICING_AVAILABLE,
			...(isLivePricePresented ? [LIVE_PRICING_PRESENTED] : []),
		]);
	}, []);

	// Nothing is rendered by this component
	return null;
};

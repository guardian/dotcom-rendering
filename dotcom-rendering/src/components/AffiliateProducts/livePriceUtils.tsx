import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import type { ReactNode } from 'react';
import type { AffiliateProductPrice, ProductCta } from '../../types/content';

const strikeThroughRegex = /~([^~]+)~(.*)/;

type ParsedProductLabel = {
	struckThrough: string;
	restOfLabel: string;
};

const strikeThroughStyle = css`
	font-weight: normal;
`;

const parseProductLabel = (label: string): ParsedProductLabel | undefined => {
	const match = label.match(strikeThroughRegex);
	const struckThrough = match?.[1];
	const restOfLabel = match?.[2];

	if (isUndefined(struckThrough) || isUndefined(restOfLabel)) {
		return undefined;
	}

	return { struckThrough, restOfLabel };
};

/**
 * Create a struck through React component from a label
 * for a product link button or product CTA
 * that may contain a strikethroughed price
 * @param label the label text that may contain strikethrough eg '~£10~ £5 at Shop'
 */
export const createStrikeThroughProductLabel = (label: string) => {
	const parsedLabel = parseProductLabel(label);

	if (isUndefined(parsedLabel)) {
		return label;
	} else {
		return (
			<>
				<s css={strikeThroughStyle}>{parsedLabel.struckThrough}</s>
				{parsedLabel.restOfLabel}
			</>
		);
	}
};

/**
 * Create accessible label text
 * for a product link button or product CTA
 * that may contain a struck through price
 * @param label the label text that may contain strikethrough eg '~£10~ £5 at Shop'
 */
export const createAccessibleProductLabel = (label: string): string => {
	const parsedLabel = parseProductLabel(label);
	if (isUndefined(parsedLabel)) {
		return label;
	} else {
		return `Was ${parsedLabel.struckThrough}, now ${parsedLabel.restOfLabel.trimStart()}`;
	}
};

export const getProductLinkLabelWithoutPrice = (
	cardCta: ProductCta,
): string => {
	return cardCta.text !== '' ? cardCta.text : `Buy at ${cardCta.retailer}`;
};

export const getProductLinkLabelWithPrice = (cta: ProductCta): string => {
	const overrideLabel = cta.text.trim().length > 0;
	return overrideLabel ? cta.text : `${cta.price} at ${cta.retailer}`;
};

/*
	The logic in this function decides whether or not to silently replace an old price
	with a live one, or to show the old price in strikethrough

	Always silently replace the price if it goes up

	If the price drops by at least 10% and at least £5/$5 show in strikethrough
*/
export const shouldPutOldPriceInStrikethrough = (
	latestPrice: number,
	articlePrice: number,
) => latestPrice <= articlePrice * 0.9 && articlePrice - latestPrice >= 5;

const priceFormatter = new Intl.NumberFormat('en-GB', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const getFormattedLatestPrice = (
	latestPrice: AffiliateProductPrice,
): { numericPrice: number; formattedPrice: string } | undefined => {
	const numericPrice = Number.parseFloat(latestPrice.price);
	if (Number.isNaN(numericPrice)) {
		return undefined;
	}

	return {
		numericPrice,
		formattedPrice: `${latestPrice.currencySymbol}${formatPrice(numericPrice)}`,
	};
};

export const formatPrice = (price: number): string =>
	priceFormatter.format(price).replace(/\.00$/, '');

const priceRegex = /([£$])(\d+,?\d*(\.\d{2})?)/;
export const extractPriceFromLabel = (
	label: string,
):
	| {
			entireMatch: string;
			numericPrice: number;
			currencySymbol: string;
			priceAsString: string;
	  }
	| undefined => {
	const [entireMatch, currencySymbol, price] = label.match(priceRegex) ?? [];

	if (
		isUndefined(entireMatch) ||
		isUndefined(currencySymbol) ||
		isUndefined(price)
	) {
		return undefined;
	}

	return {
		entireMatch,
		numericPrice: Number.parseFloat(price.replace(/,/g, '')),
		currencySymbol,
		priceAsString: price,
	};
};

// Matches the conventional retailer CTA label of {price} at {retailerName}
const priceAtRetailerRegex = new RegExp(`^${priceRegex.source} at .+$`);

/**
 * How a live price was presented to the reader, if at all:
 * - `live` – the live price replaced the article price (including when they are equal)
 * - `strikethrough` – the article price is struck through alongside the live price
 * - `undefined` – no live price was presented, the article price is shown as-is
 *
 * Rendered as the `data-live-price` attribute so that we can track in Ophan
 * whether a live price was actually presented on the page.
 */
export type LivePriceDisplay = 'live' | 'strikethrough' | undefined;

export const applyLatestPriceToLabel = (
	latestPrice: AffiliateProductPrice | undefined,
	label: string,
): { label: string; livePriceDisplay: LivePriceDisplay } => {
	const unchanged = { label, livePriceDisplay: undefined };

	if (isUndefined(latestPrice) || !priceAtRetailerRegex.test(label)) {
		return unchanged;
	}

	const formattedLatestPrice = getFormattedLatestPrice(latestPrice);
	const extractedPrice = extractPriceFromLabel(label);

	if (
		isUndefined(extractedPrice) ||
		isUndefined(formattedLatestPrice) ||
		Number.isNaN(extractedPrice.numericPrice) ||
		extractedPrice.currencySymbol !== latestPrice.currencySymbol
	) {
		return unchanged;
	}

	if (
		shouldPutOldPriceInStrikethrough(
			formattedLatestPrice.numericPrice,
			extractedPrice.numericPrice,
		)
	) {
		return {
			label: label.replace(
				extractedPrice.entireMatch,
				`~${extractedPrice.entireMatch}~ ${formattedLatestPrice.formattedPrice}`,
			),
			livePriceDisplay: 'strikethrough',
		};
	}

	return {
		label: label.replace(
			extractedPrice.entireMatch,
			formattedLatestPrice.formattedPrice,
		),
		livePriceDisplay: 'live',
	};
};

export const rewriteLabelWithLatestPrice = (
	latestPrice: AffiliateProductPrice | undefined,
	label: string,
): string => applyLatestPriceToLabel(latestPrice, label).label;

export const getProductCtaLivePriceDisplay = ({
	price,
	latestPrice,
}: ProductCta): { content: ReactNode; livePriceDisplay: LivePriceDisplay } => {
	const unchanged = { content: price, livePriceDisplay: undefined };

	if (isUndefined(latestPrice)) {
		return unchanged;
	}

	const formattedLatestPrice = getFormattedLatestPrice(latestPrice);
	const numericArticlePrice = Number.parseFloat(price.replace(/[£$,]/g, ''));

	if (
		Number.isNaN(numericArticlePrice) ||
		isUndefined(formattedLatestPrice)
	) {
		return unchanged;
	}

	if (
		shouldPutOldPriceInStrikethrough(
			formattedLatestPrice.numericPrice,
			numericArticlePrice,
		)
	) {
		return {
			content: (
				<>
					<s css={strikeThroughStyle}>{price}</s>{' '}
					{formattedLatestPrice.formattedPrice}
				</>
			),
			livePriceDisplay: 'strikethrough',
		};
	}

	return {
		content: formattedLatestPrice.formattedPrice,
		livePriceDisplay: 'live',
	};
};

export const getProductCtaLivePrice = (cta: ProductCta): ReactNode =>
	getProductCtaLivePriceDisplay(cta).content;

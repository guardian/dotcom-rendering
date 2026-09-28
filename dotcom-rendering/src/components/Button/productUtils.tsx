import { isUndefined } from '@guardian/libs';
import type { AffiliateProductPrice, ProductCta } from '../../types/content';

const strikeThroughRegex = /~([^~]+)~(.*)/;

type ParsedProductLabel = {
	struckThrough: string;
	restOfLabel: string;
};

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
				<s>{parsedLabel.struckThrough}</s>
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

// ToDo: add the logic of how much discount should result in replacing vs adding old price struck through
const shouldPutOldPriceInStrikethrough = (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- see ToDo
	_latestPrice: number,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- see ToDo
	_articlePrice: number,
) => true;

const priceFormatter = new Intl.NumberFormat('en-GB', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

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

	if (!entireMatch || !currencySymbol || !price) {
		return undefined;
	}

	return {
		entireMatch,
		numericPrice: Number.parseFloat(price),
		currencySymbol,
		priceAsString: price,
	};
};

const priceAtRetailerRegex = new RegExp(`^${priceRegex.source} at .+$`);

export const rewriteLabelWithLatestPrice = (
	latestPrice: AffiliateProductPrice | undefined,
	label: string,
) => {
	if (isUndefined(latestPrice) || !priceAtRetailerRegex.test(label)) {
		return label;
	}

	const numericLatestPrice = Number.parseFloat(latestPrice.price);
	const extractedPrice = extractPriceFromLabel(label);

	if (
		isUndefined(extractedPrice) ||
		Number.isNaN(numericLatestPrice) ||
		Number.isNaN(extractedPrice.numericPrice) ||
		extractedPrice.currencySymbol !== latestPrice.currencySymbol
	) {
		return label;
	}

	const formattedLatestPrice = `${latestPrice.currencySymbol}${formatPrice(numericLatestPrice)}`;

	if (
		shouldPutOldPriceInStrikethrough(
			numericLatestPrice,
			extractedPrice.numericPrice,
		)
	) {
		return label.replace(
			extractedPrice.entireMatch,
			`~${extractedPrice.entireMatch}~ ${formattedLatestPrice}`,
		);
	} else {
		return label.replace(extractedPrice.entireMatch, formattedLatestPrice);
	}
};

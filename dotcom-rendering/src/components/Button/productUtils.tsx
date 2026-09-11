import { isUndefined } from '@guardian/libs';
import type { ProductCta } from '../../types/content';

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

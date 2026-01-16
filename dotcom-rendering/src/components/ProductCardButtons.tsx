import type { ProductCta } from '../types/content';
import { LinkElementButton } from './LinkElementButton';

const getLabel = (cta: ProductCta): string => {
	const overrideLabel = cta.text.trim().length > 0;
	return overrideLabel ? cta.text : `${cta.price} at ${cta.retailer}`;
};

export const ProductCardButtons = ({
	productCtas,
}: {
	productCtas: ProductCta[];
}) => (
	<>
		{productCtas.map((productCta, index) => {
			const label = getLabel(productCta);
			return (
				<LinkElementButton
					key={label}
					label={label}
					url={productCta.url}
					minimisePadding={true}
					fullWidthText={productCtas.length > 1}
					priority={index === 0 ? 'Primary' : 'Tertiary'}
					linkType="ProductButton"
					fullwidth={true}
				/>
			);
		})}
	</>
);

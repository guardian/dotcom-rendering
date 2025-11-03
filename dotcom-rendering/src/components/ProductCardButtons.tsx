import type { ProductCta } from '../types/content';
import { ProductLinkButton } from './ProductLinkButton';

const getLabel = (cta: ProductCta): string => {
	const overrideLabel = cta.text.trim().length > 0;
	return overrideLabel ? cta.text : `${cta.price} at ${cta.retailer}`;
};

export const ProductCardButtons = ({
	productCtas,
	dataComponent,
}: {
	productCtas: ProductCta[];
	dataComponent?: string;
}) => (
	<>
		{productCtas.map((productCta, index) => {
			const label = getLabel(productCta);
			return (
				<ProductLinkButton
					key={label}
					label={label}
					url={productCta.url}
					priority={index === 0 ? 'primary' : 'tertiary'}
					fullwidth={true}
					data-component={`${
						dataComponent ?? 'product-card-button'
					}-${index}`}
				/>
			);
		})}
	</>
);

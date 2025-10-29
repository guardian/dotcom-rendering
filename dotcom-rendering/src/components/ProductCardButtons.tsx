import type { ProductCardCta } from './InlineProductCard';
import { ProductLinkButton } from './ProductLinkButton';

export const ProductCardButtons = ({
	productCtas,
	dataComponent,
}: {
	productCtas: ProductCardCta[];
	dataComponent?: string;
}) => {
	return (
		<>
			{productCtas.map((productCta, index) => (
				<ProductLinkButton
					key={productCta.label}
					label={productCta.label}
					url={productCta.url}
					priority={index === 0 ? 'primary' : 'tertiary'}
					fullwidth={true}
					data-component={`${
						dataComponent ?? 'product-card-button'
					}-${index}`}
				/>
			))}
		</>
	);
};

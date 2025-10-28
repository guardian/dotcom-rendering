import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { ProductCardCta } from './ProductElement';
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
					cssOverrides={
						index === 0
							? css`
									width: 100%;
							  `
							: css`
									width: 100%;
									margin-top: ${space[1]}px;
							  `
					}
					data-component={`${
						dataComponent ?? 'product-card-button'
					}-${index}`}
				/>
			))}
		</>
	);
};

import type { ThemeButton } from '@guardian/source/react-components';
import { getProductLinkLabelWithPrice } from '../lib/affiliateLinksUtils';
import type { ProductCta } from '../types/content';
import { ProductLinkButton } from './Button/ProductLinkButton';

export const ProductCardButtons = ({
	productCtas,
	xCustComponentId,
	themeOverrides,
}: {
	productCtas: ProductCta[];
	xCustComponentId?: string;
	themeOverrides?: Partial<ThemeButton>;
}) => (
	<>
		{productCtas.map((productCta, index) => {
			const label = getProductLinkLabelWithPrice(productCta);
			return (
				<ProductLinkButton
					xCustComponentId={xCustComponentId}
					key={label}
					label={label}
					url={productCta.url}
					minimisePadding={true}
					fullWidthText={productCtas.length > 1}
					priority={index === 0 ? 'primary' : 'tertiary'}
					fullwidth={true}
					themeOverrides={themeOverrides}
				/>
			);
		})}
	</>
);

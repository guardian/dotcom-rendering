import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import type { ProductBlockElement } from '../types/content';
import { HorizontalSummaryProductCard } from './HorizontalSummaryProductCard';

export const StackedProducts = ({
	products,
	format,
}: {
	products: ProductBlockElement[];
	format: ArticleFormat;
}) => {
	return (
		<div
			css={[
				css`
					display: grid;
					gap: ${space[4]}px;
				`,
			]}
		>
			{products.map((product: ProductBlockElement, index) => (
				<HorizontalSummaryProductCard
					key={index}
					product={product}
					format={format}
				/>
			))}
		</div>
	);
};

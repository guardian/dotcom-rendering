import { css } from '@emotion/react';
import type { ArticleFormat } from '../lib/articleFormat';
import type { ProductBlockElement } from '../types/content';
import { HorizontalSummaryProductCard } from './HorizontalSummaryProductCard';
import { space } from '@guardian/source/foundations';

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
			{products.map((product: ProductBlockElement) => (
				<HorizontalSummaryProductCard
					product={product}
					format={format}
				/>
			))}
		</div>
	);
};

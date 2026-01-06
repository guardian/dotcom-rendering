import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { palette, textSans15 } from '@guardian/source/foundations';
import { useState } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import type { ProductBlockElement } from '../types/content';
import { HorizontalSummaryProductCard } from './HorizontalSummaryProductCard';

const buttonStyles = css`
	${textSans15};
	color: ${palette.lifestyle[400]};
	font-weight: 700;
	background-color: transparent;
	padding: ${space[4]}px 0px 0px 0px;
	border: none;
	border-bottom: 1px solid ${palette.neutral[86]};
`;

export const StackedProducts = ({
	products,
	format,
}: {
	products: ProductBlockElement[];
	format: ArticleFormat;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<div>
			<div
				css={[
					css`
						display: grid;
						gap: ${space[4]}px;
					`,
				]}
			>
				{products.map(
					(product: ProductBlockElement, index) =>
						(index < 3 || isExpanded) && (
							<HorizontalSummaryProductCard
								key={index}
								product={product}
								format={format}
							/>
						),
				)}
			</div>

			{products.length > 3 && !isExpanded && (
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					css={buttonStyles}
				>
					Show all
				</button>
			)}
		</div>
	);
};

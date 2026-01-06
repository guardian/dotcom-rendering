import { css } from '@emotion/react';
import { palette, space, textSans15 } from '@guardian/source/foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source/react-components';
import { useState } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import type { ProductBlockElement } from '../types/content';
import { HorizontalSummaryProductCard } from './HorizontalSummaryProductCard';

const showAllButtonStyles = css`
	background-color: transparent;
	border: none;
	display: flex;
`;

const showAllTextStyles = css`
	${textSans15};
	color: ${palette.lifestyle[400]};
	font-weight: 700;
	border-bottom: 1px solid ${palette.neutral[86]};
	padding-right: ${space[1]}px;
`;

const cardCounterStyles = css`
	${textSans15};
	color: ${palette.neutral[46]};
	font-weight: 700;
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

			{products.length > 3 && (
				<div
					css={[
						css`
							display: flex;
							justify-content: space-between;
							padding-top: ${space[4]}px;
						`,
					]}
				>
					<button
						onClick={() => setIsExpanded(!isExpanded)}
						css={showAllButtonStyles}
					>
						<p css={showAllTextStyles}>
							{isExpanded ? 'Show less' : 'Show all'}
						</p>
						{isExpanded ? (
							<SvgChevronUpSingle
								size="xsmall"
								theme={{ fill: palette.lifestyle[400] }}
							/>
						) : (
							<SvgChevronDownSingle
								size="xsmall"
								theme={{ fill: palette.lifestyle[400] }}
							/>
						)}
					</button>

					<p css={cardCounterStyles}>
						{isExpanded ? products.length : '3'}/{products.length}
					</p>
				</div>
			)}
		</div>
	);
};

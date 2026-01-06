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

const buttonStyles = css`
	background-color: transparent;
	padding: ${space[4]}px 0px 0px 0px;
	border: none;
	display: flex;
`;

const buttonTextStyles = css`
	${textSans15};
	color: ${palette.lifestyle[400]};
	font-weight: 700;
	border-bottom: 1px solid ${palette.neutral[86]};
	padding-right: ${space[1]}px;
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
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					css={buttonStyles}
				>
					<p css={buttonTextStyles}>
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
			)}
		</div>
	);
};

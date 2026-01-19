import { css } from '@emotion/react';
import { from, space, textSans15 } from '@guardian/source/foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source/react-components';
import { useState } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { ProductBlockElement } from '../types/content';
import { HorizontalSummaryProductCard } from './HorizontalSummaryProductCard';
import { Subheading } from './Subheading';

const showAllButtonStyles = css`
	background-color: transparent;
	border: none;
	display: flex;
`;

const showAllTextStyles = css`
	${textSans15};
	color: ${palette('--product-card-read-more')};
	font-weight: 700;
	text-decoration-line: underline;
	text-decoration-color: ${palette('--product-card-read-more-decoration')};
	text-underline-offset: 20%;
	padding-right: ${space[1]}px;
`;

const cardCounterStyles = css`
	${textSans15};
	color: ${palette('--product-card-count')};
	font-weight: 700;
`;

export const StackedProducts = ({
	products,
	heading,
	format,
}: {
	products: ProductBlockElement[];
	heading: string;
	format: ArticleFormat;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<div>
			<div
				css={[
					css`
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-bottom: ${space[2]}px;
					`,
				]}
			>
				<Subheading format={format} topPadding={false}>
					{heading}
				</Subheading>
				{products.length > 3 && (
					<p css={cardCounterStyles}>
						{isExpanded ? products.length : '3'}/{products.length}
					</p>
				)}
			</div>

			<div
				css={[
					css`
						display: grid;
						gap: ${space[6]}px;

						${from.phablet} {
							gap: ${space[4]}px;
						}
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
								theme={{
									fill: palette('--product-card-read-more'),
								}}
							/>
						) : (
							<SvgChevronDownSingle
								size="xsmall"
								theme={{
									fill: palette('--product-card-read-more'),
								}}
							/>
						)}
					</button>
				</div>
			)}
		</div>
	);
};

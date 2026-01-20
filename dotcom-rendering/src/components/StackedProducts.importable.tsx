import { css } from '@emotion/react';
import { from, space, textSans15 } from '@guardian/source/foundations';
import {
	LinkButton,
	type ThemeButton,
} from '@guardian/source/react-components';
import { useState } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { ProductBlockElement } from '../types/content';
import { HorizontalSummaryProductCard } from './HorizontalSummaryProductCard';
import { Subheading } from './Subheading';

const cardCounterStyles = css`
	${textSans15};
	color: ${palette('--product-card-count')};
	font-weight: 700;
`;

const showAllButtonStyles = css`
	width: 100%;
	margin-top: ${space[6]}px;
`;

export const theme: Partial<ThemeButton> = {
	textTertiary: palette('--product-button-primary-background'),
	borderTertiary: palette('--product-button-primary-background'),
};

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
				<LinkButton
					onClick={() => setIsExpanded(!isExpanded)}
					cssOverrides={showAllButtonStyles}
					priority="tertiary"
					size="small"
					theme={theme}
				>
					{isExpanded ? 'Show less' : `Show all (${products.length})`}
				</LinkButton>
			)}
		</div>
	);
};

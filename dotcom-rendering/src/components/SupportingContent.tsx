import { css } from '@emotion/react';
import { from, until } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { transparentColour } from '../lib/transparentColour';
import type { DCRContainerPalette, DCRSupportingContent } from '../types/front';
import { CardHeadline } from './CardHeadline';

export type Alignment = 'vertical' | 'horizontal';

type Props = {
	supportingContent: DCRSupportingContent[];
	alignment: Alignment;
	containerPalette?: DCRContainerPalette;
	isDynamo?: true;
	parentFormat: ArticleFormat;
};

const wrapperStyles = css`
	position: relative;
	display: flex;
	padding-left: 5px;
	padding-right: 5px;
	padding-bottom: 5px;
	@media (pointer: coarse) {
		padding-bottom: 0;
	}
`;

const directionStyles = (alignment: Alignment) => {
	switch (alignment) {
		case 'horizontal':
			return css`
				flex-direction: column;
				${from.tablet} {
					flex-direction: row;
				}
			`;
		case 'vertical':
			return css`
				flex-direction: column;
			`;
	}
};

const dynamoStyles = css`
	flex-direction: column;
	column-gap: 5px;
	width: 100%;
	margin: 0;

	${from.tablet} {
		padding: 0 5px 5px;
		flex-direction: row;
		position: absolute;
		bottom: 0;
	}
`;

const liStyles = css`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding-top: 2px;
	position: relative;
	margin-top: 8px;
	@media (pointer: coarse) {
		margin-top: 0;
		&:first-child {
			margin-top: 8px;
		}
	}
	${from.tablet} {
		margin-bottom: 4px;
	}
`;

const dynamoLiStyles = (
	format: ArticleFormat,
	containerPalette?: DCRContainerPalette,
) => css`
	background-color: ${transparentColour(
		decidePalette(format, containerPalette).background.dynamoSublink,
		0.875,
	)};
	/* Creates a containing block which allows Ophan heatmap to place bubbles correctly. */
	position: relative;
	border-top: 1px solid;
	/* 20% is arbitrary, but the cards should expand thanks for flex-grow */
	flex: 1 0 25%;
	margin: 0;
`;

const bottomMargin = css`
	${until.tablet} {
		margin-bottom: 8px;
		@media (pointer: coarse) {
			margin-bottom: 0;
		}
	}
`;

const leftMargin = css`
	${from.tablet} {
		margin-left: 10px;
	}
`;

export const SupportingContent = ({
	supportingContent,
	alignment,
	containerPalette,
	isDynamo,
	parentFormat,
}: Props) => {
	return (
		<ul
			css={[
				wrapperStyles,
				isDynamo ? dynamoStyles : directionStyles(alignment),
			]}
		>
			{supportingContent.map((subLink, index, { length }) => {
				// The model has this property as optional but it is very likely
				// to exist
				if (!subLink.headline) return null;
				const shouldPadLeft =
					!isDynamo && index > 0 && alignment === 'horizontal';
				const isLast = index === length - 1;
				return (
					<li
						key={subLink.url}
						css={[
							isDynamo
								? [
										dynamoLiStyles(
											parentFormat,
											containerPalette,
										),
										css`
											border-color: ${decidePalette(
												parentFormat,
												containerPalette,
											).topBar.card};
										`,
								  ]
								: liStyles,
							shouldPadLeft && leftMargin,
							isLast && bottomMargin,
						]}
						data-link-name={`sublinks | ${index + 1}`}
					>
						<CardHeadline
							format={subLink.format}
							size="tiny"
							hideLineBreak={true}
							showLine={true}
							linkTo={subLink.url}
							containerPalette={containerPalette}
							isDynamo={isDynamo}
							headlineText={subLink.headline}
							kickerText={subLink.kickerText}
						/>
					</li>
				);
			})}
		</ul>
	);
};

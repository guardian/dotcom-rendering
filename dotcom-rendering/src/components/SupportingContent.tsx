import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, until } from '@guardian/source/foundations';
import { isUnsupportedFormatForCardWithoutBackground } from '../lib/cardHelpers';
import { palette as themePalette } from '../palette';
import type { DCRContainerPalette, DCRSupportingContent } from '../types/front';
import { CardHeadline } from './CardHeadline';
import { ContainerOverrides } from './ContainerOverrides';
import { FormatBoundary } from './FormatBoundary';

export type Alignment = 'vertical' | 'horizontal';

type Props = {
	supportingContent: DCRSupportingContent[];
	alignment: Alignment;
	containerPalette?: DCRContainerPalette;
	isDynamo?: true;
};

const wrapperStyles = css`
	position: relative;
	display: flex;
	padding: 4px 0;
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
	column-gap: 4px;
	width: 100%;
	padding: 0;
	${from.tablet} {
		margin-top: 4px;
		flex-direction: row;
		position: relative;
		background-color: transparent;
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
		${until.tablet} {
			&:first-child {
				margin-top: 8px;
			}
		}
	}
	${from.tablet} {
		margin-bottom: 4px;
	}
`;

const dynamoLiStyles = css`
	/* Creates a containing block which allows Ophan heatmap to place bubbles correctly. */
	position: relative;
	border-top: 1px solid;
	/* 25% is arbitrary, but the cards should expand thanks for flex-grow */
	flex: 1 1 25%;
	margin-right: 4px;

	&:last-of-type {
		margin-right: 0;
	}
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
}: Props) => {
	return (
		<ContainerOverrides containerPalette={containerPalette}>
			<ul
				className="sublinks"
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

					/** Force the format design to be Standard if sublink format
					 * is not compatible with transparent backgrounds */
					const subLinkFormat = {
						...subLink.format,
						design: isUnsupportedFormatForCardWithoutBackground(
							subLink.format,
						)
							? ArticleDesign.Standard
							: subLink.format.design,
					};

					return (
						<li
							key={subLink.url}
							css={[
								isDynamo
									? [
											dynamoLiStyles,
											css`
												border-color: ${themePalette(
													'--card-border-top',
												)};
											`,
									  ]
									: liStyles,
								shouldPadLeft && leftMargin,
								isLast && bottomMargin,
							]}
							data-link-name={`sublinks | ${index + 1}`}
						>
							<FormatBoundary format={subLinkFormat}>
								<ContainerOverrides
									containerPalette={containerPalette}
								>
									<CardHeadline
										format={subLinkFormat}
										size="tiny"
										hideLineBreak={true}
										showLine={true}
										linkTo={subLink.url}
										isDynamo={isDynamo}
										showPulsingDot={
											subLink.format.design ===
											ArticleDesign.LiveBlog
										}
										isSublink={true}
										headlineText={subLink.headline}
										kickerText={subLink.kickerText}
									/>
								</ContainerOverrides>
							</FormatBoundary>
						</li>
					);
				})}
			</ul>
		</ContainerOverrides>
	);
};

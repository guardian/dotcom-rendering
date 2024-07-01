import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { between, from, space } from '@guardian/source/foundations';
import { isMediaCard } from '../lib/cardHelpers';
import { palette } from '../palette';
import type { DCRContainerPalette, DCRSupportingContent } from '../types/front';
import { CardHeadline } from './CardHeadline';
import { ContainerOverrides } from './ContainerOverrides';
import { FormatBoundary } from './FormatBoundary';

export type Alignment = 'vertical' | 'horizontal';

type Props = {
	supportingContent: DCRSupportingContent[];
	alignment: Alignment;
	containerPalette?: DCRContainerPalette;
	isDynamo?: boolean;
};

const wrapperStyles = css`
	position: relative;
	display: flex;
	padding-top: ${space[3]}px;

	@media (pointer: coarse) {
		padding-bottom: 0;
	}
`;

const directionStyles = (alignment: Alignment) => {
	const linkPaddingVertical = css`
		li a {
			padding-top: ${space[1]}px;
			padding-bottom: ${space[2]}px;
		}
	`;

	const flexColumn = css`
		flex-direction: column;
		${linkPaddingVertical}
	`;

	const flexRow = css`
		flex-direction: row;
		${linkPaddingVertical}

		/** Pad right for each horizontal sublink */
		li a {
			padding-right: ${space[3]}px;
		}
		/** Remove additional padding for last sublink */
		li:last-of-type a {
			padding-right: 0;
		}
	`;

	switch (alignment) {
		case 'horizontal':
			return css`
				${flexColumn}

				${from.tablet} {
					${flexRow}
				}
			`;
		case 'vertical':
			return css`
				${flexColumn}
			`;
	}
};

const lineStyles = css`
	:before {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		content: '';
		border-top: 1px solid ${palette('--card-border-supporting')};
		height: 1px;

		width: 120px;
		${between.tablet.and.desktop} {
			width: 100px;
		}
	}
`;

const dynamoStyles = css`
	flex-direction: column;
	width: 100%;
	padding: 0;
	${from.tablet} {
		padding-top: ${space[1]}px;
		flex-direction: row;
		position: relative;
		background-color: transparent;
	}
`;

const liStyles = css`
	position: relative;
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const dynamoLiStyles = css`
	/* Creates a containing block which allows Ophan heatmap to place bubbles correctly. */
	position: relative;
	/* 25% is arbitrary, but the cards should expand thanks for flex-grow */
	flex: 1 1 25%;
	margin-right: ${space[1]}px;

	&:last-of-type {
		margin-right: 0;
	}
`;

export const SupportingContent = ({
	supportingContent,
	alignment,
	containerPalette,
	isDynamo,
}: Props) => {
	return (
		<ul
			className="sublinks"
			css={[
				wrapperStyles,
				isDynamo ? dynamoStyles : directionStyles(alignment),
			]}
		>
			{supportingContent.map((subLink, index) => {
				// The model has this property as optional but it is very likely
				// to exist
				if (!subLink.headline) return null;

				/** Force the format design to be Standard if sublink format
				 * is not compatible with transparent backgrounds */
				const subLinkFormat = {
					...subLink.format,
					design: isMediaCard(subLink.format)
						? ArticleDesign.Standard
						: subLink.format.design,
				};

				return (
					<li
						key={subLink.url}
						css={[isDynamo ? dynamoLiStyles : liStyles, lineStyles]}
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
									linkTo={subLink.url}
									showPulsingDot={
										subLink.format.design ===
										ArticleDesign.LiveBlog
									}
									headlineText={subLink.headline}
									kickerText={subLink.kickerText}
								/>
							</ContainerOverrides>
						</FormatBoundary>
					</li>
				);
			})}
		</ul>
	);
};

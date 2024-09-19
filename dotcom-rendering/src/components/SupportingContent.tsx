import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, space, until } from '@guardian/source/foundations';
import { isMediaCard } from '../lib/cardHelpers';
import { palette } from '../palette';
import type { DCRContainerPalette, DCRSupportingContent } from '../types/front';
import { CardHeadline } from './CardHeadline';
import { ContainerOverrides } from './ContainerOverrides';
import { FormatBoundary } from './FormatBoundary';

export type Alignment = 'vertical' | 'horizontal';

type Props = {
	supportingContent: DCRSupportingContent[];
	/** Determines if the content is arranged vertically or horizontally */
	alignment: Alignment;
	containerPalette?: DCRContainerPalette;
	isDynamo?: boolean;
	fillBackground?: boolean;
};

/**
 * Returns the column span for the grid layout based on the number of supporting content items.
 *
 * @param {number} contentLength - The number of supporting content items.
 * @returns {number} The column span to use in the grid layout.
 */
const getColumnSpan = (contentLength: number): number => {
	switch (contentLength) {
		case 1:
		case 2:
			return 6;
		case 3:
			return 4;
		case 4:
		default:
			return 3; // Default column span for 4 or more items
	}
};
const baseGrid = css`
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: auto;
	row-gap: ${space[2]}px;
`;

const horizontalGrid = css`
	${from.tablet} {
		grid-template-columns: repeat(12, 1fr);
		column-gap: ${space[5]}px;
	}
`;

const horizontalLineStyle = css`
	margin-top: ${space[3]}px;
	:before {
		position: absolute;
		top: -${space[2]}px;
		left: 0;
		content: '';
		border-top: 1px solid ${palette('--card-border-top')};
		height: 1px;
		width: 50%;
		${from.tablet} {
			width: 100px;
		}
		${from.desktop} {
			width: 140px;
		}
	}
`;

const verticalLineStyle = css`
	/* The last child doesn't need a dividing right line */
	:not(:last-child):after {
		content: '';
		position: absolute;
		top: 0;
		right: -10px; /* Half of the column-gap to center the line */
		height: 100%;
		width: 1px;
		background-color: ${palette('--card-border-supporting')};
	}
`;

const sublinkBaseStyles = css`
	position: relative;
	grid-row: span 1;
`;

const verticalSublinkStyles = css`
	:not(:first-child) {
		${horizontalLineStyle}
	}

	${from.tablet} {
		:first-child {
			${horizontalLineStyle}
		}
	}
`;

const horizontalSublinkStyles = (totalColumns: number) => css`
	grid-column: span ${totalColumns};
	${until.tablet} {
		:not(:first-child) {
			${horizontalLineStyle}
		}
	}

	${from.tablet} {
		${verticalLineStyle}
	}
`;

const wrapperStyles = css`
	position: relative;
	padding-top: ${space[2]}px;
	@media (pointer: coarse) {
		padding-bottom: 0;
	}
`;

const backgroundFill = css`
	/** background fill should only apply to sublinks on mobile breakpoints */
	${until.tablet} {
		padding: 8px;
		background-color: ${palette('--card-sublinks-background')};
	}
`;
export const SupportingContent = ({
	supportingContent,
	alignment,
	containerPalette,
	isDynamo,
	fillBackground = false,
}: Props) => {
	const columnSpan = getColumnSpan(supportingContent.length);
	return (
		<ul
			className="sublinks"
			css={[
				wrapperStyles,
				baseGrid,
				(isDynamo ?? alignment === 'horizontal') && horizontalGrid,
				fillBackground && backgroundFill,
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
						css={[
							sublinkBaseStyles,
							alignment === 'horizontal'
								? horizontalSublinkStyles(columnSpan)
								: verticalSublinkStyles,
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

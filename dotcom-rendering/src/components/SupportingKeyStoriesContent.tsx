import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { ArticleDesign } from '../lib/articleFormat';
import { palette } from '../palette';
import type { DCRContainerPalette, DCRSupportingContent } from '../types/front';
import { CardAge } from './Card/components/CardAge';
import { CardHeadline } from './CardHeadline';
import { ContainerOverrides } from './ContainerOverrides';
import { FormatBoundary } from './FormatBoundary';
import type { Alignment } from './SupportingContent';

type Props = {
	supportingContent: DCRSupportingContent[];
	/** Determines if the content is arranged vertically or horizontally */
	alignment: Alignment;
	containerPalette?: DCRContainerPalette;
	isMedia?: boolean;
	/** Allows sublinks container to have a background colour on mobile screen sizes */
	fillBackgroundOnMobile?: boolean;
	/** Allows sublinks container to have a background colour on desktop screen sizes */
	fillBackgroundOnDesktop?: boolean;
	isStorylines?: boolean;
	dataLinkName?: string;
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
	:not(:first-child) {
		margin-top: ${space[3]}px;
	}
	:not(:first-child)::before {
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

const sublinkBaseStyles = css`
	position: relative;
	grid-row: span 1;
`;

const verticalSublinkStyles = css`
	${horizontalLineStyle}

	${from.tablet} {
		:first-child {
			${horizontalLineStyle}
		}
	}
`;

const horizontalSublinkStyles = (totalColumns: number) => css`
	grid-column: span ${totalColumns};
	${until.tablet} {
		${horizontalLineStyle}
	}
`;

const wrapperStyles = css`
	position: relative;
	@media (pointer: coarse) {
		padding-bottom: 0;
	}
	${until.leftCol} {
		margin-top: ${space[2]}px;
	}
`;

const backgroundFillMobile = (isMedia: boolean) => css`
	${until.tablet} {
		padding: ${space[2]}px;
		padding-bottom: ${space[3]}px;
		background-color: ${isMedia
			? palette('--card-media-sublinks-background')
			: palette('--card-sublinks-background')};
	}
`;

const backgroundFillDesktop = (isMedia: boolean) => css`
	${from.tablet} {
		padding: ${space[0]}px;
		padding-bottom: ${space[3]}px;
		background-color: ${isMedia
			? palette('--card-media-sublinks-background')
			: palette('--card-sublinks-background')};
	}
`;

/** In the storylines section on tag pages, the flex splash is used to display key stories. 
   This is shown as a large image taken from the first article in the group, and the headlines of the first four key articles (include that of the first article).
   Therefore, we don't display an article headline in the conventional sense, these are displayed as "supporting content". 
*/
export const SupportingKeyStoriesContent = ({
	supportingContent,
	alignment,
	containerPalette,
	isMedia = false,
	fillBackgroundOnMobile = false,
	fillBackgroundOnDesktop = false,
	isStorylines = false,
	dataLinkName,
}: Props) => {
	const columnSpan = getColumnSpan(supportingContent.length);
	return (
		<ul
			className="sublinks"
			css={[
				wrapperStyles,
				baseGrid,
				alignment === 'horizontal' && horizontalGrid,
				fillBackgroundOnMobile && backgroundFillMobile(isMedia),
				fillBackgroundOnDesktop && backgroundFillDesktop(isMedia),
			]}
		>
			{supportingContent.map((subLink, index) => {
				// The model has this property as optional but it is very likely to exist
				if (!subLink.headline) return null;

				/** Force the format design to be Standard to ensure
				 * it is compatible with transparent backgrounds */
				const subLinkFormat = {
					...subLink.format,
					design: ArticleDesign.Standard,
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
						data-link-name={`${dataLinkName} | ${index + 1}`}
					>
						<FormatBoundary format={subLinkFormat}>
							<ContainerOverrides
								containerPalette={containerPalette}
							>
								<CardHeadline
									format={{ design: 0, display: 0, theme: 0 }}
									hasInlineKicker={true}
									linkTo={subLink.url}
									headlineText={subLink.headline}
									fontSizes={{
										desktop: 'xsmall',
										mobile: 'xxsmall',
									}}
									isStorylines={isStorylines}
								/>
								<div
									css={css`
										margin-top: ${space[1]}px;
									`}
								>
									<CardAge
										webPublication={{
											date:
												subLink.webPublicationDate ??
												'',
											isWithinTwelveHours: false,
										}}
										isTagPage={true}
										isStorylines={true}
									/>
								</div>
							</ContainerOverrides>
						</FormatBoundary>
					</li>
				);
			})}
		</ul>
	);
};

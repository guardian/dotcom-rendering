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
	padding-top: ${space[2]}px;

	@media (pointer: coarse) {
		padding-bottom: 0;
	}
`;

const flexColumn = css`
	flex-direction: column;
`;

const flexRowFromTablet = css`
	${from.tablet} {
		flex-direction: row;
	}
`;

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

const liStyles = css`
	position: relative;
	display: flex;
	flex-direction: column;
	flex: 1;

	a {
		flex: 1;
		padding-top: ${space[1]}px;
		padding-bottom: ${space[2]}px;
		padding-right: ${space[2]}px;
	}

	/** Remove right padding for last sublink */
	&:last-of-type a {
		padding-right: 0;
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
				flexColumn,
				(isDynamo ?? alignment === 'horizontal') && flexRowFromTablet,
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
						css={[liStyles, lineStyles]}
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

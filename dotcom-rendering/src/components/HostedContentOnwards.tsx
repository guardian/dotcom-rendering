import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSans17,
	textSansBold20,
	textSansBold24,
	until,
} from '@guardian/source/foundations';
import { grid } from '../grid';
import { removeMediaRulePrefix, useMatchMedia } from '../lib/useMatchMedia';
import { palette } from '../palette';
import type { TrailType } from '../types/trails';
import { HostedContentOnwardsCard } from './HostedContentOnwardsCard';
import { ScrollableCarousel } from './ScrollableCarousel';

type HostedContentOnwardsProps = {
	trails: TrailType[];
	brandName: string;
	isGalleryPage?: boolean;
};

const headerStyles = css`
	margin-bottom: ${space[1]}px;
	border-top: ${space[2]}px solid
		var(--accent-colour, ${sourcePalette.neutral[86]});
`;

const headingStyles = css`
	${textSans17}
	padding-top: ${space[2]}px;
	color: ${palette('--onward-text')};

	span {
		${textSansBold20}
		display: block;
		color: var(--accent-colour);
	}
`;

const stackedCardsStyles = css`
	display: flex;
	flex-direction: column;
`;

const stackedCardWrapper = css`
	width: 100%;
	border-top: 2px solid ${palette('--onward-content-border')};
	padding-top: ${space[2]}px;
	padding-bottom: ${space[2]}px;

	&:last-of-type {
		padding-bottom: 0;
	}
`;

const cardsContainerStyles = css`
	${grid.column.centre}
	position: relative;
	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
	${from.leftCol} {
		&::before {
			content: '';
			position: absolute;
			left: -11px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--onward-content-border')};
		}
		ul {
			padding-left: 0;
		}
	}
`;

const galleryHeadingStyles = css`
	color: ${palette('--article-text')};
	${textSansBold24};
	padding-bottom: ${space[3]}px;
	padding-top: ${space[1]}px;
`;

export const HostedContentOnwards = ({
	trails,
	brandName,
	isGalleryPage,
}: HostedContentOnwardsProps) => {
	const isBelowTabletBreakpoint = useMatchMedia(
		removeMediaRulePrefix(until.tablet),
	);
	return isGalleryPage ? (
		/** Hosted gallery specific onwards */
		<section
			css={css`
				${grid.paddedContainer}
				background-color: ${palette('--article-background')};
				padding-top: ${space[1]}px;
				padding-bottom: ${space[6]}px;
				${from.tablet} {
					padding-top: 0;
					border-left: 1px solid ${palette('--onward-content-border')};
					border-right: 1px solid
						${palette('--onward-content-border')};
				}
			`}
		>
			<h2 css={galleryHeadingStyles}>Related content</h2>
			<div css={cardsContainerStyles}>
				<ScrollableCarousel
					carouselLength={trails.length}
					isBelowTabletBreakpoint={isBelowTabletBreakpoint}
					sectionId="series"
					visibleCarouselSlidesOnMobile={2}
					visibleCarouselSlidesOnTablet={3}
				>
					{trails.map((trail) => {
						return (
							<ScrollableCarousel.Item
								key={trail.url}
								isStackingCarousel={true}
								borderColour={palette(
									'--onward-content-border',
								)}
							>
								<HostedContentOnwardsCard
									trail={trail}
									isGalleryPage={isGalleryPage}
								/>
							</ScrollableCarousel.Item>
						);
					})}
				</ScrollableCarousel>
			</div>
		</section>
	) : (
		/** Non gallery onwards */
		<section>
			<header css={headerStyles}>
				<h2 css={headingStyles}>
					More from
					<span>{brandName}</span>
				</h2>
			</header>

			<ul css={stackedCardsStyles}>
				{trails.map((trail) => {
					return (
						<li key={trail.url} css={stackedCardWrapper}>
							<HostedContentOnwardsCard trail={trail} />
						</li>
					);
				})}
			</ul>
		</section>
	);
};

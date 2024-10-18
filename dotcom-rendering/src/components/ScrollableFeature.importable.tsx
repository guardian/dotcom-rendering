import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { palette } from '../palette';
import type { DCRFrontCard } from '../types/front';
import { FeatureCard } from './Card/FeatureCard';
import { ScrollableCarousel } from './ScrollableCarousel';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: 'lazy' | 'eager';
};

const itemStyles = css`
	scroll-snap-align: start;
	grid-area: span 1;
	position: relative;
`;

const verticalLineStyles = css`
	:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: -10px;
		width: 1px;
		background-color: ${palette('--card-border-top')};
		transform: translateX(-50%);
	}
	${from.leftCol} {
		:first-child::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: -10px;
			width: 1px;
			background-color: ${palette('--card-border-top')};
			transform: translateX(-50%);
		}
	}
`;

/**
 * A container used on fronts to display a carousel of feature cards
 *
 * ## Why does this need to be an Island?
 *
 * The carouselling arrow buttons need to run javascript.
 */
export const ScrollableFeature = ({ trails, imageLoading }: Props) => {
	return (
		<ScrollableCarousel carouselLength={trails.length}>
			{trails.map((trail) => {
				return (
					<li key={trail.url} css={[itemStyles, verticalLineStyles]}>
						<FeatureCard
							format={trail.format}
							headlineText={trail.headline}
							kickerText={trail.kickerText}
							avatarUrl={trail.avatarUrl}
							byline={trail.byline}
							image={trail.image}
							imageLoading={imageLoading}
							linkTo={trail.url}
							dataLinkName={trail.dataLinkName}
							isExternalLink={trail.isExternalLink}
							showQuotedHeadline={trail.showQuotedHeadline}
						/>
					</li>
				);
			})}
		</ScrollableCarousel>
	);
};

import { ArticleDesign } from '../lib/articleFormat';
import type {
	AspectRatio,
	DCRContainerPalette,
	DCRFrontCard,
} from '../types/front';
import { FeatureCard } from './FeatureCard';
import { ScrollableCarousel } from './ScrollableCarousel';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	absoluteServerTimes: boolean;
	imageLoading: 'lazy' | 'eager';
	aspectRatio: AspectRatio;
};

/**
 * A container used on fronts to display a carousel of small cards
 *
 * ## Why does this need to be an Island?
 *
 * The carouselling arrow buttons need to run javascript.
 */
export const ScrollableFeature = ({
	trails,
	containerPalette,
	absoluteServerTimes,
	imageLoading,
	aspectRatio,
}: Props) => {
	return (
		<ScrollableCarousel
			carouselLength={trails.length}
			visibleCardsOnMobile={1}
			visibleCardsOnTablet={3}
		>
			{trails.map((card) => {
				return (
					<ScrollableCarousel.Item key={card.url}>
						<FeatureCard
							linkTo={card.url}
							format={card.format}
							headlineText={card.headline}
							byline={card.byline}
							showByline={card.showByline}
							webPublicationDate={card.webPublicationDate}
							kickerText={card.kickerText}
							/** TODO check if the pulsing dot should be be supported */
							showPulsingDot={
								card.format.design === ArticleDesign.LiveBlog
							}
							/** TODO - implement show age */
							showClock={false}
							image={card.image}
							isPlayableMediaCard={true}
							starRating={card.starRating}
							dataLinkName={card.dataLinkName}
							discussionApiUrl={card.discussionApiUrl}
							discussionId={card.discussionId}
							mainMedia={card.mainMedia}
							isExternalLink={card.isExternalLink}
							// branding={card.branding}
							containerPalette={containerPalette}
							absoluteServerTimes={absoluteServerTimes}
							imageLoading={imageLoading}
							aspectRatio={aspectRatio}
							imageSize="feature"
							headlineSizes={{
								desktop: 'xsmall',
								tablet: 'xxsmall',
								mobile: 'xsmall',
							}}
						/>
					</ScrollableCarousel.Item>
				);
			})}
		</ScrollableCarousel>
	);
};

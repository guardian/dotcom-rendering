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
	serverTime?: number;
	imageLoading: 'lazy' | 'eager';
	aspectRatio: AspectRatio;
	collectionId: number;
	/** Feature flag for the labs redesign work */
	showLabsRedesign?: boolean;
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
	serverTime,
	imageLoading,
	aspectRatio,
	collectionId,
	showLabsRedesign = false,
}: Props) => {
	return (
		<ScrollableCarousel
			carouselLength={trails.length}
			visibleCarouselSlidesOnMobile={1}
			visibleCarouselSlidesOnTablet={3}
		>
			{trails.map((card) => {
				const isLoopingVideo =
					card.mainMedia?.type === 'SelfHostedVideo' &&
					card.mainMedia.format === 'Loop';

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
							showClock={false}
							image={card.image}
							canPlayInline={isLoopingVideo ? false : true}
							starRating={card.starRating}
							dataLinkName={card.dataLinkName}
							discussionApiUrl={card.discussionApiUrl}
							discussionId={card.discussionId}
							mainMedia={card.mainMedia}
							isExternalLink={card.isExternalLink}
							branding={card.branding}
							containerPalette={containerPalette}
							serverTime={serverTime}
							imageLoading={imageLoading}
							aspectRatio={aspectRatio}
							imageSize="feature"
							headlineSizes={{
								desktop: 'xsmall',
								tablet: 'xxsmall',
								mobile: 'xsmall',
							}}
							trailText={undefined}
							collectionId={collectionId}
							isNewsletter={card.isNewsletter}
							showQuotes={card.showQuotedHeadline}
							showVideo={card.showVideo}
							showLabsRedesign={showLabsRedesign}
						/>
					</ScrollableCarousel.Item>
				);
			})}
		</ScrollableCarousel>
	);
};

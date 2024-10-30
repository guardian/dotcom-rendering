import { Picture } from 'fixtures/generated/dcr-articles/Picture';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { FeatureCard } from './FeatureCard';
import { ScrollableCarousel } from './ScrollableCarousel';
import { CardPicture } from './CardPicture';
import { MainMedia } from 'src/types/mainMedia';
import { css } from '@emotion/react';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	absoluteServerTimes: boolean;
	imageLoading: 'lazy' | 'eager';
};

/**
 * A container used on fronts to display a carousel of small cards
 *
 * ## Why does this need to be an Island?
 *
 * The carouselling arrow buttons need to run javascript.
 */

const getMedia = ({
	imageUrl,
	imageAltText,
	mainMedia,
	isPlayableMediaCard,
}: {
	imageUrl?: string;
	imageAltText?: string;
	mainMedia?: MainMedia;
	isPlayableMediaCard?: boolean;
}) => {
	if (mainMedia && mainMedia.type === 'Video' && isPlayableMediaCard) {
		return {
			type: 'video',
			mainMedia,
			...(imageUrl && { imageUrl }),
		} as const;
	}
	if (imageUrl) {
		return { type: 'picture', imageUrl, imageAltText } as const;
	}
	return undefined;
};

export const ScrollableFeature = ({
	trails,
	containerPalette,
	absoluteServerTimes,
	imageLoading,
}: Props) => {
	return (
		<ScrollableCarousel
			carouselLength={trails.length}
			visibleCardsOnMobile={1}
			visibleCardsOnTablet={3}
		>
			{trails.map((card) => {
				const media = getMedia({
					imageUrl: card.image?.src,
					imageAltText: card.image?.altText,
					mainMedia: card.mainMedia,
					isPlayableMediaCard: false,
				});
				return (
					<ScrollableCarousel.Item key={card.url}>
						<FeatureCard
							linkTo={card.url}
							format={card.format}
							headlineText={card.headline}
							byline={card.byline}
							showByline={card.showByline}
							showQuotedHeadline={card.showQuotedHeadline}
							webPublicationDate={card.webPublicationDate}
							kickerText={card.kickerText}
							showPulsingDot={
								false
							} /** check if this can be supported */
							showClock={false}
							image={card.image}
							isPlayableMediaCard={true}
							starRating={card.starRating}
							dataLinkName={card.dataLinkName}
							discussionApiUrl={card.discussionApiUrl}
							discussionId={card.discussionId}
							mainMedia={card.mainMedia}
							isExternalLink={card.isExternalLink}
							branding={card.branding}
							containerPalette={containerPalette}
							absoluteServerTimes={absoluteServerTimes}
							imageLoading={imageLoading}
							aspectRatio="4:5"
							cardType="carousel"
							imageSize={'feature'}
							headlineSizes={{ desktop: 'xsmall' }}
						/>
					</ScrollableCarousel.Item>
				);
			})}
		</ScrollableCarousel>
	);
};

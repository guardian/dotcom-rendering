import { ArticleDesign } from '../lib/articleFormat';
import type {
	AspectRatio,
	DCRContainerPalette,
	DCRFrontCard,
} from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';
import { FeatureCard } from './FeatureCard';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	serverTime?: number;
	aspectRatio: AspectRatio;
	collectionId: number;
	/** Feature flag for the labs redesign work */
	showLabsRedesign?: boolean;
};

/**
 * Displays two feature cards. Also known as a "stacked" feature container.
 *
 * On small screens the cards are displayed at full-width, one after the other.
 * This is opposed to other types of containers that display feature cards in carousels.
 */
export const StaticFeatureTwo = ({
	trails,
	containerPalette,
	serverTime,
	imageLoading,
	aspectRatio,
	collectionId,
	showLabsRedesign = false,
}: Props) => {
	const cards = trails.slice(0, 2);
	return (
		<UL direction="row">
			{cards.map((card) => {
				const isLoopingVideo = card.mainMedia?.type === 'LoopVideo';

				return (
					<LI
						stretch={false}
						percentage="50%"
						key={card.url}
						padSides={true}
						showDivider={true}
					>
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
							trailText={undefined}
							serverTime={serverTime}
							imageLoading={imageLoading}
							aspectRatio={aspectRatio}
							imageSize="feature-large"
							headlineSizes={{ desktop: 'small' }}
							supportingContent={card.supportingContent}
							collectionId={collectionId}
							isNewsletter={card.isNewsletter}
							showQuotes={card.showQuotedHeadline}
							showVideo={card.showVideo}
							showLabsRedesign={showLabsRedesign}
						/>
					</LI>
				);
			})}
		</UL>
	);
};

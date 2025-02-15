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
	absoluteServerTimes: boolean;
	aspectRatio: AspectRatio;
};
export const StaticFeatureTwo = ({
	trails,
	containerPalette,
	absoluteServerTimes,
	imageLoading,
	aspectRatio,
}: Props) => {
	const cards = trails.slice(0, 2);

	return (
		<UL direction="row">
			{cards.map((card) => {
				return (
					<LI
						stretch={false}
						percentage={'50%'}
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
							canPlayInline={true}
							starRating={card.starRating}
							dataLinkName={card.dataLinkName}
							discussionApiUrl={card.discussionApiUrl}
							discussionId={card.discussionId}
							mainMedia={card.mainMedia}
							isExternalLink={card.isExternalLink}
							// branding={card.branding}
							containerPalette={containerPalette}
							trailText={undefined}
							absoluteServerTimes={absoluteServerTimes}
							imageLoading={imageLoading}
							aspectRatio={aspectRatio}
							imageSize="feature-large"
							headlineSizes={{ desktop: 'small' }}
							supportingContent={card.supportingContent}
							galleryCount={card.galleryCount}
						/>
					</LI>
				);
			})}
		</UL>
	);
};

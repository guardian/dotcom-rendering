import { ArticleDesign } from '../lib/articleFormat';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';
import { FeatureCard } from './FeatureCard';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	absoluteServerTimes: boolean;
};
export const StaticFeatureTwo = ({
	trails,
	containerPalette,
	absoluteServerTimes,
	imageLoading,
}: Props) => {
	const cards = trails.splice(0, 2);

	return (
		<>
			<UL
				direction="row"
				padBottom={true}
				showTopBar={true}
				isFlexibleContainer={true}
			>
				{cards.map((card) => {
					return (
						<LI
							stretch={false}
							percentage={'50%'}
							key={card.url}
							padSides={true}
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
									card.format.design ===
									ArticleDesign.LiveBlog
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
								trailText={card.trailText}
								absoluteServerTimes={absoluteServerTimes}
								imageLoading={imageLoading}
								aspectRatio="4:5"
								imageSize="feature-large"
								headlineSizes={{
									desktop: 'medium',
									tablet: 'small',
								}}
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};

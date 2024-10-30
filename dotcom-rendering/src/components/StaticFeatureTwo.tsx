import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';
import { FeatureCard } from './FeatureCard';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes: boolean;
	showImage?: boolean;
};
export const StaticFeatureTwo = ({
	trails,
	containerPalette,
	showAge,
	absoluteServerTimes,
	imageLoading,
	showImage = true,
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
				{cards.map((card, cardIndex) => {
					return (
						<LI
							stretch={false}
							percentage={'50%'}
							key={card.url}
							padSides={true}
						>
							{
								/* <FrontCard
								trail={card}
								containerPalette={containerPalette}
								showAge={showAge}
								absoluteServerTimes={absoluteServerTimes}
								image={showImage ? card.image : undefined}
								imageLoading={imageLoading}
								imagePositionOnDesktop={'bottom'}
								/* we don't want to support sublinks on standard cards here so we hard code to undefined */
								// 	supportingContent={undefined}
								// 	imageSize={'medium'}
								// 	aspectRatio="5:4"
								// 	kickerText={card.kickerText}
								// 	showLivePlayable={false}
								// 	showTopBarDesktop={false}
								// 	showTopBarMobile={true}
								// />
								// */}
							}
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
								showAge={showAge}
								absoluteServerTimes={absoluteServerTimes}
								imageLoading={imageLoading}
								aspectRatio="4:5"
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};

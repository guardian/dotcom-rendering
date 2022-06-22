import { ArticleDesign } from '@guardian/libs';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedSmallSlowIII = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const smallTrails = trails.slice(0, 3);

	return (
		<UL direction="row">
			{smallTrails.map((trail, index) => {
				return (
					<LI
						padSides={true}
						showDivider={index > 0}
						padBottomOnMobile={true}
						percentage={index === 0 ? '50%' : '25%'}
						key={trail.url}
					>
						<Card
							containerPalette={containerPalette}
							showAge={showAge}
							linkTo={trail.url}
							format={trail.format}
							headlineText={trail.headline}
							headlineSize={index === 0 ? 'large' : 'medium'}
							byline={trail.byline}
							showByline={trail.showByline}
							showQuotes={
								trail.format.design === ArticleDesign.Comment ||
								trail.format.design === ArticleDesign.Letter
							}
							webPublicationDate={trail.webPublicationDate}
							kickerText={trail.kickerText}
							showPulsingDot={
								trail.format.design === ArticleDesign.LiveBlog
							}
							showSlash={true}
							showClock={false}
							imageUrl={trail.image}
							imagePosition="top"
							imagePositionOnMobile={index === 0 ? 'top' : 'left'}
							imageSize="medium"
							mediaType={trail.mediaType}
							mediaDuration={trail.mediaDuration}
							starRating={trail.starRating}
							branding={trail.branding}
							dataLinkName={trail.dataLinkName}
							discussionId={trail.discussionId}
							trailText={
								index === 0 ? undefined : trail.trailText
							}
						/>
					</LI>
				);
			})}
		</UL>
	);
};

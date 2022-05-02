import { ArticleDesign } from '@guardian/libs';
import { decideFrontPalette } from '../lib/decideFrontPalette';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
};

export const FixedSmallSlowIV = ({ trails, containerPalette }: Props) => {
	const slicedTrails = trails.slice(0, 4);

	return (
		<UL direction="row">
			{slicedTrails.map((trail, index) => {
				return (
					<LI
						padSides={true}
						showDivider={index > 0}
						padBottomOnMobile={true}
					>
						<Card
							frontPalette={
								containerPalette &&
								decideFrontPalette(containerPalette)
							}
							linkTo={trail.url}
							format={trail.format}
							headlineText={trail.headline}
							trailText={trail.trailText}
							headlineSize="medium"
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
							imagePositionOnMobile="left"
							imageSize="medium"
							mediaType={trail.mediaType}
							mediaDuration={trail.mediaDuration}
							commentCount={trail.commentCount}
							starRating={trail.starRating}
							branding={trail.branding}
						/>
					</LI>
				);
			})}
		</UL>
	);
};

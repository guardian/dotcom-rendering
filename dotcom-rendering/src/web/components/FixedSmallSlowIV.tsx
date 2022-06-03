import { ArticleDesign } from '@guardian/libs';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	collectionId: string;
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	hasMore: boolean;
};

export const FixedSmallSlowIV = ({
	collectionId,
	trails,
	containerPalette,
	showAge,
	hasMore,
}: Props) => {
	const slicedTrails = trails.slice(0, 4);

	return (
		<>
			<UL direction="row">
				{slicedTrails.map((trail, index) => {
					return (
						<LI
							padSides={true}
							showDivider={index > 0}
							padBottomOnMobile={true}
						>
							<Card
								containerPalette={containerPalette}
								showAge={showAge}
								linkTo={trail.url}
								format={trail.format}
								headlineText={trail.headline}
								headlineSize="medium"
								byline={trail.byline}
								showByline={trail.showByline}
								showQuotes={
									trail.format.design ===
										ArticleDesign.Comment ||
									trail.format.design === ArticleDesign.Letter
								}
								webPublicationDate={trail.webPublicationDate}
								kickerText={trail.kickerText}
								showPulsingDot={
									trail.format.design ===
									ArticleDesign.LiveBlog
								}
								showSlash={true}
								showClock={false}
								imageUrl={trail.image}
								imagePosition="top"
								imagePositionOnMobile="left"
								imageSize="medium"
								mediaType={trail.mediaType}
								mediaDuration={trail.mediaDuration}
								starRating={trail.starRating}
								branding={trail.branding}
								dataLinkName={trail.dataLinkName}
								discussionId={trail.discussionId}
							/>
						</LI>
					);
				})}
			</UL>
			{hasMore && <span data-show-more-placeholder={collectionId} />}
		</>
	);
};

import { ArticleDesign } from '@guardian/libs';
import type { DCRContainerPalette } from '../../types/front';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedMediumSlowVI = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const topTrails = trails.slice(0, 2);
	const bottomTrails = trails.slice(2, 6);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{topTrails.map((trail, index) => {
					return (
						<LI
							key={trail.url}
							padSides={true}
							showDivider={index > 0}
							padBottomOnMobile={index === 0 ? true : false}
							percentage={index === 0 ? '75%' : '25%'}
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
									trail.format.design ===
										ArticleDesign.Comment ||
									trail.format.design === ArticleDesign.Letter
								}
								webPublicationDate={trail.webPublicationDate}
								kickerText={trail.kickerText}
								trailText={
									index === 0 ? trail.trailText : undefined
								}
								showPulsingDot={
									trail.format.design ===
									ArticleDesign.LiveBlog
								}
								showSlash={true}
								showClock={false}
								imageUrl={trail.image}
								imagePosition={index === 0 ? 'right' : 'top'}
								imagePositionOnMobile={
									index === 0 ? 'top' : 'left'
								}
								imageSize={index === 0 ? 'large' : 'medium'}
								mediaType={trail.mediaType}
								mediaDuration={trail.mediaDuration}
								starRating={trail.starRating}
								branding={trail.branding}
								dataLinkName={trail.dataLinkName}
								discussionId={trail.discussionId}
								snapData={trail.snapData}
							/>
						</LI>
					);
				})}
			</UL>
			<UL direction="row">
				{bottomTrails.map((trail, index) => {
					return (
						<LI
							key={trail.url}
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
								headlineSize="small"
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
								snapData={trail.snapData}
								discussionId={trail.discussionId}
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};

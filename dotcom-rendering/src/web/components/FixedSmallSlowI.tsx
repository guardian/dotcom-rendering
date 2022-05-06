import { ArticleDesign } from '@guardian/libs';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: TrailType[];
};

export const FixedSmallSlowI = ({ trails }: Props) => {
	const primary = trails[0];

	return (
		<UL direction="row">
			<LI padSides={true} showDivider={false} padBottomOnMobile={true}>
				<Card
					linkTo={primary.url}
					format={primary.format}
					headlineText={primary.headline}
					trailText={primary.trailText}
					headlineSize="medium"
					byline={primary.byline}
					showByline={primary.showByline}
					showQuotes={
						primary.format.design === ArticleDesign.Comment ||
						primary.format.design === ArticleDesign.Letter
					}
					webPublicationDate={primary.webPublicationDate}
					kickerText={primary.kickerText}
					showPulsingDot={
						primary.format.design === ArticleDesign.LiveBlog
					}
					showSlash={true}
					showClock={false}
					imageUrl={primary.image}
					imagePosition="top"
					imagePositionOnMobile="left"
					imageSize="medium"
					mediaType={primary.mediaType}
					mediaDuration={primary.mediaDuration}
					commentCount={primary.commentCount}
					starRating={primary.starRating}
					branding={primary.branding}
					type={primary.type}
					enriched={primary.enriched}
				/>
			</LI>
		</UL>
	);
};

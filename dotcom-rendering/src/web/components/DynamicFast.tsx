import { ArticleDesign } from '@guardian/libs';

import { Card } from './Card/Card';
import { UL } from './Card/components/UL';
import { LI } from './Card/components/LI';

type Props = {
	trails: TrailType[];
};

export const DynamicFast = ({ trails }: Props) => {
	const primary = trails[0];
	const secondary = trails[1];
	// TODO: These divisions are based on assunmed rules for how content is placed in these columns but this needs confirmation
	// Current assumptions
	// - The boosted third card is standalone
	// - The middle column has exactly three items
	// - The last column has exactly three items
	const third = trails[2];
	const groups = [trails.slice(3, 6), trails.slice(7, 12)];

	return (
		<>
			<UL direction="row" bottomMargin={true}>
				<LI padSides={true} percentage="75%">
					<Card
						linkTo={primary.url}
						format={primary.format}
						headlineText={primary.headline}
						trailText={primary.trailText}
						headlineSize="large"
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
						imagePosition="right"
						imageSize="large"
						mediaType={primary.mediaType}
						mediaDuration={primary.mediaDuration}
						commentCount={primary.commentCount}
						starRating={primary.starRating}
						branding={primary.branding}
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
					percentage="25%"
				>
					<Card
						linkTo={secondary.url}
						format={secondary.format}
						headlineText={secondary.headline}
						headlineSize="medium"
						byline={secondary.byline}
						showByline={secondary.showByline}
						showQuotes={
							secondary.format.design === ArticleDesign.Comment ||
							secondary.format.design === ArticleDesign.Letter
						}
						webPublicationDate={secondary.webPublicationDate}
						kickerText={secondary.kickerText}
						showPulsingDot={
							secondary.format.design === ArticleDesign.LiveBlog
						}
						showSlash={true}
						showClock={false}
						imageUrl={secondary.image}
						mediaType={secondary.mediaType}
						mediaDuration={secondary.mediaDuration}
						commentCount={secondary.commentCount}
						starRating={secondary.starRating}
						branding={secondary.branding}
					/>
				</LI>
			</UL>
			<UL direction="row" bottomMargin={true}>
				<LI percentage="50%" padSides={true} bottomMargin={false}>
					<Card
						linkTo={third.url}
						format={third.format}
						headlineText={third.headline}
						headlineSize="large"
						byline={third.byline}
						showByline={third.showByline}
						showQuotes={
							third.format.design === ArticleDesign.Comment ||
							third.format.design === ArticleDesign.Letter
						}
						webPublicationDate={third.webPublicationDate}
						kickerText={third.kickerText}
						showPulsingDot={
							third.format.design === ArticleDesign.LiveBlog
						}
						showSlash={true}
						showClock={false}
						imageUrl={third.image}
						mediaType={third.mediaType}
						mediaDuration={third.mediaDuration}
						commentCount={third.commentCount}
						starRating={third.starRating}
						branding={third.branding}
					/>
				</LI>
				{groups.map((group) => {
					return (
						<LI
							percentage="25%"
							showDivider={true}
							showTopMarginWhenStacked={true}
							padSides={true}
						>
							<UL direction="column">
								{group.map((card, cardIndex) => {
									const isLastCard =
										cardIndex === group.length - 1;
									return (
										<LI
											stretch={true}
											bottomMargin={!isLastCard}
										>
											<Card
												linkTo={card.url}
												format={card.format}
												headlineText={card.headline}
												headlineSize="small"
												byline={card.byline}
												showByline={card.showByline}
												showQuotes={
													card.format.design ===
														ArticleDesign.Comment ||
													card.format.design ===
														ArticleDesign.Letter
												}
												webPublicationDate={
													card.webPublicationDate
												}
												kickerText={card.kickerText}
												showPulsingDot={
													card.format.design ===
													ArticleDesign.LiveBlog
												}
												showSlash={true}
												showClock={false}
												mediaType={card.mediaType}
												mediaDuration={
													card.mediaDuration
												}
												commentCount={card.commentCount}
												starRating={card.starRating}
												branding={card.branding}
											/>
										</LI>
									);
								})}
							</UL>
						</LI>
					);
				})}
			</UL>
		</>
	);
};

import { ArticleDesign } from '@guardian/libs';
import type { DCRContainerPalette } from '../../types/front';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showImages?: boolean;
};

function isFirstInRow(cardIndex: number) {
	// We don't want to show dividers on the first card from the left on each
	// row. Given that there are 4 columns, the leftmost cards will have
	// indexes 0, 4, 8, etc.
	// Modulo ( m % n ) gives the 'remainder' when m is divided by n.
	return cardIndex % 4 === 0;
}

function hasNoCardBelowIt(cardIndex: number, trailsLength: number) {
	/**
		When there are 4 columns of cards being wrapped row-wise, the last
		4 cards will not have a card directly below them, e.g.

		When the last row is full:		│	And also when it's not:
			┌──┐┌──┐┌──┐┌──┐			│		┌──┐┌──┐┌──┐┌──┐
			│  ││  ││  ││  │			│		│  ││  ││-4││-3│
			└──┘└──┘└──┘└──┘			│		└──┘└──┘└──┘└──┘
			┌──┐┌──┐┌──┐┌──┐			│		┌──┐┌──┐
			│-4││-3││-2││-1│			│		│-2││-1│
			└──┘└──┘└──┘└──┘			│		└──┘└──┘
										│
	*/
	return cardIndex >= trailsLength - 4;
}

export const ExtraCardsContainer = ({
	trails,
	containerPalette,
	showImages = false,
}: Props) => {
	const percentage = '25%';
	return (
		<>
			<UL direction="row" padBottom={true} wrapCards={true}>
				{trails.map((trail, index) => (
					<LI
						padSides={true}
						percentage={percentage}
						padBottom={true}
						showDivider={!isFirstInRow(index)}
						key={trail.url}
						offsetBottomPaddingOnDivider={hasNoCardBelowIt(
							index,
							trails.length,
						)}
					>
						<Card
							containerPalette={containerPalette}
							showAge={true}
							linkTo={trail.url}
							format={trail.format}
							headlineText={trail.headline}
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
							imageUrl={showImages ? trail.image : undefined}
							mediaType={trail.mediaType}
							mediaDuration={trail.mediaDuration}
							starRating={trail.starRating}
							branding={trail.branding}
							discussionId={trail.discussionId}
						/>
					</LI>
				))}
			</UL>
		</>
	);
};

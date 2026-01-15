import { isUndefined, storage } from '@guardian/libs';
import { Button } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { isMediaCard } from '../lib/cardHelpers';
import { getDemotedState } from '../lib/personalisationHistory';
import type { DCRPillarCards } from '../model/createCollection';
import { getCuratedList, PILLARS } from '../model/createCollection';
import type {
	AspectRatio,
	DCRContainerLevel,
	DCRContainerPalette,
	DCRFrontCard,
	PillarBucket,
} from '../types/front';
import { LI } from './Card/components/LI';
import type { MediaPositionType } from './Card/components/MediaWrapper';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';
// eslint-disable-next-line import/no-cycle
import { FrontCard } from './FrontCard';

const getMediaPositionOnDesktop = (
	format: ArticleFormat,
	isNewsletter: boolean,
): MediaPositionType => {
	if (isMediaCard(format) || isNewsletter) {
		return 'top';
	}

	return 'bottom';
};

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	serverTime?: number;
	showImage?: boolean;
	aspectRatio: AspectRatio;
	containerLevel?: DCRContainerLevel;
	isInStarRatingVariant?: boolean;
	backfillBucket?: PillarBucket;
};

export const ViewHistoryKey = 'gu.history.viewedCards';

const filterBuckets = (
	backfillBucket: PillarBucket,
	viewedList: string[],
): DCRPillarCards => {
	const filteredPillarBuckets: DCRPillarCards = {
		opinion: [],
		sport: [],
		culture: [],
		lifestyle: [],
	};

	for (const pillar of PILLARS) {
		filteredPillarBuckets[pillar] =
			backfillBucket[pillar]?.filter(
				(card) => !viewedList.includes(card.url),
			) ?? [];
	}

	return filteredPillarBuckets;
};

export const DynamicMediumFour = ({
	trails,
	containerPalette,
	showAge,
	serverTime,
	imageLoading,
	showImage = true,
	aspectRatio,
	containerLevel = 'Primary',
	isInStarRatingVariant,
	backfillBucket,
}: Props) => {
	const [orderedTrails, setOrderedTrails] = useState<DCRFrontCard[]>(
		trails.slice(0, 4),
	);
	const [shouldShowHighlights, setShouldShowHighlights] =
		useState<boolean>(false);

	useEffect(() => {
		// if we don't have a backfill bucket, show the default 4
		if (isUndefined(backfillBucket)) {
			setShouldShowHighlights(true);
			return;
		}
		// // get local state
		const viewedCards = getDemotedState();

		// if we don't have a view history, show the default 4
		if (isUndefined(viewedCards) || viewedCards.length === 0) {
			setShouldShowHighlights(true);
			return;
		}
		const filteredBuckets = filterBuckets(backfillBucket, viewedCards);

		const newTrails = getCuratedList(filteredBuckets);
		if (newTrails.length > 0) {
			setOrderedTrails(newTrails);
		}

		setShouldShowHighlights(true);
	}, [trails, backfillBucket]);

	return (
		<>
			<Button
				type={'button'}
				onClick={() => storage.local.remove(ViewHistoryKey)}
			>
				{' '}
				reset storage
			</Button>
			<UL direction="row">
				{orderedTrails.map((card, cardIndex) => {
					return (
						<LI
							stretch={false}
							percentage="25%"
							key={card.url}
							padSides={true}
							showDivider={cardIndex > 0}
							isVisible={shouldShowHighlights}
						>
							<FrontCard
								trail={card}
								containerPalette={containerPalette}
								containerType="static/medium/4"
								showAge={showAge}
								serverTime={serverTime}
								image={showImage ? card.image : undefined}
								imageLoading={imageLoading}
								mediaPositionOnDesktop={getMediaPositionOnDesktop(
									card.format,
									!!card.isNewsletter,
								)}
								mediaPositionOnMobile="left"
								headlineSizes={undefined}
								/* we don't want to support sublinks on standard cards here so we hard code to undefined */
								supportingContent={undefined}
								mediaSize="medium"
								aspectRatio={aspectRatio}
								kickerText={card.kickerText}
								showLivePlayable={false}
								showTopBarDesktop={false}
								showTopBarMobile={
									cardIndex !== 0 ||
									(containerLevel === 'Primary' &&
										!isMediaCard(card.format))
								}
								canPlayInline={false}
								isInStarRatingVariant={isInStarRatingVariant}
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};

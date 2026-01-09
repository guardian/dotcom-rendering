import { isUndefined } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import type { ArticleFormat } from '../lib/articleFormat';
import { isMediaCard } from '../lib/cardHelpers';
import { getDemotedState, trackView } from '../lib/personalisationHistory';
import { useBetaAB } from '../lib/useAB';
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
	showImage?: boolean;
	aspectRatio: AspectRatio;
	containerLevel?: DCRContainerLevel;
	pillarBuckets?: PillarBucket;
};

const filterBuckets = (
	pillarBuckets: PillarBucket,
	demotedCards: string[],
): DCRPillarCards => {
	const filteredPillarBuckets: DCRPillarCards = {
		opinion: [],
		sport: [],
		culture: [],
		lifestyle: [],
	};

	for (const pillar of PILLARS) {
		filteredPillarBuckets[pillar] =
			pillarBuckets[pillar]?.filter(
				(card) => !demotedCards.includes(card.url),
			) ?? [];
	}

	return filteredPillarBuckets;
};

export const PersonalisedMediumFour = ({
	trails,
	containerPalette,
	showAge,
	imageLoading,
	showImage = true,
	aspectRatio,
	containerLevel = 'Primary',
	pillarBuckets,
}: Props) => {
	const [orderedTrails, setOrderedTrails] = useState<DCRFrontCard[]>(
		trails.slice(0, 4),
	);
	const [shouldShowCards, setShouldShowCards] = useState<boolean>(false);

	const [hasTrackedView, setHasTrackedView] = useState<boolean>(false);

	const abTests = useBetaAB();
	const isInPersonalisationVariant =
		abTests?.isUserInTestGroup(
			'fronts-and-curation-personalised-container',
			'variant',
		) ?? false;

	useEffect(() => {
		if (isUndefined(pillarBuckets) || !isInPersonalisationVariant) {
			setShouldShowCards(true);
			return;
		}

		const demotedCards = getDemotedState() ?? [];

		if (demotedCards.length === 0) {
			setShouldShowCards(true);
			return;
		}

		const filteredBuckets = filterBuckets(pillarBuckets, demotedCards);

		const curatedTrails = getCuratedList(filteredBuckets);

		if (curatedTrails.length > 0) {
			setOrderedTrails(curatedTrails);
		}

		/* Fire a view event only if the container has been personalised */
		void submitComponentEvent(
			{
				component: {
					componentType: 'CONTAINER',
					id: `reordered-container`,
				},
				action: 'VIEW',
			},
			'Web',
		);

		setShouldShowCards(true);
	}, [trails, pillarBuckets, isInPersonalisationVariant]);

	useEffect(() => {
		if (shouldShowCards && !hasTrackedView && isInPersonalisationVariant) {
			trackView(orderedTrails);
			setHasTrackedView(true);
		}
	}, [
		orderedTrails,
		hasTrackedView,
		shouldShowCards,
		isInPersonalisationVariant,
	]);

	return (
		<>
			<UL direction="row">
				{orderedTrails.map((card, cardIndex) => {
					return (
						<LI
							stretch={false}
							percentage="25%"
							key={card.url}
							padSides={true}
							showDivider={cardIndex > 0}
							isVisible={shouldShowCards}
						>
							<FrontCard
								trail={card}
								containerPalette={containerPalette}
								containerType="static/medium/4"
								showAge={showAge}
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
								isInPersonalisationVariant={
									isInPersonalisationVariant
								}
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};

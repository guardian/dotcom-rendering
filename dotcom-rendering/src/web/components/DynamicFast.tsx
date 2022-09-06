/* eslint-disable @typescript-eslint/naming-convention -- because underscores work here*/
import { css } from '@emotion/react';
import { until } from '@guardian/source-foundations';
import type { DCRContainerPalette, DCRGroupedTrails } from '../../types/front';
import type { TrailType } from '../../types/trails';
import {
	Card100PictureRight,
	Card100PictureTop,
	Card25_Card75,
	Card50_Card50,
	Card75_Card25,
	shouldPadWrappableRows,
} from '../lib/dynamicSlices';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

/**
 * Not sure where to start? This PR documents a lot of the key features
 * https://github.com/guardian/dotcom-rendering/pull/5427
 *
 * Also check out DynamicFast.stories.tsx & check it out on storybook,
 * it's a great way to learn about the business logic!
 */

type Props = {
	groupedTrails: DCRGroupedTrails;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

/* ._________________.________.________.
 * |#################|########|________|
 * |#################|########|________|
 * |#################|________|________|
 * |#################|________|________|
 * |_________________|________|________|
 */
const Card50_ColumnOfThreeCards25_ColumnOfFiveCards = ({
	cards,
	showAge,
	containerPalette,
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	if (!cards[0]) return null;

	const big = cards[0];
	const columnOne = cards.slice(1, 4);
	const columnTwo = cards.slice(4, 10);

	const manualUlStyles = css`
		position: relative;
		display: flex;
		flex-direction: column;
		flex-basis: 50%;
		flex-grow: 1;
		${until.tablet} {
			flex-basis: 100%;
		}
	`;

	return (
		<UL direction="row">
			<LI percentage="50%">
				<FrontCard
					trail={big}
					starRating={big.starRating}
					containerPalette={containerPalette}
					showAge={showAge}
					supportingContent={big.supportingContent}
					headlineSize="large"
					trailText={big.trailText}
					imageUrl={big.image}
					imagePosition="top"
					imagePositionOnMobile="top"
				/>
			</LI>
			<LI percentage="50%">
				{/**
				 * These row & columns are a little outside of the standard of what the standard
				 * LI and UL components we have support - it made more sense to manually create the CSS for this use case
				 * than to expand & muddy the APIs of both components to support this layout type.
				 */}
				<li
					css={css`
						position: relative;
						display: flex;
						flex-basis: 100%;
						flex-wrap: wrap;
					`}
				>
					<ul css={manualUlStyles}>
						{columnOne.map((card, cardIndex) => {
							return (
								<LI
									key={card.url}
									showDivider={true}
									padSides={true}
									padBottom={cardIndex < columnOne.length - 1}
									padBottomOnMobile={
										// If there are cards in the second col, we always want padding
										columnTwo.length > 0 ||
										cardIndex < columnOne.length - 1
									}
								>
									{/* The first card shows an image */}
									{cardIndex === 0 ? (
										<FrontCard
											trail={card}
											starRating={card.starRating}
											containerPalette={containerPalette}
											showAge={showAge}
											supportingContent={
												card.supportingContent
											}
											headlineSize="medium"
											imageUrl={card.image}
											imagePosition="top"
											imagePositionOnMobile="left"
										/>
									) : (
										<FrontCard
											trail={card}
											starRating={card.starRating}
											containerPalette={containerPalette}
											showAge={showAge}
											imageUrl={undefined}
											headlineSize="small"
										/>
									)}
								</LI>
							);
						})}
					</ul>
					<ul css={manualUlStyles}>
						{columnTwo.map((card, cardIndex) => {
							return (
								<LI
									key={card.url}
									showDivider={true}
									padSides={true}
									padBottom={cardIndex < columnTwo.length - 1}
									padBottomOnMobile={
										cardIndex < columnTwo.length - 1
									}
								>
									<FrontCard
										trail={card}
										starRating={card.starRating}
										containerPalette={containerPalette}
										showAge={showAge}
										imageUrl={undefined}
										headlineSize="small"
									/>
								</LI>
							);
						})}
					</ul>
				</li>
			</LI>
		</UL>
	);
};

const ColumnOfThreeCards25_ColumnOfThreeCards25_ColumnOfThreeCards25_ColumnOfThreeCards25 =
	({
		cards,
		showAge,
		containerPalette,
	}: {
		cards: TrailType[];
		showAge?: boolean;
		containerPalette?: DCRContainerPalette;
	}) => {
		return (
			<UL direction="row" wrapCards={true}>
				{cards.map((card, cardIndex) => {
					return (
						<LI
							key={card.url}
							percentage="25%"
							stretch={true}
							showDivider={true}
							padSides={true}
							padBottom={shouldPadWrappableRows(
								cardIndex,
								cards.length,
								4,
							)}
							padBottomOnMobile={cardIndex < cards.length - 1}
						>
							<FrontCard
								trail={card}
								starRating={card.starRating}
								containerPalette={containerPalette}
								showAge={showAge}
								imageUrl={undefined}
								headlineSize="small"
							/>
						</LI>
					);
				})}
			</UL>
		);
	};

const Card25_ColumnOfCards25_ColumnOfThreeCards25_ColumnOfThreeCards25 = ({
	cards,
	showAge,
	containerPalette,
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	if (!cards[0]) return null;
	const big = cards[0];
	const remaining = cards.slice(1, 10);

	return (
		<UL direction="row" wrapCards={true}>
			<LI
				key={big.url}
				percentage={`25%`}
				padSides={true}
				padBottomOnMobile={remaining.length > 0}
				showDivider={false}
			>
				<FrontCard
					trail={big}
					starRating={big.starRating}
					containerPalette={containerPalette}
					showAge={showAge}
					supportingContent={big.supportingContent}
					headlineSize="medium"
					imageUrl={big.image}
				/>
			</LI>
			<LI percentage="75%">
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								key={card.url}
								percentage="33.333%"
								stretch={true}
								showDivider={true}
								padSides={true}
								padBottom={shouldPadWrappableRows(
									cardIndex,
									cards.length,
									3,
								)}
								padBottomOnMobile={
									cardIndex < remaining.length - 1
								}
							>
								<FrontCard
									trail={card}
									starRating={card.starRating}
									containerPalette={containerPalette}
									showAge={showAge}
									imageUrl={undefined}
									headlineSize="small"
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card25_Card25_ColumnOfThreeCards25_ColumnOfThreeCards25 = ({
	cards,
	showAge,
	containerPalette,
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	const bigs = cards.slice(0, 2);
	const remaining = cards.slice(2, 8);

	return (
		<UL direction="row" wrapCards={true}>
			{bigs.map((card, cardIndex) => {
				return (
					<LI
						key={card.url}
						percentage={`25%`}
						padSides={true}
						padBottomOnMobile={
							remaining.length > 0 || cardIndex < bigs.length - 1
						}
						showDivider={cardIndex !== 0}
					>
						<FrontCard
							trail={card}
							starRating={card.starRating}
							containerPalette={containerPalette}
							showAge={showAge}
							supportingContent={card.supportingContent}
							headlineSize="medium"
							imageUrl={card.image}
						/>
					</LI>
				);
			})}

			<LI percentage="50%">
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								key={card.url}
								percentage="50%"
								stretch={true}
								showDivider={true}
								padSides={true}
								padBottom={shouldPadWrappableRows(
									cardIndex,
									cards.length,
									3,
								)}
								padBottomOnMobile={
									cardIndex < remaining.length - 1
								}
							>
								<FrontCard
									trail={card}
									starRating={card.starRating}
									containerPalette={containerPalette}
									showAge={showAge}
									imageUrl={undefined}
									headlineSize="small"
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card25_Card25_Card25_ColumnOfThreeCards25 = ({
	cards,
	showAge,
	containerPalette,
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	const bigs = cards.slice(0, 3);
	const remaining = cards.slice(3, 6);

	return (
		<UL direction="row" wrapCards={true}>
			{bigs.map((card, cardIndex) => {
				return (
					<LI
						key={card.url}
						percentage={`25%`}
						padSides={true}
						padBottomOnMobile={
							remaining.length > 0 || cardIndex < bigs.length - 1
						}
						showDivider={cardIndex !== 0}
					>
						<FrontCard
							trail={card}
							starRating={card.starRating}
							containerPalette={containerPalette}
							showAge={showAge}
							supportingContent={card.supportingContent}
							headlineSize="medium"
							imageUrl={card.image}
						/>
					</LI>
				);
			})}

			<LI percentage="25%">
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								key={card.url}
								percentage="100%"
								stretch={true}
								showDivider={true}
								padSides={true}
								padBottom={shouldPadWrappableRows(
									cardIndex,
									cards.length,
									3,
								)}
								padBottomOnMobile={
									cardIndex < remaining.length - 1
								}
							>
								<FrontCard
									trail={card}
									starRating={card.starRating}
									containerPalette={containerPalette}
									showAge={showAge}
									imageUrl={undefined}
									headlineSize="small"
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card25_Card25_Card25_Card25 = ({
	cards,
	showAge,
	containerPalette,
}: {
	cards: TrailType[];
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	const bigs = cards.slice(0, 4);

	return (
		<UL direction="row" wrapCards={true}>
			{bigs.map((card, cardIndex) => {
				return (
					<LI
						key={card.url}
						percentage={`25%`}
						padSides={true}
						padBottomOnMobile={cardIndex < bigs.length - 1}
						showDivider={cardIndex !== 0}
					>
						<FrontCard
							trail={card}
							starRating={card.starRating}
							containerPalette={containerPalette}
							showAge={showAge}
							supportingContent={card.supportingContent}
							headlineSize="medium"
							imageUrl={card.image}
						/>
					</LI>
				);
			})}
		</UL>
	);
};

export const DynamicFast = ({
	groupedTrails,
	containerPalette,
	showAge,
}: Props) => {
	let firstSliceLayout:
		| undefined // If there are no very bigs or huges, there is no first slice
		| 'oneHuge'
		| 'oneVeryBig'
		| 'twoVeryBigs'
		| 'TwoVeryBigsFirstBoosted'
		| 'TwoVeryBigsSecondBoosted';

	let firstSliceCards: TrailType[] = [];
	// Any trails not used in the first slice are demoted to here
	let secondSliceGroupedTrails: DCRGroupedTrails = { ...groupedTrails };

	// Decide the layout and contents for the first slice, demoting any remaining cards to the second slice
	if (groupedTrails.huge.length > 0) {
		firstSliceLayout = 'oneHuge';
		firstSliceCards = groupedTrails.huge.slice(0, 1);
		secondSliceGroupedTrails = {
			...groupedTrails,
			huge: groupedTrails.huge.slice(1),
		};
	} else if (groupedTrails.veryBig.length === 1) {
		firstSliceLayout = 'oneVeryBig';
		firstSliceCards = groupedTrails.veryBig.slice(0, 1);
		secondSliceGroupedTrails = {
			...groupedTrails,
			veryBig: groupedTrails.veryBig.slice(1),
		};
	} else if (groupedTrails.veryBig.length > 1) {
		if (groupedTrails.veryBig[0].isBoosted) {
			firstSliceLayout = 'TwoVeryBigsFirstBoosted';
		} else if (groupedTrails.veryBig[1].isBoosted) {
			firstSliceLayout = 'TwoVeryBigsSecondBoosted';
		} else {
			firstSliceLayout = 'twoVeryBigs';
		}
		firstSliceCards = groupedTrails.veryBig.slice(0, 2);
		secondSliceGroupedTrails = {
			...groupedTrails,
			veryBig: groupedTrails.veryBig.slice(2),
		};
	}

	let secondSliceLayout:
		| 'twoOrMoreBigsFirstBoosted'
		| 'fourBigs'
		| 'threeBigs'
		| 'twoBigs'
		| 'oneBig'
		| 'noBigs';

	let secondSliceCards: TrailType[] = [];
	const bigs = [
		// Demote any left over 'huge' or 'veryBig' grouped cards
		...secondSliceGroupedTrails.huge,
		...secondSliceGroupedTrails.veryBig,
		...secondSliceGroupedTrails.big,
	];

	switch (bigs.length) {
		case 0: {
			secondSliceLayout = 'noBigs';
			secondSliceCards = [
				...secondSliceGroupedTrails.standard.slice(0, 12),
			];
			break;
		}
		case 1: {
			secondSliceLayout = 'oneBig';
			secondSliceCards = [
				...bigs.slice(0, 1),
				...secondSliceGroupedTrails.standard.slice(0, 9),
			];
			break;
		}
		case 2: {
			if (bigs[0].isBoosted) {
				secondSliceLayout = 'twoOrMoreBigsFirstBoosted';
				secondSliceCards = [
					...bigs,
					...secondSliceGroupedTrails.standard.slice(0, 7),
				];
			} else {
				secondSliceLayout = 'twoBigs';
				secondSliceCards = [
					...bigs.slice(0, 2),
					...secondSliceGroupedTrails.standard.slice(0, 6),
				];
			}
			break;
		}
		case 3: {
			if (bigs[0].isBoosted) {
				secondSliceLayout = 'twoOrMoreBigsFirstBoosted';
				secondSliceCards = [
					...bigs,
					...secondSliceGroupedTrails.standard.slice(0, 6),
				];
			} else {
				secondSliceLayout = 'twoBigs';
				secondSliceCards = [
					...bigs.slice(0, 2),
					...secondSliceGroupedTrails.standard.slice(0, 3),
				];
			}
			break;
		}
		default: {
			if (bigs[0].isBoosted) {
				secondSliceLayout = 'twoOrMoreBigsFirstBoosted';
				secondSliceCards = [
					...bigs,
					...secondSliceGroupedTrails.standard.slice(0, 5),
				];
			} else {
				secondSliceLayout = 'fourBigs';
				secondSliceCards = [...bigs.slice(0, 4)];
			}
			break;
		}
	}

	const FirstSlice = () => {
		switch (firstSliceLayout) {
			case 'oneHuge':
				return (
					<Card100PictureTop
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'oneVeryBig':
				return (
					<Card100PictureRight
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'TwoVeryBigsFirstBoosted':
				return (
					<Card75_Card25
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'TwoVeryBigsSecondBoosted':
				return (
					<Card25_Card75
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'twoVeryBigs':
				return (
					<Card50_Card50
						cards={firstSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			default:
				return <></>;
		}
	};

	const SecondSlice = () => {
		switch (secondSliceLayout) {
			case 'twoOrMoreBigsFirstBoosted':
				return (
					<Card50_ColumnOfThreeCards25_ColumnOfFiveCards
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'noBigs':
				return (
					<ColumnOfThreeCards25_ColumnOfThreeCards25_ColumnOfThreeCards25_ColumnOfThreeCards25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'oneBig':
				return (
					<Card25_ColumnOfCards25_ColumnOfThreeCards25_ColumnOfThreeCards25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'twoBigs':
				return (
					<Card25_Card25_ColumnOfThreeCards25_ColumnOfThreeCards25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'threeBigs':
				return (
					<Card25_Card25_Card25_ColumnOfThreeCards25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
			case 'fourBigs':
				return (
					<Card25_Card25_Card25_Card25
						cards={secondSliceCards}
						showAge={showAge}
						containerPalette={containerPalette}
					/>
				);
		}
	};

	return (
		<>
			<FirstSlice />
			<SecondSlice />
		</>
	);
};

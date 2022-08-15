/* eslint-disable @typescript-eslint/naming-convention -- because underscores work here*/
import type { DCRContainerPalette, DCRGroupedTrails } from '../../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	groupedTrails: DCRGroupedTrails;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

const Snap100 = ({
	snaps,
	containerPalette,
	showAge,
}: {
	snaps: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => {
	if (!snaps[0]) return null;
	return (
		<UL>
			<LI padSides={true} padBottom={true}>
				<FrontCard
					trail={snaps[0]}
					containerPalette={containerPalette}
					containerType="dynamic/package"
					showAge={showAge}
					headlineSize="large"
					headlineSizeOnMobile="medium"
					imagePosition="right"
					imagePositionOnMobile="left"
					imageSize="medium"
					trailText={snaps[0].trailText}
				/>
			</LI>
		</UL>
	);
};

const Card100 = ({
	cards,
	containerPalette,
	showAge,
	isBoosted,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	isBoosted?: boolean;
}) => {
	return (
		<UL>
			<LI padSides={true} padBottom={true}>
				<FrontCard
					trail={cards[0]}
					containerPalette={containerPalette}
					containerType="dynamic/package"
					showAge={showAge}
					headlineSize={isBoosted ? 'ginormous' : 'huge'}
					imagePosition="bottom"
					imagePositionOnMobile="bottom"
					imageSize="large"
					isDynamo={true}
					supportingContent={cards[0].supportingContent}
				/>
			</LI>
		</UL>
	);
};

const Card25_Card25_Card25_Card25 = ({
	cards,
	containerPalette,
	showAge,
	showImage = true,
	padBottom,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	showImage?: boolean;
	padBottom?: boolean;
}) => {
	return (
		<UL direction="row" padBottom={padBottom}>
			{cards.map((card, cardIndex) => {
				return (
					<LI
						key={card.url}
						padSides={true}
						padBottom={false}
						padBottomOnMobile={cardIndex < cards.length - 1}
						showDivider={true}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							supportingContent={card.supportingContent}
							imageUrl={showImage ? card.image : undefined}
						/>
					</LI>
				);
			})}
		</UL>
	);
};

const Card25_Card25_Card25_ColumnOfTwo25 = ({
	cards,
	containerPalette,
	showAge,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => {
	const bigs = cards.slice(0, 3);
	const remaining = cards.slice(3);

	return (
		<UL direction="row">
			{bigs.map((card, cardIndex) => {
				return (
					<LI
						key={card.url}
						padSides={true}
						showTopMarginWhenStacked={false}
						padBottom={false}
						padBottomOnMobile={cardIndex < bigs.length - 1}
						showDivider={true}
						percentage="25%"
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							supportingContent={card.supportingContent}
						/>
					</LI>
				);
			})}
			<LI
				showDivider={true}
				showTopMarginWhenStacked={true}
				percentage="25%"
			>
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								percentage="100%"
								key={card.url}
								padSides={true}
								showTopMarginWhenStacked={false}
								padBottom={
									// No bottom margin on the last card
									cardIndex < 1
								}
								padBottomOnMobile={
									cardIndex < remaining.length - 1
								}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									containerType="dynamic/package"
									showAge={showAge}
									supportingContent={card.supportingContent}
									imageUrl={undefined}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card25_Card25_ColumnOfTwo25_ColumnOfTwo25 = ({
	cards,
	containerPalette,
	showAge,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => {
	const bigs = cards.slice(0, 2);
	const remaining = cards.slice(2, 6);

	return (
		<UL direction="row">
			{bigs.map((card, cardIndex) => {
				return (
					<LI
						key={card.url}
						padSides={true}
						showTopMarginWhenStacked={false}
						padBottom={false}
						padBottomOnMobile={cardIndex < bigs.length - 1}
						percentage="25%"
						showDivider={true}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							supportingContent={card.supportingContent}
						/>
					</LI>
				);
			})}
			<LI
				showDivider={true}
				showTopMarginWhenStacked={true}
				percentage="50%"
			>
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								percentage="50%"
								key={card.url}
								padSides={true}
								showTopMarginWhenStacked={false}
								padBottom={
									// No bottom margin on the last card
									cardIndex < 2
								}
								padBottomOnMobile={
									cardIndex < remaining.length - 1
								}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									containerType="dynamic/package"
									showAge={showAge}
									supportingContent={card.supportingContent}
									imageUrl={undefined}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card25_ColumnOfTwo25_ColumnOfTwo25_ColumnOfTwo25 = ({
	cards,
	containerPalette,
	showAge,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => {
	const bigs = cards.slice(0, 1);
	const remaining = cards.slice(1, 7);

	return (
		<UL direction="row">
			{bigs.map((card, cardIndex) => {
				return (
					<LI
						key={card.url}
						padSides={true}
						showTopMarginWhenStacked={false}
						padBottom={false}
						padBottomOnMobile={cardIndex < bigs.length - 1}
						percentage="25%"
						showDivider={true}
					>
						<FrontCard
							trail={card}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							supportingContent={card.supportingContent}
						/>
					</LI>
				);
			})}
			<LI
				showDivider={true}
				showTopMarginWhenStacked={true}
				percentage="75%"
			>
				<UL direction="row" wrapCards={true}>
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								percentage="33.333%"
								key={card.url}
								padSides={true}
								showTopMarginWhenStacked={false}
								padBottom={
									// No bottom margin on the last card
									cardIndex < 3
								}
								showDivider={true}
								padBottomOnMobile={
									cardIndex < remaining.length - 1
								}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									containerType="dynamic/package"
									showAge={showAge}
									supportingContent={card.supportingContent}
									imageUrl={undefined}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

const Card75_ColumnOfCards25 = ({
	cards,
	containerPalette,
	showAge,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => {
	const [primary, ...remaining] = cards;
	return (
		<UL direction="row">
			<LI padSides={true} percentage="75%">
				<FrontCard
					trail={primary}
					containerPalette={containerPalette}
					containerType="dynamic/package"
					showAge={showAge}
					headlineSize="huge"
					imagePosition="bottom"
					imagePositionOnMobile="bottom"
					imageSize="large"
					supportingContent={primary.supportingContent}
					isDynamo={true}
				/>
			</LI>
			<LI
				showDivider={true}
				showTopMarginWhenStacked={true}
				percentage="25%"
			>
				<UL direction="column">
					{remaining.map((card, cardIndex) => {
						return (
							<LI
								key={card.url}
								padSides={true}
								showTopMarginWhenStacked={false}
								padBottom={
									// No bottom margin on the last card
									cardIndex < remaining.length - 1
								}
								padBottomOnMobile={false}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									containerType="dynamic/package"
									showAge={showAge}
									imageUrl={
										// Always show the image on the first card and only
										// on the second if there are two items in two
										cardIndex === 0 ||
										remaining.length === 2
											? card.image
											: undefined
									}
									supportingContent={card.supportingContent}
								/>
							</LI>
						);
					})}
				</UL>
			</LI>
		</UL>
	);
};

export const DynamicPackage = ({
	groupedTrails,
	containerPalette,
	showAge,
}: Props) => {
	let layout:
		| 'primaryBoosted'
		| 'fourOrLessStandards'
		| 'fiveStandards'
		| 'sixStandards'
		| 'sevenStandards'
		| 'eightStandards'
		| 'nineStandards';

	const snaps = [...groupedTrails.snap].slice(0, 1);

	// We support up to 9 cards
	const cards = [
		...groupedTrails.snap.slice(1),
		...groupedTrails.standard,
	].slice(0, 9);

	let firstSlice: TrailType[] = [];
	let secondSlice: TrailType[] = [];
	let thirdSlice: TrailType[] = [];
	let fourthSlice: TrailType[] = [];
	switch (cards.length) {
		case 9: {
			layout = 'nineStandards';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 1);
			thirdSlice = cards.slice(1, 5);
			fourthSlice = cards.slice(5);
			break;
		}
		case 8:
			layout = 'eightStandards';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 1);
			thirdSlice = cards.slice(1);
			break;
		case 7:
			layout = 'sevenStandards';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 1);
			thirdSlice = cards.slice(1);
			break;
		case 6:
			layout = 'sixStandards';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 1);
			thirdSlice = cards.slice(1);
			break;
		case 5:
			layout = 'fiveStandards';
			firstSlice = snaps;
			secondSlice = cards.slice(0, 1);
			thirdSlice = cards.slice(1);
			break;
		default:
			if (cards[0].isBoosted) {
				layout = 'primaryBoosted';
				firstSlice = snaps;
				secondSlice = cards.slice(0, 1);
				thirdSlice = cards.slice(1);
			} else {
				layout = 'fourOrLessStandards';
				firstSlice = snaps;
				secondSlice = cards;
			}
	}

	switch (layout) {
		case 'primaryBoosted':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						isBoosted={true}
					/>
					<Card25_Card25_Card25_Card25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case 'fourOrLessStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card75_ColumnOfCards25
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case 'fiveStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						isBoosted={firstSlice[0].isBoosted}
					/>
					<Card25_Card25_Card25_Card25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case 'sixStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						isBoosted={firstSlice[0].isBoosted}
					/>
					<Card25_Card25_Card25_ColumnOfTwo25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case 'sevenStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						isBoosted={firstSlice[0].isBoosted}
					/>
					<Card25_Card25_ColumnOfTwo25_ColumnOfTwo25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case 'eightStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						isBoosted={firstSlice[0].isBoosted}
					/>
					<Card25_ColumnOfTwo25_ColumnOfTwo25_ColumnOfTwo25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case 'nineStandards':
			return (
				<>
					<Snap100
						snaps={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						isBoosted={firstSlice[0].isBoosted}
					/>
					<Card25_Card25_Card25_Card25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						padBottom={true}
					/>
					<Card25_Card25_Card25_Card25
						cards={fourthSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						showImage={false}
					/>
				</>
			);
	}
};

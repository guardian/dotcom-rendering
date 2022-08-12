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
	ginormousHeadline,
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	ginormousHeadline?: boolean;
}) => {
	return (
		<UL>
			<LI padSides={true} padBottom={true}>
				<FrontCard
					trail={cards[0]}
					containerPalette={containerPalette}
					containerType="dynamic/package"
					showAge={showAge}
					headlineSize={ginormousHeadline ? 'ginormous' : 'huge'}
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
}: {
	cards: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	showImage?: boolean;
}) => {
	return (
		<UL direction="row">
			{cards.map((card) => {
				return (
					<LI
						key={card.url}
						padSides={true}
						showTopMarginWhenStacked={false}
						padBottom={false}
						padBottomOnMobile={true}
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
	const column = cards.slice(3);

	return (
		<UL direction="row">
			{bigs.map((card) => {
				return (
					<LI
						key={card.url}
						padSides={true}
						showTopMarginWhenStacked={false}
						padBottom={false}
						padBottomOnMobile={true}
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
				<UL direction="column">
					{column.map((card, cardIndex) => {
						return (
							<LI
								key={card.url}
								padSides={true}
								showTopMarginWhenStacked={false}
								padBottom={
									// No bottom margin on the last card
									cardIndex < cards.length - 1
								}
								padBottomOnMobile={false}
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
	const columns = [cards.slice(2, 4), cards.slice(4, 6)];

	return (
		<UL direction="row">
			{bigs.map((card) => {
				return (
					<LI
						key={card.url}
						padSides={true}
						showTopMarginWhenStacked={false}
						padBottom={false}
						padBottomOnMobile={true}
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
			{columns.map((columnCards) => {
				return (
					<LI
						showDivider={true}
						showTopMarginWhenStacked={true}
						percentage="25%"
					>
						<UL direction="column">
							{columnCards.map((card, cardIndex) => {
								return (
									<LI
										key={card.url}
										padSides={true}
										showTopMarginWhenStacked={false}
										padBottom={
											// No bottom margin on the last card
											cardIndex < cards.length - 1
										}
										padBottomOnMobile={false}
									>
										<FrontCard
											trail={card}
											containerPalette={containerPalette}
											containerType="dynamic/package"
											showAge={showAge}
											supportingContent={
												card.supportingContent
											}
											imageUrl={undefined}
										/>
									</LI>
								);
							})}
						</UL>
					</LI>
				);
			})}
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
	const columns = [cards.slice(1, 3), cards.slice(3, 5), cards.slice(5, 7)];

	return (
		<UL direction="row">
			{bigs.map((card) => {
				return (
					<LI
						key={card.url}
						padSides={true}
						showTopMarginWhenStacked={false}
						padBottom={false}
						padBottomOnMobile={true}
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
			{columns.map((columnCards) => {
				return (
					<LI
						showDivider={true}
						showTopMarginWhenStacked={true}
						percentage="25%"
					>
						<UL direction="column">
							{columnCards.map((card, cardIndex) => {
								return (
									<LI
										key={card.url}
										padSides={true}
										showTopMarginWhenStacked={false}
										padBottom={
											// No bottom margin on the last card
											cardIndex < cards.length - 1
										}
										padBottomOnMobile={false}
									>
										<FrontCard
											trail={card}
											containerPalette={containerPalette}
											containerType="dynamic/package"
											showAge={showAge}
											supportingContent={
												card.supportingContent
											}
											imageUrl={undefined}
										/>
									</LI>
								);
							})}
						</UL>
					</LI>
				);
			})}
		</UL>
	);
};

const Card75_ColumnOfX25 = ({
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
									cardIndex < cards.length - 1
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
										cardIndex === 0 || cards.length === 2
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
		| '4orLessStandards'
		| '5Standards'
		| '6Standards'
		| '7Standards'
		| '8Standards'
		| '9Standards';

	const snaps = [...groupedTrails.snap].slice(0, 1);

	// We support up to 9 cards
	const cards = [
		...groupedTrails.snap.slice(1),
		...groupedTrails.standard,
	].slice(0, 9);

	let firstSlice: TrailType[] = [];
	let secondSlice: TrailType[] = [];
	let thirdSlice: TrailType[] = [];
	switch (cards.length) {
		case 9: {
			firstSlice = cards.slice(0, 1);
			secondSlice = cards.slice(1, 5);
			thirdSlice = cards.slice(5);
			layout = '9Standards';
			break;
		}
		case 8:
			layout = '8Standards';
			firstSlice = cards.slice(0, 1);
			secondSlice = cards.slice(1);
			break;
		case 7:
			layout = '7Standards';
			firstSlice = cards.slice(0, 1);
			secondSlice = cards.slice(1);
			break;
		case 6:
			layout = '6Standards';
			firstSlice = cards.slice(0, 1);
			secondSlice = cards.slice(1);
			break;
		case 5:
			layout = '5Standards';
			firstSlice = cards.slice(0, 1);
			secondSlice = cards.slice(1);
			break;
		default:
			if (cards[0].isBoosted) {
				layout = 'primaryBoosted';
				firstSlice = cards.slice(0, 1);
				secondSlice = cards.slice(1);
			} else {
				firstSlice = cards;
				layout = '4orLessStandards';
			}
	}

	switch (layout) {
		case 'primaryBoosted':
			return (
				<>
					<Snap100
						snaps={snaps}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						ginormousHeadline={true}
					/>
					<Card25_Card25_Card25_Card25
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case '4orLessStandards':
			return (
				<>
					<Snap100
						snaps={snaps}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card75_ColumnOfX25
						cards={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case '5Standards':
			return (
				<>
					<Snap100
						snaps={snaps}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						ginormousHeadline={firstSlice[0].isBoosted}
					/>
					<Card25_Card25_Card25_Card25
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case '6Standards':
			return (
				<>
					<Snap100
						snaps={snaps}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						ginormousHeadline={firstSlice[0].isBoosted}
					/>
					<Card25_Card25_Card25_ColumnOfTwo25
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case '7Standards':
			return (
				<>
					<Snap100
						snaps={snaps}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						ginormousHeadline={firstSlice[0].isBoosted}
					/>
					<Card25_Card25_ColumnOfTwo25_ColumnOfTwo25
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case '8Standards':
			return (
				<>
					<Snap100
						snaps={snaps}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						ginormousHeadline={firstSlice[0].isBoosted}
					/>
					<Card25_ColumnOfTwo25_ColumnOfTwo25_ColumnOfTwo25
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</>
			);
		case '9Standards':
			return (
				<>
					<Snap100
						snaps={snaps}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card100
						cards={firstSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						ginormousHeadline={firstSlice[0].isBoosted}
					/>
					<Card25_Card25_Card25_Card25
						cards={secondSlice}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
					<Card25_Card25_Card25_Card25
						cards={thirdSlice}
						containerPalette={containerPalette}
						showAge={showAge}
						showImage={false}
					/>
				</>
			);
	}
};

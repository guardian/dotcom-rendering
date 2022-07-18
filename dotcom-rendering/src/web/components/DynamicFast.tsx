import { css } from '@emotion/react';
import { until } from '@guardian/source-foundations';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	groupedTrails: DCRGroupedTrails;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

/**
 * When the first 'big' is boosted & there is atleast 1 more big we switch up the layout a little -
 *
 * The 'standards' section (what this component renders), consists of 2 columns, rather than a wrapped row,
 * where the first big (all other 'bigs' fallback to standards) sits in the first slot of the left hand column,
 * and it gets a top image (left on mobile), and is followed by up to the next 2 standards.
 * The right hand column will take (up to) the remaining 5 standards. Any more standards will not be rendered.
 *
 */
const ThirdBoostedPlusBig = ({
	standards,
	big,
	showAge,
	containerPalette,
}: {
	standards: TrailType[];
	big: TrailType;
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
}) => {
	// 'col1' has 1 big & up to 2 standards
	const standardsCol1 = standards.splice(0, 2);
	// 'col2' has up to 5 standards
	const standardsCol2 = standards.splice(0, 5);

	const manualUlStyles = css`
		position: relative;
		display: flex;
		flex-direction: column;
		flex-basis: 50%;
		flex-grow: 1;
		${until.tablet} {
			// At tablet, these columns expand and stack
			flex-basis: 100%;
		}
	`;

	/**
	 * The row & columns in this component are a little outside of the standard of what the standard
	 * LI and UL components we have support - it made more sense to manually create the CSS for this use case
	 * than to expand & muddy the APIs of both components to support this layout type.
	 */
	return (
		<li
			css={css`
				position: relative;
				display: flex;
				flex-basis: 100%;
				flex-wrap: wrap;
			`}
		>
			<ul css={manualUlStyles}>
				<LI
					showDivider={true}
					padSides={true}
					padBottom={standardsCol1.length > 0}
					padBottomOnMobile={standardsCol1.length > 0}
				>
					<FrontCard
						trail={big}
						containerPalette={containerPalette}
						showAge={showAge}
						headlineSize="medium"
						imageUrl={big.image}
						imagePosition="top"
						imagePositionOnMobile="left"
					/>
				</LI>
				{standardsCol1.map((card, cardIndex) => {
					return (
						<LI
							key={card.url}
							showDivider={true}
							padSides={true}
							padBottom={cardIndex < standardsCol1.length - 1}
							padBottomOnMobile={
								// If there are cards in the second col, we always want padding
								standardsCol2.length > 0 ||
								cardIndex < standardsCol1.length - 1
							}
						>
							<FrontCard
								trail={card}
								containerPalette={containerPalette}
								showAge={showAge}
								imageUrl={undefined}
								headlineSize="small"
							/>
						</LI>
					);
				})}
			</ul>
			<ul css={manualUlStyles}>
				{standardsCol2.map((card, cardIndex) => {
					return (
						<LI
							key={card.url}
							showDivider={true}
							padSides={true}
							padBottom={cardIndex < standardsCol2.length - 1}
							padBottomOnMobile={
								cardIndex < standardsCol2.length - 1
							}
						>
							<FrontCard
								trail={card}
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
	);
};

/**
 * Dynamic/fast is a dynamic container often used for headlines on network fronts,
 * for this reason it has a lot of configuration & customisation.
 *
 * It supports 4 categories of cards, 'huge', 'very big', 'big', and 'standard'.
 * As the tools do not limit the configurations of these categories, we must normalise them
 * and have cards 'fall through' depending on the layout configuration,
 * for example if you had 3 very bigs, the 3rd would 'fall through' to being the first big.
 *
 * 'Default' Container layout is
 *      veryBig1     -   	veryBig2
 *      big - big - standard - standard
 *       ^  -  ^  - standard - standard
 *       ^  -  ^  - standard - standard
 *
 * '1st boosted' Container layout is
 *      veryBig1 (boosted)   - veryBig2
 *      big - big - standard - standard
 *       ^  -  ^  - standard - standard
 *       ^  -  ^  - standard - standard
 * '2nd boosted' Container layout is
 *      veryBig1  - veryBig2 (boosted)
 *      big - big - standard - standard
 *       ^  -  ^  - standard - standard
 *       ^  -  ^  - standard - standard
 *
 * '3rd boosted' Container layout is
 * (3rd can be boosted in combination with default, 1st boosted or 2nd boosted)
 *       veryBig1     -   	veryBig2
 *      big (boosted) - standard - standard
 *            ^       - standard - standard
 *            ^       - standard - standard
 *            ^       - standard - standard
 *
 * '3rd boosted + 1 big' Container layout is
 * (can be used in combination with default, 1st boosted or 2nd boosted)
 *       veryBig1     -   	veryBig2
 *      big (boosted) -    big   - standard
 *            ^       -     ^    - standard
 *            ^       -     ^    - standard
 *            ^       - standard - standard
 *            ^       - standard - standard
 *
 * There are also variations where a 'huge' is provided, or only 1 very big, where the top
 * rows become just 1 'huge' card, instead of the 2 primaries shown in the layouts above.
 */
export const DynamicFast = ({
	groupedTrails,
	containerPalette,
	showAge,
}: Props) => {
	// 'primaries' should hold up to 2 cards, selecting that which are given
	// the 'largest' group.
	let primaries: TrailType[] = [];
	if (groupedTrails.huge.length > 0) {
		// Where a huge is set, we only take 1 primary, leaving any
		// 'veryBigs' to be displayed as 'bigs'
		primaries = groupedTrails.huge.splice(0, 1);
	} else if (groupedTrails.veryBig.length === 1) {
		// This would display the same as 1 'huge'.
		primaries = groupedTrails.veryBig.splice(0, 1);
	} else if (groupedTrails.veryBig.length > 1) {
		// We take a maximum of 2, remaining very bigs will be treated as 'big'
		primaries = groupedTrails.veryBig.splice(0, 2);
	}

	// Get the index of the primary card which is boosted, returns -1 if neither are.
	const primaryBoostedIndex = primaries.findIndex((card) => !!card.isBoosted);

	// Put together all the bigs - only those not chosen as 'primaries' will be left over
	const bigs = groupedTrails.huge
		.concat(groupedTrails.veryBig, groupedTrails.big)
		.slice(0, 4);

	const firstBigBoosted = !!bigs[0]?.isBoosted;

	let maxStandards = 12;
	let columns = 3;
	let standardsCardWidth: CardPercentageType = '25%';
	let standardsContainerWidth: CardPercentageType = '75%';

	if (firstBigBoosted) {
		maxStandards = 8;
		standardsCardWidth = '50%';
		standardsContainerWidth = '50%';
		columns = 2;
	} else if (bigs.length === 0) {
		maxStandards = 12;
		standardsCardWidth = '25%';
		standardsContainerWidth = '100%';
		columns = 4;
	} else if (bigs.length === 1) {
		maxStandards = 9;
		standardsCardWidth = '33.333%';
		standardsContainerWidth = '75%';
		columns = 3;
	} else if (bigs.length === 2) {
		maxStandards = 6;
		standardsCardWidth = '50%';
		standardsContainerWidth = '50%';
		columns = 2;
	} else if (bigs.length === 3) {
		maxStandards = 3;
		standardsCardWidth = '100%';
		standardsContainerWidth = '25%';
		columns = 1;
	} else if (bigs.length === 4) {
		maxStandards = 0;
		columns = 0;
	}

	let standards: TrailType[] = [];
	if (firstBigBoosted && bigs.length > 1) {
		// If the first big is boosted & there is an additional big card, we change
		// we change to a 2 column layout. Any bigs but the first 2 should fall-through
		// to being standards.
		standards = [
			// Take all but the first 2 bigs
			...bigs.splice(2, bigs.length - 1),
			...groupedTrails.standard,
		];
	} else if (maxStandards > 0) {
		// We don't need to select any 'left over' bigs here as if there are
		// 4 bigs there is no room for standards.
		standards = groupedTrails.standard.splice(0, maxStandards);
	}

	return (
		<>
			{primaries.length > 0 && (
				<UL direction="row" padBottom={true}>
					{primaries.map((card, index) => {
						// Boosted Layout
						if (
							primaries.length > 1 &&
							primaryBoostedIndex !== -1
						) {
							return (
								<LI
									key={card.url}
									padSides={true}
									percentage={
										index === primaryBoostedIndex
											? '75%'
											: '25%'
									}
									showDivider={index > 0}
									showTopMarginWhenStacked={index > 0}
								>
									<FrontCard
										trail={card}
										containerPalette={containerPalette}
										showAge={showAge}
										headlineSize={
											index === primaryBoostedIndex
												? 'large'
												: 'medium'
										}
										trailText={
											index === primaryBoostedIndex
												? card.trailText
												: undefined
										}
										imageUrl={card.image}
										imagePosition={
											index === primaryBoostedIndex
												? 'right'
												: 'top'
										}
										imagePositionOnMobile={
											index === primaryBoostedIndex
												? 'top'
												: 'left'
										}
										imageSize={
											index === primaryBoostedIndex
												? 'large'
												: 'small'
										}
									/>
								</LI>
							);
						}

						// Unboosted Layout
						return (
							<LI
								key={card.url}
								padSides={true}
								percentage={
									primaries.length === 1 ? '100%' : '50%'
								}
								showDivider={index > 0}
								showTopMarginWhenStacked={index > 0}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
									headlineSize="large"
									imageUrl={card.image}
									imagePosition={'top'}
									imagePositionOnMobile={'top'}
								/>
							</LI>
						);
					})}
				</UL>
			)}
			<UL direction="row" padBottom={true}>
				{/* Leftover huges, very bigs & all bigs */}
				{bigs.map((card, cardIndex) => {
					if (firstBigBoosted) {
						// We only render the first card here if it's boosted
						if (cardIndex > 0) return undefined;

						return (
							<LI
								key={card.url}
								percentage={`50%`}
								padSides={true}
								padBottom={false}
								showTopMarginWhenStacked={cardIndex > 0}
								showDivider={cardIndex > 0}
							>
								<FrontCard
									trail={card}
									containerPalette={containerPalette}
									showAge={showAge}
									headlineSize="large"
									imageUrl={card.image}
									imagePosition="top"
									imagePositionOnMobile="top"
								/>
							</LI>
						);
					}

					return (
						<LI
							key={card.url}
							percentage={`25%`}
							padSides={true}
							padBottom={false}
							showTopMarginWhenStacked={cardIndex > 0}
							showDivider={cardIndex > 0}
						>
							<FrontCard
								trail={card}
								containerPalette={containerPalette}
								showAge={showAge}
								headlineSize="medium"
								imageUrl={card.image}
							/>
						</LI>
					);
				})}
				{maxStandards > 0 && (
					<LI
						percentage={standardsContainerWidth}
						showTopMarginWhenStacked={true}
					>
						<UL direction="row" wrapCards={true}>
							{/* If the first big is boosted & we have a second big,
							it should be at the start of the standards but have an image  */}
							{firstBigBoosted && bigs[1] ? (
								<ThirdBoostedPlusBig
									standards={standards}
									big={bigs[1]}
									containerPalette={containerPalette}
									showAge={showAge}
								/>
							) : (
								// Regular standards layout
								standards.map((card, cardIndex) => {
									return (
										<LI
											key={card.url}
											percentage={standardsCardWidth}
											stretch={true}
											showDivider={true}
											padSides={true}
											padBottom={
												// Never give bottom margin to the last card
												// cardIndex !== standards.length - 1 &&
												// Any cards not on the bottom row!
												cardIndex <
												standards.length -
													// Get leftover (modulo), if none fall back to columns as the whole bottom row
													// won't want to be padded
													(standards.length %
														columns || columns)
											}
											padBottomOnMobile={
												cardIndex < standards.length - 1
											}
										>
											<FrontCard
												trail={card}
												containerPalette={
													containerPalette
												}
												imageUrl={undefined}
												headlineSize="small"
											/>
										</LI>
									);
								})
							)}
						</UL>
					</LI>
				)}
			</UL>
		</>
	);
};

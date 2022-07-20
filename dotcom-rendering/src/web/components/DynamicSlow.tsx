import type { DCRContainerPalette } from '../../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

/**
 * A `Card` container for up to 8 trails.
 *
 * @see {@link https://www.figma.com/file/sx2vMFHbL7SsUo0LcpsKNe/%E2%AC%A3--Front-container?node-id=123%3A137122 Figma designs}
 */
export const DynamicSlow = ({ trails, containerPalette, showAge }: Props) => {
	const primary = trails[0];
	const secondary = trails[1];
	const bigCards = trails.slice(2, 4);
	const smallCards = trails.slice(4, 8);

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI padSides={true} percentage="75%">
					<FrontCard
						trail={primary}
						containerPalette={containerPalette}
						showAge={showAge}
						headlineSize="large"
						imagePosition="right"
						imagePositionOnMobile="top"
						imageSize="large"
						supportingContent={primary.supportingContent}
						trailText={primary.trailText}
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
					percentage="25%"
				>
					<FrontCard
						trail={secondary}
						containerPalette={containerPalette}
						showAge={showAge}
						supportingContent={secondary.supportingContent}
					/>
				</LI>
			</UL>
			<UL direction="row-reverse" padBottom={true}>
				<LI percentage="50%" showTopMarginWhenStacked={true}>
					<UL direction="row" wrapCards={true} showDivider={true}>
						{bigCards.map((card, cardIndex) => {
							return (
								<LI
									key={card.url}
									percentage="50%"
									showDivider={cardIndex !== 0}
									padSides={true}
									padBottom={false}
									padBottomOnMobile={
										cardIndex < bigCards.length
									}
								>
									<FrontCard
										trail={card}
										containerPalette={containerPalette}
										showAge={showAge}
										// Overrides
										supportingContent={
											card.supportingContent
										}
										imagePositionOnMobile="none"
										trailText={
											card.supportingContent &&
											card.supportingContent.length > 0
												? undefined
												: card.trailText
										}
									/>
								</LI>
							);
						})}
					</UL>
				</LI>
				<LI percentage="50%" showTopMarginWhenStacked={false}>
					<UL direction="column" wrapCards={true}>
						{smallCards.map((card, cardIndex) => {
							return (
								<LI
									key={card.url}
									padSides={true}
									showTopMarginWhenStacked={false}
									padBottom={
										// No bottom margin on the last card
										cardIndex < smallCards.length - 1
									}
									padBottomOnMobile={false}
								>
									<FrontCard
										trail={card}
										containerPalette={containerPalette}
										showAge={showAge}
										headlineSize="small"
										imagePosition="left"
										supportingContent={
											card.supportingContent
										}
									/>
								</LI>
							);
						})}
					</UL>
				</LI>
			</UL>
		</>
	);
};

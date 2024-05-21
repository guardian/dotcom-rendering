import {
	Card100Media100Tall,
	Card33Media33MobileTopTall,
	Card33Media33Tall,
	CardDefault,
} from '../lib/cardWrappers';
import { shouldPadWrappableRows } from '../lib/dynamicSlices';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	imageLoading: Loading;
	absoluteServerTimes: boolean;
	showAge?: boolean;
};

/* .___________.___________.___________.
 * |###########|###########|###########|
 * |           |           |           |
 * |___________|___________|___________|
 */
const Card33_Card33_Card33 = ({
	trails,
	containerPalette,
	showAge,
	padBottom,
	imageLoading,
	absoluteServerTimes,
}: {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	absoluteServerTimes: boolean;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	padBottom?: boolean;
}) => {
	const card33 = trails.slice(0, 1);
	const cards33 = trails.slice(1, 3);

	return (
		<UL direction="row" padBottom={padBottom}>
			{card33.map((trail) => (
				<LI percentage="33.333%" padSides={true} key={trail.url}>
					<Card33Media33MobileTopTall
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
			{cards33.map((trail) => (
				<LI
					percentage="33.333%"
					padSides={true}
					showDivider={true}
					key={trail.url}
				>
					<Card33Media33Tall
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};

/* .___________.___________.
 * |###########|###########|
 * |           |           |
 * |___________|___________|
 */
const Card50_Card50 = ({
	trails,
	containerPalette,
	showAge,
	padBottom,
	imageLoading,
	absoluteServerTimes,
}: {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	absoluteServerTimes: boolean;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	padBottom?: boolean;
}) => {
	const card50 = trails.slice(0, 1);
	const cards50 = trails.slice(1);
	return (
		<UL direction="row" padBottom={padBottom}>
			{card50.map((trail) => (
				<LI percentage="50%" padSides={true} key={trail.url}>
					<Card33Media33MobileTopTall
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
			{cards50.map((trail) => (
				<LI
					percentage="50%"
					padSides={true}
					showDivider={true}
					key={trail.url}
				>
					<Card33Media33Tall
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
						absoluteServerTimes={absoluteServerTimes}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};

export const FixedMediumSlowXIIMPU = ({
	trails,
	containerPalette,
	showAge,
	imageLoading,
	absoluteServerTimes,
}: Props) => {
	const firstSlice = trails.slice(0, 3);
	const remaining = trails.slice(3, 9);
	return (
		<>
			{trails.length === 1 ? (
				<UL>
					<LI padSides={true} percentage="100%">
						{trails.map((trail) => (
							<Card100Media100Tall
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
								absoluteServerTimes={absoluteServerTimes}
								key={trail.url}
								imageLoading={imageLoading}
							/>
						))}
					</LI>
				</UL>
			) : trails.length === 2 ? (
				<Card50_Card50
					trails={trails}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					imageLoading={imageLoading}
				/>
			) : (
				<Card33_Card33_Card33
					trails={firstSlice}
					containerPalette={containerPalette}
					showAge={showAge}
					absoluteServerTimes={absoluteServerTimes}
					padBottom={true}
					imageLoading={imageLoading}
				/>
			)}

			<UL direction="row" wrapCards={true}>
				{remaining.map((trail, trailIndex) => (
					<LI
						padSides={true}
						offsetBottomPaddingOnDivider={shouldPadWrappableRows(
							trailIndex,
							remaining.length - (remaining.length % 3),
							3,
						)}
						showDivider={trailIndex % 3 !== 0}
						containerPalette={containerPalette}
						percentage="33.333%"
						stretch={true}
						key={trail.url}
					>
						<CardDefault
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
							absoluteServerTimes={absoluteServerTimes}
						/>
					</LI>
				))}
			</UL>
		</>
	);
};

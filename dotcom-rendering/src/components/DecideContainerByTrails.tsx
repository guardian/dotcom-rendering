import {
	Card100Media50,
	Card100Media75,
	Card25Media25,
	Card33Media33,
	Card50Media50,
	CardDefault,
} from '../lib/cardWrappers';
import type { Tuple } from '../lib/tuple';
import { takeFirst } from '../lib/tuple';
import type { DCRFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: DCRFrontCard[];
	speed: 'fast' | 'slow';
};

export const OneCardFast = ({ trail }: { trail: DCRFrontCard }) => {
	return (
		<UL direction="row">
			<LI percentage="100%" padSides={true}>
				<Card100Media50 trail={trail} showAge={true} />
			</LI>
		</UL>
	);
};

export const OneCardSlow = ({ trail }: { trail: DCRFrontCard }) => {
	return (
		<UL direction="row">
			<LI percentage="100%" padSides={true}>
				<Card100Media75 trail={trail} showAge={true} />
			</LI>
		</UL>
	);
};

export const TwoCard = ({ trails }: { trails: Tuple<DCRFrontCard, 2> }) => {
	return (
		<UL direction="row">
			<LI percentage="50%" padSides={true}>
				<Card50Media50 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="50%" padSides={true} showDivider={true}>
				<Card50Media50 trail={trails[1]} showAge={true} />
			</LI>
		</UL>
	);
};

export const ThreeCard = ({ trails }: { trails: Tuple<DCRFrontCard, 3> }) => {
	return (
		<UL direction="row">
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Card33Media33 trail={trails[1]} showAge={true} />
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Card33Media33 trail={trails[2]} showAge={true} />
			</LI>
		</UL>
	);
};

export const FourCard = ({ trails }: { trails: Tuple<DCRFrontCard, 4> }) => {
	return (
		<UL direction="row">
			<LI percentage="25%" padSides={true}>
				<Card25Media25 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="25%" padSides={true} showDivider={true}>
				<Card25Media25 trail={trails[1]} showAge={true} />
			</LI>
			<LI percentage="25%" padSides={true} showDivider={true}>
				<Card25Media25 trail={trails[2]} showAge={true} />
			</LI>
			<LI percentage="25%" padSides={true} showDivider={true}>
				<Card25Media25 trail={trails[3]} showAge={true} />
			</LI>
		</UL>
	);
};

export const FiveCardFast = ({
	trails,
}: {
	trails: Tuple<DCRFrontCard, 5>;
}) => {
	return (
		<UL direction="row">
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Card33Media33 trail={trails[1]} showAge={true} />
			</LI>
			<LI percentage="33.333%">
				<UL direction="column" showDivider={true}>
					<LI padSides={true}>
						<CardDefault trail={trails[2]} showAge={true} />
					</LI>
					<LI padSides={true}>
						<CardDefault trail={trails[3]} showAge={true} />
					</LI>
					<LI padSides={true}>
						<CardDefault trail={trails[4]} showAge={true} />
					</LI>
				</UL>
			</LI>
		</UL>
	);
};

export const FiveCardSlow = ({
	trails,
}: {
	trails: Tuple<DCRFrontCard, 5>;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="50%" padSides={true}>
					<Card33Media33 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="50%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[1]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[3]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[4]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const SixCardFast = ({ trails }: { trails: Tuple<DCRFrontCard, 6> }) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="50%" padSides={true}>
					<CardDefault trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="50%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[5]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const SixCardSlow = ({ trails }: { trails: Tuple<DCRFrontCard, 6> }) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[2]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33 trail={trails[3]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[5]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const SevenCardFast = ({
	trails,
}: {
	trails: Tuple<DCRFrontCard, 7>;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<CardDefault trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[5]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[6]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const SevenCardSlow = ({
	trails,
}: {
	trails: Tuple<DCRFrontCard, 7>;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33 trail={trails[2]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[5]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[6]} showAge={true} />
				</LI>
			</UL>
		</>
	);
};

export const EightOrMoreFast = ({
	trails,
}: {
	trails: [...Tuple<DCRFrontCard, 8>, ...DCRFrontCard[]];
}) => {
	const afterEight = trails.slice(8);

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row" padBottom={afterEight.length > 0}>
				<LI percentage="25%" padSides={true}>
					<CardDefault trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[5]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[6]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<CardDefault trail={trails[6]} showAge={true} />
				</LI>
			</UL>
			{afterEight.length > 0 ? (
				<UL wrapCards={true} direction="row">
					{afterEight.map((trail, index) => (
						<LI
							key={trail.url}
							percentage="33.333%"
							padSides={true}
							showDivider={index % 3 !== 0}
						>
							<CardDefault trail={trail} showAge={true} />
						</LI>
					))}
				</UL>
			) : (
				<></>
			)}
		</>
	);
};

export const EightOrMoreSlow = ({
	trails,
}: {
	trails: [...Tuple<DCRFrontCard, 8>, ...DCRFrontCard[]];
}) => {
	const afterEight = trails.slice(8);

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[2]} showAge={true} />
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[3]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row" padBottom={afterEight.length > 0}>
				<LI percentage="33.333%" padSides={true}>
					<Card25Media25 trail={trails[4]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[5]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[6]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card25Media25 trail={trails[7]} showAge={true} />
				</LI>
			</UL>
			{afterEight.length > 0 ? (
				<UL wrapCards={true} direction="row">
					{afterEight.map((trail, index) => (
						<LI
							key={trail.url}
							percentage="25%"
							padSides={true}
							showDivider={index % 4 !== 0}
						>
							<Card25Media25 trail={trail} showAge={true} />
						</LI>
					))}
				</UL>
			) : (
				<></>
			)}
		</>
	);
};

export const DecideContainerByTrails = ({ trails, speed }: Props) => {
	const initialTrails = takeFirst(trails, 8);

	if (speed === 'fast') {
		switch (initialTrails.length) {
			case 0:
				return <></>;
			case 1:
				return <OneCardFast trail={initialTrails[0]} />;
			case 2:
				return <TwoCard trails={initialTrails} />;
			case 3:
				return <ThreeCard trails={initialTrails} />;
			case 4:
				return <FourCard trails={initialTrails} />;
			case 5:
				return <FiveCardFast trails={initialTrails} />;
			case 6:
				return <SixCardFast trails={initialTrails} />;
			case 7:
				return <SevenCardFast trails={initialTrails} />;
			case 8:
				return (
					<EightOrMoreFast
						trails={[...initialTrails, ...trails.slice(8)]}
					/>
				);
		}
	} else {
		switch (initialTrails.length) {
			case 0:
				return <></>;
			case 1:
				return <OneCardSlow trail={initialTrails[0]} />;
			case 2:
				return <TwoCard trails={initialTrails} />;
			case 3:
				return <ThreeCard trails={initialTrails} />;
			case 4:
				return <FourCard trails={initialTrails} />;
			case 5:
				return <FiveCardSlow trails={initialTrails} />;
			case 6:
				return <SixCardSlow trails={initialTrails} />;
			case 7:
				return <SevenCardSlow trails={initialTrails} />;
			case 8:
				return (
					<EightOrMoreSlow
						trails={[...initialTrails, ...trails.slice(8)]}
					/>
				);
		}
	}
};

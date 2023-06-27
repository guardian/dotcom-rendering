import { Hide } from '@guardian/source-react-components';
import { Card33Media33, CardDefault } from '../lib/cardWrappers';
import { isTuple, isTupleOrGreater, type Tuple } from '../lib/tuple';
import type { DCRFrontCard } from '../types/front';
import type { GroupedTrailsSlowMpu } from '../types/tagFront';
import { AdSlot } from './AdSlot';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = GroupedTrailsSlowMpu & {
	adIndex: number;
};

export const TwoCard = ({
	trails,
	adIndex,
}: {
	trails: Tuple<DCRFrontCard, 2>;
	adIndex: number;
}) => {
	return (
		<UL direction="row">
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Card33Media33 trail={trails[1]} showAge={true} />
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Hide until="tablet">
					<AdSlot position="inline" index={adIndex} />
				</Hide>
			</LI>
		</UL>
	);
};

export const FourCard = ({
	trails,
	adIndex,
}: {
	trails: Tuple<DCRFrontCard, 4>;
	adIndex: number;
}) => {
	return (
		<UL direction="row">
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33 trail={trails[0]} showAge={true} />
			</LI>
			<LI percentage="33.333%">
				<UL direction="column" showDivider={true}>
					<LI padSides={true}>
						<CardDefault trail={trails[1]} showAge={true} />
					</LI>
					<LI padSides={true}>
						<CardDefault trail={trails[2]} showAge={true} />
					</LI>
					<LI padSides={true}>
						<CardDefault trail={trails[3]} showAge={true} />
					</LI>
				</UL>
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Hide until="tablet">
					<AdSlot position="inline" index={adIndex} />
				</Hide>
			</LI>
		</UL>
	);
};

export const SixCard = ({
	trails,
	adIndex,
}: {
	trails: Tuple<DCRFrontCard, 6>;
	adIndex: number;
}) => {
	return (
		<UL direction="row">
			<LI percentage="33.333%">
				<UL direction="column" showDivider={true}>
					<LI padSides={true}>
						<CardDefault trail={trails[0]} showAge={true} />
					</LI>
					<LI padSides={true}>
						<CardDefault trail={trails[1]} showAge={true} />
					</LI>
					<LI padSides={true}>
						<CardDefault trail={trails[2]} showAge={true} />
					</LI>
				</UL>
			</LI>
			<LI percentage="33.333%">
				<UL direction="column" showDivider={true}>
					<LI padSides={true}>
						<CardDefault trail={trails[3]} showAge={true} />
					</LI>
					<LI padSides={true}>
						<CardDefault trail={trails[4]} showAge={true} />
					</LI>
					<LI padSides={true}>
						<CardDefault trail={trails[5]} showAge={true} />
					</LI>
				</UL>
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Hide until="tablet">
					<AdSlot position="inline" index={adIndex} />
				</Hide>
			</LI>
		</UL>
	);
};

export const NineCard = ({
	trails,
	adIndex,
}: {
	trails: [...Tuple<DCRFrontCard, 9>, ...DCRFrontCard[]];
	adIndex: number;
}) => {
	return (
		<>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33 trail={trails[0]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33 trail={trails[1]} showAge={true} />
				</LI>
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33 trail={trails[2]} showAge={true} />
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%">
					<UL direction="column" showDivider={true}>
						<LI padSides={true}>
							<CardDefault trail={trails[3]} showAge={true} />
						</LI>
						<LI padSides={true}>
							<CardDefault trail={trails[4]} showAge={true} />
						</LI>
						<LI padSides={true}>
							<CardDefault trail={trails[5]} showAge={true} />
						</LI>
					</UL>
				</LI>
				<LI percentage="33.333%">
					<UL direction="column" showDivider={true}>
						<LI padSides={true}>
							<CardDefault trail={trails[6]} showAge={true} />
						</LI>
						<LI padSides={true}>
							<CardDefault trail={trails[7]} showAge={true} />
						</LI>
						<LI padSides={true}>
							<CardDefault trail={trails[8]} showAge={true} />
						</LI>
					</UL>
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Hide until="tablet">
						<AdSlot position="inline" index={adIndex} />
					</Hide>
				</LI>
			</UL>
		</>
	);
};

export const TagFrontSlowMpu = ({ trails, adIndex }: Props) => {
	// if (isTuple(trails, 2)) {
	// 	return <TwoCard trails={trails} adIndex={adIndex} />;
	// } else if (isTuple(trails, 4)) {
	// 	return <FourCard trails={trails} adIndex={adIndex} />;
	// } else if (isTuple(trails, 6)) {
	// 	return <SixCard trails={trails} adIndex={adIndex} />;
	// } else if (isTupleOrGreater(trails, 9)) {
	// 	// In Frontend, we 'limit' the MPU chosen container at 9, if there are more cards, they simply
	// 	// aren't shown.
	// 	return <NineCard trails={trails} adIndex={adIndex} />;
	// } else {
	// 	// The above if statements cover all the types that trails could be, but ESLint gets upset that "not all code paths return a value"
	// 	return <></>;
	// }

	return <></>;
};

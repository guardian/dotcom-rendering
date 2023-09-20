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
import type { Loading } from './CardPicture';

type Props = {
	trails: DCRFrontCard[];
	speed: 'fast' | 'slow';
	imageLoading: Loading;
};

export const OneCardFast = ({
	trail,
	imageLoading,
}: {
	trail: DCRFrontCard;
	imageLoading: Loading;
}) => {
	return (
		<UL direction="row">
			<LI percentage="100%" padSides={true}>
				<Card100Media50
					trail={trail}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
		</UL>
	);
};

export const OneCardSlow = ({
	trail,
	imageLoading,
}: {
	trail: DCRFrontCard;
	imageLoading: Loading;
}) => {
	return (
		<UL direction="row">
			<LI percentage="100%" padSides={true}>
				<Card100Media75
					trail={trail}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
		</UL>
	);
};

export const TwoCard = ({
	trails,
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 2>;
	imageLoading: Loading;
}) => {
	return (
		<UL direction="row">
			<LI percentage="50%" padSides={true}>
				<Card50Media50
					trail={trails[0]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI percentage="50%" padSides={true} showDivider={true}>
				<Card50Media50
					trail={trails[1]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
		</UL>
	);
};

export const ThreeCard = ({
	trails,
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 3>;
	imageLoading: Loading;
}) => {
	return (
		<UL direction="row">
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33
					trail={trails[0]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Card33Media33
					trail={trails[1]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Card33Media33
					trail={trails[2]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
		</UL>
	);
};

export const FourCard = ({
	trails,
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 4>;
	imageLoading: Loading;
}) => {
	return (
		<UL direction="row">
			<LI percentage="25%" padSides={true}>
				<Card25Media25
					trail={trails[0]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI percentage="25%" padSides={true} showDivider={true}>
				<Card25Media25
					trail={trails[1]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI percentage="25%" padSides={true} showDivider={true}>
				<Card25Media25
					trail={trails[2]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI percentage="25%" padSides={true} showDivider={true}>
				<Card25Media25
					trail={trails[3]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
		</UL>
	);
};

export const FiveCardFast = ({
	trails,
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 5>;
	imageLoading: Loading;
}) => {
	return (
		<UL direction="row">
			<LI percentage="33.333%" padSides={true}>
				<Card33Media33
					trail={trails[0]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI percentage="33.333%" padSides={true} showDivider={true}>
				<Card33Media33
					trail={trails[1]}
					showAge={true}
					imageLoading={imageLoading}
				/>
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
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 5>;
	imageLoading: Loading;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="50%" padSides={true}>
					<Card33Media33
						trail={trails[0]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="50%" padSides={true} showDivider={true}>
					<Card33Media33
						trail={trails[1]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33
						trail={trails[2]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33
						trail={trails[3]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33
						trail={trails[4]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
			</UL>
		</>
	);
};

export const SixCardFast = ({
	trails,
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 6>;
	imageLoading: Loading;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25
						trail={trails[0]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[1]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[2]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[3]}
						showAge={true}
						imageLoading={imageLoading}
					/>
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

export const SixCardSlow = ({
	trails,
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 6>;
	imageLoading: Loading;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33
						trail={trails[0]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33
						trail={trails[1]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33
						trail={trails[2]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33
						trail={trails[3]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33
						trail={trails[4]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33
						trail={trails[5]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
			</UL>
		</>
	);
};

export const SevenCardFast = ({
	trails,
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 7>;
	imageLoading: Loading;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25
						trail={trails[0]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[1]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[2]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[3]}
						showAge={true}
						imageLoading={imageLoading}
					/>
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
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 7>;
	imageLoading: Loading;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="33.333%" padSides={true}>
					<Card33Media33
						trail={trails[0]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33
						trail={trails[1]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Card33Media33
						trail={trails[2]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
			</UL>
			<UL direction="row">
				<LI percentage="25%" padSides={true}>
					<Card25Media25
						trail={trails[3]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[4]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[5]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[6]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
			</UL>
		</>
	);
};

export const EightOrMoreFast = ({
	trails,
	imageLoading,
}: {
	trails: [...Tuple<DCRFrontCard, 8>, ...DCRFrontCard[]];
	imageLoading: Loading;
}) => {
	const afterEight = trails.slice(8);

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25
						trail={trails[0]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[1]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[2]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[3]}
						showAge={true}
						imageLoading={imageLoading}
					/>
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
	imageLoading,
}: {
	trails: [...Tuple<DCRFrontCard, 8>, ...DCRFrontCard[]];
	imageLoading: Loading;
}) => {
	const afterEight = trails.slice(8);

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25
						trail={trails[0]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[1]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[2]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[3]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
			</UL>
			<UL direction="row" padBottom={afterEight.length > 0}>
				<LI percentage="25%" padSides={true}>
					<Card25Media25
						trail={trails[4]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[5]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[6]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI percentage="25%" padSides={true} showDivider={true}>
					<Card25Media25
						trail={trails[7]}
						showAge={true}
						imageLoading={imageLoading}
					/>
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
							<Card25Media25
								trail={trail}
								showAge={true}
								imageLoading={imageLoading}
							/>
						</LI>
					))}
				</UL>
			) : (
				<></>
			)}
		</>
	);
};

export const DecideContainerByTrails = ({
	trails,
	speed,
	imageLoading,
}: Props) => {
	const initialTrails = takeFirst(trails, 8);

	if (speed === 'fast') {
		switch (initialTrails.length) {
			case 0:
				return <></>;
			case 1:
				return (
					<OneCardFast
						trail={initialTrails[0]}
						imageLoading={imageLoading}
					/>
				);
			case 2:
				return (
					<TwoCard
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 3:
				return (
					<ThreeCard
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 4:
				return (
					<FourCard
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 5:
				return (
					<FiveCardFast
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 6:
				return (
					<SixCardFast
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 7:
				return (
					<SevenCardFast
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 8:
				return (
					<EightOrMoreFast
						trails={[...initialTrails, ...trails.slice(8)]}
						imageLoading={imageLoading}
					/>
				);
		}
	} else {
		switch (initialTrails.length) {
			case 0:
				return <></>;
			case 1:
				return (
					<OneCardSlow
						trail={initialTrails[0]}
						imageLoading={imageLoading}
					/>
				);
			case 2:
				return (
					<TwoCard
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 3:
				return (
					<ThreeCard
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 4:
				return (
					<FourCard
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 5:
				return (
					<FiveCardSlow
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 6:
				return (
					<SixCardSlow
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 7:
				return (
					<SevenCardSlow
						trails={initialTrails}
						imageLoading={imageLoading}
					/>
				);
			case 8:
				return (
					<EightOrMoreSlow
						trails={[...initialTrails, ...trails.slice(8)]}
						imageLoading={imageLoading}
					/>
				);
		}
	}
};

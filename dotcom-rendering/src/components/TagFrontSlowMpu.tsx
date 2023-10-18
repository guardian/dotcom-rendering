import { Hide } from '@guardian/source-react-components';
import { Card33Media33, Card50Media50, CardDefault } from '../lib/cardWrappers';
import { type Tuple } from '../lib/tuple';
import type { DCRFrontCard } from '../types/front';
import type { GroupedTrailsSlowMpu } from '../types/tagFront';
import { AdSlot } from './AdSlot.web';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';

const TwoCard = ({
	trails,
	renderAds,
	adIndex,
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 2>;
	renderAds: boolean;
	adIndex: number;
	imageLoading: Loading;
}) => {
	return (
		<UL direction="row">
			<LI percentage={renderAds ? '33.333%' : '50%'} padSides={true}>
				<Card33Media33
					trail={trails[0]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI
				percentage={renderAds ? '33.333%' : '50%'}
				padSides={true}
				showDivider={true}
			>
				<Card33Media33
					trail={trails[1]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
			{renderAds && (
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Hide until="tablet">
						<AdSlot position="inline" index={adIndex} />
					</Hide>
				</LI>
			)}
		</UL>
	);
};

const FourCard = ({
	trails,
	renderAds,
	adIndex,
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 4>;
	renderAds: boolean;
	adIndex: number;
	imageLoading: Loading;
}) => {
	return (
		<UL direction="row">
			<LI percentage={renderAds ? '33.333%' : '50%'} padSides={true}>
				<Card33Media33
					trail={trails[0]}
					showAge={true}
					imageLoading={imageLoading}
				/>
			</LI>
			<LI percentage={renderAds ? '33.333%' : '50%'}>
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
			{renderAds && (
				<LI percentage="33.333%" padSides={true} showDivider={true}>
					<Hide until="tablet">
						<AdSlot position="inline" index={adIndex} />
					</Hide>
				</LI>
			)}
		</UL>
	);
};

const FiveCard = ({
	trails,
	renderAds,
	adIndex,
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 5>;
	renderAds: boolean;
	adIndex: number;
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
				<LI percentage={renderAds ? '33.333%' : '50%'} padSides={true}>
					<Card33Media33
						trail={trails[3]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI
					percentage={renderAds ? '33.333%' : '50%'}
					padSides={true}
					showDivider={true}
				>
					<Card33Media33
						trail={trails[4]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				{renderAds && (
					<LI percentage="33.333%" padSides={true} showDivider={true}>
						<Hide until="tablet">
							<AdSlot position="inline" index={adIndex} />
						</Hide>
					</LI>
				)}
			</UL>
		</>
	);
};

const SevenCards = ({
	trails,
	renderAds,
	adIndex,
	imageLoading,
}: {
	trails: Tuple<DCRFrontCard, 7>;
	renderAds: boolean;
	adIndex: number;
	imageLoading: Loading;
}) => {
	return (
		<>
			<UL direction="row" padBottom={true}>
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
			<UL direction="row" padBottom={true}>
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
			<UL direction="row">
				<LI percentage={renderAds ? '33.333%' : '50%'} padSides={true}>
					<Card33Media33
						trail={trails[5]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				<LI
					percentage={renderAds ? '33.333%' : '50%'}
					padSides={true}
					showDivider={true}
				>
					<Card33Media33
						trail={trails[6]}
						showAge={true}
						imageLoading={imageLoading}
					/>
				</LI>
				{renderAds && (
					<LI percentage="33.333%" padSides={true} showDivider={true}>
						<Hide until="tablet">
							<AdSlot position="inline" index={adIndex} />
						</Hide>
					</LI>
				)}
			</UL>
		</>
	);
};

type Props = GroupedTrailsSlowMpu & {
	renderAds: boolean;
	adIndex: number;
	imageLoading: Loading;
};

export const TagFrontSlowMpu = ({
	trails,
	renderAds,
	adIndex,
	imageLoading,
}: Props) => {
	switch (trails.length) {
		case 2:
			return (
				<TwoCard
					trails={trails}
					renderAds={renderAds}
					adIndex={adIndex}
					imageLoading={imageLoading}
				/>
			);
		case 4:
			return (
				<FourCard
					trails={trails}
					renderAds={renderAds}
					adIndex={adIndex}
					imageLoading={imageLoading}
				/>
			);
		case 5:
			return (
				<FiveCard
					trails={trails}
					renderAds={renderAds}
					adIndex={adIndex}
					imageLoading={imageLoading}
				/>
			);
		case 7:
			return (
				<SevenCards
					trails={trails}
					renderAds={renderAds}
					adIndex={adIndex}
					imageLoading={imageLoading}
				/>
			);
	}
};

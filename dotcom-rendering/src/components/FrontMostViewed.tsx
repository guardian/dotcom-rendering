import type { EditionId } from '../lib/edition.ts';
import type { DCRFrontCard } from '../types/front.ts';
import type { TrailTabType, TrailType } from '../types/trails.ts';
import { Island } from './Island.tsx';
import { localisedTitle } from './Localisation.ts';
import { MostPopularFooterGrid } from './MostPopularFooterGrid.tsx';
import { MostViewedFooter } from './MostViewedFooter.importable.tsx';
import { MostViewedFooterLayout } from './MostViewedFooterLayout.tsx';

type Props = {
	trails: DCRFrontCard[];
	mostViewed: TrailType[];
	mostCommented?: TrailType;
	mostShared?: TrailType;
	displayName: string;
	isNetworkFront: boolean;
	deeplyRead?: TrailType[];
	editionId?: EditionId;
	hasPageSkin?: boolean;
	isFront?: boolean;
	renderAds?: boolean;
};

export const FrontMostViewed = ({
	trails,
	mostViewed,
	mostCommented,
	mostShared,
	displayName,
	isNetworkFront,
	deeplyRead,
	editionId,
	hasPageSkin,
	isFront,
	renderAds,
}: Props) => {
	const showMostViewedTab = !isNetworkFront && !!mostViewed.length;
	const sectionName = displayName.replace('Most viewed ', '');

	const tabs: TrailTabType[] = [
		{
			heading: localisedTitle(sectionName, editionId),
			trails: trails.slice(0, 10),
		},
	];

	if (showMostViewedTab) {
		tabs.push({
			heading: 'Across the guardian',
			trails: mostViewed,
		});
	}

	// Only render most popular if it's a network front
	// and if deeply read trail list is not empty
	const deeplyReadType: TrailTabType | undefined =
		isNetworkFront && deeplyRead && deeplyRead.length > 0
			? {
					heading: 'Deeply read',
					trails: deeplyRead,
			  }
			: undefined;

	const mostViewedItems = tabs.length > 0 ? tabs[0] : undefined;
	const showMostPopular = !!deeplyReadType && !!mostViewedItems;

	return (
		<MostViewedFooterLayout
			hasPageSkin={hasPageSkin}
			isFront={isFront}
			renderAds={renderAds}
		>
			{/* We only need hydration if there are multiple tabs */}
			{showMostViewedTab ? (
				<Island deferUntil="visible">
					<MostViewedFooter
						tabs={tabs}
						sectionId="Most viewed"
						mostCommented={mostCommented}
						mostShared={mostShared}
						hasPageSkin={hasPageSkin}
					/>
				</Island>
			) : showMostPopular ? (
				<MostPopularFooterGrid
					mostViewed={mostViewedItems}
					deeplyRead={deeplyReadType}
					sectionName="Most popular"
					hasPageSkin={hasPageSkin}
				/>
			) : (
				<MostViewedFooter
					tabs={tabs}
					sectionId="Most viewed"
					mostCommented={mostCommented}
					mostShared={mostShared}
					hasPageSkin={hasPageSkin}
				/>
			)}
		</MostViewedFooterLayout>
	);
};

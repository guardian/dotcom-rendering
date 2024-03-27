import type { EditionId } from '../lib/edition';
import type { DCRFrontCard } from '../types/front';
import type { TrailTabType, TrailType } from '../types/trails';
import { Island } from './Island';
import { localisedTitle } from './Localisation';
import { MostPopularFooterGrid } from './MostPopularFooterGrid';
import { MostViewedFooter } from './MostViewedFooter.importable';
import { MostViewedFooterLayout } from './MostViewedFooterLayout';

type Props = {
	trails: DCRFrontCard[];
	mostViewed: TrailType[];
	displayName: string;
	isNetworkFront: boolean;
	deeplyRead?: TrailType[];
	editionId?: EditionId;
	hasPageSkin?: boolean;
	isFront?: boolean;
	renderAds?: boolean;
	showTags: boolean;
};

export const FrontMostViewed = ({
	trails,
	mostViewed,
	displayName,
	isNetworkFront,
	deeplyRead,
	editionId,
	hasPageSkin,
	isFront,
	renderAds,
	showTags = false,
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
			isFront={isFront}
			renderAds={renderAds}
			hasPageSkin={hasPageSkin}
			isDeeplyRead={!!deeplyReadType}
		>
			{/* We only need hydration if there are multiple tabs */}
			{showMostViewedTab ? (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<MostViewedFooter
						tabs={tabs}
						sectionId="Most viewed"
						hasPageSkin={hasPageSkin}
						showTags={showTags}
					/>
				</Island>
			) : showMostPopular ? (
				<MostPopularFooterGrid
					mostViewed={mostViewedItems}
					deeplyRead={deeplyReadType}
					sectionName="Most popular"
					hasPageSkin={hasPageSkin}
					showTags={showTags}
				/>
			) : (
				<MostViewedFooter
					tabs={tabs}
					sectionId="Most viewed"
					hasPageSkin={hasPageSkin}
					showTags={showTags}
				/>
			)}
		</MostViewedFooterLayout>
	);
};

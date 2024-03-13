import { css } from '@emotion/react';
import type { EditionId } from '../lib/edition';
import type { DCRFrontCard } from '../types/front';
import type { TrailTabType, TrailType } from '../types/trails';
import { GeneratedSummaryGrid } from './GeneratedSummaryGrid.importable';
import { Island } from './Island';
import { localisedTitle } from './Localisation';

type Props = {
	trails: DCRFrontCard[];
	mostViewed: TrailType[];
	displayName: string;
	isNetworkFront: boolean;
	deeplyRead?: TrailType[];
	editionId?: EditionId;
};

export const GeneratedSummary = ({
	trails,
	mostViewed,
	displayName,
	isNetworkFront,
	deeplyRead,
	editionId,
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
	// console.error("mostViewedItems", mostViewedItems)
	// console.log("trails", trails)
	// console.log('mostViewed', mostViewed);

	return (
		<>
			<div
				css={css`
					width: 100%;
				`}
			>
				<Island priority="feature" defer={{ until: 'idle' }}>
					<GeneratedSummaryGrid data={tabs} sectionId="sectionId" />
				</Island>
			</div>
		</>
	);
};

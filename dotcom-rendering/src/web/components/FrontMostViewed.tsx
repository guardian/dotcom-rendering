import type { DCRFrontCard } from '../../types/front';
import type { TrailTabType, TrailType } from '../../types/trails';
import { Island } from './Island';
import { MostViewedFooter } from './MostViewedFooter.importable';
import { MostViewedFooterLayout } from './MostViewedFooterLayout';

type Props = {
	trails: DCRFrontCard[];
	mostViewed: TrailType[];
	mostCommented?: TrailType;
	mostShared?: TrailType;
	displayName: string;
	isNetworkFront: boolean;
};

export const FrontMostViewed = ({
	trails,
	mostViewed,
	mostCommented,
	mostShared,
	displayName,
	isNetworkFront,
}: Props) => {
	const showMostViewedTab = !isNetworkFront && !!mostViewed.length;
	const sectionName = displayName.replace('most viewed ', '');

	const tabs: TrailTabType[] = [
		{
			heading: showMostViewedTab ? sectionName : undefined,
			trails: trails.slice(0, 10),
		},
	];

	if (showMostViewedTab) {
		tabs.push({
			heading: 'Across the guardian',
			trails: mostViewed,
		});
	}

	return (
		<MostViewedFooterLayout>
			<Island deferUntil="visible">
				<MostViewedFooter
					tabs={tabs}
					sectionName="Most viewed"
					mostCommented={mostCommented}
					mostShared={mostShared}
				/>
			</Island>
		</MostViewedFooterLayout>
	);
};

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
};

export const FrontMostViewed = ({
	trails,
	mostViewed,
	mostCommented,
	mostShared,
	displayName,
}: Props) => {
	const hasMostViewed = !!mostViewed.length;
	const sectionName = displayName.replace('most viewed ', '');

	const tabs: TrailTabType[] = [
		{
			heading: hasMostViewed ? sectionName : undefined,
			trails: trails.slice(0, 10),
		},
	];

	if (hasMostViewed) {
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

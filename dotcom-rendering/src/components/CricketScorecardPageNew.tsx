import { useEffect, useState } from 'react';
import type { CricketMatch } from '../cricketMatchV2';
import { type EditionId } from '../lib/edition';
import { CricketMatchHeader } from './CricketMatchHeader/CricketMatchHeader';
import type { TabName } from './FootballMatchHeader/Tabs';

export const CricketScorecardPageNew = ({
	match,
	edition,
	selectedTab,
	infoURL,
	liveURL,
	reportURL,
}: {
	match: CricketMatch;
	edition: EditionId;
	selectedTab: TabName;
	infoURL?: URL;
	liveURL?: URL;
	reportURL?: URL;
}) => {
	const [tabContentElement, setTabContentElement] =
		useState<HTMLElement | null>(null);

	useEffect(() => {
		const el = document.getElementById('cricket-tab-content');
		if (el) {
			// eslint-disable-next-line react-hooks/set-state-in-effect -- We need to capture the element client side
			setTabContentElement(el);
		}
	}, []);

	const tabLabels: Record<TabName, string> = {
		info: 'Scorecard',
		live: 'Live feed',
		report: 'Match report',
	};
	return (
		<main id="maincontent">
			<CricketMatchHeader
				match={match}
				edition={edition}
				selectedTab={selectedTab}
				tabContentElement={tabContentElement ?? undefined}
				infoURL={infoURL}
				liveURL={liveURL}
				reportURL={reportURL}
			/>
			<div
				id={`cricket-tab-content`}
				tabIndex={-1}
				role="region"
				aria-label={`${tabLabels[selectedTab]}`}
			>
				Initial Tab content
			</div>
		</main>
	);
};

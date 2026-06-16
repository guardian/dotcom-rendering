import { useEffect, useState } from 'react';
import type { CricketMatch } from '../cricketMatchV2';
import { type EditionId } from '../lib/edition';
import { CricketMatchHeader } from './CricketMatchHeader/CricketMatchHeader';
import type { TabName } from './FootballMatchHeader/Tabs';

/**
 * This component is just used to test the CricketMatchHeader tab rendering in Storybook.
 * It is not used in production.
 */
export const CricketTabsDemo = ({
	match,
	edition,
	selectedTab,
	liveURL,
	reportURL,
}: {
	match: CricketMatch;
	edition: EditionId;
	selectedTab: TabName;
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

	return (
		<main id="maincontent">
			<CricketMatchHeader
				match={match}
				edition={edition}
				selectedTab={selectedTab}
				tabContentElement={tabContentElement ?? undefined}
				liveURL={liveURL}
				reportURL={reportURL}
			/>
			<div id="cricket-tab-content">Initial Tab content</div>
		</main>
	);
};

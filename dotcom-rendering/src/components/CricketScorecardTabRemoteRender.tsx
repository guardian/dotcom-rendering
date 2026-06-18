import { useEffect, useRef } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import type { CricketScorecardTabProps } from './CricketScorecardTab';
import { CricketScorecardTab } from './CricketScorecardTab';

type Props = {
	tabContentElement?: HTMLElement;
} & CricketScorecardTabProps;

/**
 * Renders the cricket scorecard page into another part of the DOM.
 *
 * First of all, only this tab is rendered client side because adding a cricket
 * scorecard page to the app and MAPI would be a significant amount of work
 * across apps & webx.
 *
 * Secondly, we use ReactDOM's `createRoot` and `render` here instead of
 * rendering as part of the main React tree to avoid wrapping a large portion
 * of the StandardLayout and LiveLayout in an island, which would be very large and
 * require passing the entire live blog or article content as props to said island.
 *
 */
export const CricketScorecardTabRemoteRender = ({
	tabContentElement,
	innings,
	officials,
	homeTeam,
	awayTeam,
	result,
}: Props) => {
	const rootRef = useRef<Root | null>(null);

	useEffect(() => {
		if (tabContentElement === undefined) {
			return;
		}
		// Create the root if it doesn't exist, subsequent renders will reuse the same root
		rootRef.current ??= createRoot(tabContentElement);

		// `render` will efficiently update the content as needed for subsequent renders, we don't need to unmount or clear the root ourselves
		rootRef.current.render(
			<CricketScorecardTab
				innings={innings}
				officials={officials}
				homeTeam={homeTeam}
				awayTeam={awayTeam}
				result={result}
			/>,
		);
	}, [tabContentElement, innings, officials, homeTeam, awayTeam, result]);

	return null;
};

import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import {
	puzzlePageFormat,
	PuzzlePageLayout,
	type ResolvedPuzzlePage,
} from '../layouts/PuzzlePageLayout';
import { rootStyles } from '../lib/rootStyles';
import type { NavType } from '../model/extract-nav';
import { AdmiralScript } from './AdmiralScript.island';
import { AlreadyVisited } from './AlreadyVisited.island';
import { useConfig } from './ConfigContext';
import { FocusStyles } from './FocusStyles.island';
import { Island } from './Island';
import { Metrics } from './Metrics.island';
import { SetABTests } from './SetABTests.island';
import { SkipTo } from './SkipTo';

type Props = {
	puzzlePage: ResolvedPuzzlePage;
	NAV: NavType;
};

export const PuzzlePage = ({ puzzlePage, NAV }: Props) => {
	const { darkModeAvailable } = useConfig();

	return (
		<StrictMode>
			<Global styles={rootStyles(puzzlePageFormat, darkModeAvailable)} />
			<SkipTo id="maincontent" label="Skip to main content" />
			<SkipTo id="navigation" label="Skip to navigation" />
			<Island priority="feature" defer={{ until: 'idle' }}>
				<AlreadyVisited />
			</Island>
			<Island priority="feature" defer={{ until: 'idle' }}>
				<AdmiralScript />
			</Island>
			<Island priority="feature" defer={{ until: 'idle' }}>
				<FocusStyles />
			</Island>
			<Island priority="critical">
				<Metrics
					commercialMetricsEnabled={
						!!puzzlePage.config.switches.commercialMetrics
					}
				/>
			</Island>
			<Island priority="critical">
				<SetABTests
					serverSideABTests={puzzlePage.config.serverSideABTests}
				/>
			</Island>
			<PuzzlePageLayout
				puzzlePage={puzzlePage}
				NAV={NAV}
				darkModeAvailable={darkModeAvailable}
			/>
		</StrictMode>
	);
};

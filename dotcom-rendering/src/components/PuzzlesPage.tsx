import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import { PuzzlesLayout } from '../layouts/PuzzlesLayout';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { rootStyles } from '../lib/rootStyles';
import type { NavType } from '../model/extract-nav';
import type { FEPuzzlesPageType } from '../types/puzzlesPage';
import { AdmiralScript } from './AdmiralScript.island';
import { AlreadyVisited } from './AlreadyVisited.island';
import { useConfig } from './ConfigContext';
import { FocusStyles } from './FocusStyles.island';
import { Island } from './Island';
import { Metrics } from './Metrics.island';
import { SetABTests } from './SetABTests.island';
import { SkipTo } from './SkipTo';

type Props = {
	puzzlesPage: FEPuzzlesPageType;
	NAV: NavType;
};

export const PuzzlesPage = ({ puzzlesPage, NAV }: Props) => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.Lifestyle,
	};
	const { darkModeAvailable } = useConfig();

	return (
		<StrictMode>
			<Global styles={rootStyles(format, darkModeAvailable)} />
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
						!!puzzlesPage.config.switches.commercialMetrics
					}
				/>
			</Island>
			<Island priority="critical">
				<SetABTests
					serverSideABTests={puzzlesPage.config.serverSideABTests}
				/>
			</Island>
			<PuzzlesLayout puzzlesPage={puzzlesPage} NAV={NAV} />
		</StrictMode>
	);
};

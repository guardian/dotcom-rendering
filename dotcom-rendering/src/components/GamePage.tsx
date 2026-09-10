import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import { GameLayout, type ResolvedGamePage } from '../layouts/GameLayout';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
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
	gamePage: ResolvedGamePage;
	NAV: NavType;
};

export const GamePage = ({ gamePage, NAV }: Props) => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
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
						!!gamePage.config.switches.commercialMetrics
					}
				/>
			</Island>
			<Island priority="critical">
				<SetABTests
					serverSideABTests={gamePage.config.serverSideABTests}
				/>
			</Island>
			<GameLayout gamePage={gamePage} NAV={NAV} />
		</StrictMode>
	);
};

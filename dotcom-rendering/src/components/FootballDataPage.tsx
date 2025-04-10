import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import type {
	FootballMatchListPage,
	FootballTablesPage,
} from '../sportDataPage';
import { FootballDataPageLayout } from '../layouts/FootballDataPageLayout';
import { buildAdTargeting } from '../lib/ad-targeting';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { rootStyles } from '../lib/rootStyles';
import { filterABTestSwitches } from '../model/enhance-switches';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { useConfig } from './ConfigContext';
import { DarkModeMessage } from './DarkModeMessage';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { Metrics } from './Metrics.importable';
import { SetABTests } from './SetABTests.importable';
import { SetAdTargeting } from './SetAdTargeting.importable';
import { SkipTo } from './SkipTo';

type Props = {
	footballData: FootballMatchListPage | FootballTablesPage;
};

/**
 * @description
 * FootballDataPage is a high level wrapper for football pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * */
export const FootballDataPage = ({ footballData }: Props) => {
	const adTargeting = buildAdTargeting({
		isAdFreeUser: footballData.isAdFreeUser,
		isSensitive: footballData.config.isSensitive,
		edition: footballData.config.edition,
		section: footballData.config.section,
		sharedAdTargeting: footballData.config.sharedAdTargeting,
		adUnit: footballData.config.adUnit,
	});

	/* We use this as our "base" or default format */
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
				<FocusStyles />
			</Island>
			<Island priority="critical">
				<Metrics
					commercialMetricsEnabled={
						!!footballData.config.switches.commercialMetrics
					}
					tests={footballData.config.abTests}
				/>
			</Island>
			<Island priority="critical">
				<SetABTests
					abTestSwitches={filterABTestSwitches(
						footballData.config.switches,
					)}
					pageIsSensitive={footballData.config.isSensitive}
					isDev={!!footballData.config.isDev}
					serverSideTests={footballData.config.abTests}
				/>
			</Island>
			<Island priority="critical">
				<SetAdTargeting adTargeting={adTargeting} />
			</Island>
			{darkModeAvailable && (
				<DarkModeMessage>
					Dark mode is a work-in-progress.
					<br />
					You can{' '}
					<a
						style={{ color: 'inherit' }}
						href="/opt/out/dark-mode-web"
					>
						opt out anytime
					</a>{' '}
					if anything is unreadable or odd.
				</DarkModeMessage>
			)}
			<FootballDataPageLayout footballData={footballData} />,
		</StrictMode>
	);
};

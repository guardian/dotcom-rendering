import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import { buildAdTargeting } from '../lib/ad-targeting';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { rootStyles } from '../lib/rootStyles';
import { filterABTestSwitches } from '../model/enhance-switches';
import type { NavType } from '../model/extract-nav';
import type { DCRTagPageType } from '../types/tagPage';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { useConfig } from './ConfigContext';
import { DarkModeMessage } from './DarkModeMessage';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { Metrics } from './Metrics.importable';
import { SetABTests } from './SetABTests.importable';
import { SetAdTargeting } from './SetAdTargeting.importable';
import { SkipTo } from './SkipTo';
import { FootballDataLayout } from '../layouts/FootballDataLayout';

type Props = {
	// footballPage: FEFootballPageType; TODO: type needs to be created
};

/**
 * @description
 * FootballDataPage is a high level wrapper for football pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * */
export const FootballDataPage = ({}: Props) => {
	// const adTargeting = buildAdTargeting({
	// 	isAdFreeUser: tagPage.isAdFreeUser,
	// 	isSensitive: tagPage.config.isSensitive,
	// 	edition: tagPage.config.edition,
	// 	section: tagPage.config.section,
	// 	sharedAdTargeting: tagPage.config.sharedAdTargeting,
	// 	adUnit: tagPage.config.adUnit,
	// });

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
						false
						// TODO: !!footballPage.config.switches.commercialMetrics
					}
					// TODO: tests={footballPage.config.abTests}
					tests={{}}
				/>
			</Island>
			<Island priority="critical">
				<SetABTests
					abTestSwitches={{}}
					pageIsSensitive={false}
					isDev={true}
					serverSideTests={{}}
					// TODO:
					// abTestSwitches={filterABTestSwitches(
					// 	footballPage.config.switches,
					// )}
					// pageIsSensitive={footballPage.config.isSensitive}
					// isDev={!!footballPage.config.isDev}
					// serverSideTests={footballPage.config.abTests}
				/>
			</Island>
			<Island priority="critical">
				<SetAdTargeting
					adTargeting={{
						disableAds: true, // TODO: adTargeting should be passed here
					}}
				/>
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
			<FootballDataLayout />,
		</StrictMode>
	);
};

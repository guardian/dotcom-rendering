import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import { SportDataPageLayout } from '../layouts/SportDataPageLayout';
import { buildAdTargeting } from '../lib/ad-targeting';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { rootStyles } from '../lib/rootStyles';
import { filterABTestSwitches } from '../model/enhance-switches';
import type { AppSportDataPage, WebSportDataPage } from '../sportDataPage';
import { AlreadyVisited } from './AlreadyVisited.island';
import { useConfig } from './ConfigContext';
import { DarkModeMessage } from './DarkModeMessage';
import { FocusStyles } from './FocusStyles.island';
import { Island } from './Island';
import { Metrics } from './Metrics.island';
import { SetABTests } from './SetABTests.island';
import { SetAdTargeting } from './SetAdTargeting.island';
import { SkipTo } from './SkipTo';

type Props = AppSportDataPage | WebSportDataPage;

/**
 * @description
 * SportDataPageComponent is a high level wrapper for sport data pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * */
export const SportDataPageComponent = (props: Props) => {
	const { sportData, renderingTarget } = props;

	const adTargeting = buildAdTargeting({
		isAdFreeUser: sportData.isAdFreeUser,
		isSensitive: sportData.config.isSensitive,
		edition: sportData.config.edition,
		section: sportData.config.section,
		sharedAdTargeting: sportData.config.sharedAdTargeting,
		adUnit: sportData.config.adUnit,
	});

	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

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
			{isWeb && (
				<>
					<SkipTo id="maincontent" label="Skip to main content" />
					<SkipTo id="navigation" label="Skip to navigation" />
				</>
			)}
			<Island priority="feature" defer={{ until: 'idle' }}>
				<FocusStyles />
			</Island>
			{/* web */}
			{isWeb && (
				<>
					<Island priority="feature" defer={{ until: 'idle' }}>
						<AlreadyVisited />
					</Island>
					<Island priority="critical">
						<Metrics
							commercialMetricsEnabled={
								!!sportData.config.switches.commercialMetrics
							}
							tests={sportData.config.abTests}
						/>
					</Island>
					<Island priority="critical">
						<SetABTests
							abTestSwitches={filterABTestSwitches(
								sportData.config.switches,
							)}
							pageIsSensitive={sportData.config.isSensitive}
							isDev={!!sportData.config.isDev}
							serverSideTests={sportData.config.abTests}
							serverSideABTests={
								sportData.config.serverSideABTests
							}
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
								href="/ab-tests/opt-out/webx-dark-mode-web"
							>
								opt out anytime
							</a>{' '}
							if anything is unreadable or odd.
						</DarkModeMessage>
					)}
				</>
			)}
			{isWeb && (
				<SportDataPageLayout
					sportData={sportData}
					nav={props.nav}
					renderingTarget={renderingTarget}
				/>
			)}

			{isApps && (
				<SportDataPageLayout
					sportData={sportData}
					renderingTarget={renderingTarget}
				/>
			)}
		</StrictMode>
	);
};

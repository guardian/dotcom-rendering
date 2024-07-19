import { Global } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { StrictMode } from 'react';
import { NavPageLayout } from '../layouts/NavPageLayout';
import { buildAdTargeting } from '../lib/ad-targeting';
import { rootStyles } from '../lib/rootStyles';
import { filterABTestSwitches } from '../model/enhance-switches';
import type { NavType } from '../model/extract-nav';
import type { DCRNavPage } from '../types/navPage';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { DarkModeMessage } from './DarkModeMessage';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { Metrics } from './Metrics.importable';
import { SetABTests } from './SetABTests.importable';
import { SetAdTargeting } from './SetAdTargeting.importable';
import { SkipTo } from './SkipTo';

type Props = {
	navPage: DCRNavPage;
	NAV: NavType;
};

/**
 * @description
 * NavPage is a high level wrapper for the static navigation page on Dotcom.
 * Sets strict mode and some globals
 *
 * This is only used if a user has disbaled Javascript.
 *
 * @param {Props} props
 * @param {DCRFrontType} props.front - The article JSON data
 * @param {NAVType} props.NAV - The article JSON data
 * */
export const NavPage = ({ navPage, NAV }: Props) => {
	const adTargeting = buildAdTargeting({
		isAdFreeUser: navPage.isAdFreeUser,
		isSensitive: navPage.config.isSensitive,
		edition: navPage.config.edition,
		section: navPage.config.section,
		sharedAdTargeting: navPage.config.sharedAdTargeting,
		adUnit: navPage.config.adUnit,
	});

	/* We use this as our "base" or default format */
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};

	const darkModeAvailable =
		navPage.config.abTests.darkModeWebVariant === 'variant';

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
						!!navPage.config.switches.commercialMetrics
					}
					tests={navPage.config.abTests}
				/>
			</Island>
			<Island priority="critical">
				<SetABTests
					abTestSwitches={filterABTestSwitches(
						navPage.config.switches,
					)}
					pageIsSensitive={navPage.config.isSensitive}
					isDev={!!navPage.config.isDev}
					serverSideTests={navPage.config.abTests}
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
			<NavPageLayout navPage={navPage} NAV={NAV} />
		</StrictMode>
	);
};

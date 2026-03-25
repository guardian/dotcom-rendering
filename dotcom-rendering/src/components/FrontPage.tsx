import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import { FrontLayout } from '../layouts/FrontLayout';
import { buildAdTargeting } from '../lib/ad-targeting';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { rootStyles } from '../lib/rootStyles';
import { filterABTestSwitches } from '../model/enhance-switches';
import type { NavType } from '../model/extract-nav';
import type { Front } from '../types/front';
import { AdmiralScript } from './AdmiralScript.island';
import { AlreadyVisited } from './AlreadyVisited.island';
import { BrazeMessaging } from './BrazeMessaging.island';
import { useConfig } from './ConfigContext';
import { DarkModeMessage } from './DarkModeMessage';
import { FocusStyles } from './FocusStyles.island';
import { GoogleOneTap, isGoogleOneTapEnabled } from './GoogleOneTap.island';
import { Island } from './Island';
import { Metrics } from './Metrics.island';
import { ReaderRevenueDev } from './ReaderRevenueDev.island';
import { SetABTests } from './SetABTests.island';
import { SetAdTargeting } from './SetAdTargeting.island';
import { ShowHideContainers } from './ShowHideContainers.island';
import { SkipTo } from './SkipTo';
import { SlimHomepageAbTest } from './SlimHomepageAbTest.island';

type Props = {
	front: Front;
	NAV: NavType;
};

/**
 * @description
 * FrontPage is a high level wrapper for front pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * @param {Front} props.front - The article JSON data
 * @param {NAVType} props.NAV - The article JSON data
 * */
export const FrontPage = ({ front, NAV }: Props) => {
	const adTargeting = buildAdTargeting({
		isAdFreeUser: front.isAdFreeUser,
		isSensitive: front.config.isSensitive,
		edition: front.config.edition,
		section: front.config.section,
		sharedAdTargeting: front.config.sharedAdTargeting,
		adUnit: front.config.adUnit,
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
				<AdmiralScript />
			</Island>
			<Island priority="enhancement" defer={{ until: 'idle' }}>
				<FocusStyles />
			</Island>
			<Island priority="critical">
				<Metrics
					commercialMetricsEnabled={
						!!front.config.switches.commercialMetrics
					}
					tests={front.config.abTests}
				/>
			</Island>
			<Island priority="enhancement" defer={{ until: 'idle' }}>
				<ShowHideContainers />
			</Island>
			<Island priority="critical">
				<SetABTests
					abTestSwitches={filterABTestSwitches(front.config.switches)}
					pageIsSensitive={front.config.isSensitive}
					isDev={!!front.config.isDev}
					serverSideTests={front.config.abTests}
					serverSideABTests={front.config.serverSideABTests}
				/>
			</Island>
			<Island priority="critical">
				<SetAdTargeting adTargeting={adTargeting} />
			</Island>
			<Island priority="feature" defer={{ until: 'idle' }}>
				<BrazeMessaging idApiUrl={front.config.idApiUrl} />
			</Island>
			<Island priority="feature" defer={{ until: 'idle' }}>
				<ReaderRevenueDev shouldHideReaderRevenue={false} />
			</Island>
			<Island priority="enhancement" defer={{ until: 'idle' }}>
				<SlimHomepageAbTest />
			</Island>
			{isGoogleOneTapEnabled(
				front.config.abTests,
				front.config.switches,
			) && (
				<Island priority="enhancement" defer={{ until: 'idle' }}>
					<GoogleOneTap />
				</Island>
			)}
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
			<FrontLayout front={front} NAV={NAV} />
		</StrictMode>
	);
};

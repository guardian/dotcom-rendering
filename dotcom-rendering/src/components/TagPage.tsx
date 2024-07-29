import { Global } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { StrictMode } from 'react';
import { TagPageLayout } from '../layouts/TagPageLayout';
import { buildAdTargeting } from '../lib/ad-targeting';
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

type Props = {
	tagPage: DCRTagPageType;
	NAV: NavType;
};

/**
 * @description
 * FrontPage is a high level wrapper for front pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * @param {DCRFrontType} props.front - The article JSON data
 * @param {NAVType} props.NAV - The article JSON data
 * */
export const TagPage = ({ tagPage, NAV }: Props) => {
	const adTargeting = buildAdTargeting({
		isAdFreeUser: tagPage.isAdFreeUser,
		isSensitive: tagPage.config.isSensitive,
		edition: tagPage.config.edition,
		section: tagPage.config.section,
		sharedAdTargeting: tagPage.config.sharedAdTargeting,
		adUnit: tagPage.config.adUnit,
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
			<Global
				styles={rootStyles(
					format, // @TODO remove (darkness, my old friend)
					darkModeAvailable ? true : true,
				)}
			/>
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
						!!tagPage.config.switches.commercialMetrics
					}
					tests={tagPage.config.abTests}
				/>
			</Island>
			<Island priority="critical">
				<SetABTests
					abTestSwitches={filterABTestSwitches(
						tagPage.config.switches,
					)}
					pageIsSensitive={tagPage.config.isSensitive}
					isDev={!!tagPage.config.isDev}
					serverSideTests={tagPage.config.abTests}
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
			<TagPageLayout tagPage={tagPage} NAV={NAV} />
		</StrictMode>
	);
};

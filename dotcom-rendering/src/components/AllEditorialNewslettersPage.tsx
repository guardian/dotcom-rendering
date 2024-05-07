import { Global } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { StrictMode } from 'react';
import { AllEditorialNewslettersPageLayout } from '../layouts/AllEditorialNewslettersPageLayout';
import { rootStyles } from '../lib/rootStyles';
import type { NavType } from '../model/extract-nav';
import type { DCRNewslettersPageType } from '../types/newslettersPage';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { Metrics } from './Metrics.importable';
import { SkipTo } from './SkipTo';

type Props = {
	newslettersPage: DCRNewslettersPageType;
	NAV: NavType;
};

/**
 * @description
 * AllEditorialNewslettersPage is a high level wrapper for the
 * editorial newsletters page on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * @param {DCRNewslettersPageType} props.newslettersPage - The newsletters JSON data
 * @param {NAVType} props.NAV - The nav JSON data
 * */
export const AllEditorialNewslettersPage = ({
	newslettersPage,
	NAV,
}: Props) => {
	/* We use this as our "base" or default format */
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};

	const darkModeAvailable =
		newslettersPage.config.abTests.darkModeWebVariant === 'variant';

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
						!!newslettersPage.config.switches.commercialMetrics
					}
					tests={newslettersPage.config.abTests}
				/>
			</Island>
			<AllEditorialNewslettersPageLayout
				newslettersPage={newslettersPage}
				NAV={NAV}
			/>
		</StrictMode>
	);
};

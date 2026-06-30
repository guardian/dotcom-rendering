import { Global } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import { StrictMode } from 'react';
import { AdSlot } from '../components/AdSlot.web';
import type { FEShell } from '../frontend/feShell';
import { BannerWrapper, Stuck } from '../layouts/lib/stickiness';
import { buildAdTargeting } from '../lib/ad-targeting';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { rootStyles } from '../lib/rootStyles';
import type { NavType } from '../model/extract-nav';
import { AlreadyVisited } from './AlreadyVisited.island';
import { useConfig } from './ConfigContext';
import { DarkModeMessage } from './DarkModeMessage';
// @ts-expect-error -- HTML asset
import html from './fashion.html';
import { FocusStyles } from './FocusStyles.island';
import { Footer } from './Footer';
import { HeaderAdSlot } from './HeaderAdSlot';
import { Island } from './Island';
import { Masthead } from './Masthead/Masthead';
import { Metrics } from './Metrics.island';
import { Section } from './Section';
import { SetABTests } from './SetABTests.island';
import { SetAdTargeting } from './SetAdTargeting.island';
import { SkipTo } from './SkipTo';
import { StickyBottomBanner } from './StickyBottomBanner.island';
import { SubNav } from './SubNav.island';

type Props = {
	feShell: FEShell;
	nav: NavType;
	renderingTarget: 'Web' | 'Apps';
};

export const ShellPage = (props: Props) => {
	const { feShell, nav, renderingTarget } = props;

	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	const renderAds = canRenderAds(feShell);
	const config = feShell.config;

	const adTargeting = buildAdTargeting({
		isAdFreeUser: feShell.isAdFreeUser,
		isSensitive: config.isSensitive,
		edition: config.edition,
		section: config.section,
		sharedAdTargeting: config.sharedAdTargeting,
		adUnit: config.adUnit,
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
			{isWeb && (
				<>
					<SkipTo id="maincontent" label="Skip to main content" />
					<SkipTo id="navigation" label="Skip to navigation" />
				</>
			)}
			<Island priority="feature" defer={{ until: 'idle' }}>
				<FocusStyles />
			</Island>
			{isWeb && (
				<>
					<Island priority="feature" defer={{ until: 'idle' }}>
						<AlreadyVisited />
					</Island>
					<Island priority="critical">
						<Metrics
							commercialMetricsEnabled={
								!!config.switches.commercialMetrics
							}
							tests={config.abTests}
						/>
					</Island>
					<Island priority="critical">
						<SetABTests
							serverSideABTests={config.serverSideABTests}
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
			{/* layout */}
			{isWeb && (
				<div data-print-layout="hide" id="bannerandheader">
					{renderAds && (
						<Stuck>
							<Section
								fullWidth={true}
								showTopBorder={false}
								showSideBorders={false}
								padSides={false}
								shouldCenter={false}
							>
								<HeaderAdSlot />
							</Section>
						</Stuck>
					)}

					<Masthead
						nav={nav}
						editionId={feShell.editionId}
						idUrl={config.idUrl}
						mmaUrl={config.mmaUrl}
						discussionApiUrl={config.discussionApiUrl}
						idApiUrl={config.idApiUrl}
						contributionsServiceUrl={
							feShell.contributionsServiceUrl
						}
						showSubNav={true}
						showSlimNav={false}
						hasPageSkin={config.hasPageSkin}
						pageId={config.pageId}
						sectionId={config.section}
						contentType={config.contentType}
					/>
				</div>
			)}
			{isWeb && renderAds && config.hasSurveyAd && (
				<AdSlot position="survey" />
			)}

			{/* <div>Hello DCAR sites shell 👋</div> */}
			<div dangerouslySetInnerHTML={{ __html: html }} />

			{isWeb && (
				<>
					{props.nav.subNavSections && (
						<Section
							fullWidth={true}
							showTopBorder={true}
							padSides={false}
							element="aside"
						>
							<Island
								priority="enhancement"
								defer={{ until: 'visible' }}
							>
								<SubNav
									subNavSections={props.nav.subNavSections}
									currentNavLink={props.nav.currentNavLink}
									position="footer"
								/>
							</Island>
						</Section>
					)}

					<Section
						fullWidth={true}
						padSides={false}
						backgroundColour={palette.brand[400]}
						borderColour={palette.brand[600]}
						showSideBorders={false}
						showTopBorder={false}
						element="footer"
					>
						<Footer
							pageFooter={feShell.pageFooter}
							selectedPillar={props.nav.selectedPillar}
							pillars={props.nav.pillars}
							urls={props.nav.readerRevenueLinks.footer}
							editionId={feShell.editionId}
						/>
					</Section>
					<BannerWrapper data-print-layout="hide">
						<Island priority="feature" defer={{ until: 'idle' }}>
							<StickyBottomBanner
								contentType={config.contentType}
								contributionsServiceUrl={
									feShell.contributionsServiceUrl
								}
								idApiUrl={config.idApiUrl}
								isMinuteArticle={false}
								isPaidContent={!!config.isPaidContent}
								// TODO: article and fronts are using different config types 😱
								isPreview={config.isPreview ?? false}
								isSensitive={config.isSensitive}
								pageId={config.pageId}
								sectionId={config.section}
								shouldHideReaderRevenue={false}
								remoteBannerSwitch={
									!!config.switches.remoteBanner
								}
								tags={[]}
							/>
						</Island>
					</BannerWrapper>
				</>
			)}
			{isApps && (
				<>
					<div>Coming soon. Thanks for dropping by.</div>
				</>
			)}
		</StrictMode>
	);
};

import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import { DecideLayout } from '../layouts/DecideLayout';
import { buildAdTargeting } from '../lib/ad-targeting';
import { ArticleDesign } from '../lib/articleFormat';
import { rootStyles } from '../lib/rootStyles';
import { filterABTestSwitches } from '../model/enhance-switches';
import type { NavType } from '../model/extract-nav';
import type { Article } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { BrazeMessaging } from './BrazeMessaging.importable';
import { useConfig } from './ConfigContext';
import { DarkModeMessage } from './DarkModeMessage';
import { EnhanceAffiliateLinks } from './EnhanceAffiliateLinks.importable';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { Lightbox } from './Lightbox';
import { Metrics } from './Metrics.importable';
import { ReaderRevenueDev } from './ReaderRevenueDev.importable';
import { SendTargetingParams } from './SendTargetingParams.importable';
import { SetABTests } from './SetABTests.importable';
import { SetAdTargeting } from './SetAdTargeting.importable';
import { SkipTo } from './SkipTo';

interface BaseProps {
	article: Article;
	renderingTarget: RenderingTarget;
}

interface WebProps extends BaseProps {
	renderingTarget: 'Web';
	NAV: NavType;
}

interface AppProps extends BaseProps {
	renderingTarget: 'Apps';
}

/**
 * @description
 * Article is a high level wrapper for article pages on Dotcom. Sets strict mode and some globals
 */
export const ArticlePage = (props: WebProps | AppProps) => {
	const {
		article: { design, display, theme, frontendData },
		renderingTarget,
	} = props;

	const adTargeting = buildAdTargeting({
		isAdFreeUser: frontendData.isAdFreeUser,
		isSensitive: frontendData.config.isSensitive,
		edition: frontendData.config.edition,
		section: frontendData.config.section,
		sharedAdTargeting: frontendData.config.sharedAdTargeting,
		adUnit: frontendData.config.adUnit,
	});

	const isWeb = renderingTarget === 'Web';
	const { darkModeAvailable } = useConfig();

	const format = {
		design,
		display,
		theme,
	};

	return (
		<StrictMode>
			<Global styles={rootStyles(format, darkModeAvailable)} />
			{isWeb && (
				<>
					<SkipTo id="maincontent" label="Skip to main content" />
					<SkipTo id="navigation" label="Skip to navigation" />
				</>
			)}
			<Lightbox
				format={format}
				switches={frontendData.config.switches}
				{...(renderingTarget === 'Web'
					? {
							lightboxImages: frontendData.imagesForLightbox,
							renderingTarget,
					  }
					: {
							lightboxImages: frontendData.imagesForAppsLightbox,
							renderingTarget,
					  })}
			/>
			<Island priority="enhancement" defer={{ until: 'idle' }}>
				<FocusStyles />
			</Island>
			{!!frontendData.affiliateLinksDisclaimer && (
				<Island priority="feature" defer={{ until: 'idle' }}>
					<EnhanceAffiliateLinks />
				</Island>
			)}
			{(format.design === ArticleDesign.LiveBlog ||
				format.design === ArticleDesign.DeadBlog) && (
				<SkipTo id={'key-events-carousel'} label="Skip to key events" />
			)}
			{renderingTarget === 'Web' && (
				<>
					<SkipTo id="navigation" label="Skip to navigation" />
					<Island priority="feature" defer={{ until: 'idle' }}>
						<AlreadyVisited />
					</Island>
					<Island priority="critical">
						<Metrics
							commercialMetricsEnabled={
								!!frontendData.config.switches.commercialMetrics
							}
							tests={frontendData.config.abTests}
						/>
					</Island>
					<Island priority="feature" defer={{ until: 'idle' }}>
						<BrazeMessaging
							idApiUrl={frontendData.config.idApiUrl}
						/>
					</Island>

					<Island priority="feature" defer={{ until: 'idle' }}>
						<ReaderRevenueDev
							shouldHideReaderRevenue={
								frontendData.shouldHideReaderRevenue
							}
						/>
					</Island>
					<Island priority="critical">
						<SetABTests
							abTestSwitches={filterABTestSwitches(
								frontendData.config.switches,
							)}
							pageIsSensitive={frontendData.config.isSensitive}
							isDev={!!frontendData.config.isDev}
							serverSideTests={frontendData.config.abTests}
						/>
					</Island>
				</>
			)}
			{renderingTarget === 'Web' ? (
				<Island priority="critical">
					<SetAdTargeting adTargeting={adTargeting} />
				</Island>
			) : (
				<Island priority="critical">
					<SendTargetingParams
						editionCommercialProperties={
							frontendData.commercialProperties[
								frontendData.editionId
							]
						}
					/>
				</Island>
			)}
			{renderingTarget === 'Web' && darkModeAvailable && (
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
			{renderingTarget === 'Apps' && !darkModeAvailable && (
				<DarkModeMessage>
					We hope you are enjoying the updates we are implementing on
					articles. Unfortunately, some are still missing a dark mode
					view. Rest assured this will be fixed in a forthcoming beta
					release.
				</DarkModeMessage>
			)}
			{renderingTarget === 'Apps' ? (
				<DecideLayout
					article={props.article}
					renderingTarget={renderingTarget}
				/>
			) : (
				<DecideLayout
					article={props.article}
					NAV={props.NAV}
					renderingTarget={renderingTarget}
				/>
			)}
		</StrictMode>
	);
};

import { Global } from '@emotion/react';
import { ArticleDesign, type ArticleFormat } from '@guardian/libs';
import { StrictMode } from 'react';
import { DecideLayout } from '../layouts/DecideLayout';
import { buildAdTargeting } from '../lib/ad-targeting';
import { rootStyles } from '../lib/rootStyles';
import { filterABTestSwitches } from '../model/enhance-switches';
import type { NavType } from '../model/extract-nav';
import type { DCRArticle } from '../types/frontend';
import type { RenderingTarget } from '../types/renderingTarget';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { BrazeMessaging } from './BrazeMessaging.importable';
import { useConfig } from './ConfigContext';
import { DarkModeMessage } from './DarkModeMessage';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { LightboxHash } from './LightboxHash.importable';
import { LightboxLayout } from './LightboxLayout.importable';
import { Metrics } from './Metrics.importable';
import { ReaderRevenueDev } from './ReaderRevenueDev.importable';
import { SendTargetingParams } from './SendTargetingParams.importable';
import { SetABTests } from './SetABTests.importable';
import { SetAdTargeting } from './SetAdTargeting.importable';
import { SkipTo } from './SkipTo';

interface BaseProps {
	article: DCRArticle;
	format: ArticleFormat;
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
	const { article, format, renderingTarget } = props;

	const adTargeting = buildAdTargeting({
		isAdFreeUser: article.isAdFreeUser,
		isSensitive: article.config.isSensitive,
		edition: article.config.edition,
		section: article.config.section,
		sharedAdTargeting: article.config.sharedAdTargeting,
		adUnit: article.config.adUnit,
	});

	const isWeb = renderingTarget === 'Web';
	const webLightbox = isWeb && !!article.config.switches.lightbox;
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
			{webLightbox && article.imagesForLightbox.length > 0 && (
				<>
					<Island priority="feature" defer={{ until: 'hash' }}>
						<LightboxLayout
							format={format}
							images={article.imagesForLightbox}
						/>
					</Island>
					<Island priority="feature" defer={{ until: 'idle' }}>
						<LightboxHash />
					</Island>
				</>
			)}

			<Island priority="enhancement" defer={{ until: 'idle' }}>
				<FocusStyles />
			</Island>
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
								!!article.config.switches.commercialMetrics
							}
							tests={article.config.abTests}
						/>
					</Island>
					<Island priority="feature" defer={{ until: 'idle' }}>
						<BrazeMessaging idApiUrl={article.config.idApiUrl} />
					</Island>

					<Island priority="feature" defer={{ until: 'idle' }}>
						<ReaderRevenueDev
							shouldHideReaderRevenue={
								article.shouldHideReaderRevenue
							}
						/>
					</Island>
					<Island priority="critical">
						<SetABTests
							abTestSwitches={filterABTestSwitches(
								article.config.switches,
							)}
							pageIsSensitive={article.config.isSensitive}
							isDev={!!article.config.isDev}
							serverSideTests={article.config.abTests}
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
							article.commercialProperties[article.editionId]
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
					article={article}
					format={format}
					renderingTarget={renderingTarget}
				/>
			) : (
				<DecideLayout
					article={article}
					NAV={props.NAV}
					format={format}
					renderingTarget={renderingTarget}
				/>
			)}
		</StrictMode>
	);
};

import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import { DecideLayout } from '../layouts/DecideLayout';
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
import { GoogleOneTap, isGoogleOneTapEnabled } from './GoogleOneTap.importable';
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
export const HostedContentPage = (props: WebProps | AppProps) => {
	const {
		hostedContent: { type, frontendData },
		renderingTarget,
	} = props;

	const isWeb = renderingTarget === 'Web';
	const { darkModeAvailable } = useConfig();

	/* We use this as our "base" or default format */
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
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
			<Island priority="enhancement" defer={{ until: 'idle' }}>
				<FocusStyles />
			</Island>
			{renderingTarget === 'Web' && (
				<>
					<SkipTo id="navigation" label="Skip to navigation" />
					{/* @todo: Implement these */}
					{/* <Island priority="critical">
						<Metrics
							commercialMetricsEnabled={
								!!frontendData.config.switches.commercialMetrics
							}
							tests={frontendData.config.abTests}
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
							serverSideABTests={
								frontendData.config.serverSideABTests
							}
						/>
					</Island> */}
				</>
			)}
			{/* @todo: Implement dark mode */}
			{/* {renderingTarget === 'Web' && darkModeAvailable && (
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
			)} */}
			{/* {renderingTarget === 'Apps' && !darkModeAvailable && (
				<DarkModeMessage>
					We hope you are enjoying the updates we are implementing on
					articles. Unfortunately, some are still missing a dark mode
					view. Rest assured this will be fixed in a forthcoming beta
					release.
				</DarkModeMessage>
			)} */}

			<DecideLayout
				hostedContent={props.hostedContent}
				renderingTarget={renderingTarget}
			/>
		</StrictMode>
	);
};

const DecideLayout = ({
	hostedContent,
	renderingTarget,
}: {
	hostedContent: HostedContent;
	renderingTarget: 'Web' | 'Apps';
}) => {
	switch (hostedContent.design) {
		case ArticleDesign.Gallery:
			return <HostedGalleryLayout />;
		case ArticleDesign.Video:
			return <HostedVideoLayout />;
		case ArticleDesign.Standard:
		default:
			return <HostedArticleLayout />;
	}
};

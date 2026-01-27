import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import { HostedArticleLayout } from '../layouts/HostedArticleLayout';
import { ArticleDesign } from '../lib/articleFormat';
import { rootStyles } from '../lib/rootStyles';
import { filterABTestSwitches } from '../model/enhance-switches';
import type { Article } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { useConfig } from './ConfigContext';
import { DarkModeMessage } from './DarkModeMessage';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { Lightbox } from './Lightbox';
import { Metrics } from './Metrics.importable';
import { SetABTests } from './SetABTests.importable';
import { SkipTo } from './SkipTo';

interface BaseProps {
	hostedContent: Article;
	renderingTarget: RenderingTarget;
}

interface WebProps extends BaseProps {
	renderingTarget: 'Web';
}

interface AppProps extends BaseProps {
	renderingTarget: 'Apps';
}

const DecideHostedLayout = ({
	hostedContent,
	renderingTarget,
}: WebProps | AppProps) => {
	switch (hostedContent.design) {
		case ArticleDesign.HostedArticle:
			return (
				<HostedArticleLayout
					hostedArticle={hostedContent}
					renderingTarget={renderingTarget}
				/>
			);
		case ArticleDesign.HostedVideo:
		case ArticleDesign.HostedGallery:
		default:
			return 'Not supported';
	}
};

/**
 * @description
 * Hosted Content pages are paid content written by third parties but hosted on theguardian.com domain.
 * This is a high level wrapper for these pages on Dotcom. Sets strict mode and some globals
 */
export const HostedContentPage = (props: WebProps | AppProps) => {
	const {
		hostedContent: { design, display, theme, frontendData },
		renderingTarget,
	} = props;

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
			{isWeb && <SkipTo id="maincontent" label="Skip to main content" />}
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
			{renderingTarget === 'Web' && (
				<>
					<Island priority="critical">
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
					</Island>
				</>
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

			<DecideHostedLayout
				hostedContent={props.hostedContent}
				renderingTarget={renderingTarget}
			/>
		</StrictMode>
	);
};

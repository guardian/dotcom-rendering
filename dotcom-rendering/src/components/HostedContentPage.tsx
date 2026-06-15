import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import { HostedArticleLayout } from '../layouts/HostedArticleLayout';
import { HostedGalleryLayout } from '../layouts/HostedGalleryLayout';
import { HostedVideoLayout } from '../layouts/HostedVideoLayout';
import { ArticleDesign } from '../lib/articleFormat';
import { rootStyles } from '../lib/rootStyles';
import type { Article } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { AlreadyVisited } from './AlreadyVisited.island';
import { useConfig } from './ConfigContext';
import { DarkModeMessage } from './DarkModeMessage';
import { FocusStyles } from './FocusStyles.island';
import { Island } from './Island';
import { Lightbox } from './Lightbox';
import { Metrics } from './Metrics.island';
import { SetABTests } from './SetABTests.island';
import { SkipTo } from './SkipTo';

interface BaseProps {
	article: Article;
	renderingTarget: RenderingTarget;
}
interface WebProps extends BaseProps {
	renderingTarget: 'Web';
}
interface AppProps extends BaseProps {
	renderingTarget: 'Apps';
}

/**
 * @description
 * HostedContentPage is a high level wrapper for hosted content pages on Dotcom. Sets strict mode and some globals
 */
export const HostedContentPage = (props: WebProps | AppProps) => {
	const { article } = props;
	const {
		article: { design, display, theme, frontendData },
		renderingTarget,
	} = props;

	const isWeb = renderingTarget === 'Web';
	const { darkModeAvailable } = useConfig();

	const format = {
		design,
		display,
		theme,
	};

	const decideLayout = () => {
		switch (article.design) {
			case ArticleDesign.HostedVideo:
				return (
					<HostedVideoLayout
						content={article}
						format={format}
						renderingTarget={renderingTarget}
					/>
				);
			case ArticleDesign.HostedGallery:
				return (
					<HostedGalleryLayout
						content={article}
						format={format}
						renderingTarget={renderingTarget}
					/>
				);
			case ArticleDesign.HostedArticle:
				return (
					<HostedArticleLayout
						content={article}
						format={format}
						renderingTarget={renderingTarget}
					/>
				);
			default:
				return null;
		}
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

					<Island priority="critical">
						<SetABTests
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
						href="/ab-tests/opt-out/webx-dark-mode-web"
					>
						opt out anytime
					</a>{' '}
					if anything is unreadable or odd.
				</DarkModeMessage>
			)}

			{decideLayout()}
		</StrictMode>
	);
};

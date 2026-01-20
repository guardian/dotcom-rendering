import { css } from '@emotion/react';
import { grid } from '../grid';
import type { RenderingTarget } from '../types/renderingTarget';
import type { HostedContent } from '../types/hostedContent';
import { TextBlockComponent } from '../components/TextBlockComponent';
import { ArticleDesign, ArticleDisplay } from '../lib/articleFormat';
import { Article } from '../types/article';
import { ArticleBody } from '../components/ArticleBody';
import { ConfigProvider } from '../components/ConfigContext';

interface Props {
	hostedContent: Article;
	renderingTarget: RenderingTarget;
}

interface WebProps extends Props {
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

const border = css`
	border: 1px solid black;
`;

const articleBody = css`
	h2,
	strong {
		font-weight: 700;
	}

	img {
		max-width: 100%;
	}
`;

export const HostedArticleLayout = (props: WebProps | AppProps) => {
	const { hostedContent } = props;

	const article = hostedContent.frontendData;
	const {
		config: { host },
	} = article;

	console.log(hostedContent.design);

	const format = {
		theme: hostedContent.theme,
		design: hostedContent.design,
		display: hostedContent.display,
	};
	return (
		<>
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					editionId: 'UK',
					assetOrigin: 'http://localhost:3030/',
				}}
			>
				{props.renderingTarget === 'Web' ? 'Masthead' : null}
				<main>
					<header css={[grid.container, border]}>
						<div css={[grid.column.all]}>Main media</div>
						<div
							css={[
								grid.between('centre-column-start', 'grid-end'),
							]}
						>
							Headline
						</div>
					</header>
					<div css={[grid.container]}>
						<div css={[grid.column.left, 'grid-row: 1']}>
							Left column
						</div>
						<div css={[grid.column.right, 'grid-row: 1']}>
							Onward content
						</div>
						<div css={[border, grid.column.centre, 'grid-row: 1']}>
							Standfirst
						</div>
						<div css={[border, grid.column.centre]}>Meta</div>
						<div css={[grid.column.centre]}>
							<ArticleBody
								format={format}
								blocks={article.blocks}
								pinnedPost={article.pinnedPost}
								host={host}
								pageId={article.pageId}
								webTitle={article.webTitle}
								ajaxUrl={article.config.ajaxUrl}
								switches={article.config.switches}
								isSensitive={article.config.isSensitive}
								isAdFreeUser={article.isAdFreeUser}
								sectionId={article.config.section}
								shouldHideReaderRevenue={
									article.shouldHideReaderRevenue
								}
								tags={article.tags}
								isPaidContent={!!article.config.isPaidContent}
								contributionsServiceUrl={''}
								contentType={article.contentType}
								isPreview={article.config.isPreview}
								idUrl={article.config.idUrl ?? ''}
								isDev={!!article.config.isDev}
								keywordIds={article.config.keywordIds}
								abTests={article.config.abTests}
								tableOfContents={article.tableOfContents}
								lang={article.lang}
								isRightToLeftLang={article.isRightToLeftLang}
								editionId={article.editionId}
								shouldHideAds={article.shouldHideAds}
								idApiUrl={article.config.idApiUrl}
							/>
						</div>
					</div>
					<div css={[grid.container, border]}>
						<div css={[grid.column.all]}>Footer</div>
					</div>
				</main>
			</ConfigProvider>
		</>
	);
};

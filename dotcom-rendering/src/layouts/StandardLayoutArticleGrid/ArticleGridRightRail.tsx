import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { Island } from '../../components/Island';
import { MostViewedRightWithAd } from '../../components/MostViewedRightWithAd.island';
import { ArticleDesign, type ArticleFormat } from '../../lib/articleFormat';
import type { ArticleDeprecated } from '../../types/article';
import type { RenderingTarget } from '../../types/renderingTarget';
import type { ArticleGridLayout } from './deriveArticleGridLayout';
import { GridItem } from './GridItem';

export const ArticleGridRightRail = ({
	article,
	format,
	renderingTarget,
	layout,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
	layout: ArticleGridLayout;
}) => {
	const { layoutType } = layout;
	const isWeb = renderingTarget === 'Web';
	const renderAds = isWeb && !article.shouldHideAds;

	return (
		<GridItem
			area="right-column"
			layoutType={layoutType}
			css={css`
				padding-top: ${layoutType === 'media' ? 0 : 6}px;
				${from.desktop} {
					padding-bottom: ${layoutType === 'media' ? 41 : 0}px;
				}
			`}
		>
			{layoutType !== 'picture' && (
				<Hide until="desktop">
					<Island
						priority="feature"
						defer={{
							until: 'visible',
							rootMargin: '700px 100px',
						}}
					>
						<MostViewedRightWithAd
							format={format}
							isPaidContent={article.pageType.isPaidContent}
							renderAds={isWeb && renderAds}
							shouldHideReaderRevenue={
								!!article.config.shouldHideReaderRevenue
							}
							shouldHideMostViewed={
								format.design === ArticleDesign.Audio ||
								format.design === ArticleDesign.Interactive
							}
						/>
					</Island>
				</Hide>
			)}
		</GridItem>
	);
};

import { css } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { ArticleGridBody } from './StandardLayoutArticleGrid/ArticleGridBody';
import { ArticleGridFooter } from './StandardLayoutArticleGrid/ArticleGridFooter';
import { ArticleGridHeader } from './StandardLayoutArticleGrid/ArticleGridHeader';
import { ArticleGridMainMedia } from './StandardLayoutArticleGrid/ArticleGridMainMedia';
import { ArticleGridRightRail } from './StandardLayoutArticleGrid/ArticleGridRightRail';
import { deriveArticleGridLayout } from './StandardLayoutArticleGrid/deriveArticleGridLayout';

export const StandardLayoutArticleGrid = ({
	article,
	format,
	renderingTarget,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
}) => {
	const layout = deriveArticleGridLayout({
		article,
		format,
		renderingTarget,
	});
	const {
		ageWarning,
		immersiveMediaRowHeight,
		isImmersive,
		isImmersiveLandscape,
		isImmersivePortrait,
		isLabs,
		layoutType,
	} = layout;
	const centreRuleStyles = isImmersivePortrait
		? grid.centreRuleAt('[data-grid-centre-rule-anchor]')
		: grid.centreRule(isImmersive ? 4 : 3);

	return (
		<article
			css={[
				css`
					background-color: ${themePalette('--article-background')};
				`,
				grid.container,
				grid.outerRules(),
				isLabs &&
					isImmersive &&
					css`
						${from.desktop} {
							&::before,
							&::after {
								z-index: ${getZIndex(
									'immersiveGridOuterRules',
								)};
							}
						}
						grid-template-rows: ${immersiveMediaRowHeight} repeat(
								6,
								auto
							);
					`,
				!isLabs &&
					layoutType !== 'interactive' &&
					css`
						${from.leftCol} {
							${centreRuleStyles}
						}
					`,
				isImmersive &&
					css`
						${until.tablet} {
							--immersive-headline-overlap: ${ageWarning != null
								? '96px'
								: '24px'};
						}
					`,
				isImmersiveLandscape &&
					css`
						${from.desktop} {
							grid-template-rows: auto auto ${ageWarning != null
									? '130px'
									: '90px'} auto auto auto auto auto;
						}
					`,
			]}
		>
			<ArticleGridMainMedia
				article={article}
				format={format}
				layout={layout}
			/>
			<ArticleGridHeader
				article={article}
				format={format}
				layout={layout}
			/>
			<ArticleGridFooter
				article={article}
				format={format}
				renderingTarget={renderingTarget}
				layout={layout}
			/>
			<ArticleGridBody
				article={article}
				format={format}
				renderingTarget={renderingTarget}
				layout={layout}
			/>
			<ArticleGridRightRail
				article={article}
				format={format}
				layout={layout}
			/>
			{layoutType === 'interactive' && (
				<div
					aria-hidden="true"
					data-gu-name="centre-rule"
					css={css`
						display: none;
						${from.leftCol} {
							display: block;
							grid-column: centre-column-start;
							grid-row: 1 / 5;
							position: relative;

							&::before {
								position: absolute;
								top: 0;
								bottom: 0;
								left: -10px;
								width: 1px;
								background-color: ${themePalette(
									'--article-border',
								)};
								content: '';
							}
						}
					`}
				/>
			)}
		</article>
	);
};

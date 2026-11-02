import { css } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import { grid } from '../grid';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
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
		isImmersive,
		isImmersiveLandscape,
		isImmersivePortrait,
		isInteractiveTopHat,
		isLabs,
		layoutType,
	} = layout;
	const centreRuleStyles = isImmersivePortrait
		? grid.centreRuleAt('[data-gu-name="standfirst"]')
		: grid.centreRule(3);

	return (
		<article
			css={[
				css`
					background-color: ${themePalette('--article-background')};
				`,
				grid.container,
				grid.outerRules(),
				!isLabs &&
					layoutType !== 'interactiveStandard' &&
					layoutType !== 'interactiveTopHat' &&
					css`
						${from.leftCol} {
							${centreRuleStyles}
							${isImmersiveLandscape &&
							css`
								& > *:nth-child(3)::before {
									top: 100%;
								}
							`}
						}
					`,
				isImmersive &&
					css`
						${until.tablet} {
							--immersive-headline-overlap: ${ageWarning != null
								? '96px'
								: '48px'};
						}
						${ageWarning != null &&
						css`
							${until.mobileMedium} {
								--immersive-headline-overlap: 6.75rem;
							}
						`}
					`,
				isImmersiveLandscape &&
					css`
						${from.tablet} {
							/* Two 57.5px headline lines, ending at the second baseline. */
							grid-template-rows: auto auto ${ageWarning != null
									? '140px'
									: '106px'} auto auto auto auto auto;
						}
						&::before,
						&::after {
							z-index: ${getZIndex('immersiveGridOuterRules')};
						}
					`,
				isImmersivePortrait &&
					css`
						${from.leftCol} {
							grid-template-rows: 0.25fr 1fr max-content;
						}
					`,
				isInteractiveTopHat &&
					css`
						grid-template-rows: 300px auto;
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
			{format.design === ArticleDesign.Interactive && (
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

import { css } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import { grid } from '../grid';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import type { LayoutType } from './lib/articleArrangements';
import { ArticleGridBody } from './StandardLayoutArticleGrid/ArticleGridBody';
import { ArticleGridCaption } from './StandardLayoutArticleGrid/ArticleGridCaption';
import { ArticleGridHeadline } from './StandardLayoutArticleGrid/ArticleGridHeadline';
import { ArticleGridMainMedia } from './StandardLayoutArticleGrid/ArticleGridMainMedia';
import { ArticleGridMeta } from './StandardLayoutArticleGrid/ArticleGridMeta';
import { ArticleGridRightRail } from './StandardLayoutArticleGrid/ArticleGridRightRail';
import { ArticleGridStandfirst } from './StandardLayoutArticleGrid/ArticleGridStandfirst';
import { ArticleGridTitle } from './StandardLayoutArticleGrid/ArticleGridTitle';
import { deriveArticleGridLayout } from './StandardLayoutArticleGrid/deriveArticleGridLayout';

export const StandardLayoutArticleGrid = ({
	article,
	format,
	renderingTarget,
	layoutType,
	mainMediaAspectRatio,
	hasPageSkin,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
	layoutType: LayoutType;
	mainMediaAspectRatio: string | undefined;
	hasPageSkin: boolean;
}) => {
	const layout = deriveArticleGridLayout({
		article,
		format,
		layoutType,
		mainMediaAspectRatio,
		hasPageSkin,
	});
	const {
		ageWarning,
		isImmersive,
		isImmersiveLandscape,
		isImmersivePortrait,
		isInteractiveTopHat,
		isLabs,
		isDocumentary,
	} = layout;
	const centreRuleStyles = isImmersivePortrait
		? grid.centreRuleAt('[data-gu-name="standfirst"]')
		: grid.centreRule(3);

	const articleStyles = [
		css`
			background-color: ${isDocumentary
				? '#141414'
				: themePalette('--article-background')};
		`,
		grid.container,
		hasPageSkin && grid.pageSkinContainer,
		!isDocumentary && grid.outerRules(),
		!isLabs &&
			!isDocumentary &&
			layoutType !== 'interactiveStandard' &&
			!isInteractiveTopHat &&
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
		hasPageSkin &&
			css`
				${from.desktop} {
					&::before {
						left: 0;
						grid-column: auto;
						transform: none;
					}

					&::after {
						right: 0;
						grid-column: auto;
						transform: none;
					}
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
	];

	return (
		<article css={articleStyles}>
			<ArticleGridMainMedia
				article={article}
				format={format}
				layout={layout}
			/>
			<ArticleGridTitle
				article={article}
				format={format}
				layout={layout}
			/>
			<ArticleGridHeadline
				article={article}
				format={format}
				layout={layout}
			/>
			{isImmersive && (
				<ArticleGridCaption format={format} layout={layout} />
			)}
			<ArticleGridStandfirst
				article={article}
				format={format}
				layout={layout}
			/>
			<ArticleGridMeta
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
				renderingTarget={renderingTarget}
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
							grid-row: ${layoutType === 'interactiveStandard'
								? '1 / 5'
								: isInteractiveTopHat && '8'};
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

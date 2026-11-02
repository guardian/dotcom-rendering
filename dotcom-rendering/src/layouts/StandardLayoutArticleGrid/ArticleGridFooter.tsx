import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { AffiliateDisclaimer } from '../../components/AffiliateProducts/AffiliateDisclaimer';
import { ArticleMetaApps } from '../../components/ArticleMeta.apps';
import { ArticleMeta } from '../../components/ArticleMeta.web';
import { Caption } from '../../components/Caption';
import { DecideLines } from '../../components/DecideLines';
import { GuardianLabsLines } from '../../components/GuardianLabsLines';
import { Standfirst } from '../../components/Standfirst';
import { grid } from '../../grid';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '../../lib/articleFormat';
import { getZIndex } from '../../lib/getZIndex';
import { palette as themePalette } from '../../palette';
import type { ArticleDeprecated } from '../../types/article';
import type { RenderingTarget } from '../../types/renderingTarget';
import type { ArticleGridLayout } from './deriveArticleGridLayout';
import { GridItem } from './GridItem';

const stretchLines = css`
	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}
	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const immersivePortraitFooter = css`
	display: contents;

	${from.leftCol} {
		${grid.between('left-column-start', 9)}
		display: grid;
		grid-row: 3;
		grid-template-columns: subgrid;
		grid-template-rows: auto;
		align-self: end;
		border-top: 1px solid ${themePalette('--article-border')};

		> [data-gu-name='standfirst'],
		> [data-gu-name='meta'] {
			grid-row: 1;
		}
	}

	${from.wide} {
		${grid.between('left-column-start', 10)}
	}
`;

const picAndCommentLeftColLines = (avatarDisplayed: boolean) => css`
	${avatarDisplayed && `display: none;`}
	margin-bottom: 4px;
	${from.leftCol} {
		display: block;
		${avatarDisplayed && `margin-top: -28px;`}
	}
`;

export const ArticleGridFooter = ({
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
	const {
		captionText,
		displayAvatarUrl,
		hasImmersiveAffiliateDisclaimer,
		isApps,
		isImmersive,
		isImmersiveLandscape,
		isImmersivePortrait,
		isWeb,
		layoutType,
	} = layout;
	const { branding } = article.commercialProperties[article.editionId];

	const articleMeta = (
		<ArticleMeta
			branding={branding}
			layoutType={layoutType}
			format={format}
			pageId={article.pageId}
			webTitle={article.webTitle}
			byline={article.byline}
			source={article.config.source}
			tags={article.tags}
			primaryDateline={article.webPublicationDateDisplay}
			secondaryDateline={article.webPublicationSecondaryDateDisplay}
			webPublicationDate={article.webPublicationDate}
			firstPublicationDate={article.firstPublicationDate}
			isCommentable={article.isCommentable}
			discussionApiUrl={article.config.discussionApiUrl}
			shortUrlId={article.config.shortUrlId}
			mainMediaElements={article.mainMediaElements}
		/>
	);

	return (
		<>
			{isImmersive && (
				<GridItem
					area="caption"
					layoutType={layoutType}
					css={css`
						padding-top: ${space[2]}px;
					`}
				>
					{isImmersivePortrait ? (
						<Caption
							captionText={captionText}
							format={format}
							shouldLimitWidth={false}
							isLeftCol={true}
							isMainMedia={true}
							showIconBelowLeftCol={true}
						/>
					) : (
						<Hide from="leftCol">
							<Caption
								captionText={captionText}
								format={format}
								shouldLimitWidth={false}
								isLeftCol={true}
								isMainMedia={true}
								showIconBelowLeftCol={true}
							/>
						</Hide>
					)}
				</GridItem>
			)}
			<div
				data-grid-centre-rule-anchor={isImmersivePortrait || undefined}
				css={[
					css`
						display: contents;
					`,
					isImmersivePortrait && immersivePortraitFooter,
				]}
			>
				<GridItem
					area="standfirst"
					layoutType={layoutType}
					css={[
						isImmersive &&
							css`
								${until.tablet} {
									padding-top: ${hasImmersiveAffiliateDisclaimer
										? space[3]
										: space[2]}px;
								}
							`,
						isImmersiveLandscape &&
							css`
								${from.desktop} {
									padding-top: ${hasImmersiveAffiliateDisclaimer
										? space[3]
										: space[8]}px;
								}

								${from.leftCol} {
									padding-bottom: 14px;
								}
							`,
					]}
				>
					{hasImmersiveAffiliateDisclaimer && (
						<AffiliateDisclaimer
							cssOverrides={css`
								margin: 0 0 ${space[2]}px;
							`}
						/>
					)}
					<Standfirst
						format={format}
						standfirst={article.standfirst}
						layoutType={layoutType}
					/>
				</GridItem>
				<GridItem
					area="meta"
					layoutType={layoutType}
					element="aside"
					css={[
						isImmersive &&
							branding != null &&
							captionText != null &&
							css`
								${until.desktop} {
									padding-top: ${space[3]}px;
								}
							`,
						isImmersivePortrait
							? css`
									${from.leftCol} {
										margin-right: -10px;
									}
								`
							: undefined,
						isImmersiveLandscape &&
							css`
								${from.leftCol} {
									padding-top: ${space[8]}px;
								}
							`,
						layoutType === 'interactive' &&
							css`
								z-index: ${getZIndex('meta')};
							`,
					]}
				>
					{format.display !== ArticleDisplay.Immersive &&
						format.design !== ArticleDesign.Audio &&
						layoutType !== 'immersivePortrait' && (
							<div
								css={[
									(layoutType === 'picture' ||
										layoutType === 'comment') &&
										picAndCommentLeftColLines(
											displayAvatarUrl ||
												layoutType === 'comment',
										),
									stretchLines,
								]}
							>
								{isWeb &&
								format.theme === ArticleSpecial.Labs &&
								format.design !== ArticleDesign.Video ? (
									<GuardianLabsLines />
								) : (
									<DecideLines
										format={format}
										color={themePalette('--article-border')}
										displayingAvatar={
											displayAvatarUrl &&
											(layoutType === 'picture' ||
												layoutType === 'comment')
										}
									/>
								)}
							</div>
						)}
					{isApps ? (
						<>
							<Hide from="leftCol">
								<ArticleMetaApps
									branding={branding}
									format={format}
									layoutType={layoutType}
									byline={article.byline}
									tags={article.tags}
									primaryDateline={
										article.webPublicationDateDisplay
									}
									secondaryDateline={
										article.webPublicationSecondaryDateDisplay
									}
									isCommentable={article.isCommentable}
									discussionApiUrl={
										article.config.discussionApiUrl
									}
									shortUrlId={article.config.shortUrlId}
									pageId={article.config.pageId}
								/>
							</Hide>
							<Hide until="leftCol">{articleMeta}</Hide>
						</>
					) : (
						articleMeta
					)}
				</GridItem>
			</div>
		</>
	);
};

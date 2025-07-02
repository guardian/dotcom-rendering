import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { MainMediaGallery } from '../components/MainMediaGallery';
import { Masthead } from '../components/Masthead/Masthead';
import { Standfirst } from '../components/Standfirst';
import { SubMeta } from '../components/SubMeta';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import type { NavType } from '../model/extract-nav';
import { palette } from '../palette';
import type { Gallery } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';

interface Props {
	gallery: Gallery;
	renderingTarget: RenderingTarget;
}

interface WebProps extends Props {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

const border = css({
	borderWidth: 1,
	borderStyle: 'solid',
	color: '#ccc',
});

export const GalleryLayout = (props: WebProps | AppProps) => {
	const gallery = props.gallery;
	const frontendData = gallery.frontendData;

	const format: ArticleFormat = {
		design: gallery.design,
		display: gallery.display,
		theme: gallery.theme,
	};

	return (
		<>
			{props.renderingTarget === 'Web' && (
				<Masthead
					nav={props.NAV}
					editionId={frontendData.editionId}
					idUrl={frontendData.config.idUrl}
					mmaUrl={frontendData.config.mmaUrl}
					discussionApiUrl={frontendData.config.discussionApiUrl}
					idApiUrl={frontendData.config.idApiUrl}
					contributionsServiceUrl={
						frontendData.contributionsServiceUrl
					}
					showSubNav={false}
					showSlimNav={true}
					hasPageSkin={false}
					hasPageSkinContentSelfConstrain={false}
					pageId={frontendData.pageId}
				/>
			)}
			<main
				css={{
					backgroundColor: palette('--article-background'),
				}}
			>
				<div css={border}>Labs header</div>
				<header css={[grid.container]}>
					<MainMediaGallery
						mainMedia={gallery.mainMedia}
						format={format}
					/>
					<ArticleTitle
						format={format}
						tags={frontendData.tags}
						sectionLabel={frontendData.sectionLabel}
						sectionUrl={frontendData.sectionUrl}
						guardianBaseURL={frontendData.guardianBaseURL}
					/>
					<ArticleHeadline
						format={format}
						headlineString={frontendData.headline}
						tags={frontendData.tags}
						byline={frontendData.byline}
						webPublicationDateDeprecated={
							frontendData.webPublicationDateDeprecated
						}
					/>
					<Standfirst
						format={format}
						standfirst={frontendData.standfirst}
					/>
					{props.renderingTarget === 'Web' ? (
						<ArticleMeta
							branding={
								frontendData.commercialProperties[
									frontendData.editionId
								].branding
							}
							format={format}
							pageId={frontendData.pageId}
							webTitle={frontendData.webTitle}
							byline={frontendData.byline}
							tags={frontendData.tags}
							primaryDateline={
								frontendData.webPublicationDateDisplay
							}
							secondaryDateline={
								frontendData.webPublicationSecondaryDateDisplay
							}
							isCommentable={frontendData.isCommentable}
							discussionApiUrl={
								frontendData.config.discussionApiUrl
							}
							shortUrlId={frontendData.config.shortUrlId}
						/>
					) : null}
					{props.renderingTarget === 'Apps' ? (
						<ArticleMetaApps
							branding={
								frontendData.commercialProperties[
									frontendData.editionId
								].branding
							}
							format={format}
							pageId={frontendData.pageId}
							byline={frontendData.byline}
							tags={frontendData.tags}
							primaryDateline={
								frontendData.webPublicationDateDisplay
							}
							secondaryDateline={
								frontendData.webPublicationSecondaryDateDisplay
							}
							isCommentable={frontendData.isCommentable}
							discussionApiUrl={
								frontendData.config.discussionApiUrl
							}
							shortUrlId={frontendData.config.shortUrlId}
						/>
					) : null}
					<div
						css={[
							border,
							css`
								${grid.column.centre}
								${from.leftCol} {
									${grid.column.left}
								}
							`,
						]}
					>
						Main media caption
					</div>
					<div
						css={[
							border,
							grid.between('centre-column-start', 'grid-end'),
						]}
					>
						Meta
					</div>
				</header>
				<div css={border}>Body</div>
				<SubMeta
					format={format}
					subMetaKeywordLinks={frontendData.subMetaKeywordLinks}
					subMetaSectionLinks={frontendData.subMetaSectionLinks}
					pageId={frontendData.pageId}
					webUrl={frontendData.webURL}
					webTitle={frontendData.webTitle}
					showBottomSocialButtons={
						frontendData.showBottomSocialButtons &&
						props.renderingTarget === 'Web'
					}
				/>
			</main>
		</>
	);
};

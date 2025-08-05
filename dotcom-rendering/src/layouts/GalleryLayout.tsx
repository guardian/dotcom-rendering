import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { GalleryAffiliateDisclaimer } from '../components/AffiliateDisclaimer';
import { AppsFooter } from '../components/AppsFooter.importable';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { Caption } from '../components/Caption';
import { Footer } from '../components/Footer';
import { GalleryImage } from '../components/GalleryImage';
import { Island } from '../components/Island';
import { MainMediaGallery } from '../components/MainMediaGallery';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { SubMeta } from '../components/SubMeta';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import { decideMainMediaCaption } from '../lib/decide-caption';
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

const headerStyles = css`
	${grid.container}
	background-color: ${palette('--article-inner-background')};

	${from.tablet} {
		border-bottom: 1px solid ${palette('--article-border')};
	}
`;

const metaAndDisclaimerContainer = css`
	${grid.column.centre}
	padding-bottom: ${space[6]}px;
	${from.tablet} {
		position: relative;
		&::before {
			content: '';
			position: absolute;
			left: -10px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--article-border')};
		}
	}
`;

export const GalleryLayout = (props: WebProps | AppProps) => {
	const gallery = props.gallery;
	const frontendData = gallery.frontendData;

	const isWeb = props.renderingTarget === 'Web';
	const isApps = props.renderingTarget === 'Apps';

	const captionText = decideMainMediaCaption(props.gallery.mainMedia);

	const format: ArticleFormat = {
		design: gallery.design,
		display: gallery.display,
		theme: gallery.theme,
	};

	return (
		<>
			{isWeb && (
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
				<header css={headerStyles}>
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
					<Caption
						captionText={captionText}
						format={format}
						isMainMedia={true}
					/>
					<div css={metaAndDisclaimerContainer}>
						{isWeb ? (
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

						{isApps ? (
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
						{!!frontendData.affiliateLinksDisclaimer && (
							<GalleryAffiliateDisclaimer />
						)}
					</div>
				</header>
				{gallery.images.map((element, idx) => (
					<GalleryImage
						image={element}
						format={format}
						pageId={frontendData.pageId}
						webTitle={frontendData.webTitle}
						key={idx}
						renderingTarget={props.renderingTarget}
					/>
				))}
				<SubMeta
					format={format}
					subMetaKeywordLinks={frontendData.subMetaKeywordLinks}
					subMetaSectionLinks={frontendData.subMetaSectionLinks}
					pageId={frontendData.pageId}
					webUrl={frontendData.webURL}
					webTitle={frontendData.webTitle}
					showBottomSocialButtons={
						frontendData.showBottomSocialButtons && isWeb
					}
				/>
			</main>
			{isWeb && (
				<Section
					fullWidth={true}
					padSides={false}
					backgroundColour={sourcePalette.brand[400]}
					borderColour={sourcePalette.brand[600]}
					showSideBorders={false}
					element="footer"
				>
					<Footer
						pageFooter={frontendData.pageFooter}
						selectedPillar={props.NAV.selectedPillar}
						pillars={props.NAV.pillars}
						urls={frontendData.nav.readerRevenueLinks.footer}
						editionId={frontendData.editionId}
					/>
				</Section>
			)}
			{isApps && (
				<div
					css={{
						backgroundColor: palette('--apps-footer-background'),
					}}
				>
					<Island priority="critical">
						<AppsFooter design={format.design} />
					</Island>
				</div>
			)}
		</>
	);
};

import { css } from '@emotion/react';
import {
	between,
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { Fragment } from 'react';
import { AdSlot } from '../components/AdSlot.web';
import { AppsFooter } from '../components/AppsFooter.importable';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { Caption } from '../components/Caption';
import { Footer } from '../components/Footer';
import { DesktopAdSlot, MobileAdSlot } from '../components/GalleryAdSlots';
import { GalleryImage } from '../components/GalleryImage';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Hide } from '../components/Hide';
import { Island } from '../components/Island';
import { MainMediaGallery } from '../components/MainMediaGallery';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { SubMeta } from '../components/SubMeta';
import { grid } from '../grid';
import { type ArticleFormat, ArticleSpecial } from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { decideMainMediaCaption } from '../lib/decide-caption';
import { getAdPositions } from '../lib/getGalleryAdPositions';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { Gallery } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { Stuck } from './lib/stickiness';

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
	background-color: ${themePalette('--article-inner-background')};

	${from.tablet} {
		border-bottom: 1px solid ${themePalette('--article-border')};
	}
`;

const galleryItemAdvertStyles = css`
	${grid.paddedContainer}
	grid-auto-flow: row dense;
	background-color: ${themePalette('--article-inner-background')};

	${from.tablet} {
		border-left: 1px solid ${themePalette('--article-border')};
		border-right: 1px solid ${themePalette('--article-border')};
	}
`;

const galleryInlineAdContainerStyles = css`
	${grid.column.centre}
	z-index: 1;

	${from.desktop} {
		padding-bottom: ${space[10]}px;
	}

	${from.leftCol} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

const galleryBorder = css`
	position: relative;
	${between.desktop.and.leftCol} {
		${grid.column.right}

		&::before {
			content: '';
			position: absolute;
			left: -10px; /* 10px to the left of this element */
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${themePalette('--article-border')};
		}
	}

	${from.leftCol} {
		${grid.column.left}

		&::after {
			content: '';
			position: absolute;
			right: -10px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${themePalette('--article-border')};
		}
	}
`;

export const GalleryLayout = (props: WebProps | AppProps) => {
	const { gallery, renderingTarget } = props;
	const frontendData = gallery.frontendData;

	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	const captionText = decideMainMediaCaption(gallery.mainMedia);

	const format: ArticleFormat = {
		design: gallery.design,
		display: gallery.display,
		theme: gallery.theme,
	};

	const isLabs = format.theme === ArticleSpecial.Labs;

	const renderAds = canRenderAds(frontendData);

	const adPositions = renderAds ? getAdPositions(gallery.images) : [];

	return (
		<>
			{isWeb && (
				<div data-print-layout="hide" id="bannerandheader">
					{renderAds && (
						<Stuck>
							<Section
								fullWidth={true}
								showTopBorder={false}
								showSideBorders={false}
								padSides={false}
								shouldCenter={false}
							>
								<HeaderAdSlot
									abTests={frontendData.config.abTests}
								/>
							</Section>
						</Stuck>
					)}
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
				</div>
			)}
			<main
				css={{
					backgroundColor: themePalette('--article-background'),
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
				</header>
				{gallery.images.map((element, idx) => {
					const index = idx + 1;
					const shouldShowAds = adPositions.includes(index);

					return (
						<Fragment key={element.elementId}>
							<GalleryImage
								image={element}
								format={format}
								pageId={frontendData.pageId}
								webTitle={frontendData.webTitle}
							/>
							{isWeb && shouldShowAds && (
								<div css={galleryItemAdvertStyles}>
									<div css={galleryInlineAdContainerStyles}>
										<Hide when="below" breakpoint="tablet">
											<DesktopAdSlot
												renderAds={renderAds}
												adSlotIndex={adPositions.indexOf(
													index,
												)}
											/>
										</Hide>
										<Hide when="above" breakpoint="tablet">
											<MobileAdSlot
												renderAds={renderAds}
												adSlotIndex={adPositions.indexOf(
													index,
												)}
											/>
										</Hide>
									</div>
									<div css={galleryBorder}></div>
								</div>
							)}
						</Fragment>
					);
				})}
				;
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
			{isWeb && renderAds && !isLabs && (
				<Section
					fullWidth={true}
					data-print-layout="hide"
					padSides={false}
					showTopBorder={false}
					showSideBorders={false}
					backgroundColour={themePalette('--ad-background')}
					element="aside"
				>
					<AdSlot
						data-print-layout="hide"
						position="merchandising-high"
						display={format.display}
					/>
				</Section>
			)}
			{isWeb && renderAds && !isLabs && (
				<Section
					fullWidth={true}
					padSides={false}
					showTopBorder={false}
					showSideBorders={false}
					backgroundColour={themePalette('--ad-background')}
					element="aside"
				>
					<AdSlot position="merchandising" display={format.display} />
				</Section>
			)}
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
						backgroundColor: themePalette(
							'--apps-footer-background',
						),
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

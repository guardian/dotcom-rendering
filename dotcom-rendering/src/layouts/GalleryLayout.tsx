import { css } from '@emotion/react';
import { from, palette as sourcePalette, space, until } from '@guardian/source/foundations';
import { Fragment } from 'react';
import { AdSlot } from '../components/AdSlot.web';
import { AppsFooter } from '../components/AppsFooter.importable';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { Caption } from '../components/Caption';
import { Footer } from '../components/Footer';
import {
	GalleryInlineAdSlot,
	MobileAdSlot,
} from '../components/GalleryAdSlots';
import { GalleryImage } from '../components/GalleryImage';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { MainMediaGallery } from '../components/MainMediaGallery';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { SubMeta } from '../components/SubMeta';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { decideMainMediaCaption } from '../lib/decide-caption';
import {
	getDesktopAdPositions,
	getMobileAdPositions,
} from '../lib/getGalleryAdPositions';
import type { NavType } from '../model/extract-nav';
import { palette, palette as themePalette } from '../palette';
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

// const galleryItemAdvertStyles = css`
// 	figure {
//         display: flex;
//         flex-direction: column-reverse;
//     }

//     // On mobile/tablet the images should be 100% of the width of the screen
//     ${until.tablet} {
//         margin-left: -20px;
//         margin-right: -20px;
//         padding-top: 12px;
//         border-top: 1px solid #ccc;

//         &:first-of-type {
//             border-top: 0;
//         }
//     }

//     ${until.mobileLandscape} {
//         margin-left: ${-20 * 0.5}px;
//         margin-right: ${-20 * 0.5}px;
//     }

//     ${from.desktop} {
//         position: relative;
//         border-top: 0;
//         padding: 0;

//         figure {
//             flex-direction: row;
//         }
//     }
// }`;

const galleryItemAdvertStyles = css`
	${grid.paddedContainer}
	grid-auto-flow: row dense;
	background-color: ${palette('--article-inner-background')};

	${until.tablet} {
		border-top: 1px solid ${palette('--article-border')};
		padding-top: ${space[1]}px;
	}

	${from.tablet} {
		border-left: 1px solid ${palette('--article-border')};
		border-right: 1px solid ${palette('--article-border')};
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

	const renderAds = canRenderAds(frontendData);

	const desktopAdPositions = renderAds
		? getDesktopAdPositions(gallery.images)
		: [];

	const mobileAdPositions = renderAds
		? getMobileAdPositions(gallery.images)
		: [];

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

					return (
						<Fragment
							key={element.elementId || `gallery-item-${index}`}
						>
							<GalleryImage
								image={element}
								format={format}
								pageId={frontendData.pageId}
								webTitle={frontendData.webTitle}
							/>
							{isWeb && desktopAdPositions.includes(index) && (
								<div
									className={[
										'gallery__item gallery__item--advert',
									].join(' ')}
									css={galleryItemAdvertStyles}
								>
									<GalleryInlineAdSlot
										renderAds={renderAds}
										hasPageSkin={false}
										adSlotIndex={desktopAdPositions.indexOf(
											index,
										)}
									/>
								</div>
							)}

							{isWeb && mobileAdPositions.includes(index) && (
								<MobileAdSlot
									renderAds={renderAds}
									adSlotIndex={mobileAdPositions.indexOf(
										index,
									)}
								/>
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
			{isWeb && renderAds && (
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

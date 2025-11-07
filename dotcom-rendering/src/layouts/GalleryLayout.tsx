import { css } from '@emotion/react';
import {
	between,
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { AdPlaceholder } from '../components/AdPlaceholder.apps';
import { AdPortals } from '../components/AdPortals.importable';
import { AdSlot } from '../components/AdSlot.web';
import { GalleryAffiliateDisclaimer } from '../components/AffiliateDisclaimer';
import { AppsFooter } from '../components/AppsFooter.importable';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { Caption } from '../components/Caption';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { FetchMoreGalleriesData } from '../components/FetchMoreGalleriesData.importable';
import { Footer } from '../components/Footer';
import { DesktopAdSlot, MobileAdSlot } from '../components/GalleryAdSlots';
import { GalleryImage } from '../components/GalleryImage';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { LabsHeader } from '../components/LabsHeader';
import { MainMediaGallery } from '../components/MainMediaGallery';
import { Masthead } from '../components/Masthead/Masthead';
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { ScrollableSmallOnwards } from '../components/ScrollableSmallOnwards';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubMeta } from '../components/SubMeta';
import { grid } from '../grid';
import {
	type ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	type ArticleTheme,
} from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideMainMediaCaption } from '../lib/decide-caption';
import type { EditionId } from '../lib/edition';
import type { NavType } from '../model/extract-nav';
import { palette } from '../palette';
import type { ArticleDeprecated, Gallery } from '../types/article';
import type { ConfigType } from '../types/config';
import type { RenderingTarget } from '../types/renderingTarget';
import { BannerWrapper, Stuck } from './lib/stickiness';

interface Props {
	gallery: Gallery;
	renderingTarget: RenderingTarget;
	serverTime?: number;
}

interface WebProps extends Props {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

const headerStyles = css`
	${grid.container}
	background-color: ${palette('--article-inner-background')};

	${from.tablet} {
		border-bottom: 1px solid ${palette('--article-border')};
	}
`;

export const GalleryLayout = (props: WebProps | AppProps) => {
	const { gallery, renderingTarget, serverTime } = props;

	const {
		config: {
			discussionApiUrl,
			idApiUrl,
			isPreview,
			isSensitive,
			section,
			switches,
		},
	} = gallery.frontendData;

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
	const showMerchandisingHigh = isWeb && renderAds && !isLabs;

	const contributionsServiceUrl = getContributionsServiceUrl(frontendData);

	const showComments =
		frontendData.isCommentable && !frontendData.config.isPaidContent;

	return (
		<>
			{isWeb ? (
				<BannerAndMasthead
					renderAds={renderAds}
					nav={props.NAV}
					editionId={frontendData.editionId}
					config={frontendData.config}
					contributionsServiceUrl={contributionsServiceUrl}
					pageId={frontendData.pageId}
				/>
			) : null}
			<GalleryLabsHeader
				theme={format.theme}
				editionId={frontendData.editionId}
			/>

			<main
				css={{
					backgroundColor: palette('--article-background'),
				}}
			>
				{isApps && renderAds && (
					<Island priority="critical">
						<AdPortals />
					</Island>
				)}
				<header css={headerStyles}>
					<MainMediaGallery
						mainMedia={gallery.mainMedia}
						format={format}
						renderingTarget={props.renderingTarget}
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
					<Meta
						renderingTarget={renderingTarget}
						format={format}
						frontendData={frontendData}
					/>
				</header>
				<Body
					renderingTarget={renderingTarget}
					format={format}
					bodyElements={gallery.bodyElements}
					renderAds={renderAds}
					pageId={frontendData.pageId}
					webTitle={frontendData.webTitle}
				/>
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
				<Island priority="feature" defer={{ until: 'visible' }}>
					<FetchMoreGalleriesData
						ajaxUrl={gallery.frontendData.config.ajaxUrl}
						guardianBaseUrl={gallery.frontendData.guardianBaseURL}
						discussionApiUrl={discussionApiUrl}
						serverTime={serverTime}
						isAdFreeUser={frontendData.isAdFreeUser}
					/>
				</Island>
			</main>

			{/* More galleries container */}
			<MerchandisingHigh
				show={showMerchandisingHigh}
				display={format.display}
			/>
			<ScrollableSmallOnwards
				serverTime={serverTime}
				trails={gallery.storyPackage?.trails ?? []}
				discussionApiUrl={discussionApiUrl}
				format={format}
				heading={gallery.storyPackage?.heading ?? 'Marjan'} // TODO
				onwardsSource={'more-on-this-story'}
			/>
			<Island priority="feature" defer={{ until: 'visible' }}>
				<OnwardsUpper
					ajaxUrl={frontendData.config.ajaxUrl}
					hasRelated={frontendData.hasRelated}
					hasStoryPackage={frontendData.hasStoryPackage}
					isAdFreeUser={frontendData.isAdFreeUser}
					pageId={frontendData.pageId}
					isPaidContent={!!frontendData.config.isPaidContent}
					showRelatedContent={frontendData.config.showRelatedContent}
					keywordIds={frontendData.config.keywordIds}
					contentType={frontendData.contentType}
					tags={frontendData.tags}
					format={format}
					pillar={format.theme}
					editionId={frontendData.editionId}
					shortUrlId={frontendData.config.shortUrlId}
					discussionApiUrl={frontendData.config.discussionApiUrl}
					serverTime={serverTime}
					renderingTarget={renderingTarget}
					webURL={frontendData.webURL}
				/>
			</Island>

			{/** More Galleries container goes here */}
			{showComments && (
				<Section
					fullWidth={true}
					sectionId="comments"
					element="section"
					backgroundColour={palette(
						'--discussion-section-background',
					)}
					borderColour={palette('--article-border')}
					fontColour={palette('--discussion-text')}
				>
					<DiscussionLayout
						discussionApiUrl={frontendData.config.discussionApiUrl}
						shortUrlId={frontendData.config.shortUrlId}
						format={format}
						discussionD2Uid={frontendData.config.discussionD2Uid}
						discussionApiClientHeader={
							frontendData.config.discussionApiClientHeader
						}
						enableDiscussionSwitch={
							!!frontendData.config.switches
								.enableDiscussionSwitch
						}
						isAdFreeUser={frontendData.isAdFreeUser}
						shouldHideAds={frontendData.shouldHideAds}
						idApiUrl={frontendData.config.idApiUrl}
					/>
				</Section>
			)}
			{!frontendData.pageType.isPaidContent && (
				<Section
					title="Most viewed"
					padContent={false}
					verticalMargins={false}
					element="aside"
					data-link-name="most-popular"
					data-component="most-popular"
					backgroundColour={palette('--article-section-background')}
					borderColour={palette('--article-section-border')}
					fontColour={palette('--article-section-title')}
				>
					<MostViewedFooterLayout renderAds={isWeb && renderAds}>
						<Island priority="feature" defer={{ until: 'visible' }}>
							<MostViewedFooterData
								sectionId={frontendData.config.section}
								ajaxUrl={frontendData.config.ajaxUrl}
								edition={frontendData.editionId}
							/>
						</Island>
					</MostViewedFooterLayout>
				</Section>
			)}

			{isWeb && renderAds && !isLabs && (
				<Section
					fullWidth={true}
					padSides={false}
					showTopBorder={false}
					showSideBorders={false}
					backgroundColour={palette('--ad-background')}
					element="aside"
				>
					<AdSlot position="merchandising" display={format.display} />
				</Section>
			)}
			{isWeb && (
				<>
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
					<BannerWrapper data-print-layout="hide">
						<Island priority="feature" defer={{ until: 'idle' }}>
							<StickyBottomBanner
								contentType={frontendData.contentType}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								idApiUrl={idApiUrl}
								isMinuteArticle={
									frontendData.pageType.isMinuteArticle
								}
								isPaidContent={
									frontendData.pageType.isPaidContent
								}
								isPreview={!!isPreview}
								isSensitive={isSensitive}
								pageId={frontendData.pageId}
								sectionId={section}
								shouldHideReaderRevenue={
									frontendData.shouldHideReaderRevenue
								}
								remoteBannerSwitch={!!switches.remoteBanner}
								tags={frontendData.tags}
							/>
						</Island>
					</BannerWrapper>
				</>
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

const BannerAndMasthead = (props: {
	renderAds: boolean;
	nav: NavType;
	editionId: EditionId;
	config: ConfigType;
	contributionsServiceUrl: string;
	pageId: string | undefined;
}) => (
	<div data-print-layout="hide" id="bannerandheader">
		{props.renderAds ? (
			<Stuck>
				<Section
					fullWidth={true}
					showTopBorder={false}
					showSideBorders={false}
					padSides={false}
					shouldCenter={false}
				>
					<HeaderAdSlot />
				</Section>
			</Stuck>
		) : null}
		<Masthead
			nav={props.nav}
			editionId={props.editionId}
			idUrl={props.config.idUrl}
			mmaUrl={props.config.mmaUrl}
			discussionApiUrl={props.config.discussionApiUrl}
			idApiUrl={props.config.idApiUrl}
			contributionsServiceUrl={props.contributionsServiceUrl}
			showSubNav={false}
			showSlimNav={true}
			hasPageSkin={false}
			hasPageSkinContentSelfConstrain={false}
			pageId={props.pageId}
		/>
	</div>
);

const GalleryLabsHeader = (props: {
	theme: ArticleTheme;
	editionId: EditionId;
}) =>
	props.theme === ArticleSpecial.Labs ? (
		<Stuck>
			<Section
				fullWidth={true}
				showTopBorder={false}
				backgroundColour={sourcePalette.labs[400]}
				borderColour={sourcePalette.neutral[60]}
				sectionId="labs-header"
				element="aside"
			>
				<LabsHeader editionId={props.editionId} />
			</Section>
		</Stuck>
	) : null;

const Meta = ({
	renderingTarget,
	format,
	frontendData,
}: {
	renderingTarget: RenderingTarget;
	format: ArticleFormat;
	frontendData: ArticleDeprecated;
}) => (
	<div
		css={{
			'&': css(grid.column.centre),
			paddingBottom: space[6],
			[from.tablet]: {
				position: 'relative',
				'&::before': {
					content: '""',
					position: 'absolute',
					left: -10,
					top: 0,
					bottom: 0,
					width: 1,
					backgroundColor: palette('--article-border'),
				},
			},
		}}
	>
		{renderingTarget === 'Web' ? (
			<ArticleMeta
				branding={
					frontendData.commercialProperties[frontendData.editionId]
						.branding
				}
				format={format}
				pageId={frontendData.pageId}
				webTitle={frontendData.webTitle}
				byline={frontendData.byline}
				tags={frontendData.tags}
				primaryDateline={frontendData.webPublicationDateDisplay}
				secondaryDateline={
					frontendData.webPublicationSecondaryDateDisplay
				}
				isCommentable={frontendData.isCommentable}
				discussionApiUrl={frontendData.config.discussionApiUrl}
				shortUrlId={frontendData.config.shortUrlId}
			/>
		) : null}
		{renderingTarget === 'Apps' ? (
			<ArticleMetaApps
				branding={
					frontendData.commercialProperties[frontendData.editionId]
						.branding
				}
				format={format}
				pageId={frontendData.pageId}
				byline={frontendData.byline}
				tags={frontendData.tags}
				primaryDateline={frontendData.webPublicationDateDisplay}
				secondaryDateline={
					frontendData.webPublicationSecondaryDateDisplay
				}
				isCommentable={frontendData.isCommentable}
				discussionApiUrl={frontendData.config.discussionApiUrl}
				shortUrlId={frontendData.config.shortUrlId}
			/>
		) : null}
		{!!frontendData.affiliateLinksDisclaimer && (
			<GalleryAffiliateDisclaimer />
		)}
	</div>
);

const Body = (props: {
	renderingTarget: RenderingTarget;
	format: ArticleFormat;
	bodyElements: Gallery['bodyElements'];
	renderAds: boolean;
	pageId: string;
	webTitle: string;
}) => (
	<>
		{props.bodyElements
			// Filter out ad elements if we don't want to render them.
			.filter(
				(element) =>
					props.renderAds ||
					element._type !==
						'model.dotcomrendering.pageElements.AdPlaceholderBlockElement',
			)
			/* eslint-disable-next-line array-callback-return -- ESLint bug,
			 * this function does contain `return` statements. TypeScript will
			 * confirm the switch is exhaustive, but it's possible ESLint does
			 * not know this. */
			.map((element) => {
				switch (element._type) {
					case 'model.dotcomrendering.pageElements.ImageBlockElement':
						return (
							<GalleryImage
								image={element}
								format={props.format}
								pageId={props.pageId}
								webTitle={props.webTitle}
								renderingTarget={props.renderingTarget}
								key={element.elementId}
							/>
						);
					case 'model.dotcomrendering.pageElements.AdPlaceholderBlockElement':
						return (
							<BodyAdSlot
								renderingTarget={props.renderingTarget}
								adIndex={element.adPosition}
								key={element.adPosition}
							/>
						);
				}
			})}
	</>
);

const BodyAdSlot = (props: {
	renderingTarget: RenderingTarget;
	adIndex: number;
}) => {
	switch (props.renderingTarget) {
		case 'Web':
			return <WebAdSlot adIndex={props.adIndex} />;
		case 'Apps':
			return <AdPlaceholder />;
	}
};

const WebAdSlot = (props: { adIndex: number }) => (
	<div
		css={{
			'&': css(grid.paddedContainer),
			gridAutoFlow: 'row dense',
			backgroundColor: palette('--article-inner-background'),

			[from.tablet]: {
				borderColor: palette('--article-border'),
				borderStyle: 'solid',
				borderLeftWidth: 1,
				borderRightWidth: 1,
			},
		}}
	>
		<div
			css={{
				'&': css(grid.column.centre),
				zIndex: 1,

				[from.desktop]: {
					paddingBottom: space[10],
				},

				[from.leftCol]: css(
					grid.between('centre-column-start', 'right-column-end'),
				),
			}}
		>
			<Hide until="tablet">
				<DesktopAdSlot renderAds={true} adSlotIndex={props.adIndex} />
			</Hide>
			<Hide from="tablet">
				<MobileAdSlot renderAds={true} adSlotIndex={props.adIndex} />
			</Hide>
		</div>
		<AdSlotBorders />
	</div>
);

const AdSlotBorders = () => (
	<div
		css={{
			position: 'relative',
			[between.desktop.and.leftCol]: {
				'&': css(grid.column.right),

				'&::before': {
					content: '""',
					position: 'absolute',
					left: -10,
					top: 0,
					bottom: 0,
					width: 1,
					backgroundColor: palette('--article-border'),
				},
			},

			[from.leftCol]: {
				'&': css(grid.column.left),

				'&::after': {
					content: '""',
					position: 'absolute',
					right: -10,
					top: 0,
					bottom: 0,
					width: 1,
					backgroundColor: palette('--article-border'),
				},
			},
		}}
	/>
);

const MerchandisingHigh = (props: {
	show: boolean;
	display: ArticleDisplay;
}) =>
	props.show ? (
		<Section
			fullWidth={true}
			data-print-layout="hide"
			padSides={false}
			showTopBorder={false}
			showSideBorders={false}
			backgroundColour={palette('--ad-background')}
			element="aside"
		>
			<AdSlot
				data-print-layout="hide"
				position="merchandising-high"
				display={props.display}
			/>
		</Section>
	) : null;

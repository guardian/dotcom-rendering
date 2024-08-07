import { css } from '@emotion/react';
import { isUndefined, joinUrl } from '@guardian/libs';
import { palette } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { Fragment } from 'react';
import { Accessibility } from '../components/Accessibility.importable';
import { DecideContainerByTrails } from '../components/DecideContainerByTrails';
import {
	decideFrontsBannerAdSlot,
	decideMerchandisingSlot,
	decideMerchHighAndMobileAdSlots,
} from '../components/DecideFrontsAdSlots';
import { Footer } from '../components/Footer';
import { FrontSection } from '../components/FrontSection';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { Nav } from '../components/Nav/Nav';
import { Section } from '../components/Section';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubNav } from '../components/SubNav.importable';
import { TagPageHeader } from '../components/TagPageHeader';
import { TrendingTopics } from '../components/TrendingTopics';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import {
	getTagPageBannerAdPositions,
	getTagPageMobileAdPositions,
} from '../lib/getTagPageAdPositions';
import { enhanceTags } from '../model/enhanceTags';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { DCRTagPageType } from '../types/tagPage';
import { BannerWrapper, Stuck } from './lib/stickiness';

interface Props {
	tagPage: DCRTagPageType;
	NAV: NavType;
}

export const TagPageLayout = ({ tagPage, NAV }: Props) => {
	const {
		config: {
			contentType,
			hasPageSkin,
			idApiUrl,
			isPaidContent,
			isPreview,
			isSensitive,
			section,
			switches,
			pageId,
		},
		tags,
	} = tagPage;

	const renderAds = canRenderAds(tagPage);

	const desktopAdPositions = renderAds
		? getTagPageBannerAdPositions(tagPage.groupedTrails.length)
		: [];

	const mobileAdPositions = renderAds
		? getTagPageMobileAdPositions(tagPage.groupedTrails)
		: [];

	const { abTests } = tagPage.config;

	const inUpdatedHeaderABTest =
		abTests.updatedHeaderDesignVariant === 'variant';

	const contributionsServiceUrl = getContributionsServiceUrl(tagPage);

	const isAccessibilityPage =
		tagPage.config.pageId === 'help/accessibility-help';

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				<>
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
									isPaidContent={
										!!tagPage.config.isPaidContent
									}
									shouldHideReaderRevenue={false}
								/>
							</Section>
						</Stuck>
					)}

					{inUpdatedHeaderABTest ? (
						<Masthead
							nav={NAV}
							editionId={tagPage.editionId}
							idUrl={tagPage.config.idUrl}
							mmaUrl={tagPage.config.mmaUrl}
							discussionApiUrl={tagPage.config.discussionApiUrl}
							idApiUrl={tagPage.config.idApiUrl}
							contributionsServiceUrl={contributionsServiceUrl}
							showSubNav={true}
							isImmersive={false}
							hasPageSkin={hasPageSkin}
						/>
					) : (
						<>
							<Section
								fullWidth={true}
								shouldCenter={false}
								showTopBorder={false}
								showSideBorders={false}
								padSides={false}
								backgroundColour={palette.brand[400]}
								element="header"
							>
								<Header
									editionId={tagPage.editionId}
									idUrl={tagPage.config.idUrl}
									mmaUrl={tagPage.config.mmaUrl}
									discussionApiUrl={
										tagPage.config.discussionApiUrl
									}
									urls={tagPage.nav.readerRevenueLinks.header}
									remoteHeader={!!switches.remoteHeader}
									contributionsServiceUrl="https://contributions.guardianapis.com" // TODO: Pass this in
									idApiUrl={tagPage.config.idApiUrl}
									headerTopBarSearchCapiSwitch={
										!!switches.headerTopBarSearchCapi
									}
								/>
							</Section>
							<Section
								fullWidth={true}
								borderColour={palette.brand[600]}
								showTopBorder={false}
								padSides={false}
								backgroundColour={palette.brand[400]}
								element="nav"
							>
								<Nav
									nav={NAV}
									isImmersive={false}
									displayRoundel={false}
									selectedPillar={NAV.selectedPillar}
									subscribeUrl={
										tagPage.nav.readerRevenueLinks.header
											.subscribe
									}
									editionId={tagPage.editionId}
								/>
							</Section>
							{NAV.subNavSections && (
								<>
									<Section
										fullWidth={true}
										showTopBorder={false}
										backgroundColour={themePalette(
											'--article-background',
										)}
										padSides={false}
										element="aside"
									>
										<Island
											priority="enhancement"
											defer={{ until: 'idle' }}
										>
											<SubNav
												subNavSections={
													NAV.subNavSections
												}
												currentNavLink={
													NAV.currentNavLink
												}
												position="header"
											/>
										</Island>
									</Section>
									<Section
										fullWidth={true}
										backgroundColour={themePalette(
											'--article-background',
										)}
										padSides={false}
										showTopBorder={false}
									>
										<StraightLines
											cssOverrides={css`
												display: block;
											`}
											count={4}
											color={themePalette(
												'--straight-lines',
											)}
										/>
									</Section>
								</>
							)}
						</>
					)}
				</>
			</div>

			<main data-layout="TagPageLayout" id="maincontent">
				{isAccessibilityPage && (
					<Island priority="critical" defer={{ until: 'visible' }}>
						<Accessibility />
					</Island>
				)}
				<TagPageHeader
					title={tagPage.header.title}
					description={tagPage.header.description}
					image={tagPage.header.image}
				/>
				{tagPage.groupedTrails.map((groupedTrails, index) => {
					const imageLoading = index > 0 ? 'lazy' : 'eager';

					const title = isUndefined(groupedTrails.day)
						? [groupedTrails.month, groupedTrails.year].join(' ')
						: [
								groupedTrails.day,
								groupedTrails.month,
								groupedTrails.year,
						  ].join(' ');

					const containerId = title
						.replaceAll(' ', '-')
						.toLowerCase();

					const url = groupedTrails.day
						? '/' +
						  joinUrl(
								tagPage.pageId,
								groupedTrails.year,
								groupedTrails.month.slice(0, 3).toLowerCase(),
								groupedTrails.day.padStart(2, '0'),
								'all',
						  )
						: undefined;

					return (
						<Fragment key={containerId}>
							{decideFrontsBannerAdSlot(
								renderAds,
								hasPageSkin,
								index,
								desktopAdPositions,
							)}
							<FrontSection
								title={title}
								url={url}
								isTagPage={true}
								collectionBranding={
									index === 0 ? tagPage.branding : undefined
								}
								showTopBorder={true}
								ophanComponentLink={`container-${index} | ${containerId}`}
								ophanComponentName={containerId}
								sectionId={containerId}
								toggleable={false}
								pageId={tagPage.pageId}
								editionId={tagPage.editionId}
								canShowMore={false}
								ajaxUrl={tagPage.config.ajaxUrl}
								pagination={
									index === tagPage.groupedTrails.length - 1
										? tagPage.pagination
										: undefined
								}
								discussionApiUrl={
									tagPage.config.discussionApiUrl
								}
							>
								<DecideContainerByTrails
									trails={groupedTrails.trails}
									speed={tagPage.speed}
									imageLoading={imageLoading}
									isTagPage={true}
								/>
							</FrontSection>
							{decideMerchHighAndMobileAdSlots(
								renderAds,
								index,
								tagPage.groupedTrails.length,
								isPaidContent,
								mobileAdPositions,
								hasPageSkin,
							)}
						</Fragment>
					);
				})}
			</main>

			<Section
				fullWidth={true}
				showTopBorder={false}
				data-component="trending-topics"
			>
				<TrendingTopics trendingTopics={tagPage.trendingTopics} />
			</Section>

			{decideMerchandisingSlot(renderAds, hasPageSkin)}

			{NAV.subNavSections && (
				<Section
					fullWidth={true}
					showTopBorder={true}
					data-print-layout="hide"
					padSides={false}
					element="aside"
				>
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							position="footer"
						/>
					</Island>
				</Section>
			)}

			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				backgroundColour={palette.brand[400]}
				borderColour={palette.brand[600]}
				showSideBorders={false}
				showTopBorder={false}
				element="footer"
			>
				<Footer
					pageFooter={tagPage.pageFooter}
					selectedPillar={NAV.selectedPillar}
					pillars={NAV.pillars}
					urls={tagPage.nav.readerRevenueLinks.footer}
					editionId={tagPage.editionId}
				/>
			</Section>
			<BannerWrapper data-print-layout="hide">
				<Island priority="feature" defer={{ until: 'idle' }}>
					<StickyBottomBanner
						contentType={contentType}
						contributionsServiceUrl={contributionsServiceUrl}
						idApiUrl={idApiUrl}
						isMinuteArticle={false}
						isPaidContent={!!isPaidContent}
						isPreview={isPreview}
						isSensitive={isSensitive}
						pageId={pageId}
						sectionId={section}
						shouldHideReaderRevenue={false} // never defined for tag pages?
						remoteBannerSwitch={!!switches.remoteBanner}
						tags={enhanceTags(tags)}
					/>
				</Island>
			</BannerWrapper>
		</>
	);
};

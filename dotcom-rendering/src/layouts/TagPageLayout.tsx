import { isUndefined, joinUrl } from '@guardian/libs';
import { palette } from '@guardian/source/foundations';
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
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
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

					<Masthead
						nav={NAV}
						editionId={tagPage.editionId}
						idUrl={tagPage.config.idUrl}
						mmaUrl={tagPage.config.mmaUrl}
						discussionApiUrl={tagPage.config.discussionApiUrl}
						idApiUrl={tagPage.config.idApiUrl}
						contributionsServiceUrl={contributionsServiceUrl}
						showSubNav={true}
						showSlimNav={false}
						hasPageSkin={hasPageSkin}
						pageId={pageId}
					/>
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

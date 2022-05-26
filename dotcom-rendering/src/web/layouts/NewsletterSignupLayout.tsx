import {
	brandBackground,
	brandBorder,
	brandLine,
} from '@guardian/source-foundations';
import type { ArticleFormat } from '@guardian/libs';

import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { css } from '@emotion/react';
import { buildAdTargeting } from '../../lib/ad-targeting';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SubNav } from '../components/SubNav.importable';
import { ElementContainer } from '../components/ElementContainer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '../components/AdSlot';
import { Nav } from '../components/Nav/Nav';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { Stuck, BannerWrapper } from './lib/stickiness';
import { Island } from '../components/Island';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { NewsLetterSignupBanner } from '../components/NewsLetterSignupBanner';
import { getContributionsServiceUrl } from '../lib/contributions';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleBody } from '../components/ArticleBody';
import { ContainerLayout } from '../components/ContainerLayout';
import { decidePalette } from '../lib/decidePalette';

// This Layout is not currently in use.
// It is an outline of a design for articles with the ArticleDesign.NewsletterSignup
// which are currently rendered using the standard layout.
// The full version of the design is to be implemented by the newsletters team.

// to use this layout, edit ./dotcom-rendering/src/web/layouts/DecideLayout.tsx
// to return is on articles with  ArticleDisplay.Standard && ArticleDesign.NewsletterSignup

interface Props {
	CAPIArticle: CAPIArticleType;
	NAV: NavType;
	format: ArticleFormat;
}

export const NewsletterSignupLayout = ({ CAPIArticle, NAV, format }: Props) => {
	const {
		config: { host },
	} = CAPIArticle;

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: CAPIArticle.isAdFreeUser,
		isSensitive: CAPIArticle.config.isSensitive,
		videoDuration: CAPIArticle.config.videoDuration,
		edition: CAPIArticle.config.edition,
		section: CAPIArticle.config.section,
		sharedAdTargeting: CAPIArticle.config.sharedAdTargeting,
		adUnit: CAPIArticle.config.adUnit,
	});
	const contributionsServiceUrl = getContributionsServiceUrl(CAPIArticle);

	const palette = decidePalette(format);

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				<Stuck>
					<ElementContainer
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
						shouldCenter={false}
					>
						<HeaderAdSlot
							isAdFreeUser={CAPIArticle.isAdFreeUser}
							shouldHideAds={CAPIArticle.shouldHideAds}
							display={format.display}
						/>
					</ElementContainer>
				</Stuck>
				<ElementContainer
					showTopBorder={false}
					showSideBorders={false}
					padded={false}
					backgroundColour={brandBackground.primary}
					element="header"
				>
					<Header
						edition={CAPIArticle.editionId}
						idUrl={CAPIArticle.config.idUrl}
						mmaUrl={CAPIArticle.config.mmaUrl}
						supporterCTA={
							CAPIArticle.nav.readerRevenueLinks.header.supporter
						}
						discussionApiUrl={CAPIArticle.config.discussionApiUrl}
						urls={CAPIArticle.nav.readerRevenueLinks.header}
						remoteHeader={CAPIArticle.config.switches.remoteHeader}
						contributionsServiceUrl={contributionsServiceUrl}
					/>
				</ElementContainer>
				<ElementContainer
					showSideBorders={true}
					borderColour={brandLine.primary}
					showTopBorder={false}
					padded={false}
					backgroundColour={brandBackground.primary}
					element="nav"
				>
					<Nav
						nav={NAV}
						format={{
							...format,
							theme: getCurrentPillar(CAPIArticle),
						}}
						subscribeUrl={
							CAPIArticle.nav.readerRevenueLinks.header.subscribe
						}
						edition={CAPIArticle.editionId}
					/>
				</ElementContainer>

				{NAV.subNavSections && (
					<>
						<ElementContainer
							backgroundColour={palette.background.article}
							padded={false}
							element="aside"
						>
							<Island deferUntil="idle">
								<SubNav
									subNavSections={NAV.subNavSections}
									currentNavLink={NAV.currentNavLink}
									format={format}
								/>
							</Island>
						</ElementContainer>
						<ElementContainer
							backgroundColour={palette.background.article}
							padded={false}
							showTopBorder={false}
						>
							<StraightLines
								count={4}
								cssOverrides={css`
									display: block;
								`}
							/>
						</ElementContainer>
					</>
				)}
			</div>

			{CAPIArticle.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main>
				<NewsLetterSignupBanner />
				<ContainerLayout
					centralBorder="full"
					sideBorders={true}
					title="UK Focused"
					description={CAPIArticle.headline}
				>
					<ArticleContainer format={format}>
						<ArticleBody
							format={format}
							blocks={CAPIArticle.blocks}
							adTargeting={adTargeting}
							host={host}
							pageId={CAPIArticle.pageId}
							webTitle={CAPIArticle.webTitle}
							ajaxUrl={CAPIArticle.config.ajaxUrl}
							switches={CAPIArticle.config.switches}
							isSensitive={CAPIArticle.config.isSensitive}
							isAdFreeUser={CAPIArticle.isAdFreeUser}
							section={CAPIArticle.config.section}
							shouldHideReaderRevenue={
								CAPIArticle.shouldHideReaderRevenue
							}
							tags={CAPIArticle.tags}
							isPaidContent={!!CAPIArticle.config.isPaidContent}
							contributionsServiceUrl={contributionsServiceUrl}
							contentType={CAPIArticle.contentType}
							sectionName={CAPIArticle.sectionName || ''}
							isPreview={CAPIArticle.config.isPreview}
							idUrl={CAPIArticle.config.idUrl || ''}
							isDev={!!CAPIArticle.config.isDev}
						/>
					</ArticleContainer>
				</ContainerLayout>

				<Island
					clientOnly={true}
					deferUntil="idle"
					placeholderHeight={304}
				>
					<OnwardsUpper
						ajaxUrl={CAPIArticle.config.ajaxUrl}
						hasRelated={CAPIArticle.hasRelated}
						hasStoryPackage={CAPIArticle.hasStoryPackage}
						isAdFreeUser={CAPIArticle.isAdFreeUser}
						pageId={CAPIArticle.pageId}
						isPaidContent={
							CAPIArticle.config.isPaidContent || false
						}
						showRelatedContent={
							CAPIArticle.config.showRelatedContent
						}
						keywordIds={CAPIArticle.config.keywordIds}
						contentType={CAPIArticle.contentType}
						tags={CAPIArticle.tags}
						format={format}
						pillar={format.theme}
						edition={CAPIArticle.editionId}
						shortUrlId={CAPIArticle.config.shortUrlId}
					/>
				</Island>
			</main>

			<ElementContainer
				data-print-layout="hide"
				padded={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={CAPIArticle.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
					urls={CAPIArticle.nav.readerRevenueLinks.header}
					edition={CAPIArticle.editionId}
					contributionsServiceUrl={
						CAPIArticle.contributionsServiceUrl
					}
				/>
			</ElementContainer>

			<BannerWrapper data-print-layout="hide" />
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};

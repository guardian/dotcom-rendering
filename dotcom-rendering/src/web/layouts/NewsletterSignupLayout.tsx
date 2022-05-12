import {
	neutral,
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

interface Props {
	CAPIArticle: CAPIArticleType;
	NAV: NavType;
	format: ArticleFormat;
	palette: Palette;
}

const THERE_SHOULD_BE_MERCH_AD_SLOTS = false;

export const NewsletterSignupLayout = ({
	CAPIArticle,
	NAV,
	format,
	palette,
}: Props) => {
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
				<ElementContainer padded={false}>
					<NewsLetterSignupBanner />
				</ElementContainer>

				<ElementContainer padded={true}>
					<ArticleContainer format={format}>
						<ArticleBody
							format={format}
							blocks={CAPIArticle.blocks}
							pinnedPost={CAPIArticle.pinnedPost}
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
				</ElementContainer>

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

				{THERE_SHOULD_BE_MERCH_AD_SLOTS && (
					<>
						<ElementContainer
							data-print-layout="hide"
							padded={false}
							showTopBorder={false}
							showSideBorders={false}
							backgroundColour={neutral[93]}
							element="aside"
						>
							<AdSlot
								data-print-layout="hide"
								position="merchandising-high"
								display={format.display}
							/>
						</ElementContainer>

						<ElementContainer
							data-print-layout="hide"
							padded={false}
							showTopBorder={false}
							showSideBorders={false}
							backgroundColour={neutral[93]}
							element="aside"
						>
							<AdSlot
								position="merchandising"
								display={format.display}
							/>
						</ElementContainer>
					</>
				)}
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
				/>
			</ElementContainer>

			<BannerWrapper data-print-layout="hide" />
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};

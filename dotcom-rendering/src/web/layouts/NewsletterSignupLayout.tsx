import {
	neutral,
	brandBackground,
	brandBorder,
	brandLine,
} from '@guardian/source-foundations';
import type { ArticleFormat } from '@guardian/libs';

import { Lines } from '@guardian/source-react-components-development-kitchen';
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
import { NewsLetterSignupContent } from '../components/NewsLetterSignupContent';
import { NewsLetterSignupBanner } from '../components/NewsLetterSignupBanner';
import { NewsletterPromotionBanner } from '../components/NewsletterPromotionBanner';


interface Props {
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
	palette: Palette;
}

function isBannerElement(element:CAPIElement) {
	return element._type==='model.dotcomrendering.pageElements.EmbedBlockElement' && element.html.includes('data-is-banner-for-newsletter-signup=\"true\"');
}

function removeBannerElements(CAPI:CAPIType): [CAPIType, EmbedBlockElement[]] {
	const bannerElements: EmbedBlockElement[] = []
	const filteredCAPI = {...CAPI}

	filteredCAPI.blocks.forEach(block => {
		const bannersInThisBlock:EmbedBlockElement[] = []
		const othersInThisBlock:CAPIElement[] = []
		block.elements.forEach(element => {
			if (isBannerElement(element)) {
				bannersInThisBlock.push(element as EmbedBlockElement)
			} else {
				othersInThisBlock.push(element)
			}
		})

		bannerElements.push(...bannersInThisBlock)
		block.elements = othersInThisBlock
	})

	return [filteredCAPI, bannerElements]
}


const newslettersSubNav: SubNavType = {
	links: [
		{
			url: '/email-newsletters',
			title: 'Email newsletters',
			longTitle: 'Email newsletters',
		},
	],
};

const THERE_SHOULD_BE_MERCH_AD_SLOTS = false;

export interface NewsletterData {
	previewHref: string;
}
function getNewsletterDataForDemo(): NewsletterData {
	return {
		previewHref:
			'https://www.theguardian.com/world/series/guardian-morning-briefing/latest/email',
	};
}

export const NewsletterSignupLayout = ({
	CAPI,
	NAV,
	format,
	palette,
}: Props) => {
	const formatForNav = {
		...format,
		theme: getCurrentPillar(CAPI),
	};

	const newsletterData = getNewsletterDataForDemo();
	const [CAPIWithoutBanners, bannerElements] = removeBannerElements(CAPI);

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				<>
					<Stuck>
						<ElementContainer
							showTopBorder={false}
							showSideBorders={false}
							padded={false}
							shouldCenter={false}
						>
							<HeaderAdSlot
								isAdFreeUser={CAPI.isAdFreeUser}
								shouldHideAds={CAPI.shouldHideAds}
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
							edition={CAPI.editionId}
							idUrl={CAPI.config.idUrl}
							mmaUrl={CAPI.config.mmaUrl}
							supporterCTA={
								CAPI.nav.readerRevenueLinks.header.supporter
							}
							discussionApiUrl={CAPI.config.discussionApiUrl}
							isAnniversary={
								CAPI.config.switches.anniversaryHeaderSvg
							}
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
							format={formatForNav}
							subscribeUrl={
								CAPI.nav.readerRevenueLinks.header.subscribe
							}
							edition={CAPI.editionId}
						/>
					</ElementContainer>

					<ElementContainer
						backgroundColour={palette.background.article}
						padded={false}
						element="aside"
					>
						<Island deferUntil="idle">
							<SubNav
								subNavSections={newslettersSubNav}
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
						<Lines count={4} effect="straight" />
					</ElementContainer>
				</>
			</div>

			{CAPI.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main>
				<ElementContainer padded={false}>
					<NewsLetterSignupBanner />
				</ElementContainer>

				<ElementContainer padded={true}>
					<NewsLetterSignupContent
						format={format}
						palette={palette}
						CAPI={CAPIWithoutBanners}
						newsletterData={newsletterData}
					/>
				</ElementContainer>

				{!!bannerElements[0] && (
					<ElementContainer padded={false}>
						<NewsletterPromotionBanner
							label="You also might enjoy"
							element={bannerElements[0]}
						/>
					</ElementContainer>
				)}

				<Island
					clientOnly={true}
					deferUntil="idle"
					placeholderHeight={304}
				>
					<OnwardsUpper
						ajaxUrl={CAPI.config.ajaxUrl}
						hasRelated={CAPI.hasRelated}
						hasStoryPackage={CAPI.hasStoryPackage}
						isAdFreeUser={CAPI.isAdFreeUser}
						pageId={CAPI.pageId}
						isPaidContent={CAPI.config.isPaidContent || false}
						showRelatedContent={CAPI.config.showRelatedContent}
						keywordIds={CAPI.config.keywordIds}
						contentType={CAPI.contentType}
						tags={CAPI.tags}
						format={format}
						pillar={format.theme}
						edition={CAPI.editionId}
						shortUrlId={CAPI.config.shortUrlId}
						alsoShowCuratedContent={false}
						customHeading="Other popular newsletters"
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
					pageFooter={CAPI.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
				/>
			</ElementContainer>

			<BannerWrapper data-print-layout="hide" />
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};

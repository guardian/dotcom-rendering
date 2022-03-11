
import {
	neutral,
	brandBackground,
	brandBorder,
	brandLine,
	labs,
	border,
} from '@guardian/source-foundations';
import { ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';

import { Lines } from '@guardian/source-react-components-development-kitchen';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SubNav } from '../components/SubNav.importable';
import { ElementContainer } from '../components/ElementContainer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '../components/AdSlot';
import { Nav } from '../components/Nav/Nav';
import { LabsHeader } from '../components/LabsHeader.importable';
import {
	getCurrentPillar,
} from '../lib/layoutHelpers';
import { Stuck, BannerWrapper } from './lib/stickiness';
import { Island } from '../components/Island';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { NewsLetterSignupContent } from '../components/NewsLetterSignupContent';
import { NewsLetterSignupBanner } from '../components/NewsLetterSignupBanner';


interface Props {
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
	palette: Palette;
}

export const NewsletterSignupLayout = ({
	CAPI,
	NAV,
	format,
	palette,
}: Props) => {

	const formatForNav =
		format.theme === ArticleSpecial.Labs
			? format
			: {
					...format,
					theme: getCurrentPillar(CAPI),
			  };

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
					{format.theme !== ArticleSpecial.Labs && (
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
					)}
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
					{NAV.subNavSections &&
						format.theme !== ArticleSpecial.Labs && (
							<>
								<ElementContainer
									backgroundColour={
										palette.background.article
									}
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
									backgroundColour={
										palette.background.article
									}
									padded={false}
									showTopBorder={false}
								>
									<Lines count={4} effect="straight" />
								</ElementContainer>
							</>
						)}
				</>
			</div>

			{format.theme === ArticleSpecial.Labs && (
				<Stuck>
					<ElementContainer
						showSideBorders={true}
						showTopBorder={false}
						backgroundColour={labs[400]}
						borderColour={border.primary}
						sectionId="labs-header"
						element="aside"
					>
						<Island deferUntil="idle">
							<LabsHeader />
						</Island>
					</ElementContainer>
				</Stuck>
			)}

			{CAPI.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main>
				<ElementContainer padded={false}>
					<NewsLetterSignupBanner format={format} palette={palette} />
				</ElementContainer>

				<ElementContainer padded={true}>
					<NewsLetterSignupContent
						format={format}
						palette={palette}
						CAPI={CAPI}
					/>
				</ElementContainer>

				<Island clientOnly={true} deferUntil="idle" placeholderHeight={304}>
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
					<AdSlot position="merchandising" display={format.display} />
				</ElementContainer>
			</main>

			{NAV.subNavSections && (
				<ElementContainer
					data-print-layout="hide"
					padded={false}
					element="aside"
				>
					<Island deferUntil="visible">
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							format={format}
						/>
					</Island>
				</ElementContainer>
			)}

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

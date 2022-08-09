import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	brandAlt,
	brandBackground,
	brandBorder,
	brandLine,
	from,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Column,
	Columns,
	Hide,
	LinkButton,
	SvgEye,
	SvgGuardianLogo,
} from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { buildAdTargeting } from '../../lib/ad-targeting';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { Carousel } from '../components/Carousel.importable';
import { ContainerLayout } from '../components/ContainerLayout';
import { DecideOnwards } from '../components/DecideOnwards';
import { ElementContainer } from '../components/ElementContainer';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { MainMedia } from '../components/MainMedia';
import { Nav } from '../components/Nav/Nav';
import { NewsletterBadge } from '../components/NewsletterBadge';
import { NewsletterCategory } from '../components/NewsletterCategory';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { ShareIcons } from '../components/ShareIcons';
import { Standfirst } from '../components/Standfirst';
import { SubNav } from '../components/SubNav.importable';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decidePalette } from '../lib/decidePalette';
import { decideTrail } from '../lib/decideTrail';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { BannerWrapper, Stuck } from './lib/stickiness';

// This Layout is not currently in use.
// It is an outline of a design for articles with the ArticleDesign.NewsletterSignup
// which are currently rendered using the standard layout.
// The full version of the design is to be implemented by the newsletters team.

// to use this layout, edit ./dotcom-rendering/src/web/layouts/DecideLayout.tsx
// to return is on articles with  ArticleDisplay.Standard && ArticleDesign.NewsletterSignup

type NewsletterSignupLayoutProps = {
	CAPIArticle: CAPIArticleType;
	NAV: NavType;
	format: ArticleFormat;
};

const mainColWrapperStyle = css`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: flex-end;
	max-width: 200px;

	${until.wide} {
		max-width: 160px;
	}

	${until.leftCol} {
		justify-content: flex-start;
		max-width: 200px;
	}

	${until.desktop} {
		max-width: 170px;
	}
`;

// the negative bottom values at the two column layout are to
// align the baseline of the text in the newsletters badge svg
// with the Guardian logo in the leftCol, rather than aligning
// the bottom of the SVG frame (design requirement)
const mainColNewsLettersBadgeContainerStyle = css`
	svg {
		width: 100%;
		position: relative;
		bottom: -10px;

		${until.wide} {
			bottom: -9px;
		}

		${until.leftCol} {
			padding-top: ${space[1]}px;
			bottom: 0;
		}
	}
`;

const leftColWrapperStyle = css`
	display: flex;
	justify-content: flex-end;
	margin-top: ${space[2]}px;
	margin-bottom: ${space[9]}px;
`;

const previewButtonWrapperStyle = css`
	padding: ${space[2]}px 0;
	${from.desktop} {
		display: none;
	}
`;

const mainGraphicWrapperStyle = css`
	border-radius: ${space[2]}px;
	overflow: hidden;
	margin: ${space[4]}px 0;
`;

const previewCaptionStyle = css`
	display: flex;
	background-color: ${brandAlt[400]};
	align-items: center;
	padding: ${space[1]}px;
	${textSans.medium({ fontWeight: 'bold', lineHeight: 'tight' })}

	svg {
		margin-right: ${space[1]}px;
		flex-shrink: 0;
	}
`;

const guardianLogoContainerStyle = css`
	svg {
		max-width: 100%;
		display: flex;

		${until.leftCol} {
			width: 65%;
			display: block;
		}
	}
`;

export const NewsletterSignupLayout = ({
	CAPIArticle,
	NAV,
	format,
}: NewsletterSignupLayoutProps) => {
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

	/**	TODO: include logic here for whether preview exists for the newsletter */
	const showNewsletterPreview = true;

	/** TODO: this data needs to come from the newsletters API */
	const newsletterCategory = 'UK Focused';

	const renderAds = !CAPIArticle.isAdFreeUser && !CAPIArticle.shouldHideAds;

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				{renderAds && (
					<Stuck>
						<ElementContainer
							showTopBorder={false}
							showSideBorders={false}
							padded={false}
							shouldCenter={false}
						>
							<HeaderAdSlot display={format.display} />
						</ElementContainer>
					</Stuck>
				)}

				<ElementContainer
					showTopBorder={false}
					showSideBorders={false}
					padded={false}
					backgroundColour={brandBackground.primary}
					element="header"
				>
					<Header
						editionId={CAPIArticle.editionId}
						idUrl={CAPIArticle.config.idUrl}
						mmaUrl={CAPIArticle.config.mmaUrl}
						supporterCTA={
							CAPIArticle.nav.readerRevenueLinks.header.supporter
						}
						discussionApiUrl={CAPIArticle.config.discussionApiUrl}
						urls={CAPIArticle.nav.readerRevenueLinks.header}
						remoteHeader={CAPIArticle.config.switches.remoteHeader}
						contributionsServiceUrl={contributionsServiceUrl}
						idApiUrl={CAPIArticle.config.idApiUrl}
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
						editionId={CAPIArticle.editionId}
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

			{renderAds && CAPIArticle.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main data-layout="NewsletterSignupLayout">
				<ContainerLayout
					innerBackgroundColour={brandBackground.primary}
					leftContent={
						<div css={leftColWrapperStyle}>
							<Hide until="leftCol">
								<span css={guardianLogoContainerStyle}>
									<SvgGuardianLogo
										textColor={palette.fill.guardianLogo}
										width={200}
									/>
								</span>
							</Hide>
						</div>
					}
				>
					<div css={mainColWrapperStyle}>
						<Hide from="leftCol">
							<span css={guardianLogoContainerStyle}>
								<SvgGuardianLogo
									textColor={palette.fill.guardianLogo}
									width={200}
								/>
							</span>
						</Hide>

						<span css={mainColNewsLettersBadgeContainerStyle}>
							<NewsletterBadge />
						</span>
					</div>
				</ContainerLayout>

				<ContainerLayout
					centralBorder="full"
					sideBorders={true}
					stretchRight={true}
					leftContent={
						<NewsletterCategory text={newsletterCategory} />
					}
				>
					<Columns collapseUntil="desktop">
						<Column width={[1, 1, 5 / 8, 1 / 2, 1 / 2]}>
							<Hide from="leftCol">
								<NewsletterCategory text={newsletterCategory} />
							</Hide>
							<ArticleHeadline
								format={format}
								headlineString={CAPIArticle.headline}
								tags={CAPIArticle.tags}
								byline={CAPIArticle.byline}
								webPublicationDateDeprecated={
									CAPIArticle.webPublicationDateDeprecated
								}
							/>

							<Standfirst
								format={format}
								standfirst={CAPIArticle.standfirst}
							/>

							{/* TODO:
								- This data will come from the Newsletters API
								- Only render this part if preview link exists
								- Add onClick handler or link?
								- Accessibility?
							*/}
							{showNewsletterPreview && (
								<div css={previewButtonWrapperStyle}>
									<LinkButton
										icon={<SvgEye />}
										iconSide="left"
										priority="tertiary"
										size="xsmall"
									>
										Preview this newsletter
									</LinkButton>
								</div>
							)}

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
								isPaidContent={
									!!CAPIArticle.config.isPaidContent
								}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								contentType={CAPIArticle.contentType}
								sectionName={CAPIArticle.sectionName || ''}
								isPreview={CAPIArticle.config.isPreview}
								idUrl={CAPIArticle.config.idUrl || ''}
								isDev={!!CAPIArticle.config.isDev}
							/>

							<div
								css={css`
									display: flex;
									align-items: center;
								`}
							>
								<span
									css={css`
										${textSans.medium({
											fontWeight: 'bold',
										})};
										margin-right: ${space[4]}px;
									`}
								>
									Tell your friends
								</span>
								<div>
									<ShareIcons
										pageId={CAPIArticle.pageId}
										webTitle={CAPIArticle.webTitle}
										format={format}
										displayIcons={[
											'facebook',
											'twitter',
											'email',
										]}
										size="medium"
										context="ArticleMeta"
									/>
								</div>
							</div>
						</Column>

						<Column width={[1, 1, 3 / 8, 1 / 2, 1 / 2]}>
							<div css={mainGraphicWrapperStyle}>
								{/* TODO:
										- This data will come from the Newsletters API
										- Only render this part if preview link exists
										- Add onClick handler or link?
										- Accessibility?
								 */}
								{showNewsletterPreview && (
									<Hide until="desktop">
										<figcaption css={previewCaptionStyle}>
											<SvgEye size="small" />
											<span role="link">
												Click here to see the latest
												version of this newsletter
											</span>
										</figcaption>
									</Hide>
								)}

								<MainMedia
									format={format}
									elements={CAPIArticle.mainMediaElements}
									adTargeting={adTargeting}
									host={host}
									pageId={CAPIArticle.pageId}
									webTitle={CAPIArticle.webTitle}
									ajaxUrl={CAPIArticle.config.ajaxUrl}
									switches={CAPIArticle.config.switches}
									isAdFreeUser={CAPIArticle.isAdFreeUser}
									isSensitive={CAPIArticle.config.isSensitive}
									hideCaption={true}
								/>
							</div>
						</Column>
					</Columns>
				</ContainerLayout>

				{CAPIArticle.onwards ? (
					<DecideOnwards
						onwards={CAPIArticle.onwards}
						format={format}
					/>
				) : (
					<>
						{CAPIArticle.storyPackage && (
							<ElementContainer>
								<Island deferUntil="visible">
									<Carousel
										heading={
											CAPIArticle.storyPackage.heading
										}
										trails={CAPIArticle.storyPackage.trails.map(
											decideTrail,
										)}
										onwardsType="more-on-this-story"
										format={format}
									/>
								</Island>
							</ElementContainer>
						)}

						<Island
							clientOnly={true}
							deferUntil="visible"
							placeholderHeight={600}
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
								editionId={CAPIArticle.editionId}
								shortUrlId={CAPIArticle.config.shortUrlId}
							/>
						</Island>
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
					urls={CAPIArticle.nav.readerRevenueLinks.header}
					editionId={CAPIArticle.editionId}
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

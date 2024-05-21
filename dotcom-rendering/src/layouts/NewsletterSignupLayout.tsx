import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
	textSansBold17,
	until,
} from '@guardian/source-foundations';
import {
	Column,
	Columns,
	Hide,
	Link,
	LinkButton,
	SvgEye,
	SvgGuardianLogo,
} from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { Carousel } from '../components/Carousel.importable';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { MainMedia } from '../components/MainMedia';
import { Masthead } from '../components/Masthead';
import { Nav } from '../components/Nav/Nav';
import { NewsletterBadge } from '../components/NewsletterBadge';
import { NewsletterDetail } from '../components/NewsletterDetail';
import { NewsletterFrequency } from '../components/NewsletterFrequency';
import { NewsletterPrivacyMessage } from '../components/NewsletterPrivacyMessage';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { Section } from '../components/Section';
import { SecureSignup } from '../components/SecureSignup.importable';
import { ShareButton } from '../components/ShareButton.importable';
import { Standfirst } from '../components/Standfirst';
import { SubNav } from '../components/SubNav.importable';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideTrail } from '../lib/decideTrail';
import { isValidUrl } from '../lib/isValidUrl';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { DCRArticle } from '../types/frontend';
import { BannerWrapper, Stuck } from './lib/stickiness';

type Props = {
	article: DCRArticle;
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
			bottom: -8px;
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
	margin-bottom: ${space[4]}px;

	margin-top: ${space[4]}px;

	${from.desktop} {
		margin-top: ${space[9]}px;
	}

	${from.leftCol} {
		margin-top: ${space[2]}px;
	}
`;

const previewCaptionStyle = css`
	display: flex;
	align-items: center;
	background-color: ${sourcePalette.brandAlt[400]};
	padding: ${space[1]}px ${space[3]}px;
	${textSansBold17};
	text-decoration: none;

	:hover {
		text-decoration: initial;
	}

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

const topMarginStyle = (marginTop: number = space[2]): SerializedStyles => css`
	margin-top: ${marginTop}px;
`;

const shareSpanStyle = css`
	${textSansBold17};
	margin-right: ${space[4]}px;
`;

const shareDivStyle = css`
	display: flex;
	align-items: center;
	margin-top: ${space[4]}px;
	margin-bottom: ${space[4]}px;
`;

const frequencyDivStyle = css`
	margin-top: ${space[2]}px;
	margin-bottom: ${space[2]}px;
`;

const regionalFocusDivStyle = css`
	margin-bottom: ${space[2]}px;
`;

const getMainMediaCaptions = (article: DCRArticle): (string | undefined)[] =>
	article.mainMediaElements.map((el) =>
		el._type === 'model.dotcomrendering.pageElements.ImageBlockElement'
			? el.data.caption
			: undefined,
	);

export const NewsletterSignupLayout = ({ article, NAV, format }: Props) => {
	const {
		promotedNewsletter,
		config: { host },
	} = article;

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const regionalFocusText = promotedNewsletter?.regionFocus
		? `${promotedNewsletter.regionFocus} Focused`
		: '';
	const showRegionalFocus = Boolean(regionalFocusText);

	/**	Newsletter preview will be linked if the caption of the main media is a URL */
	const captions = getMainMediaCaptions(article);
	const newsletterPreviewUrl = captions
		.filter(Boolean)
		.find((caption) => !!caption && isValidUrl(caption));
	const showNewsletterPreview = Boolean(newsletterPreviewUrl);

	/**
	 * This property currently only applies to the header and merchandising slots
	 */
	const renderAds = canRenderAds(article);

	const inUpdatedHeaderABTest =
		article.config.abTests.updatedHeaderDesignVariant === 'variant';

	const { absoluteServerTimes = false } = article.config.switches;

	return (
		<>
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
								isPaidContent={!!article.config.isPaidContent}
								shouldHideReaderRevenue={
									!!article.config.shouldHideReaderRevenue
								}
							/>
						</Section>
					</Stuck>
				)}

				{inUpdatedHeaderABTest ? (
					<Masthead
						nav={NAV}
						editionId={article.editionId}
						idUrl={article.config.idUrl}
						mmaUrl={article.config.mmaUrl}
						subscribeUrl={
							article.nav.readerRevenueLinks.header.subscribe
						}
						discussionApiUrl={article.config.discussionApiUrl}
						idApiUrl={article.config.idApiUrl}
						showSubNav={!!NAV.subNavSections}
						isImmersive={
							format.display === ArticleDisplay.Immersive
						}
						displayRoundel={
							format.display === ArticleDisplay.Immersive ||
							format.theme === ArticleSpecial.Labs
						}
						hasPageSkin={false}
						hasPageSkinContentSelfConstrain={false}
					/>
				) : (
					<>
						<Section
							fullWidth={true}
							shouldCenter={false}
							showTopBorder={false}
							showSideBorders={false}
							padSides={false}
							backgroundColour={sourcePalette.brand[400]}
							element="header"
						>
							<Header
								editionId={article.editionId}
								idUrl={article.config.idUrl}
								mmaUrl={article.config.mmaUrl}
								discussionApiUrl={
									article.config.discussionApiUrl
								}
								urls={article.nav.readerRevenueLinks.header}
								remoteHeader={
									!!article.config.switches.remoteHeader
								}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								idApiUrl={article.config.idApiUrl}
								headerTopBarSearchCapiSwitch={
									!!article.config.switches
										.headerTopBarSearchCapi
								}
							/>
						</Section>

						<Section
							fullWidth={true}
							borderColour={sourcePalette.brand[600]}
							showTopBorder={false}
							padSides={false}
							backgroundColour={sourcePalette.brand[400]}
							element="nav"
						>
							<Nav
								nav={NAV}
								isImmersive={
									format.display === ArticleDisplay.Immersive
								}
								displayRoundel={
									format.display ===
										ArticleDisplay.Immersive ||
									format.theme === ArticleSpecial.Labs
								}
								selectedPillar={NAV.selectedPillar}
								subscribeUrl={
									article.nav.readerRevenueLinks.header
										.subscribe
								}
								editionId={article.editionId}
							/>
						</Section>

						{!!NAV.subNavSections && (
							<>
								<Section
									fullWidth={true}
									backgroundColour={themePalette(
										'--article-background',
									)}
									padSides={false}
									showTopBorder={false}
									element="aside"
								>
									<Island
										priority="enhancement"
										defer={{ until: 'idle' }}
									>
										<SubNav
											subNavSections={NAV.subNavSections}
											currentNavLink={NAV.currentNavLink}
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
										count={4}
										cssOverrides={css`
											display: block;
										`}
										color={themePalette('--straight-lines')}
									/>
								</Section>
							</>
						)}
					</>
				)}
			</div>

			{renderAds && !!article.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main data-layout="NewsletterSignupLayout">
				<Section
					showTopBorder={false}
					showSideBorders={false}
					innerBackgroundColour={sourcePalette.brand[400]}
					leftContent={
						<div css={leftColWrapperStyle}>
							<Hide until="leftCol">
								<span css={guardianLogoContainerStyle}>
									<SvgGuardianLogo
										textColor={sourcePalette.neutral[100]}
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
									textColor={sourcePalette.neutral[100]}
									width={200}
								/>
							</span>
						</Hide>

						<span css={mainColNewsLettersBadgeContainerStyle}>
							<NewsletterBadge />
						</span>
					</div>
				</Section>

				<Section
					centralBorder="full"
					showTopBorder={false}
					stretchRight={true}
					leftContent={
						showRegionalFocus && (
							<div css={topMarginStyle(space[4])}>
								<NewsletterDetail text={regionalFocusText} />
							</div>
						)
					}
				>
					<Columns collapseUntil="desktop">
						<Column width={[1, 1, 5 / 8, 1 / 2, 1 / 2]}>
							{showRegionalFocus && (
								<Hide from="leftCol">
									<div css={regionalFocusDivStyle}>
										<NewsletterDetail
											text={regionalFocusText}
										/>
									</div>
								</Hide>
							)}
							<ArticleHeadline
								format={format}
								headlineString={article.headline}
								tags={article.tags}
								byline={article.byline}
								webPublicationDateDeprecated={
									article.webPublicationDateDeprecated
								}
							/>
							<Standfirst
								format={format}
								standfirst={article.standfirst}
							/>
							{showNewsletterPreview && (
								<div css={previewButtonWrapperStyle}>
									<LinkButton
										icon={<SvgEye />}
										iconSide="left"
										href={newsletterPreviewUrl}
										target="_blank"
										rel="noreferrer"
										priority="tertiary"
										size="xsmall"
									>
										Preview this newsletter
									</LinkButton>
								</div>
							)}

							<div css={shareDivStyle}>
								<span css={shareSpanStyle}>
									Tell your friends
								</span>
								<Island
									priority="feature"
									defer={{ until: 'visible' }}
								>
									<ShareButton
										pageId={article.pageId}
										webTitle={article.webTitle}
										format={format}
										context="ArticleMeta"
									/>
								</Island>
							</div>

							{!!promotedNewsletter && (
								<>
									<div css={frequencyDivStyle}>
										<NewsletterFrequency
											frequency={
												promotedNewsletter.frequency
											}
										/>
									</div>

									<Island
										priority="feature"
										defer={{ until: 'visible' }}
									>
										<SecureSignup
											newsletterId={
												promotedNewsletter.identityName
											}
											successDescription={
												promotedNewsletter.successDescription
											}
										/>
									</Island>
									<NewsletterPrivacyMessage />
								</>
							)}
						</Column>

						<Column width={[1, 1, 3 / 8, 1 / 2, 1 / 2]}>
							<div css={mainGraphicWrapperStyle}>
								{showNewsletterPreview && (
									<Hide until="desktop">
										<Link
											cssOverrides={previewCaptionStyle}
											href={newsletterPreviewUrl}
											target="_blank"
											icon={<SvgEye size="medium" />}
											priority="secondary"
											rel="noreferrer"
										>
											Click here to see the latest version
											of this newsletter
										</Link>
									</Hide>
								)}

								<MainMedia
									format={format}
									elements={article.mainMediaElements}
									host={host}
									pageId={article.pageId}
									webTitle={article.webTitle}
									ajaxUrl={article.config.ajaxUrl}
									abTests={article.config.abTests}
									switches={article.config.switches}
									isAdFreeUser={article.isAdFreeUser}
									isSensitive={article.config.isSensitive}
									hideCaption={true}
									editionId={article.editionId}
								/>
							</div>
						</Column>
					</Columns>
				</Section>

				{article.storyPackage && (
					<Section fullWidth={true}>
						<Island priority="feature" defer={{ until: 'visible' }}>
							<Carousel
								heading={article.storyPackage.heading}
								trails={article.storyPackage.trails.map(
									decideTrail,
								)}
								onwardsSource="more-on-this-story"
								format={format}
								leftColSize={'compact'}
								discussionApiUrl={
									article.config.discussionApiUrl
								}
								absoluteServerTimes={absoluteServerTimes}
							/>
						</Island>
					</Section>
				)}

				<Island priority="feature" defer={{ until: 'visible' }}>
					<OnwardsUpper
						ajaxUrl={article.config.ajaxUrl}
						hasRelated={article.hasRelated}
						hasStoryPackage={article.hasStoryPackage}
						isAdFreeUser={article.isAdFreeUser}
						pageId={article.pageId}
						isPaidContent={article.config.isPaidContent ?? false}
						showRelatedContent={article.config.showRelatedContent}
						keywordIds={article.config.keywordIds}
						contentType={article.contentType}
						tags={article.tags}
						format={format}
						pillar={format.theme}
						editionId={article.editionId}
						shortUrlId={article.config.shortUrlId}
						discussionApiUrl={article.config.discussionApiUrl}
						absoluteServerTimes={absoluteServerTimes}
					/>
				</Island>
			</main>

			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				showTopBorder={false}
				backgroundColour={sourcePalette.brand[400]}
				borderColour={sourcePalette.brand[600]}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={article.pageFooter}
					selectedPillar={NAV.selectedPillar}
					pillars={NAV.pillars}
					urls={article.nav.readerRevenueLinks.header}
					editionId={article.editionId}
					contributionsServiceUrl={article.contributionsServiceUrl}
				/>
			</Section>

			<BannerWrapper data-print-layout="hide" />
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};

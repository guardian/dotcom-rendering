import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import {
	brandBackground,
	brandBorder,
	brandLine,
	from,
	headline,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Column,
	Columns,
	Hide,
	SvgGuardianLogo,
} from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { CardPicture } from '../components/CardPicture';
import { CarouselForNewsletters } from '../components/CarouselForNewsletters.importable';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Nav } from '../components/Nav/Nav';
import { NewsletterBadge } from '../components/NewsletterBadge';
import { NewsletterDetail } from '../components/NewsletterDetail';
import { NewsletterFrequency } from '../components/NewsletterFrequency';
import { Section } from '../components/Section';
import { SecureSignup } from '../components/SecureSignup';
import { ShareIcons } from '../components/ShareIcons';
import { SubNav } from '../components/SubNav.importable';
import { pillarFromCurrentLink } from '../lib/layoutHelpers';
import type { NavType } from '../model/extract-nav';
import type { DCRNewsletterDetailPageType } from '../types/newsletterDetailPage';
import { Stuck } from './lib/stickiness';

type Props = {
	newsletterDetailPage: DCRNewsletterDetailPageType;
	NAV: NavType;
};

const titleStyle = css`
	${headline.medium()};
	padding-bottom: ${space[6]}px;
`;
const descriptionStyle = css`
	${headline.xsmall({ fontWeight: 'light' })};
`;

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
	${textSans.medium({ fontWeight: 'bold' })};
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

export const NewsletterDetailPageLayout = ({
	newsletterDetailPage,
	NAV,
}: Props) => {
	const {
		subscribeUrl,
		editionId,
		pageFooter,
		contributionsServiceUrl: pageContributionsServiceUrl,
		config,
		isAdFreeUser,
	} = newsletterDetailPage;

	const renderAds = !isAdFreeUser;

	const contributionsServiceUrl =
		process.env.SDC_URL ?? pageContributionsServiceUrl;

	const regionalFocusText = newsletterDetailPage.newsletter.regionFocus
		? `${newsletterDetailPage.newsletter.regionFocus} Focused`
		: '';
	const showRegionalFocus = Boolean(regionalFocusText);

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
								<HeaderAdSlot />
							</Section>
						</Stuck>
					)}
					<Section
						fullWidth={true}
						shouldCenter={false}
						showTopBorder={false}
						showSideBorders={false}
						padSides={false}
						backgroundColour={brandBackground.primary}
						element="header"
					>
						<Header
							editionId={newsletterDetailPage.editionId}
							idUrl={newsletterDetailPage.config.idUrl}
							mmaUrl={newsletterDetailPage.config.mmaUrl}
							discussionApiUrl={
								newsletterDetailPage.config.discussionApiUrl
							}
							urls={
								newsletterDetailPage.nav.readerRevenueLinks
									.header
							}
							remoteHeader={
								!!newsletterDetailPage.config.switches
									.remoteHeader
							}
							contributionsServiceUrl={contributionsServiceUrl}
							idApiUrl={config.idApiUrl}
							headerTopBarSearchCapiSwitch={
								!!newsletterDetailPage.config.switches
									.headerTopBarSearchCapi
							}
						/>
					</Section>
					<Section
						fullWidth={true}
						borderColour={brandLine.primary}
						showTopBorder={false}
						padSides={false}
						backgroundColour={brandBackground.primary}
						element="nav"
					>
						<Nav
							headerTopBarSwitch={false}
							nav={NAV}
							selectedPillar={pillarFromCurrentLink(
								NAV.currentNavLink,
							)}
							subscribeUrl={subscribeUrl}
							editionId={editionId}
						/>
					</Section>
					{NAV.subNavSections && (
						<>
							<Section
								fullWidth={true}
								backgroundColour={palette.neutral[100]}
								padSides={false}
								element="aside"
							>
								<Island
									priority="enhancement"
									defer={{ until: 'idle' }}
								>
									<SubNav
										subNavSections={NAV.subNavSections}
										currentNavLink={NAV.currentNavLink}
										linkHoverColour={
											'palette.text.articleLinkHover'
										}
										borderColour={'palette.border.subNav'}
									/>
								</Island>
							</Section>
							<Section
								fullWidth={true}
								backgroundColour={palette.neutral[100]}
								padSides={false}
								showTopBorder={false}
							>
								<StraightLines
									count={4}
									cssOverrides={css`
										display: block;
									`}
									color={palette.brand[400]}
								/>
							</Section>
						</>
					)}
				</>
			</div>

			<main data-layout="NewsletterDetailPageLayout" id="maincontent">
				<Section
					showTopBorder={false}
					showSideBorders={false}
					innerBackgroundColour={brandBackground.primary}
					leftContent={
						<div css={leftColWrapperStyle}>
							<Hide until="leftCol">
								<span css={guardianLogoContainerStyle}>
									<SvgGuardianLogo
										textColor={palette.neutral[100]}
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
									textColor={palette.neutral[100]}
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
							{!!newsletterDetailPage.newsletter.regionFocus && (
								<Hide from="leftCol">
									{showRegionalFocus && (
										<div css={regionalFocusDivStyle}>
											<NewsletterDetail
												text={regionalFocusText}
											/>
										</div>
									)}
								</Hide>
							)}

							<h1 css={titleStyle}>
								{newsletterDetailPage.newsletter.name}
							</h1>
							<p css={descriptionStyle}>
								{newsletterDetailPage.newsletter.description}
							</p>

							<div css={shareDivStyle}>
								<span css={shareSpanStyle}>
									Tell your friends
								</span>
								<ShareIcons
									pageId={newsletterDetailPage.canonicalUrl}
									webTitle={newsletterDetailPage.webTitle}
									format={{
										theme: Pillar.News,
										design: ArticleDesign.NewsletterSignup,
										display: ArticleDisplay.Standard,
									}}
									displayIcons={[
										'facebook',
										'twitter',
										'email',
									]}
									size="medium"
									context="ArticleMeta"
								/>
							</div>

							<div css={frequencyDivStyle}>
								<NewsletterFrequency
									frequency={
										newsletterDetailPage.newsletter
											.frequency
									}
								/>
							</div>

							<SecureSignup
								name={newsletterDetailPage.newsletter.name}
								newsletterId={
									newsletterDetailPage.newsletter.identityName
								}
								successDescription={
									newsletterDetailPage.newsletter
										.successDescription
								}
								hidePrivacyMessage={false}
							/>
						</Column>

						<Column width={[1, 1, 3 / 8, 1 / 2, 1 / 2]}>
							<div css={mainGraphicWrapperStyle}>
								{newsletterDetailPage.newsletter
									.illustrationCard ? (
									<CardPicture
										imageSize="medium"
										alt=""
										mainImage={
											newsletterDetailPage.newsletter
												.illustrationCard
										}
										loading="eager"
									/>
								) : (
									<p>No image</p>
								)}
							</div>
						</Column>
					</Columns>
				</Section>
			</main>
			<aside>
				<Section fullWidth={true}>
					<Island priority="feature" defer={{ until: 'idle' }}>
						<CarouselForNewsletters
							heading={'you might also like'}
							onwardsSource="newsletters-page"
							newsletters={
								newsletterDetailPage.backfillRecommendedNewsletters
							}
							leftColSize="wide"
							activeDotColour={palette.brand[400]}
							titleHighlightColour={palette.neutral[7]}
							cardFunction="link"
						/>
					</Island>
				</Section>
			</aside>

			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={pageFooter}
					pillars={NAV.pillars}
					urls={NAV.readerRevenueLinks.header}
					editionId={editionId}
					contributionsServiceUrl={contributionsServiceUrl}
				/>
			</Section>
		</>
	);
};

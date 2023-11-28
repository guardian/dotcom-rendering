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
import type { Newsletter } from '../types/content';
import type { DCRNewsletterDetailPageType } from '../types/newsletterDetailPage';
import { Stuck } from './lib/stickiness';

const HARD_CODED_RECOMMENDATIONS: Newsletter[] = [
	{
		name: "Guardian Australia's Afternoon Update",
		identityName: 'afternoon-update',
		description:
			'Our Australian afternoon update email breaks down the key national and international stories of the day and why they matter',
		frequency: 'Every weekday',
		theme: 'news',
		group: 'News in depth',
		listId: 6023,
		successDescription: "We'll send you Afternoon Update every weekday",
		illustrationCard:
			'https://media.guim.co.uk/50b02d4e4a32def95d8d26cc852549e6bd83f037/0_0_1850_1111/500.jpg',
	},
	{
		name: 'Art Weekly',
		identityName: 'art-weekly',
		description:
			'A round-up of the art world, sketching out all the biggest stories, scandals and exhibitions',
		frequency: 'Weekly',
		theme: 'culture',
		group: 'Culture',
		listId: 4134,
		successDescription: "We'll send you Art Weekly every week",
		illustrationCard:
			'https://media.guim.co.uk/e6ee88c4b60cd6fd315fb472beb8989920dd59a9/7_231_882_529/500.jpg',
	},
	{
		name: 'Australian Politics',
		identityName: 'australian-politics',
		description:
			'From the big, breaking news to quiet, thoughtful analysis, all you need to keep up with Australian political manoeuvres',
		frequency: 'Every weekday',
		theme: 'news',
		group: 'News in brief',
		listId: 4135,
		successDescription: "We'll send you Australia Politic every weekday",
		illustrationCard:
			'https://media.guim.co.uk/f55f510293ee713ffcc9e48d1f420d4b2769ea49/0_0_5472_3648/500.jpg',
	},
	{
		name: 'The Best of Guardian Opinion',
		identityName: 'best-of-opinion',
		description:
			'Sign up for our daily selection of opinion pieces and and see things from another point of view',
		frequency: 'Every weekday',
		theme: 'opinion',
		group: 'Opinion',
		listId: 4161,
		successDescription:
			"We'll send you the best of Guardian Opinion every weekday",
		illustrationCard:
			'https://media.guim.co.uk/4ef30ca444a6980ad09f9c651b620000ede91d68/2943_7_2997_1798/500.png',
	},
	{
		name: 'Bookmarks',
		identityName: 'bookmarks',
		description:
			'Discover new books with our expert reviews, author interviews and top 10s',
		frequency: 'Weekly',
		theme: 'culture',
		group: 'Culture',
		listId: 4137,
		successDescription: "We'll send you Bookmarks every week",
		illustrationCard:
			'https://media.guim.co.uk/bd33b2efd56427f05252ea4001b2a45cc63d38d5/1826_0_1399_840/500.png',
	},
	{
		name: 'Business Today',
		identityName: 'business-today',
		description:
			"Get set for the working day – we'll point you to the all the business news and analysis you need",
		frequency: 'Every weekday',
		theme: 'news',
		group: 'News in brief',
		listId: 4139,
		successDescription: "We'll send you Business Today every weekday",
		illustrationCard:
			'https://media.guim.co.uk/aa8b0d33b6d0c2ff8fa26f15cd42632d8a251a66/0_151_3000_1800/500.jpg',
	},
];

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
							newsletters={HARD_CODED_RECOMMENDATIONS}
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

import { css, Global } from '@emotion/react';
import { ArticlePillar } from '@guardian/libs';
import {
	brandAlt,
	brandBackground,
	brandBorder,
	brandLine,
	focusHalo,
	neutral,
	palette,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import type { ReactNode } from 'react';
import { StrictMode } from 'react';
import type { NavType } from '../../model/extract-nav';
import type { FooterType } from '../../types/footer';
import { Footer } from '../components/Footer';
import { Stuck } from '../layouts/lib/stickiness';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { CoreVitals } from './CoreVitals.importable';
import { FocusStyles } from './FocusStyles.importable';
import { Header } from './Header';
import { HeaderAdSlot } from './HeaderAdSlot';
import { Island } from './Island';
import { Nav } from './Nav/Nav';
import { ReaderRevenueDev } from './ReaderRevenueDev.importable';
import { Section } from './Section';
import { SkipTo } from './SkipTo';
import { SubNav } from './SubNav.importable';

type Props = {
	children: ReactNode;
	renderAds?: boolean;
	subscribeLink: string;
	editionId: 'UK' | 'US' | 'INT' | 'AU' | 'EUR';
};

// type NAV = {
// 	otherLinks: MoreType;
// 	brandExtensions: LinkType[];
// 	currentNavLink: string;
// 	subNavSections?: SubNavType;
// 	readerRevenueLinks: ReaderRevenuePositions;
// 	pillars: PillarType[];
// }

const STATIC_FOOTER: FooterType = { footerLinks: [[]] };

const STATIC_NAV: NavType = {
	otherLinks: {
		url: '/uk',
		title: 'nav link',
		longTitle: 'this is a nav link',
		children: [],
		mobileOnly: false,
		more: true,
	},
	brandExtensions: [],
	currentNavLink: '/',
	subNavSections: { links: [] },
	readerRevenueLinks: {
		header: {
			contribute: 'contribute',
			subscribe: 'contribute',
			support: 'contribute',
			supporter: 'contribute',
		},
		footer: {
			contribute: 'contribute',
			subscribe: 'contribute',
			support: 'contribute',
			supporter: 'contribute',
		},
		sideMenu: {
			contribute: 'contribute',
			subscribe: 'contribute',
			support: 'contribute',
			supporter: 'contribute',
		},
		ampHeader: {
			contribute: 'contribute',
			subscribe: 'contribute',
			support: 'contribute',
			supporter: 'contribute',
		},
		ampFooter: {
			contribute: 'contribute',
			subscribe: 'contribute',
			support: 'contribute',
			supporter: 'contribute',
		},
	},
	pillars: [
		{
			url: '/',
			title: 'News',
			longTitle: 'News',
			pillar: ArticlePillar.News,
		},
		{
			url: '/commentisfree',
			title: 'Opinion',
			longTitle: 'Opinion',
			pillar: ArticlePillar.Opinion,
		},
	],
};

/**
 * @description
 * Article is a high level wrapper for stand alone pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * @param {ReactChild} props.children
 * */
export const StandAlonePage = ({
	children,
	renderAds = false,
	subscribeLink = '/',
	editionId = 'UK',
}: Props) => {
	return (
		<StrictMode>
			<Global
				styles={css`
					/* Crude but effective mechanism. Specific components may need to improve on this behaviour. */
					/* The not(.src...) selector is to work with Source's FocusStyleManager. */
					*:focus {
						${focusHalo}
					}
					::selection {
						background: ${brandAlt[400]};
						color: ${neutral[7]};
					}
				`}
			/>
			<SkipTo id="maincontent" label="Skip to main content" />
			<SkipTo id="navigation" label="Skip to navigation" />

			<Island clientOnly={true} deferUntil="idle">
				<AlreadyVisited />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<FocusStyles />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<CoreVitals />
			</Island>

			<Island clientOnly={true} deferUntil="idle">
				<ReaderRevenueDev shouldHideReaderRevenue={true} />
			</Island>

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
								<HeaderAdSlot display={0} />
							</Section>
						</Stuck>
					)}
					<Section
						fullWidth={true}
						showTopBorder={false}
						showSideBorders={false}
						padSides={false}
						backgroundColour={brandBackground.primary}
						element="header"
					>
						<Header
							editionId={editionId}
							supporterCTA={
								STATIC_NAV.readerRevenueLinks.header.supporter
							}
							discussionApiUrl={
								'CAPIArticle.config.discussionApiUrl'
							}
							urls={STATIC_NAV.readerRevenueLinks.header}
							remoteHeader={false}
							contributionsServiceUrl={'contributionsServiceUrl'}
							idApiUrl={'CAPIArticle.config.idApiUrl'}
							isInEuropeTest={false}
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
							nav={STATIC_NAV}
							format={{
								theme: 0,
								design: 0,
								display: 0,
							}}
							subscribeUrl={subscribeLink}
							editionId={editionId}
						/>
					</Section>
					{STATIC_NAV.subNavSections && (
						<>
							<Section
								fullWidth={true}
								backgroundColour={palette.neutral[100]}
								padSides={false}
								element="aside"
							>
								<Island deferUntil="idle">
									<SubNav
										subNavSections={
											STATIC_NAV.subNavSections
										}
										currentNavLink={
											STATIC_NAV.currentNavLink
										}
										format={{
											theme: 0,
											design: 0,
											display: 0,
										}}
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

			{children}

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
					pageFooter={STATIC_FOOTER}
					pillar={0}
					pillars={STATIC_NAV.pillars}
					urls={STATIC_NAV.readerRevenueLinks.header}
					editionId={editionId}
					contributionsServiceUrl={
						'CAPIArticle.contributionsServiceUrl'
					}
				/>
			</Section>
		</StrictMode>
	);
};

import { css, Global } from '@emotion/react';
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
import type { BasePageModel } from 'src/model/pageModel';
import { Footer } from '../components/Footer';
import { Stuck } from '../layouts/lib/stickiness';
import { decideFormat } from '../lib/decideFormat';
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

type Props = BasePageModel & {
	children: ReactNode;
};

/**
 * @description
 * Article is a high level wrapper for stand alone pages on Dotcom. Sets strict mode and some globals
 *
 * */
export const StandAlonePage = ({
	children,
	renderAds,
	subscribeUrl,
	editionId,
	nav,
	footer,
	format,
	contributionsServiceUrl,
}: Props) => {
	const articleFormat: ArticleFormat = decideFormat(format ?? {});

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
								<HeaderAdSlot display={articleFormat.display} />
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
								nav.readerRevenueLinks.header.supporter
							}
							discussionApiUrl={
								'CAPIArticle.config.discussionApiUrl'
							}
							urls={nav.readerRevenueLinks.header}
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
							nav={nav}
							format={articleFormat}
							subscribeUrl={subscribeUrl}
							editionId={editionId}
						/>
					</Section>
					{nav.subNavSections && (
						<>
							<Section
								fullWidth={true}
								backgroundColour={palette.neutral[100]}
								padSides={false}
								element="aside"
							>
								<Island deferUntil="idle">
									<SubNav
										subNavSections={nav.subNavSections}
										currentNavLink={nav.currentNavLink}
										format={articleFormat}
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
					pageFooter={footer}
					pillar={articleFormat.theme}
					pillars={nav.pillars}
					urls={nav.readerRevenueLinks.header}
					editionId={editionId}
					contributionsServiceUrl={contributionsServiceUrl}
				/>
			</Section>
		</StrictMode>
	);
};

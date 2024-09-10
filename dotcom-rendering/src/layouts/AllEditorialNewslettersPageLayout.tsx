import { palette as sourcePalette } from '@guardian/source/foundations';
import { Footer } from '../components/Footer';
import { GroupedNewslettersList } from '../components/GroupedNewsletterList';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { ManyNewsletterSignUp } from '../components/ManyNewsletterSignUp.importable';
import { Masthead } from '../components/Masthead/Masthead';
import { NewslettersPageHeading } from '../components/NewsletterPageHeading';
import { Section } from '../components/Section';
import { getContributionsServiceUrl } from '../lib/contributions';
import type { NavType } from '../model/extract-nav';
import type { DCRNewslettersPageType } from '../types/newslettersPage';
import { Stuck } from './lib/stickiness';

type Props = {
	newslettersPage: DCRNewslettersPageType;
	NAV: NavType;
};

export const AllEditorialNewslettersPageLayout = ({
	newslettersPage,
	NAV,
}: Props) => {
	const { editionId, pageFooter, config, isAdFreeUser } = newslettersPage;

	const renderAds = !isAdFreeUser;

	const contributionsServiceUrl = getContributionsServiceUrl(newslettersPage);

	const displayedNewslettersCount =
		newslettersPage.groupedNewsletters.groups.reduce<number>(
			(count, group) => count + group.newsletters.length,
			0,
		);

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
								<HeaderAdSlot
									isPaidContent={false}
									shouldHideReaderRevenue={false}
								/>
							</Section>
						</Stuck>
					)}

					<Masthead
						nav={NAV}
						editionId={editionId}
						idUrl={newslettersPage.config.idUrl}
						mmaUrl={newslettersPage.config.mmaUrl}
						discussionApiUrl={
							newslettersPage.config.discussionApiUrl
						}
						idApiUrl={config.idApiUrl}
						contributionsServiceUrl={contributionsServiceUrl}
						showSubNav={true}
						showSlimNav={false}
						hasPageSkin={false}
						hasPageSkinContentSelfConstrain={false}
					/>
				</>
			</div>

			<main data-layout="NewsletterPageLayout" id="maincontent">
				<NewslettersPageHeading
					mmaUrl={newslettersPage.config.mmaUrl}
					newsletterCount={displayedNewslettersCount}
				/>
				<GroupedNewslettersList
					groupedNewsletters={newslettersPage.groupedNewsletters}
				/>
				<Island priority="feature" defer={{ until: 'idle' }}>
					<ManyNewsletterSignUp
						useReCaptcha={
							!!newslettersPage.config.switches
								.emailSignupRecaptcha
						}
						captchaSiteKey={
							newslettersPage.config.googleRecaptchaSiteKey
						}
					/>
				</Island>
			</main>

			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				backgroundColour={sourcePalette.brand[400]}
				borderColour={sourcePalette.brand[600]}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={pageFooter}
					pillars={NAV.pillars}
					urls={NAV.readerRevenueLinks.footer}
					editionId={editionId}
				/>
			</Section>
		</>
	);
};

import { palette as sourcePalette } from '@guardian/source/foundations';
import { Footer } from '../components/Footer';
import { GroupedNewslettersList } from '../components/GroupedNewsletterList';
import { Island } from '../components/Island';
import { ManyNewsletterSignUp } from '../components/ManyNewsletterSignUp.importable';
import { Masthead } from '../components/Masthead/Masthead';
import { NewslettersPageHeading } from '../components/NewsletterPageHeading';
import { Section } from '../components/Section';
import { getContributionsServiceUrl } from '../lib/contributions';
import type { NavType } from '../model/extract-nav';
import type { DCRNewslettersPageType } from '../types/newslettersPage';

type Props = {
	newslettersPage: DCRNewslettersPageType;
	NAV: NavType;
};

export const AllEditorialNewslettersPageLayout = ({
	newslettersPage,
	NAV,
}: Props) => {
	const { editionId, pageFooter, config } = newslettersPage;

	const contributionsServiceUrl = getContributionsServiceUrl(newslettersPage);

	const displayedNewslettersCount =
		newslettersPage.groupedNewsletters.groups.reduce<number>(
			(count, group) => count + group.newsletters.length,
			0,
		);

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				<Masthead
					nav={NAV}
					editionId={editionId}
					idUrl={newslettersPage.config.idUrl}
					mmaUrl={newslettersPage.config.mmaUrl}
					discussionApiUrl={newslettersPage.config.discussionApiUrl}
					idApiUrl={config.idApiUrl}
					contributionsServiceUrl={contributionsServiceUrl}
					showSubNav={true}
					showSlimNav={false}
					hasPageSkin={false}
					hasPageSkinContentSelfConstrain={false}
				/>
			</div>

			<main data-layout="NewsletterPageLayout" id="maincontent">
				<NewslettersPageHeading
					mmaUrl={newslettersPage.config.mmaUrl}
					newsletterCount={displayedNewslettersCount}
					editionId={editionId}
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
						visibleRecaptcha={
							!!newslettersPage.config.switches
								.manyNewsletterVisibleRecaptcha
						}
						invisibleCaptchaSiteKey={
							newslettersPage.config.googleRecaptchaSiteKey
						}
						visibleCaptchaSiteKey={
							newslettersPage.config.googleRecaptchaSiteKeyVisible
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

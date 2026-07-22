import { css } from '@emotion/react';
import { headlineBold34, palette, space } from '@guardian/source/foundations';
import { EmailSignup } from '../components/EmailSignup';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { NewsletterPrivacyMessage } from '../components/NewsletterPrivacyMessage';
import { PuzzlesDirectory } from '../components/PuzzlesDirectory.island';
import { Section } from '../components/Section';
import { SecureSignup } from '../components/SecureSignup.island';
import type { NavType } from '../model/extract-nav';
import type { FEPuzzlesPageType } from '../types/puzzlesPage';
import { Stuck } from './lib/stickiness';

type Props = {
	puzzlesPage: FEPuzzlesPageType;
	NAV: NavType;
};

const mainStyles = css`
	padding: ${space[6]}px 0 ${space[12]}px;
`;

const titleStyles = css`
	margin: 0 0 ${space[5]}px;
	${headlineBold34};
`;

const newsletterSignupStyles = css`
	margin-top: ${space[8]}px;
	margin-bottom: ${space[6]}px;
`;

export const PuzzlesLayout = ({ puzzlesPage, NAV }: Props) => {
	const renderAds = !puzzlesPage.isAdFreeUser;

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
							<HeaderAdSlot />
						</Section>
					</Stuck>
				)}

				<Masthead
					nav={NAV}
					editionId={puzzlesPage.editionId}
					idUrl={puzzlesPage.config.idUrl}
					mmaUrl={puzzlesPage.config.mmaUrl}
					discussionApiUrl={puzzlesPage.config.discussionApiUrl}
					idApiUrl={puzzlesPage.config.idApiUrl}
					contributionsServiceUrl={
						puzzlesPage.contributionsServiceUrl
					}
					showSubNav={true}
					showSlimNav={false}
					hasPageSkin={false}
					hasPageSkinContentSelfConstrain={false}
				/>
			</div>

			<main
				css={mainStyles}
				data-layout="PuzzlesPageLayout"
				id="maincontent"
			>
				<Section fullWidth={true} showTopBorder={false}>
					<h1 css={titleStyles}>{puzzlesPage.webTitle}</h1>
				</Section>

				<Island priority="critical">
					<PuzzlesDirectory layout={puzzlesPage.layout} />
				</Island>

				<Section fullWidth={true} showTopBorder={false}>
					<div css={newsletterSignupStyles}>
						<EmailSignup
							name="Puzzles updates"
							description="Get the latest puzzles news, features and updates from the Guardian."
							frequency="Occasional"
							theme="culture"
						>
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<SecureSignup
									newsletterId="crossword-archive"
									successDescription="You're signed up to receive puzzles updates."
								/>
							</Island>
							<NewsletterPrivacyMessage />
						</EmailSignup>
					</div>
				</Section>
			</main>

			<Section
				fullWidth={true}
				padSides={false}
				backgroundColour={palette.brand[400]}
				borderColour={palette.brand[600]}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={puzzlesPage.pageFooter}
					pillars={NAV.pillars}
					urls={NAV.readerRevenueLinks.footer}
					editionId={puzzlesPage.editionId}
				/>
			</Section>
		</>
	);
};

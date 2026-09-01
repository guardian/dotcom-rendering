import { css } from '@emotion/react';
import { headlineBold34, palette, space } from '@guardian/source/foundations';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import type { NavType } from '../model/extract-nav';
import type { FEPuzzlesPageType } from '../types/puzzlesPage';
import { Stuck } from './lib/stickiness';

type Props = {
	puzzlesPage: FEPuzzlesPageType;
	NAV: NavType;
};

const heading = css`
	margin: 0;
	padding: ${space[6]}px 0 ${space[12]}px;
	${headlineBold34};
`;

/**
 * The base puzzles page shell. Blueprint-driven composition is intentionally
 * deferred to the next task.
 */
export const PuzzlesLayout = ({ puzzlesPage, NAV }: Props) => (
	<>
		<div data-print-layout="hide" id="bannerandheader">
			{!puzzlesPage.isAdFreeUser && (
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
				contributionsServiceUrl={puzzlesPage.contributionsServiceUrl}
				showSubNav={true}
				showSlimNav={false}
				hasPageSkin={false}
				hasPageSkinContentSelfConstrain={false}
			/>
		</div>

		<main data-layout="PuzzlesPageLayout" id="maincontent">
			<Section fullWidth={true} showTopBorder={false}>
				<h1 css={heading}>{puzzlesPage.webTitle}</h1>
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

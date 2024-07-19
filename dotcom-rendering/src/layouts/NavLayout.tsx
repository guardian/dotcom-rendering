import { css } from '@emotion/react';
import {
	from,
	headlineMedium20,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { getContributionsServiceUrl } from '../lib/contributions';
import type { NavType } from '../model/extract-nav';
import { palette } from '../palette';
import type { DCRNavPage } from '../types/navPage';

interface Props {
	navPage: DCRNavPage;
	NAV: NavType;
}

/** This page displays the full expanded nav for no JS users */
export const NavLayout = ({ navPage, NAV }: Props) => {
	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				<Masthead
					nav={NAV}
					editionId={navPage.editionId}
					idUrl={navPage.config.idUrl}
					mmaUrl={navPage.config.mmaUrl}
					discussionApiUrl={navPage.config.discussionApiUrl}
					contributionsServiceUrl={getContributionsServiceUrl(
						navPage,
					)}
					showSubNav={false}
					idApiUrl={navPage.config.idApiUrl}
				/>
			</div>
			<main
				data-layout="NavLayout"
				data-link-name="Nav (noJS)"
				id="maincontent"
			>
				{NAV.pillars.map((pillar) => {
					return (
						<Section
							key={pillar.title}
							title={pillar.title}
							showTopBorder={true}
							url={pillar.url}
							containerName={pillar.title}
							description={pillar.longTitle}
						>
							<ul
								css={css`
									display: flex;

									flex-direction: row;
									flex-wrap: wrap;
									justify-content: space-between;
								`}
							>
								{pillar.children?.map((navLink) => {
									return (
										<li
											key={navLink.title}
											css={css`
												display: flex;
												flex-direction: column;
												flex-basis: 50%;
												${from.mobileLandscape} {
													flex-basis: 33.33%;
												}
												${from.desktop} {
													flex-basis: 25%;
												}
												padding: ${space[1]}px 0
													${space[2]}px 0;
												margin-right: ${space[4]}px;

												:before {
													border-top: 1px solid
														${palette(
															'--card-border-top',
														)};
													content: '';
													width: 100%;
													padding-bottom: ${space[2]}px;
													background-color: unset;
												}
											`}
										>
											<a
												css={css`
													flex-grow: 1;
													${headlineMedium20}
													color: ${sourcePalette
														.neutral[7]};
													text-decoration: none;
													:hover {
														text-decoration: underline;
													}
												`}
												href={navLink.url}
											>
												{navLink.title}
											</a>
										</li>
									);
								})}
							</ul>
						</Section>
					);
				})}
			</main>

			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				backgroundColour={sourcePalette.brand[400]}
				borderColour={sourcePalette.brand[600]}
				showSideBorders={false}
				showTopBorder={false}
				element="footer"
			>
				<Footer
					pageFooter={navPage.pageFooter}
					pillars={NAV.pillars}
					urls={navPage.nav.readerRevenueLinks.footer}
					editionId={navPage.editionId}
				/>
			</Section>
		</>
	);
};

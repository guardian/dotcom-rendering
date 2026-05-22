import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold34,
	palette,
	space,
	textSans17,
} from '@guardian/source/foundations';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import type { NavType } from '../model/extract-nav';
import type {
	CrosswordArchiveEntry,
	CrosswordArchiveTab,
	FECrosswordArchivePageType,
} from '../types/crosswordArchivePage';

type Props = {
	archivePage: FECrosswordArchivePageType;
	NAV: NavType;
};

const mainStyles = css`
	padding: ${space[6]}px 0 ${space[12]}px;
`;

const introStyles = css`
	margin: 0 0 ${space[6]}px;
	color: ${palette.neutral[20]};
	${textSans17};
`;

const titleStyles = css`
	display: flex;
	align-items: center;
	gap: ${space[2]}px;
	margin: 0 0 ${space[4]}px;
	${headlineBold34};
`;

const tabsStyles = css`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: ${space[3]}px;
	margin-bottom: ${space[6]}px;

	${from.tablet} {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
`;

const tabStyles = (isSelected: boolean) => css`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 110px;
	padding: ${space[4]}px;
	border: 2px solid ${isSelected ? palette.neutral[46] : palette.neutral[60]};
	border-radius: 22px;
	background: ${isSelected ? palette.neutral[86] : 'white'};
	color: inherit;
	text-align: center;
	text-decoration: none;
	box-sizing: border-box;
	transition:
		border-color 120ms ease,
		transform 120ms ease;
	${headlineBold24};

	:hover {
		border-color: ${palette.brand[500]};
		transform: translateY(-1px);
	}
`;

const resultsStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;
`;

const resultStyles = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${space[3]}px;
	padding: ${space[4]}px ${space[5]}px;
	border: 2px solid ${palette.neutral[60]};
	border-radius: 16px;
	background: white;
	color: inherit;
	text-decoration: none;

	:hover {
		border-color: ${palette.brand[500]};
	}
`;

const resultTitleStyles = css`
	${headlineBold24};
`;

const lockStyles = css`
	flex-shrink: 0;
	font-size: 1.2rem;
	line-height: 1;
`;

const BackLink = () => (
	<a
		css={css`
			display: inline-block;
			margin-bottom: ${space[4]}px;
			color: ${palette.brand[500]};
			text-decoration: none;
			${textSans17};
		`}
		href="/puzzles"
	>
		Back to puzzles
	</a>
);

const ArchiveTab = ({ tab }: { tab: CrosswordArchiveTab }) => (
	<a css={tabStyles(tab.isSelected)} href={tab.url}>
		{tab.label}
	</a>
);

const ArchiveEntry = ({ entry }: { entry: CrosswordArchiveEntry }) => (
	<a css={resultStyles} href={entry.url}>
		<span css={resultTitleStyles}>{entry.title}</span>
		{entry.isLocked && (
			<span aria-hidden={true} css={lockStyles}>
				🔒
			</span>
		)}
	</a>
);

export const CrosswordArchiveLayout = ({ archivePage, NAV }: Props) => (
	<>
		<div data-print-layout="hide" id="bannerandheader">
			<Masthead
				nav={NAV}
				editionId={archivePage.editionId}
				idUrl={archivePage.config.idUrl}
				mmaUrl={archivePage.config.mmaUrl}
				discussionApiUrl={archivePage.config.discussionApiUrl}
				idApiUrl={archivePage.config.idApiUrl}
				contributionsServiceUrl={archivePage.contributionsServiceUrl}
				showSubNav={true}
				showSlimNav={false}
				hasPageSkin={false}
				hasPageSkinContentSelfConstrain={false}
			/>
		</div>

		<main css={mainStyles} id="maincontent">
			<Section title="" fullWidth={true} showTopBorder={false}>
				<BackLink />
				<h1 css={titleStyles}>
					Crossword Archive
					<span aria-hidden={true}>🔒</span>
				</h1>
				{archivePage.description && (
					<p css={introStyles}>{archivePage.description}</p>
				)}
				<div css={tabsStyles}>
					{archivePage.tabs.map((tab) => (
						<ArchiveTab key={tab.crosswordType} tab={tab} />
					))}
				</div>
				<div css={resultsStyles}>
					{archivePage.entries.map((entry) => (
						<ArchiveEntry key={entry.url} entry={entry} />
					))}
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
				pageFooter={archivePage.pageFooter}
				pillars={NAV.pillars}
				urls={NAV.readerRevenueLinks.footer}
				editionId={archivePage.editionId}
			/>
		</Section>
	</>
);

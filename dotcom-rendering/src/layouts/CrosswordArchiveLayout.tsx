import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	headlineBold34,
	palette,
	space,
	textSans12,
	textSans17,
	textSansBold12,
} from '@guardian/source/foundations';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import type { NavType } from '../model/extract-nav';
import type {
	CrosswordArchiveEntry,
	CrosswordArchiveSection,
	FECrosswordArchivePageType,
} from '../types/crosswordArchivePage';

type Props = {
	archivePage: FECrosswordArchivePageType;
	NAV: NavType;
};

const mainStyles = css`
	padding: ${space[6]}px 0 ${space[12]}px;
`;

const headerStyles = css`
	padding-bottom: ${space[8]}px;
`;

const titleStyles = css`
	margin: 0 0 ${space[2]}px;
	${headlineBold34};
`;

const introStyles = css`
	margin: 0;
	color: ${palette.neutral[20]};
	${textSans17};
`;

const directoryStyles = css`
	border-top: 1px solid ${palette.neutral[86]};
`;

const puzzleHubRowStyles = css`
	padding: ${space[3]}px 0 ${space[5]}px;

	${from.desktop} {
		display: grid;
		grid-template-columns: 140px minmax(0, 1fr);
		padding-bottom: ${space[8]}px;
	}
`;

const puzzleHubLinkStyles = css`
	display: inline-flex;
	min-height: 34px;
	align-items: center;
	padding: 0 ${space[3]}px;
	border-radius: 999px;
	background: ${palette.neutral[86]};
	color: ${palette.neutral[0]};
	text-decoration: none;
	${textSansBold12};

	:hover {
		text-decoration: underline;
	}
`;

const seriesStyles = css`
	padding-bottom: ${space[8]}px;

	${from.desktop} {
		display: grid;
		grid-template-columns: 140px minmax(0, 1fr);
		padding-bottom: ${space[10]}px;
	}
`;

const seriesHeadingStyles = css`
	padding-bottom: ${space[3]}px;

	${from.desktop} {
		padding-right: ${space[3]}px;
		border-right: 1px solid ${palette.neutral[86]};
	}
`;

const seriesTitleStyles = css`
	margin: 0;
	${headlineBold17};
`;

const cadenceStyles = css`
	display: block;
	margin-top: ${space[1]}px;
	${textSans12};
`;

const seriesContentStyles = css`
	min-width: 0;

	${from.desktop} {
		padding-left: ${space[3]}px;
	}
`;

const entriesStyles = css`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: ${space[3]}px;

	${from.tablet} {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
`;

const entryStyles = css`
	display: block;
	min-height: 84px;
	padding: ${space[3]}px;
	border-radius: 6px;
	background: ${palette.neutral[97]};
	box-sizing: border-box;
	color: ${palette.neutral[0]};
	text-decoration: none;
	${headlineBold17};

	:hover {
		text-decoration: underline;
	}

	${from.tablet} {
		min-height: 116px;
	}
`;

const moreLinkStyles = css`
	display: flex;
	width: calc((100% - ${space[3]}px) / 2);
	min-height: 30px;
	align-items: center;
	justify-content: space-between;
	margin-top: ${space[3]}px;
	margin-left: auto;
	padding: 0 ${space[2]}px;
	border-radius: 4px;
	background: ${palette.neutral[97]};
	box-sizing: border-box;
	color: ${palette.neutral[0]};
	text-decoration: none;
	${textSansBold12};

	:hover {
		text-decoration: underline;
	}

	${from.tablet} {
		width: calc((100% - ${space[3] * 3}px) / 4);
	}
`;

const archiveIconStyles = css`
	flex: 0 0 auto;
	margin-left: ${space[2]}px;
`;

const ArchiveIcon = () => (
	<svg
		aria-hidden="true"
		css={archiveIconStyles}
		fill="none"
		height="16"
		viewBox="0 0 20 16"
		width="20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			clipRule="evenodd"
			d="M3.31176 0L1.88147 1.47908L2.08305 2.8782H1.4495L0 4.37726L1.96786 14.7308L3.82053 16.01H15.4549L17.3076 14.7308L19.3522 4.37726L17.9027 2.8782H17.2884L17.4708 1.46908L16.0405 0L3.31176 0ZM17.2692 4.4772L17.6819 4.89694L15.9349 13.7514L14.9941 14.401H4.2813L3.35016 13.7614L1.67028 4.90693L2.08305 4.4772H17.2692ZM15.7333 2.8782L15.8389 2.04872L15.4069 1.599H3.94532L3.51335 2.03873L3.62854 2.8782H15.7333ZM5.32762 6.2461L5.6156 7.8451H13.6694L13.9574 6.2461H5.32762ZM6.25876 9.2742L6.54674 10.8732H12.7383L13.0263 9.2742H6.25876Z"
			fill="currentColor"
			fillRule="evenodd"
		/>
	</svg>
);

const ordinal = (day: number): string => {
	if (day > 3 && day < 21) return `${day}th`;
	switch (day % 10) {
		case 1:
			return `${day}st`;
		case 2:
			return `${day}nd`;
		case 3:
			return `${day}rd`;
		default:
			return `${day}th`;
	}
};

export const formatArchiveDate = (
	dateString: string,
	now: Date = new Date(),
): string => {
	const date = new Date(`${dateString}T00:00:00Z`);
	if (Number.isNaN(date.getTime())) return dateString;

	const today = Date.UTC(
		now.getUTCFullYear(),
		now.getUTCMonth(),
		now.getUTCDate(),
	);
	const daysAgo = Math.round((today - date.getTime()) / 86_400_000);
	const dayLabel =
		daysAgo === 0
			? 'Today'
			: daysAgo === 1
				? 'Yesterday'
				: date.toLocaleDateString('en-GB', {
						weekday: 'long',
						timeZone: 'UTC',
					});
	const month = date.toLocaleDateString('en-GB', {
		month: 'long',
		timeZone: 'UTC',
	});

	return `${dayLabel}, ${ordinal(date.getUTCDate())} ${month}`;
};

const ArchiveEntry = ({ entry }: { entry: CrosswordArchiveEntry }) => (
	<a css={entryStyles} href={entry.url}>
		<time dateTime={entry.date}>{formatArchiveDate(entry.date)}</time>
	</a>
);

const ArchiveSeries = ({ section }: { section: CrosswordArchiveSection }) => {
	const headingId = `archive-${section.crosswordType}`;

	return (
		<section aria-labelledby={headingId} css={seriesStyles}>
			<header css={seriesHeadingStyles}>
				<h2 css={seriesTitleStyles} id={headingId}>
					{section.title}
				</h2>
				<span css={cadenceStyles}>{section.cadence}</span>
			</header>
			<div css={seriesContentStyles}>
				<div css={entriesStyles}>
					{section.entries.map((entry) => (
						<ArchiveEntry entry={entry} key={entry.url} />
					))}
				</div>
				<a css={moreLinkStyles} href={section.moreUrl}>
					<span>View more</span>
					<ArchiveIcon />
				</a>
			</div>
		</section>
	);
};

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
			<Section fullWidth={true} showTopBorder={false}>
				<header css={headerStyles}>
					<h1 css={titleStyles}>{archivePage.webTitle}</h1>
					{archivePage.description !== undefined && (
						<p css={introStyles}>{archivePage.description}</p>
					)}
				</header>
				<div css={directoryStyles}>
					<div css={puzzleHubRowStyles}>
						<div>
							<a css={puzzleHubLinkStyles} href="/puzzles">
								Puzzle hub
							</a>
						</div>
					</div>
					{archivePage.sections.map((section) => (
						<ArchiveSeries
							key={section.crosswordType}
							section={section}
						/>
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

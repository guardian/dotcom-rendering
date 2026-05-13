import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	palette,
	space,
	textSans14,
	textSans17,
} from '@guardian/source/foundations';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import type { NavType } from '../model/extract-nav';
import type {
	FEPuzzlesPageType,
	PuzzleContainer,
	PuzzleItem,
} from '../types/puzzlesPage';

type Props = {
	puzzlesPage: FEPuzzlesPageType;
	NAV: NavType;
};

const mainStyles = css`
	padding: ${space[6]}px 0 ${space[12]}px;
`;

const descriptionStyles = css`
	margin: 0 0 ${space[6]}px;
	color: ${palette.neutral[20]};
	${textSans17};
`;

const containerTitleStyles = css`
	margin: 0 0 ${space[3]}px;
	${headlineBold24};
`;

const rowsStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;
`;

const rowStyles = css`
	display: grid;
	gap: ${space[3]}px;

	${from.tablet} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

const cardStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
	padding: ${space[4]}px;
	border: 1px solid ${palette.neutral[86]};
	text-decoration: none;
	background: ${palette.neutral[97]};
	color: inherit;

	:hover {
		border-color: ${palette.brand[500]};
		background: ${palette.neutral[100]};
	}
`;

const cardTitleStyles = css`
	${headlineBold20};
`;

const cardMetaStyles = css`
	color: ${palette.neutral[20]};
	${textSans14};
`;

const nestedStyles = css`
	margin-top: ${space[4]}px;
	padding-left: ${space[4]}px;
	border-left: 2px solid ${palette.neutral[86]};
`;

const crosswordSetToUrl = (set: string): string => {
	switch (set) {
		case 'quick':
			return '/crosswords/series/quick';
		case 'mini':
			return '/crosswords/series/mini-crossword';
		case 'cryptic':
			return '/crosswords/series/cryptic';
		case 'quickcryptic':
			return '/crosswords/series/quick-cryptic';
		case 'weekend':
			return '/crosswords/series/weekend-crossword';
		case 'all':
			return '/crosswords';
		default:
			return '/crosswords';
	}
};

const getItemUrl = (item: PuzzleItem): string => {
	if (item.url) return item.url;
	if (item.type === 'crossword') return crosswordSetToUrl(item.set);
	return '#';
};

const PuzzleCard = ({ item }: { item: PuzzleItem }) => {
	const href = getItemUrl(item);
	const external = /^https?:\/\//.test(href);

	return (
		<a
			css={cardStyles}
			href={href}
			target={external ? '_blank' : undefined}
			rel={external ? 'noreferrer noopener' : undefined}
		>
			<span css={cardTitleStyles}>{item.title}</span>
			<span css={cardMetaStyles}>
				{item.type}
				{item.set ? ` • ${item.set}` : ''}
			</span>
		</a>
	);
};

const PuzzleContainerBlock = ({
	container,
}: {
	container: PuzzleContainer;
}) => (
	<section>
		<h2 css={containerTitleStyles}>{container.title}</h2>
		<div css={rowsStyles}>
			{container.content.items.map((row, index) => (
				<div css={rowStyles} key={`${container.title}-${index}`}>
					{row.map((item) => (
						<PuzzleCard
							item={item}
							key={`${item.type}-${item.set}-${item.title}`}
						/>
					))}
				</div>
			))}
		</div>
		{container.content.nestedContainers.length > 0 && (
			<div css={nestedStyles}>
				{container.content.nestedContainers.map((nested) => (
					<PuzzleContainerBlock
						container={nested}
						key={`${container.title}-${nested.title}`}
					/>
				))}
			</div>
		)}
	</section>
);

export const PuzzlesLayout = ({ puzzlesPage, NAV }: Props) => {
	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
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
				<Section
					title={puzzlesPage.webTitle}
					fullWidth={true}
					showTopBorder={false}
				>
					{puzzlesPage.description && (
						<p css={descriptionStyles}>{puzzlesPage.description}</p>
					)}
					<div css={rowsStyles}>
						{puzzlesPage.layout.containers.map((container) => (
							<PuzzleContainerBlock
								container={container}
								key={container.title}
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
					pageFooter={puzzlesPage.pageFooter}
					pillars={NAV.pillars}
					urls={NAV.readerRevenueLinks.footer}
					editionId={puzzlesPage.editionId}
				/>
			</Section>
		</>
	);
};

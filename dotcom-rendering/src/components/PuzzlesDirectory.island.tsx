import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	space,
	textSans14,
	textSansBold14,
	visuallyHidden,
} from '@guardian/source/foundations';
import { useState } from 'react';
import type {
	PuzzleContainer,
	PuzzleFilter,
	PuzzleItem,
	PuzzlesLayoutType,
} from '../types/puzzlesPage';
import { Section } from './Section';

type Props = {
	layout: PuzzlesLayoutType;
};

const filterListStyles = css`
	display: flex;
	flex-wrap: wrap;
	gap: ${space[2]}px;
	margin: 0;
	padding: 0 0 ${space[5]}px;
	border: 0;
`;

const filterLegendStyles = css`
	${visuallyHidden};
`;

const filterButtonStyles = () => css`
	${textSans14};
	min-height: 32px;
	padding: 0 ${space[3]}px;
	border-radius: 999px;
	color: #121212;
	cursor: pointer;

	:hover {
		border-color: #121212;
	}
`;

const categorySectionsStyles = css`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: ${space[3]}px;
	padding-bottom: ${space[6]}px;

	${from.desktop} {
		grid-template-columns: repeat(12, minmax(0, 1fr));
	}
`;

const getDesktopSectionSpan = (desktopSpan: number) =>
	Math.min(12, Math.max(1, desktopSpan));

const sectionStyles = (desktopSpan: number, hasMultipleCards: boolean) => css`
	display: flex;
	min-width: 0;
	flex-direction: column;
	grid-column: ${hasMultipleCards ? '1 / -1' : 'span 1'};

	${from.desktop} {
		grid-column: span ${getDesktopSectionSpan(desktopSpan)};
	}
`;

const sectionTitleStyles = css`
	margin: 0 0 ${space[2]}px;
	${headlineBold20};
`;

const getDesktopCardColumns = (cardCount: number) =>
	Math.min(4, Math.max(1, cardCount));

const cardsStyles = (cardCount: number) => css`
	display: grid;
	grid-template-columns: ${cardCount > 1
		? 'repeat(2, minmax(0, 1fr))'
		: 'minmax(0, 1fr)'};
	gap: ${space[3]}px;

	${from.desktop} {
		grid-template-columns: repeat(
			${getDesktopCardColumns(cardCount)},
			minmax(0, 1fr)
		);
	}
`;

const cardStyles = css`
	position: relative;
	display: flex;
	min-height: 118px;
	padding: ${space[3]}px;
	border: 0;
	border-radius: 8px;
	box-shadow: none;
	box-sizing: border-box;
	color: #121212;
	text-decoration: none;
	overflow: hidden;

	:focus-visible {
		outline-offset: 2px;
	}

	::before,
	::after {
		position: absolute;
		right: -12%;
		bottom: 30%;
		width: 72%;
		height: 1px;
		background: rgba(18, 18, 18, 0.15);
		content: '';
		transform: rotate(32deg);
	}

	::after {
		transform: rotate(-32deg);
	}

	:hover {
		text-decoration: underline;
	}

	${from.tablet} {
		min-height: 132px;
	}
`;

const cardTextStyles = css`
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-self: flex-start;
`;

const cardTitleStyles = css`
	${headlineBold20};
	line-height: 1;
`;

const cardMetaStyles = css`
	margin-top: ${space[1]}px;
	${textSans14};
`;

const cardImageStyles = css`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 62%;
	height: 70%;
	object-fit: cover;
	opacity: 0.32;
`;

const getDesktopArchiveWidth = (cardCount: number, desktopSpan: number) => {
	const sectionsPerRow = Math.round(12 / getDesktopSectionSpan(desktopSpan));
	const cardsPerRow = Math.max(
		getDesktopCardColumns(cardCount),
		sectionsPerRow,
	);

	if (cardsPerRow === 2) return '50%';
	if (cardsPerRow === 3) return '75%';
	if (cardsPerRow >= 4) {
		const totalGap = 3 * space[3];
		return `calc((100% - ${totalGap}px) / 4)`;
	}
	return '100%';
};

const archiveStyles = (cardCount: number, desktopSpan: number) => {
	return css`
		display: flex;
		width: 100%;
		min-width: 0;
		min-height: 30px;
		align-items: center;
		justify-content: space-between;
		align-self: stretch;
		margin-top: ${space[2]}px;
		padding: 0 ${space[2]}px;
		border-radius: 4px;
		box-sizing: border-box;
		color: #121212;
		text-decoration: none;
		${textSansBold14};

		:hover {
			text-decoration: underline;
		}

		${from.desktop} {
			width: ${getDesktopArchiveWidth(cardCount, desktopSpan)};
			align-self: flex-end;
		}
	`;
};

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
			fill="#121212"
			fillRule="evenodd"
		/>
	</svg>
);

const crosswordSetToUrl = (set: string): string => {
	switch (set) {
		case 'mini':
			return '/crosswords/series/mini-crossword';
		case 'quick':
			return '/crosswords/series/quick';
		case 'cryptic':
			return '/crosswords/series/cryptic';
		case 'quick-cryptic':
			return '/crosswords/series/quick-cryptic';
		case 'weekend':
			return '/crosswords/series/weekend-crossword';
		case 'prize':
			return '/crosswords/series/prize';
		case 'quiptic':
			return '/crosswords/series/quiptic';
		case 'sunday-quick':
			return '/crosswords/series/sunday-quick';
		default:
			return '/crosswords';
	}
};

const getItemUrl = (item: PuzzleItem): string => {
	if (item.variant === 'iframe-page' && item.slug) {
		return `/puzzles/${item.slug}`;
	}
	if (item.url) return item.url;
	if (item.type === 'crossword') return crosswordSetToUrl(item.set);
	return '#';
};

const externalLinkProps = (url: string) =>
	/^https?:\/\//.test(url)
		? { rel: 'noreferrer noopener', target: '_blank' }
		: {};

const getCardMeta = (item: PuzzleItem): string => {
	if (item.type === 'quiz') return 'Latest';
	if (item.type === 'wordiply') return 'Play now';
	return 'Today';
};

const PuzzleCard = ({ item }: { item: PuzzleItem }) => {
	const url = getItemUrl(item);

	return (
		<a
			css={cardStyles}
			href={url}
			style={{ backgroundColor: item.backgroundColour ?? '#F1F1F1' }}
			{...externalLinkProps(url)}
		>
			<div css={cardTextStyles}>
				<span css={cardTitleStyles}>{item.title}</span>
				<span css={cardMetaStyles}>{getCardMeta(item)}</span>
			</div>
			{item.image !== undefined && (
				<img alt="" css={cardImageStyles} src={item.image} />
			)}
		</a>
	);
};

const ArchiveLink = ({
	archive,
	cardCount,
	desktopSpan,
}: {
	archive: PuzzleItem;
	cardCount: number;
	desktopSpan: number;
}) => {
	const url = getItemUrl(archive);

	return (
		<a
			css={archiveStyles(cardCount, desktopSpan)}
			href={url}
			style={{ backgroundColor: archive.backgroundColour ?? '#F1F1F1' }}
			{...externalLinkProps(url)}
		>
			<span>{archive.title}</span>
			<ArchiveIcon />
		</a>
	);
};

const filterContainer = (
	container: PuzzleContainer,
	activeFilter: string | undefined,
	inheritedFilter?: string,
): PuzzleContainer | undefined => {
	const containerFilter = container.filterId ?? inheritedFilter;
	const matches = (item: PuzzleItem) =>
		activeFilter === undefined ||
		(item.filterId ?? containerFilter) === activeFilter;
	const items = container.content.items
		.map((row) => row.filter(matches))
		.filter((row) => row.length > 0);
	const nestedContainers = container.content.nestedContainers
		.map((nested) => filterContainer(nested, activeFilter, containerFilter))
		.filter((nested): nested is PuzzleContainer => nested !== undefined);

	if (items.length === 0 && nestedContainers.length === 0) return undefined;

	return {
		...container,
		content: {
			...container.content,
			items,
			nestedContainers,
			archive:
				container.content.archive &&
				(activeFilter === undefined || containerFilter === activeFilter)
					? container.content.archive
					: undefined,
		},
	};
};

const SectionBlock = ({
	section,
	showTitle,
}: {
	section: PuzzleContainer;
	showTitle: boolean;
}) => {
	const items = section.content.items.flat();
	const hasMultipleCards = items.length > 1;
	const desktopSpan = section.desktopSpan ?? 12;

	return (
		<section css={sectionStyles(desktopSpan, hasMultipleCards)}>
			{showTitle && section.title.length > 0 && (
				<h3 css={sectionTitleStyles}>{section.title}</h3>
			)}
			<div css={cardsStyles(items.length)}>
				{items.map((item) => (
					<PuzzleCard
						item={item}
						key={`${item.type}-${item.set}-${item.title}`}
					/>
				))}
			</div>
			{section.content.archive && (
				<ArchiveLink
					archive={section.content.archive}
					cardCount={items.length}
					desktopSpan={desktopSpan}
				/>
			)}
		</section>
	);
};

const CategoryContent = ({ category }: { category: PuzzleContainer }) => {
	const hasDirectItems = category.content.items.some((row) => row.length > 0);
	const sections = [
		...(hasDirectItems
			? [{ section: { ...category, desktopSpan: 12 }, showTitle: false }]
			: []),
		...category.content.nestedContainers.map((section) => ({
			section,
			showTitle: section.content.items.flat().length > 1,
		})),
	];

	return (
		<div css={categorySectionsStyles}>
			{sections.map(({ section, showTitle }, index) => (
				<SectionBlock
					key={`${category.title}-${section.title}-${index}`}
					section={section}
					showTitle={showTitle}
				/>
			))}
		</div>
	);
};

const FilterButtons = ({
	filters,
	activeFilter,
	onChange,
}: {
	filters: PuzzleFilter[];
	activeFilter?: string;
	onChange: (filterId: string | undefined) => void;
}) => (
	<Section
		centralBorder="full"
		showTopBorder={false}
		title=""
		verticalMargins={false}
	>
		<fieldset css={filterListStyles}>
			<legend css={filterLegendStyles}>Filter puzzles by type</legend>
			{filters.map((filter) => {
				const isActive = activeFilter === filter.id;
				return (
					<button
						aria-pressed={isActive}
						css={filterButtonStyles()}
						key={filter.id}
						onClick={() =>
							onChange(isActive ? undefined : filter.id)
						}
						style={{
							backgroundColor:
								filter.backgroundColour ?? '#F1F1F1',
						}}
						type="button"
					>
						{filter.title}
					</button>
				);
			})}
		</fieldset>
	</Section>
);

export const PuzzlesDirectory = ({ layout }: Props) => {
	const [activeFilter, setActiveFilter] = useState<string>();
	const categories = layout.containers
		.map((container) => filterContainer(container, activeFilter))
		.filter(
			(container): container is PuzzleContainer =>
				container !== undefined,
		);

	return (
		<>
			{layout.filters && layout.filters.length > 0 && (
				<FilterButtons
					activeFilter={activeFilter}
					filters={layout.filters}
					onChange={setActiveFilter}
				/>
			)}
			{categories.map((category) => (
				<Section
					centralBorder="full"
					key={category.title}
					showTopBorder={false}
					title={category.title}
					verticalMargins={false}
				>
					<CategoryContent category={category} />
				</Section>
			))}
		</>
	);
};

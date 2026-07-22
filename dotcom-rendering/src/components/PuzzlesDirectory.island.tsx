import { css } from '@emotion/react';
import {
	focusHalo,
	from,
	headlineBold20,
	space,
	textSans14,
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

const filterButtonStyles = (isActive: boolean) => css`
	${textSans14};
	${focusHalo};
	min-height: 32px;
	padding: 0 ${space[3]}px;
	border: 1px solid ${isActive ? '#121212' : 'transparent'};
	border-radius: 999px;
	box-shadow: ${isActive ? 'inset 0 0 0 1px #121212' : 'none'};
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

const sectionStyles = (desktopSpan: number, hasMultipleCards: boolean) => css`
	display: flex;
	min-width: 0;
	flex-direction: column;
	grid-column: ${hasMultipleCards ? '1 / -1' : 'span 1'};

	${from.desktop} {
		grid-column: span ${Math.min(12, Math.max(1, desktopSpan))};
	}
`;

const sectionTitleStyles = css`
	margin: 0 0 ${space[2]}px;
	${headlineBold20};
`;

const cardsStyles = (cardCount: number) => css`
	display: grid;
	grid-template-columns: ${cardCount > 1
		? 'repeat(2, minmax(0, 1fr))'
		: 'minmax(0, 1fr)'};
	gap: ${space[3]}px;

	${from.desktop} {
		grid-template-columns: repeat(
			${Math.min(4, Math.max(1, cardCount))},
			minmax(0, 1fr)
		);
	}
`;

const cardStyles = css`
	${focusHalo};
	position: relative;
	display: flex;
	min-height: 118px;
	padding: ${space[3]}px;
	border-radius: 8px;
	box-sizing: border-box;
	color: #121212;
	text-decoration: none;
	overflow: hidden;

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

const archiveStyles = (isCompact: boolean) => css`
	${focusHalo};
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
	${textSans14};

	:hover {
		text-decoration: underline;
	}

	${from.desktop} {
		width: ${isCompact ? 'fit-content' : '100%'};
		min-width: ${isCompact ? '132px' : 0};
		align-self: ${isCompact ? 'flex-end' : 'stretch'};
	}
`;

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
	isCompact,
}: {
	archive: PuzzleItem;
	isCompact: boolean;
}) => {
	const url = getItemUrl(archive);

	return (
		<a
			css={archiveStyles(isCompact)}
			href={url}
			style={{ backgroundColor: archive.backgroundColour ?? '#F1F1F1' }}
			{...externalLinkProps(url)}
		>
			<span>{archive.title}</span>
			<span aria-hidden="true">↗</span>
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
					isCompact={hasMultipleCards}
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
						css={filterButtonStyles(isActive)}
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

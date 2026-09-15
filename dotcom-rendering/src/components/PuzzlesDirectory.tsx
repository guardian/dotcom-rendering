import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	headlineBold28,
	palette,
	space,
	textSans14,
} from '@guardian/source/foundations';
import { ArticleDisplay } from '../lib/articleFormat';
import { puzzlesContainerStyles } from '../lib/puzzlesContainerStyles';
import type {
	PuzzleContainer,
	PuzzleItem,
	PuzzlesLayoutType,
} from '../types/puzzlesPage';
import { AdSlot } from './AdSlot.web';
import { Island } from './Island';
import { PuzzlesArchiveMenu } from './PuzzlesArchiveMenu.island';
import { PuzzlesSupporting } from './PuzzlesSupporting';

type Props = {
	layout: PuzzlesLayoutType;
	renderAds: boolean;
};

const sectionStyles = css`
	position: relative;
	display: grid;
	${puzzlesContainerStyles};
	background: ${palette.neutral[100]};
	::before {
		position: absolute;
		top: 0;
		left: 50%;
		width: 100vw;
		border-top: 2px solid ${palette.neutral[7]};
		content: '';
		transform: translateX(-50%);
	}

	${from.leftCol} {
		grid-template-columns: 160px minmax(0, 1fr);
	}

	${from.wide} {
		grid-template-columns: 240px minmax(0, 1fr);
	}
`;

const titleStyles = css`
	margin: 0;
	padding: ${space[1]}px ${space[1]}px ${space[2]}px;
	${headlineBold20};
	line-height: 1;

	${from.tablet} {
		padding: ${space[2]}px 20px ${space[3]}px;
		${headlineBold24};
	}
`;

const headingColumnStyles = css`
	${from.leftCol} {
		display: flex;
		flex-direction: column;
		border-right: 1px solid ${palette.neutral[86]};
	}
`;

const crosswordLinksStyles = css`
	display: none;
	${from.leftCol} {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: auto;
		padding: 0 20px 24px;
	}
	a {
		min-height: 24px;
		padding: 4px 8px;
		border-top: 1px solid ${palette.neutral[86]};
		border-left: 1px solid ${palette.neutral[86]};
		color: ${palette.neutral[7]};
		text-decoration: none;
		${textSans14};
	}
	a:hover {
		text-decoration: underline;
	}
	a:focus-visible {
		outline: 3px solid ${palette.brand[500]};
	}
`;

const contentStyles = css`
	min-width: 0;
	padding: 8px 10px 32px;
	${from.mobileMedium} {
		padding-right: 20px;
		padding-left: 20px;
	}

	${from.tablet} {
		padding-top: 8px;
	}
	${from.desktop} {
		/* Include the 1px side borders in the 20px content inset. */
		padding-right: 19px;
		padding-left: 19px;
		padding-bottom: 40px;
	}
	&:has(details) {
		padding-bottom: 24px;
	}
	@media (max-width: 739px) {
		position: relative;
		::before {
			position: absolute;
			top: 0;
			right: 10px;
			left: 10px;
			border-top: 1px solid #d9d9d9;
			content: '';
			pointer-events: none;
		}
		${from.mobileMedium} {
			::before {
				right: 20px;
				left: 20px;
			}
		}
	}
`;

const rowsStyles = css`
	--puzzles-gap: 16px;
	display: flex;
	min-width: 0;
	flex-direction: column;
	gap: 16px;
	${from.phablet} {
		--puzzles-gap: 24px;
		gap: 24px;
	}

	${from.tablet} {
		--puzzles-gap: 20px;
		gap: 20px;
	}
	> ul ~ ul::before {
		position: absolute;
		top: calc(var(--puzzles-gap) / -2);
		right: 0;
		left: 0;
		border-top: 1px solid #d9d9d9;
		content: '';
		pointer-events: none;
	}
`;

const rowStyles = (variant: PuzzleItem['cardVariant'], count: number) => css`
	position: relative;
	display: grid;
	grid-template-columns: ${variant === 'compact'
		? 'repeat(2, minmax(0, 1fr))'
		: '1fr'};
	gap: 16px;
	${from.phablet} {
		gap: 24px;
	}
	margin: 0;
	padding: 0;
	list-style: none;
	> li {
		position: relative;
	}
	> li:nth-child(n + ${variant === 'compact' ? 3 : 2})::before {
		position: absolute;
		top: calc(var(--puzzles-gap) / -2);
		right: 0;
		left: 0;
		border-top: 1px solid #d9d9d9;
		content: '';
		pointer-events: none;
	}
	${variant === 'compact' &&
	css`
		> li:nth-child(2n)::after {
			position: absolute;
			top: 0;
			bottom: 0;
			left: calc(var(--puzzles-gap) / -2);
			border-left: 1px solid #d9d9d9;
			content: '';
			pointer-events: none;
		}
	`}

	${from.tablet} {
		grid-template-columns: ${variant === 'compact'
			? `repeat(${Math.min(count, 4)}, minmax(0, 1fr))`
			: `repeat(${Math.min(count, 2)}, minmax(0, 1fr))`};
		gap: 20px;
		max-width: 700px;
		> li:nth-child(n + ${variant === 'compact' ? 3 : 2})::before,
		> li:nth-child(2n)::after {
			content: none;
		}
		> li:nth-child(
				n + ${Math.min(count, variant === 'compact' ? 4 : 2) + 1}
			)::before {
			content: '';
		}
		> li:not(
				:nth-child(
					${Math.min(count, variant === 'compact' ? 4 : 2)}n + 1
				)
			)::after {
			position: absolute;
			top: 0;
			bottom: 0;
			left: calc(var(--puzzles-gap) / -2);
			border-left: 1px solid #d9d9d9;
			content: '';
			pointer-events: none;
		}
	}
	${from.desktop} {
		max-width: 940px;
	}
`;

const cardStyles = (
	variant: PuzzleItem['cardVariant'],
	hasImage: boolean,
	isFeatured: boolean,
) => css`
	position: relative;
	display: block;
	width: 100%;
	min-width: 0;
	min-height: ${variant === 'compact' ? 104 : 145}px;
	height: ${variant === 'compact' ? 'auto' : '145px'};
	${hasImage &&
	css`
		padding-right: 181px;
	`}
	box-sizing: border-box;
	color: ${palette.neutral[7]};
	text-decoration: none;

	${from.tablet} {
		max-width: ${variant === 'compact' ? 'none' : '340px'};
	}

	${from.desktop} {
		max-width: ${variant === 'compact' ? 'none' : '460px'};
		min-height: ${variant === 'compact' ? 104 : 176}px;
		height: ${variant === 'compact' ? 'auto' : '176px'};
		${hasImage &&
		css`
			padding-right: 220px;
		`}
	}

	${isFeatured &&
	css`
		${from.leftCol} {
			min-height: 368px;
			height: 368px;
			padding-right: 0;
		}
	`}

	:hover .puzzle-card-title {
		text-decoration: underline;
	}

	:focus-visible {
		outline: 3px solid ${palette.brand[500]};
		outline-offset: 2px;
	}
`;

const cardTextStyles = (isFeatured: boolean) => css`
	position: relative;
	z-index: ${isFeatured ? 1 : 'auto'};
	display: flex;
	min-width: 0;
	flex-direction: column;
	padding: ${space[2]}px;
`;

const cardTitleStyles = css`
	${headlineBold24};
	line-height: 1.15;
	${from.leftCol} {
		${headlineBold28};
		line-height: 1.15;
	}
`;

const cadenceStyles = css`
	margin-top: ${space[1]}px;
	${textSans14};
	line-height: 1.3;
`;

const setterStyles = css`
	margin-top: ${space[1]}px;
	color: #ab0613;
	${textSans14};
	line-height: 1.3;
`;

const cardImageStyles = (isFeatured: boolean) => css`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 181px;
	height: 145px;
	min-height: 0;
	object-fit: contain;
	${from.desktop} {
		width: 220px;
		height: 176px;
	}

	${isFeatured &&
	css`
		${from.leftCol} {
			position: absolute;
			right: 0;
			bottom: 0;
			width: 345px;
			max-width: 75%;
			height: 276px;
		}
	`}
`;

const nestedGridStyles = css`
	--puzzles-gap: 16px;
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;
	${from.phablet} {
		--puzzles-gap: 24px;
		gap: 24px;
	}

	${from.tablet} {
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: 20px;
		--puzzles-gap: 20px;
		max-width: 700px;
	}
	${from.desktop} {
		max-width: 940px;
	}
`;

const nestedStyles = (span: number) => css`
	position: relative;
	min-width: 0;
	& ~ &::before {
		position: absolute;
		top: calc(var(--puzzles-gap) / -2);
		right: 0;
		left: 0;
		border-top: 1px solid #d9d9d9;
		content: '';
		pointer-events: none;
	}
	${from.tablet} {
		grid-column: span ${Math.max(1, Math.min(12, span))};
		& ~ &::before {
			${span < 12
				? css`
						top: 0;
						bottom: 0;
						right: auto;
						left: calc(var(--puzzles-gap) / -2);
						border-top: 0;
						border-left: 1px solid #d9d9d9;
					`
				: css`
						border-top: 1px solid #d9d9d9;
					`}
		}
	}
`;

const adStyles = css`
	max-width: 1300px;
	margin: 0 auto;
	overflow: hidden;
	background: ${palette.neutral[97]};
`;

export const getPuzzleUrl = (item: PuzzleItem): string | undefined => {
	const slug = item.slug;
	if (
		item.variant === 'archive-page' &&
		slug !== undefined &&
		slug.length > 0
	) {
		return `/puzzles-and-games/${slug}/archive`;
	}
	if (
		item.variant === 'iframe-page' &&
		slug !== undefined &&
		slug.length > 0
	) {
		return `/puzzles-and-games/${slug}`;
	}
	const url = item.url;
	if (
		url !== undefined &&
		(url.startsWith('/puzzles-and-games') ||
			url.startsWith('/crosswords/series/') ||
			/^https?:\/\//.test(url))
	) {
		return url;
	}
	return undefined;
};

const externalProps = (url: string) =>
	/^https?:\/\//.test(url)
		? { rel: 'noopener noreferrer', target: '_blank' as const }
		: {};

const puzzleColours = (item: PuzzleItem) => {
	switch (item.type) {
		case 'crossword':
			return { background: '#fff4f2', title: '#ab0613' };
		case 'sudoku':
			return { background: '#f1f8fc', title: '#0077b6' };
		case 'wordiply':
		case 'word-wheel':
			return { background: palette.opinion[800], title: '#c74600' };
		default:
			return {
				background: item.backgroundColour,
				title: palette.neutral[7],
			};
	}
};

const PuzzleCard = ({
	isFeatured,
	item,
}: {
	isFeatured: boolean;
	item: PuzzleItem;
}) => {
	const url = getPuzzleUrl(item);
	const colours = puzzleColours(item);
	const setter = item.type === 'crossword' ? item.setter?.trim() : undefined;
	const hasImage =
		item.image !== undefined &&
		item.image.length > 0 &&
		item.cardVariant !== 'compact';
	const contents = (
		<>
			<div css={cardTextStyles(isFeatured)}>
				<span
					className="puzzle-card-title"
					css={cardTitleStyles}
					style={{ color: colours.title }}
				>
					{item.title}
				</span>
				{item.cadence !== undefined && item.cadence.length > 0 && (
					<span css={cadenceStyles}>{item.cadence}</span>
				)}
				{setter && <span css={setterStyles}>By: {setter}</span>}
			</div>
			{hasImage && (
				<img
					alt={item.imageAlt?.trim() || `${item.title} illustration`}
					aria-hidden="true"
					css={cardImageStyles(isFeatured)}
					src={item.image}
				/>
			)}
		</>
	);
	const style = { backgroundColor: colours.background };
	return url !== undefined ? (
		<a
			css={cardStyles(item.cardVariant, hasImage, isFeatured)}
			href={url}
			style={style}
			{...externalProps(url)}
		>
			{contents}
		</a>
	) : (
		<article
			css={cardStyles(item.cardVariant, hasImage, isFeatured)}
			style={style}
		>
			{contents}
		</article>
	);
};

const Archive = ({ container }: { container: PuzzleContainer }) => {
	if (container.content.archiveChoices !== undefined) {
		return (
			<Island priority="critical">
				<PuzzlesArchiveMenu
					archives={container.content.archiveChoices}
					label={`${container.title} archive`}
				/>
			</Island>
		);
	}
	return null;
};

const Rows = ({
	isFeatured = false,
	rows,
}: {
	isFeatured?: boolean;
	rows: PuzzleItem[][];
}) => (
	<div css={rowsStyles}>
		{rows
			.filter((row) => row.length > 0)
			.map((row) => (
				<ul
					css={rowStyles(
						row[0]?.cardVariant ?? 'primary',
						row.length,
					)}
					key={row.map(({ id }) => id).join('-')}
				>
					{row.map((item) => (
						<li key={item.id}>
							<PuzzleCard isFeatured={isFeatured} item={item} />
						</li>
					))}
				</ul>
			))}
	</div>
);

const hasContent = (container: PuzzleContainer): boolean =>
	container.content.items.some((row) => row.length > 0) ||
	container.content.nestedContainers.some(hasContent);

const DirectorySection = ({ container }: { container: PuzzleContainer }) => {
	if (!hasContent(container)) {
		return null;
	}
	return (
		<section
			aria-labelledby={`${container.id}-title`}
			css={sectionStyles}
			id={container.id}
		>
			<div css={headingColumnStyles}>
				<h2 css={titleStyles} id={`${container.id}-title`}>
					{container.title}
				</h2>
				{container.id === 'crosswords' && (
					<nav
						css={crosswordLinksStyles}
						aria-label="Crossword links"
					>
						<a
							href="https://support.theguardian.com"
							{...externalProps(
								'https://support.theguardian.com',
							)}
						>
							Support the Guardian
						</a>
						<a
							href="https://www.theguardian.com/crosswords/crossword-blog"
							{...externalProps(
								'https://www.theguardian.com/crosswords/crossword-blog',
							)}
						>
							Blog
						</a>
					</nav>
				)}
			</div>
			<div css={contentStyles}>
				<Rows
					isFeatured={container.variant === 'featured'}
					rows={container.content.items}
				/>
				{container.content.nestedContainers.length > 0 && (
					<div css={nestedGridStyles}>
						{container.content.nestedContainers
							.filter(hasContent)
							.map((nested) => (
								<div
									css={nestedStyles(nested.desktopSpan ?? 12)}
									key={nested.id}
								>
									<Rows rows={nested.content.items} />
									<Archive container={nested} />
								</div>
							))}
					</div>
				)}
				<Archive container={container} />
			</div>
		</section>
	);
};

export const PuzzlesDirectory = ({ layout, renderAds }: Props) => (
	<>
		{layout.containers.map((container) => {
			if (
				container.variant === 'featured' &&
				container.enabled === false
			) {
				return null;
			}
			if (container.variant === 'supporting') {
				if (container.supporting === undefined) {
					return null;
				}
				return (
					<PuzzlesSupporting
						adSlot={container.adSlot}
						id={container.id}
						key={container.id}
						layout={layout}
						renderAds={renderAds}
						supporting={container.supporting}
					/>
				);
			}
			if (container.variant === 'ad') {
				if (!renderAds || container.adSlot === undefined) {
					return null;
				}
				const index = Number(container.adSlot.replace('inline', ''));
				return (
					<div
						css={adStyles}
						data-puzzles-ad={container.adSlot}
						key={container.id}
					>
						<AdSlot
							display={ArticleDisplay.Standard}
							index={index}
							position="fronts-banner"
						/>
						<AdSlot position="mobile-front" index={index} />
					</div>
				);
			}
			return (
				<DirectorySection container={container} key={container.id} />
			);
		})}
	</>
);

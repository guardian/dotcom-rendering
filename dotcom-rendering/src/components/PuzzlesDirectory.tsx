import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	palette,
	space,
	textSans12,
} from '@guardian/source/foundations';
import { ArticleDisplay } from '../lib/articleFormat';
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
	display: grid;
	max-width: 1300px;
	margin: 0 auto;
	border-top: 1px solid ${palette.neutral[46]};
	border-right: 1px solid ${palette.neutral[86]};
	border-left: 1px solid ${palette.neutral[86]};
	background: ${palette.neutral[100]};

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
		padding: ${space[2]}px ${space[3]}px ${space[3]}px;
		${headlineBold24};
	}

	${from.leftCol} {
		border-right: 1px solid ${palette.neutral[86]};
	}
`;

const contentStyles = css`
	min-width: 0;
	padding: ${space[1]}px ${space[1]}px ${space[3]}px;

	${from.tablet} {
		padding: ${space[2]}px ${space[3]}px ${space[5]}px;
	}
`;

const rowsStyles = css`
	display: flex;
	min-width: 0;
	flex-direction: column;
	gap: ${space[1]}px;

	${from.tablet} {
		gap: ${space[3]}px;
	}
`;

const rowStyles = (variant: PuzzleItem['cardVariant'], count: number) => css`
	display: grid;
	grid-template-columns: ${variant === 'compact'
		? 'repeat(2, minmax(0, 1fr))'
		: '1fr'};
	gap: ${space[1]}px;
	margin: 0;
	padding: 0;
	list-style: none;

	${from.tablet} {
		grid-template-columns: ${variant === 'compact'
			? `repeat(${Math.min(count, 4)}, minmax(0, 1fr))`
			: `repeat(${Math.min(count, 2)}, minmax(0, 1fr))`};
		gap: ${space[3]}px;
	}
`;

const cardStyles = (
	variant: PuzzleItem['cardVariant'],
	hasImage: boolean,
) => css`
	position: relative;
	display: grid;
	min-width: 0;
	min-height: ${variant === 'compact' ? 104 : 144}px;
	grid-template-columns: ${hasImage
		? 'minmax(0, 1fr) minmax(0, 1fr)'
		: '1fr'};
	color: ${palette.neutral[7]};
	text-decoration: none;

	${from.tablet} {
		min-height: ${variant === 'large'
			? 190
			: variant === 'compact'
				? 104
				: 170}px;
	}

	${from.wide} {
		min-height: ${variant === 'large'
			? 270
			: variant === 'compact'
				? 104
				: 190}px;
	}

	:hover .puzzle-card-title {
		text-decoration: underline;
	}

	:focus-visible {
		outline: 3px solid ${palette.brand[500]};
		outline-offset: 2px;
	}
`;

const cardTextStyles = css`
	display: flex;
	min-width: 0;
	flex-direction: column;
	padding: ${space[2]}px;
`;

const cardTitleStyles = css`
	${headlineBold20};
	line-height: 1.05;
`;

const cadenceStyles = css`
	margin-top: ${space[1]}px;
	${textSans12};
`;

const cardImageStyles = css`
	width: 100%;
	height: 100%;
	min-height: 0;
	object-fit: cover;
`;

const nestedGridStyles = css`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${space[3]}px;

	${from.tablet} {
		grid-template-columns: repeat(12, minmax(0, 1fr));
	}
`;

const nestedStyles = (span: number) => css`
	min-width: 0;
	${from.tablet} {
		grid-column: span ${Math.max(1, Math.min(12, span))};
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
		return `/puzzles/${slug}/archive`;
	}
	if (
		item.variant === 'iframe-page' &&
		slug !== undefined &&
		slug.length > 0
	) {
		return `/puzzles/${slug}`;
	}
	const url = item.url;
	if (
		url !== undefined &&
		(url.startsWith('/puzzles') || /^https?:\/\//.test(url))
	) {
		return url;
	}
	return undefined;
};

const externalProps = (url: string) =>
	/^https?:\/\//.test(url)
		? { rel: 'noopener noreferrer', target: '_blank' as const }
		: {};

const PuzzleCard = ({ item }: { item: PuzzleItem }) => {
	const url = getPuzzleUrl(item);
	const hasImage =
		item.image !== undefined &&
		item.image.length > 0 &&
		item.cardVariant !== 'compact';
	const contents = (
		<>
			<div css={cardTextStyles}>
				<span className="puzzle-card-title" css={cardTitleStyles}>
					{item.title}
				</span>
				{item.cadence !== undefined && item.cadence.length > 0 && (
					<span css={cadenceStyles}>{item.cadence}</span>
				)}
			</div>
			{hasImage && <img alt="" css={cardImageStyles} src={item.image} />}
		</>
	);
	const style =
		item.backgroundColour !== undefined
			? { backgroundColor: item.backgroundColour }
			: undefined;
	return url !== undefined ? (
		<a
			css={cardStyles(item.cardVariant, hasImage)}
			href={url}
			style={style}
			{...externalProps(url)}
		>
			{contents}
		</a>
	) : (
		<article css={cardStyles(item.cardVariant, hasImage)} style={style}>
			{contents}
		</article>
	);
};

const Archive = ({ container }: { container: PuzzleContainer }) => {
	if (container.content.archiveChoices !== undefined) {
		return (
			<Island priority="feature" defer={{ until: 'interaction' }}>
				<PuzzlesArchiveMenu
					archives={container.content.archiveChoices}
					label={`${container.title} archive`}
				/>
			</Island>
		);
	}
	return null;
};

const Rows = ({ rows }: { rows: PuzzleItem[][] }) => (
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
							<PuzzleCard item={item} />
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
			<h2 css={titleStyles} id={`${container.id}-title`}>
				{container.title}
			</h2>
			<div css={contentStyles}>
				<Rows rows={container.content.items} />
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
					</div>
				);
			}
			return (
				<DirectorySection container={container} key={container.id} />
			);
		})}
	</>
);

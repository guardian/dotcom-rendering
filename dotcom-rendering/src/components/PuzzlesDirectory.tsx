import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	space,
	textSans12,
	textSansBold14,
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

type Props = {
	layout: PuzzlesLayoutType;
	renderAds: boolean;
};

const sectionStyles = css`
	display: grid;
	max-width: 1300px;
	margin: 0 auto;
	border-top: 1px solid #707070;
	border-right: 1px solid #dcdcdc;
	border-left: 1px solid #dcdcdc;
	background: #ffffff;

	${from.leftCol} {
		grid-template-columns: 240px minmax(0, 1fr);
	}
`;

const titleStyles = css`
	margin: 0;
	padding: ${space[2]}px ${space[3]}px ${space[4]}px;
	${headlineBold24};
	line-height: 1;

	${from.leftCol} {
		border-right: 1px solid #dcdcdc;
	}
`;

const contentStyles = css`
	min-width: 0;
	padding: ${space[2]}px ${space[3]}px ${space[6]}px;
`;

const rowsStyles = css`
	display: flex;
	min-width: 0;
	flex-direction: column;
	gap: ${space[3]}px;
`;

const rowStyles = (variant: PuzzleItem['cardVariant'], count: number) => css`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${space[3]}px;
	margin: 0;
	padding: 0;
	list-style: none;

	${from.tablet} {
		grid-template-columns: ${variant === 'compact'
			? `repeat(${Math.min(count, 3)}, minmax(0, 1fr))`
			: 'repeat(2, minmax(0, 1fr))'};
	}

	${from.desktop} {
		grid-template-columns: ${variant === 'compact'
			? `repeat(${Math.min(count, 5)}, minmax(0, 1fr))`
			: 'repeat(2, minmax(0, 1fr))'};
	}
`;

const cardStyles = (variant: PuzzleItem['cardVariant']) => css`
	position: relative;
	display: grid;
	min-width: 0;
	min-height: ${variant === 'large'
		? 270
		: variant === 'compact'
			? 104
			: 170}px;
	grid-template-columns: ${variant === 'compact'
		? '1fr'
		: 'minmax(0, 1fr) minmax(0, 1fr)'};
	color: #121212;
	text-decoration: none;

	:hover .puzzle-card-title {
		text-decoration: underline;
	}

	:focus-visible {
		outline: 3px solid #0077b6;
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

	${from.desktop} {
		grid-template-columns: repeat(12, minmax(0, 1fr));
	}
`;

const nestedStyles = (span: number) => css`
	min-width: 0;
	${from.desktop} {
		grid-column: span ${Math.max(1, Math.min(12, span))};
	}
`;

const nestedTitleStyles = css`
	margin: 0 0 ${space[2]}px;
	${headlineBold20};
`;

const archiveStyles = css`
	display: inline-flex;
	min-height: 32px;
	align-items: center;
	gap: ${space[2]}px;
	margin-top: ${space[3]}px;
	padding: 0 ${space[2]}px;
	border: 1px solid #121212;
	border-radius: 18px;
	color: #121212;
	text-decoration: none;
	${textSansBold14};

	:hover {
		text-decoration: underline;
	}

	:focus-visible {
		outline: 3px solid #0077b6;
		outline-offset: 2px;
	}
`;

const adStyles = css`
	max-width: 1300px;
	margin: 0 auto;
	overflow: hidden;
	background: #f6f6f6;
`;

export const getPuzzleUrl = (item: PuzzleItem): string | undefined => {
	if (item.variant === 'archive-page' && item.slug) {
		return `/puzzles/${item.slug}/archive`;
	}
	if (item.variant === 'iframe-page' && item.slug) {
		return `/puzzles/${item.slug}`;
	}
	if (
		item.url?.startsWith('/puzzles') ||
		/^https?:\/\//.test(item.url ?? '')
	) {
		return item.url;
	}
	return undefined;
};

const externalProps = (url: string) =>
	/^https?:\/\//.test(url)
		? { rel: 'noopener noreferrer', target: '_blank' as const }
		: {};

const PuzzleCard = ({ item }: { item: PuzzleItem }) => {
	const url = getPuzzleUrl(item);
	const contents = (
		<>
			<div css={cardTextStyles}>
				<span className="puzzle-card-title" css={cardTitleStyles}>
					{item.title}
				</span>
				{item.cadence && (
					<span css={cadenceStyles}>{item.cadence}</span>
				)}
			</div>
			{item.image && item.cardVariant !== 'compact' && (
				<img alt="" css={cardImageStyles} src={item.image} />
			)}
		</>
	);
	const style = item.backgroundColour
		? { backgroundColor: item.backgroundColour }
		: undefined;
	return url ? (
		<a
			css={cardStyles(item.cardVariant)}
			href={url}
			style={style}
			{...externalProps(url)}
		>
			{contents}
		</a>
	) : (
		<article css={cardStyles(item.cardVariant)} style={style}>
			{contents}
		</article>
	);
};

const Archive = ({ container }: { container: PuzzleContainer }) => {
	if (container.content.archive) {
		const url = getPuzzleUrl(container.content.archive);
		return url ? (
			<a css={archiveStyles} href={url} {...externalProps(url)}>
				{container.content.archive.title}{' '}
				<span aria-hidden="true">→</span>
			</a>
		) : null;
	}
	if (container.content.archiveChoices) {
		return (
			<Island priority="feature" defer={{ until: 'interaction' }}>
				<PuzzlesArchiveMenu
					archives={container.content.archiveChoices}
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
			.map((row, index) => (
				<ul
					css={rowStyles(
						row[0]?.cardVariant ?? 'primary',
						row.length,
					)}
					key={index}
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
	if (!hasContent(container)) return null;
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
							.map((nested) => {
								const single =
									nested.content.items.flat().length === 1;
								return (
									<section
										css={nestedStyles(
											nested.desktopSpan ?? 12,
										)}
										key={nested.id}
									>
										{!single && (
											<h3 css={nestedTitleStyles}>
												{nested.title}
											</h3>
										)}
										<Rows rows={nested.content.items} />
										<Archive container={nested} />
									</section>
								);
							})}
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
			if (container.variant === 'ad') {
				if (!renderAds || !container.adSlot) return null;
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

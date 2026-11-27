import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	space,
	until,
} from '@guardian/source/foundations';
import { ArticleDisplay } from '../lib/articleFormat';
import { puzzlesContainerStyles } from '../lib/puzzlesContainerStyles';
import {
	PUZZLES_BORDERED_INSET,
	PUZZLES_COLUMN_INSET,
	PUZZLES_CONTENT_MAX_WIDTH,
	PUZZLES_EDGE_INSET,
	PUZZLES_ROW_GAP,
	PUZZLES_SECTION_TITLE_TOP,
	PUZZLES_TITLE_COLUMN,
} from '../lib/puzzlesStyles';
import { palette as themePalette } from '../palette';
import type { Branding } from '../types/branding';
import type { PuzzleContainer, PuzzlesLayoutType } from '../types/puzzlesPage';
import { AdSlot } from './AdSlot.web';
import { Island } from './Island';
import { getPuzzleUrl, Rows } from './PuzzleCard';
import { PuzzlesArchiveMenu } from './PuzzlesArchiveMenu.island';
import { PuzzlesContainerBranding } from './PuzzlesBranding';
import { PuzzlesSupporting } from './PuzzlesSupporting';

export { getPuzzleUrl };

type Props = {
	layout: PuzzlesLayoutType;
	renderAds: boolean;
	/** Omit the black rule above the first section, e.g. below the sponsorship banner. */
	hideTopRule?: boolean;
	/** Sponsor per container ID, for the reader's edition. */
	containerBranding?: Partial<Record<string, Branding>>;
};

const sectionStyles = (hideTopRule: boolean) => css`
	--puzzles-content-top: ${space[2]}px;
	--puzzles-content-bottom: ${space[8]}px;
	position: relative;
	display: grid;
	${puzzlesContainerStyles};
	background: ${themePalette('--puzzles-page-background')};
	::before {
		position: absolute;
		top: 0;
		left: 50%;
		width: 100vw;
		border-top: 2px solid ${themePalette('--puzzles-headline-colour')};
		content: '';
		transform: translateX(-50%);
	}
	${hideTopRule &&
	css`
		&:first-of-type::before {
			content: none;
		}
	`}

	${from.leftCol} {
		--puzzles-content-top: ${space[2]}px;
		grid-template-columns: ${PUZZLES_TITLE_COLUMN.leftCol}px minmax(0, 1fr);
	}

	${from.desktop} {
		--puzzles-content-bottom: ${space[10]}px;
	}

	&:has(details) {
		--puzzles-content-bottom: ${space[6]}px;
		${from.tablet} {
			--puzzles-content-bottom: ${space[10]}px;
		}
	}

	${from.wide} {
		grid-template-columns: ${PUZZLES_TITLE_COLUMN.wide}px minmax(0, 1fr);
	}
`;

const titleStyles = css`
	min-width: 0;
	padding: ${PUZZLES_SECTION_TITLE_TOP}px ${PUZZLES_EDGE_INSET}px
		${space[3]}px;
	${from.mobileMedium} {
		padding-right: ${space[5]}px;
		padding-left: ${space[5]}px;
	}

	${from.desktop} {
		/* Include the 1px side border in the 20px inset, as the cards do. */
		padding-left: ${PUZZLES_BORDERED_INSET}px;
	}

	${from.leftCol} {
		padding-top: var(--puzzles-content-top);
	}
`;

// Title left with the sponsor right on one row, stacked under the title from leftCol.
const brandedTitleStyles = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${space[2]}px;
	${from.leftCol} {
		display: block;
	}
`;

const headingStyles = css`
	min-width: 0;
	margin: 0;
	${headlineBold24};
	color: ${themePalette('--puzzles-headline-colour')};
	line-height: 1;
	overflow-wrap: break-word;

	${from.tablet} {
		${headlineBold28};
	}
`;

const headingColumnStyles = css`
	${from.leftCol} {
		position: relative;
		display: flex;
		flex-direction: column;
		::after {
			position: absolute;
			top: var(--puzzles-content-top);
			right: 0;
			bottom: var(--puzzles-content-bottom);
			border-right: 1px solid ${themePalette('--puzzles-border-colour')};
			content: '';
			pointer-events: none;
		}
	}
`;

const contentStyles = css`
	min-width: 0;
	padding: var(--puzzles-content-top) ${PUZZLES_EDGE_INSET}px
		var(--puzzles-content-bottom);
	${from.mobileMedium} {
		padding-right: ${space[5]}px;
		padding-left: ${space[5]}px;
	}
	${from.desktop} {
		/* Include the 1px side borders in the 20px content inset. */
		padding-right: ${PUZZLES_BORDERED_INSET}px;
		padding-left: ${PUZZLES_BORDERED_INSET}px;
	}
	${from.leftCol} {
		/* The left-column hairline sits at the centre of the standard gutter. */
		padding-left: ${PUZZLES_COLUMN_INSET}px;
	}
	${until.tablet} {
		position: relative;
		::before {
			position: absolute;
			top: 0;
			right: ${PUZZLES_EDGE_INSET}px;
			left: ${PUZZLES_EDGE_INSET}px;
			border-top: 1px solid ${themePalette('--puzzles-border-colour')};
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

const nestedGridStyles = css`
	--puzzles-gap: ${space[4]}px;
	display: grid;
	grid-template-columns: 1fr;
	gap: ${space[4]}px;
	${from.phablet} {
		--puzzles-gap: ${space[6]}px;
		gap: ${space[6]}px;
	}

	${from.tablet} {
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: ${space[5]}px;
		row-gap: ${PUZZLES_ROW_GAP}px;
		--puzzles-gap: ${space[5]}px;
		max-width: ${PUZZLES_CONTENT_MAX_WIDTH.tablet}px;
	}
	${from.desktop} {
		max-width: ${PUZZLES_CONTENT_MAX_WIDTH.desktop}px;
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
		border-top: 1px solid ${themePalette('--puzzles-border-colour')};
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
						border-left: 1px solid
							${themePalette('--puzzles-border-colour')};
					`
				: css`
						border-top: 1px solid
							${themePalette('--puzzles-border-colour')};
					`}
		}
	}
`;

const adStyles = css`
	width: 100%;
	overflow: hidden;
	background: ${themePalette('--puzzles-ad-background')};
`;

const Archive = ({
	container,
	ophanComponentName,
}: {
	container: PuzzleContainer;
	ophanComponentName: string;
}) => {
	if (container.content.archiveChoices !== undefined) {
		return (
			<Island priority="critical">
				<PuzzlesArchiveMenu
					archives={container.content.archiveChoices}
					label={`${container.title} archive`}
					ophanComponentName={ophanComponentName}
				/>
			</Island>
		);
	}
	return null;
};

const hasContent = (container: PuzzleContainer): boolean =>
	container.content.items.some((row) => row.length > 0) ||
	container.content.nestedContainers.some(hasContent);

const DirectorySection = ({
	container,
	hideTopRule,
	branding,
}: {
	container: PuzzleContainer;
	hideTopRule: boolean;
	branding?: Branding;
}) => {
	if (!hasContent(container)) {
		return null;
	}
	return (
		<section
			aria-labelledby={`${container.id}-title`}
			css={sectionStyles(hideTopRule)}
			id={container.id}
		>
			<div css={headingColumnStyles}>
				<div css={[titleStyles, branding && brandedTitleStyles]}>
					<h2 css={headingStyles} id={`${container.id}-title`}>
						{container.title}
					</h2>
					{branding && (
						<PuzzlesContainerBranding branding={branding} />
					)}
				</div>
			</div>
			<div css={contentStyles}>
				<Rows
					isFeatured={container.variant === 'featured'}
					rows={container.content.items}
					ophanComponentName={`puzzles-hub:${container.id}`}
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
									<Rows
										rows={nested.content.items}
										ophanComponentName={`puzzles-hub:${container.id}:${nested.id}`}
									/>
									<Archive
										container={nested}
										ophanComponentName={`puzzles-archive-menu:${container.id}:${nested.id}`}
									/>
								</div>
							))}
					</div>
				)}
				<Archive
					container={container}
					ophanComponentName={`puzzles-archive-menu:${container.id}`}
				/>
			</div>
		</section>
	);
};

export const PuzzlesDirectory = ({
	layout,
	renderAds,
	hideTopRule = false,
	containerBranding,
}: Props) => (
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
						showNewsletter={true}
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
				<DirectorySection
					branding={containerBranding?.[container.id]}
					container={container}
					hideTopRule={hideTopRule}
					key={container.id}
				/>
			);
		})}
	</>
);

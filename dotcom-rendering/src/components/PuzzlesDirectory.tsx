import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	palette,
	space,
} from '@guardian/source/foundations';
import { ArticleDisplay } from '../lib/articleFormat';
import { puzzlesContainerStyles } from '../lib/puzzlesContainerStyles';
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
	--puzzles-content-top: 8px;
	--puzzles-content-bottom: 32px;
	position: relative;
	display: grid;
	${puzzlesContainerStyles};
	background: var(--puzzles-page-background, ${palette.neutral[100]});
	::before {
		position: absolute;
		top: 0;
		left: 50%;
		width: 100vw;
		border-top: 2px solid
			var(--puzzles-headline-colour, ${palette.neutral[7]});
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
		grid-template-columns: 170px minmax(0, 1fr);
	}

	${from.desktop} {
		--puzzles-content-bottom: 40px;
	}

	&:has(details) {
		--puzzles-content-bottom: 24px;
		${from.tablet} {
			--puzzles-content-bottom: 40px;
		}
	}

	${from.wide} {
		grid-template-columns: 250px minmax(0, 1fr);
	}
`;

const titleStyles = css`
	min-width: 0;
	padding: 6px 10px 12px;
	${from.mobileMedium} {
		padding-right: 20px;
		padding-left: 20px;
	}

	${from.desktop} {
		/* Include the 1px side border in the 20px inset, as the cards do. */
		padding-left: 19px;
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
	color: var(--puzzles-headline-colour, ${palette.neutral[7]});
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
			border-right: 1px solid
				var(--puzzles-border-colour, ${palette.neutral[86]});
			content: '';
			pointer-events: none;
		}
	}
`;

const contentStyles = css`
	min-width: 0;
	padding: var(--puzzles-content-top) 10px var(--puzzles-content-bottom);
	${from.mobileMedium} {
		padding-right: 20px;
		padding-left: 20px;
	}
	${from.desktop} {
		/* Include the 1px side borders in the 20px content inset. */
		padding-right: 19px;
		padding-left: 19px;
	}
	${from.leftCol} {
		/* The left-column hairline sits at the centre of the standard gutter. */
		padding-left: 9px;
	}
	@media (max-width: 739px) {
		position: relative;
		::before {
			position: absolute;
			top: 0;
			right: 10px;
			left: 10px;
			border-top: 1px solid
				var(--puzzles-border-colour, ${palette.neutral[86]});
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
	--puzzles-gap: 16px;
	display: grid;
	grid-template-columns: 1fr;
	/* The separator sits 16px below the container above and 8px above the one below. */
	gap: 24px;
	${from.phablet} {
		--puzzles-gap: 24px;
	}

	${from.tablet} {
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: 20px;
		row-gap: 26px;
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
		top: -8px;
		right: 0;
		left: 0;
		border-top: 1px solid
			var(--puzzles-border-colour, ${palette.neutral[86]});
		content: '';
		pointer-events: none;
	}
	${from.tablet} {
		grid-column: span ${Math.max(1, Math.min(12, span))};
		& ~ &::before {
			top: calc(var(--puzzles-gap) / -2);
			${span < 12
				? css`
						top: 0;
						bottom: 0;
						right: auto;
						left: calc(var(--puzzles-gap) / -2);
						border-top: 0;
						border-left: 1px solid
							var(--puzzles-border-colour, ${palette.neutral[86]});
					`
				: css`
						border-top: 1px solid
							var(--puzzles-border-colour, ${palette.neutral[86]});
					`}
		}
	}
`;

const adStyles = css`
	width: 100%;
	overflow: hidden;
	background: ${palette.neutral[97]};
`;

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

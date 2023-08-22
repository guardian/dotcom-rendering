import { css } from '@emotion/react';
import { isString } from '@guardian/libs';
import {
	background,
	between,
	from,
	neutral,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import { pageSkinContainer } from '../layouts/lib/pageSkin';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import type { EditionId } from '../lib/edition';
import { hideAge } from '../lib/hideAge';
import type { DCRBadgeType } from '../types/badge';
import type {
	DCRContainerPalette,
	DCRFrontType,
	TreatType,
} from '../types/front';
import type { DCRFrontPagination } from '../types/tagFront';
import { isAustralianTerritory, type Territory } from '../types/territory';
import { AustralianTerritorySwitcher } from './AustralianTerritorySwitcher.importable';
import { Badge } from './Badge';
import { ContainerTitle } from './ContainerTitle';
import { FrontPagination } from './FrontPagination';
import { Island } from './Island';
import { ShowHideButton } from './ShowHideButton';
import { ShowMore } from './ShowMore.importable';
import { Treats } from './Treats';

type Props = {
	/** This text will be used as the h2 shown in the left column for the section */
	title?: string;
	/** This text shows below the title */
	description?: string;
	/** The title can be made into a link using this property */
	url?: string;
	/** The html `id` property of the element */
	sectionId?: string;
	collectionId?: string;
	pageId?: string;
	/** Defaults to `true`. If we should render the top border */
	showTopBorder?: boolean;
	/** A React component can be passed to be inserted inside the left column */
	leftContent?: React.ReactNode;
	children?: React.ReactNode;
	/** The string used to set the `data-component` Ophan attribute */
	ophanComponentName?: string;
	/** The string used to set the `data-link-name` Ophan attribute */
	ophanComponentLink?: string;
	/**
	 * 🛠️ DEBUG ONLY 🛠️
	 * Used to highlight the name of a container when DCR debug mode is enabled
	 *
	 * @see https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/client/debug/README.md
	 */
	containerName?: string;
	/** Fronts containers can have their styling overridden using a `containerPalette` */
	containerPalette?: DCRContainerPalette;
	/** Defaults to `false`. If true a Hide button is show top right allowing this section
	 * to be collapsed
	 */
	toggleable?: boolean;
	/** Defaults to `false`. If true and `editionId` is also passed, then a date string is
	 * shown under the title. Typically only used on Headlines containers on fronts
	 */
	showDateHeader?: boolean;
	/** Used in partnership with `showDateHeader` to localise the date string */
	editionId?: EditionId;
	/** A list of related links that appear in the bottom of the left column on fronts */
	treats?: TreatType[];
	badge?: DCRBadgeType;
	/** Enable the "Show More" button on this container to allow readers to load more cards */
	canShowMore?: boolean;
	ajaxUrl?: string;
	/** Puts pagination at the bottom of the container allowing the user to navigate to other pages,
	 * usually used on the last container on a page */
	pagination?: DCRFrontPagination;
	/** Does this front section reside on a "paid for" content front */
	isOnPaidContentFront?: boolean;
	/** Denotes the position of this section on the front */
	index?: number;
	/** Indicates if the container is targetted to a specific territory */
	targetedTerritory?: Territory;
	/** Indicates if the page has a page skin advert
	 * When a page skin advert is active:
	 * - containers are constrained to a max width of 'desktop'
	 * - media queries above desktop are not applied
	 * - if no background colour is specified use the default body background colour to prevent
	 *   the page skin background showing through the containers
	 */
	hasPageSkin?: boolean;
	discussionApiUrl: string;

	editionBranding?: DCRFrontType['pressedPage']['frontProperties']['commercial']['editionBrandings'][number];
};

const width = (columns: number, columnWidth: number, columnGap: number) =>
	`width: ${columns * columnWidth + (columns - 1) * columnGap}px;`;

/** Not all browsers support CSS grid, so we set explicit width as a fallback */
const fallbackStyles = css`
	@supports not (display: grid) {
		padding: 0 12px;
		margin: 0 auto;

		${from.mobileLandscape} {
			padding: 0 20px;
		}

		${from.tablet} {
			${width(12, 40, 20)}
		}

		${from.desktop} {
			${width(12, 60, 20)}
		}

		${from.leftCol} {
			${width(14, 60, 20)}
		}

		${from.wide} {
			${width(16, 60, 20)}
		}
	}
`;

const containerStylesUntilLeftCol = css`
	display: grid;

	grid-template-rows:
		[headline-start show-hide-start] auto
		[show-hide-end headline-end content-toggleable-start content-start] auto
		[content-end content-toggleable-end bottom-content-start] auto
		[bottom-content-end];

	grid-template-columns:
		[decoration-start]
		0px
		[content-start title-start]
		repeat(3, minmax(0, 1fr))
		[hide-start]
		minmax(0, 1fr)
		[content-end title-end hide-end]
		0px [decoration-end];

	grid-auto-flow: dense;
	column-gap: 10px;

	${from.mobileLandscape} {
		column-gap: 20px;
	}

	${from.tablet} {
		grid-template-columns:
			minmax(0, 1fr)
			[decoration-start content-start title-start]
			repeat(11, 40px)
			[hide-start]
			40px
			[decoration-end content-end title-end hide-end]
			minmax(0, 1fr);
	}

	${from.desktop} {
		grid-template-columns:
			minmax(0, 1fr)
			[decoration-start content-start title-start]
			repeat(11, 60px)
			[hide-start]
			60px
			[decoration-end content-end title-end hide-end]
			minmax(0, 1fr);
	}
`;

const containerStylesFromLeftCol = css`
	${from.leftCol} {
		grid-template-rows:
			[headline-start show-hide-start content-start] auto
			[show-hide-end content-toggleable-start] auto
			[headline-end treats-start] auto
			[content-end content-toggleable-end treats-end bottom-content-start] auto
			[bottom-content-end];

		grid-template-columns:
			minmax(0, 1fr)
			[decoration-start title-start]
			repeat(2, 60px)
			[title-end content-start]
			repeat(11, 60px)
			[hide-start]
			60px
			[decoration-end hide-end content-end]
			minmax(0, 1fr);
	}

	${from.wide} {
		grid-template-rows:
			[headline-start content-start content-toggleable-start show-hide-start] auto
			[show-hide-end] auto
			[headline-end treats-start] auto
			[content-end content-toggleable-end treats-end bottom-content-start] auto
			[bottom-content-end];

		grid-template-columns:
			minmax(0, 1fr)
			[decoration-start title-start]
			repeat(3, 60px)
			[title-end content-start]
			repeat(12, 60px)
			[content-end hide-start]
			60px
			[decoration-end hide-end]
			minmax(0, 1fr);
	}
`;

const flexRowStyles = css`
	flex-direction: row;
	justify-content: space-between;
`;

const sectionHeadlineUntilLeftCol = (isOpinion: boolean) => css`
	grid-row: headline;
	grid-column: title;
	display: flex;
	flex-direction: column;

	${between.tablet.and.leftCol} {
		${flexRowStyles}
	}

	${isOpinion && until.mobileLandscape} {
		flex-direction: column;
	}
	${isOpinion && between.mobileLandscape.and.tablet} {
		${flexRowStyles}
	}
`;

const sectionHeadlineFromLeftCol = (borderColour: string) => css`
	${from.leftCol} {
		position: relative;
		::after {
			content: '';
			display: block;
			width: 1px;
			top: 0;
			height: 1.875rem;
			right: -10px;
			position: absolute;
			background-color: ${borderColour};
		}
	}
`;

const sectionHeadlineHeight = css`
	${until.tablet} {
		min-height: 58px;
	}
`;

const paddings = css`
	padding-top: ${space[2]}px;
`;

const sectionShowHide = css`
	grid-row: show-hide;
	grid-column: hide;
	justify-self: end;
`;

const sectionContent = css`
	margin: 0;

	.hidden > & {
		display: none;
	}

	grid-column: content;
`;

const sectionContentRow = (toggleable: boolean) => css`
	grid-row: ${toggleable ? 'content-toggleable' : 'content'};
`;

const sectionContentPadded = css`
	${from.tablet} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const sectionBottomContent = css`
	grid-row: bottom-content;
	grid-column: content;
	.hidden > & {
		display: none;
	}
`;

const sectionTreats = css`
	display: none;

	${from.leftCol} {
		display: block;
		align-self: end;

		grid-row: treats;
		grid-column: title;
	}

	.hidden > & {
		display: none;
	}
`;

const decoration = (borderColour: string) => {
	/** element which contains border and inner background colour, if set */
	return css`
		grid-row: 1 / -1;
		grid-column: decoration;

		border-width: 1px;
		border-color: ${borderColour};
		border-style: none;
	`;
};

/** only visible once content stops sticking to left and right edges */
const sideBorders = css`
	${from.tablet} {
		margin: 0 -20px;
		border-left-style: solid;
		border-right-style: solid;
	}
`;

const topBorder = css`
	border-top-style: solid;
`;

const bottomPadding = css`
	padding-bottom: ${space[9]}px;
`;

const titleStyle = css`
	${until.leftCol} {
		max-width: 74%;
	}
`;

const decideBackgroundColour = (
	overrideBackgroundColour: string | undefined,
	hasPageSkin: boolean,
) => {
	if (overrideBackgroundColour) {
		return overrideBackgroundColour;
	}
	if (hasPageSkin) {
		return background.primary;
	}
	return undefined;
};

const labelStyles = css`
	${textSans.xxsmall()};
	line-height: 1rem;
	color: ${palette.neutral[46]};
	font-weight: bold;
	margin-top: 0.375rem;
	padding-right: 0.625rem;
	padding-bottom: 0.625rem;
	text-align: left;
`;

const aboutThisLinkStyles = css`
	${textSans.xxsmall()};
	line-height: 11px;
	color: ${palette.neutral[46]};
	font-weight: normal;
	text-decoration: none;
`;

/**
 * # Front Container
 *
 * A container for fronts, which generally contains sets of cards.
 *
 * Provides borders, spacing, colours, a title and features specific to fronts
 * such as show/hide toggle button. Content slotted as `children` is placed
 * in the centre. Extra elements can be passed to `leftContent`, which will
 * automatically fall into the left column on larger breakpoints.
 *
 * Defaults to an HTML `section`, but the specific tag can be set.
 *
 * @example
 *
 * from `mobile` (320) to `phablet` (660)
 *  1 2 3 4
 * ┌───────┐
 * │Title  │
 * ├───────┤
 * │▒▒▒▒▒▒▒│
 * │▒▒▒▒▒▒▒│
 * ├───────┤
 * │Show   │
 * |More   │
 * └───────┘
 *
 * from `tablet` (740) to `desktop` (980)
 *
 *  1 2 3 4 5 6 7 8 9 a b c (12)
 * ┌───────────────────────┐
 * │Title                  │
 * │Date                   │
 * ├───────────────────────┤
 * │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * ├───────────────────────┤
 * │Show More              │
 * └───────────────────────┘
 *
 * on `leftCol` (1140) if component is toggleable
 *
 *  1 2 3 4 5 6 7 8 9 a b c d e (14)
 * ┌───┬───────────────────┬─┐
 * │Tit│                   │X│
 * │Dat├───────────────────┴─┤
 * ├───┤▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │   │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │Tre│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │ats│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * ├───┼─────────────────────┤
 * │   │Show More            │
 * └───┴─────────────────────┘
 *
 * on `leftCol` (1140) if component is not toggleable
 *
 *  1 2 3 4 5 6 7 8 9 a b c d e (14)
 * ┌───┬──────────────────────┐
 * │Tit│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │Dat│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * ├───┤▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │   │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │Tre│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │ats│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * ├───┼──────────────────────┤
 * │   │Show More             │
 * └───┴──────────────────────┘
 *
 * on `wide` (1300)
 *
 *  1 2 3 4 5 6 7 8 9 a b c d e f g (16)
 * ┌─────┬───────────────────────┬─┐
 * │Title│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│X│
 * │Date │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒└─┤
 * ├─────┤▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  │
 * │     │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  │
 * │     │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  │
 * │Treat│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  │
 * ├─────┼─────────────────────────┤
 * │     │Show More                │
 * └─────┴─────────────────────────┘
 *
 */
export const FrontSection = ({
	title,
	children,
	containerName,
	containerPalette,
	description,
	editionId,
	leftContent,
	ophanComponentLink,
	ophanComponentName,
	sectionId = '',
	collectionId,
	pageId,
	showDateHeader = false,
	showTopBorder = true,
	toggleable = false,
	treats,
	url,
	badge,
	canShowMore,
	ajaxUrl,
	pagination,
	isOnPaidContentFront,
	index,
	targetedTerritory,
	hasPageSkin = false,
	editionBranding,
	discussionApiUrl,
}: Props) => {
	const overrides =
		containerPalette && decideContainerOverrides(containerPalette);

	const isToggleable = toggleable && !!sectionId;
	const showMore =
		canShowMore &&
		!!title &&
		!!sectionId &&
		!!collectionId &&
		!!pageId &&
		!!ajaxUrl;

	/**
	 * id is being used to set the containerId in @see {ShowMore.importable.tsx}
	 * this id pre-existed showMore so is probably also being used for something else.
	 */
	return (
		<section
			id={sectionId}
			data-link-name={ophanComponentLink}
			data-component={ophanComponentName}
			data-container-name={containerName}
			css={[
				fallbackStyles,
				containerStylesUntilLeftCol,
				!hasPageSkin && containerStylesFromLeftCol,
				hasPageSkin && pageSkinContainer,
				css`
					background-color: ${decideBackgroundColour(
						overrides?.background.container,
						hasPageSkin,
					)};
				`,
			]}
		>
			<div
				css={[
					decoration(overrides?.border.container ?? neutral[86]),
					sideBorders,
					showTopBorder && topBorder,
				]}
			/>

			<div
				css={[
					sectionHeadlineUntilLeftCol(
						// TODO FIXME:
						// This relies on sections called "opinion"
						// only ever having <CPScott> as the leftContent
						title?.toLowerCase() === 'opinion',
					),
					!hasPageSkin &&
						sectionHeadlineFromLeftCol(
							overrides?.border.container ?? neutral[86],
						),
					title?.toLowerCase() === 'headlines' &&
						sectionHeadlineHeight,
				]}
			>
				{/* Only show the badge with a "Paid for by" label on the FIRST card of a paid front */}
				{isOnPaidContentFront && index === 0 ? (
					<div css={titleStyle}>
						<ContainerTitle
							title={title}
							fontColour={overrides?.text.container}
							description={description}
							// On paid fronts the title is not treated as a link
							// Be explicit and pass in undefined
							url={undefined}
							containerPalette={containerPalette}
							showDateHeader={showDateHeader}
							editionId={editionId}
						/>
						{badge && (
							<div
								css={css`
									display: inline-block;
									border-top: 1px dotted
										${palette.neutral[86]};
									${textSans.xxsmall()}
									color: ${palette.neutral[46]};
									font-weight: bold;

									${from.leftCol} {
										width: 100%;
									}
								`}
							>
								Paid for by
								<Badge
									imageSrc={badge.imageSrc}
									href={badge.href}
								/>
							</div>
						)}
					</div>
				) : (
					<>
						{!isOnPaidContentFront && (
							<Hide until="leftCol">
								{badge && (
									<Badge
										imageSrc={badge.imageSrc}
										href={badge.href}
									/>
								)}
							</Hide>
						)}
						<div css={titleStyle}>
							{!isOnPaidContentFront && (
								<Hide from="leftCol">
									{badge && (
										<Badge
											imageSrc={badge.imageSrc}
											href={badge.href}
										/>
									)}
								</Hide>
							)}
							<ContainerTitle
								title={title}
								fontColour={overrides?.text.container}
								description={description}
								url={url}
								containerPalette={containerPalette}
								showDateHeader={showDateHeader}
								editionId={editionId}
							/>
							{!isOnPaidContentFront &&
								!!editionBranding &&
								editionBranding.branding &&
								index === 0 && (
									<>
										<p css={labelStyles}>
											{
												editionBranding.branding.logo
													.label
											}
										</p>
										<Badge
											imageSrc={
												editionBranding.branding.logo
													.src
											}
											href={
												editionBranding.branding.logo
													.link
											}
										/>
										<a
											href={
												editionBranding.branding
													.aboutThisLink
											}
											css={aboutThisLinkStyles}
										>
											About this content
										</a>
									</>
								)}
						</div>
					</>
				)}
				{leftContent}
			</div>

			{isToggleable && (
				<div css={sectionShowHide}>
					<ShowHideButton
						sectionId={sectionId}
						overrideContainerToggleColour={
							overrides?.text.containerToggle
						}
					/>
				</div>
			)}

			<div
				css={[
					sectionContent,
					sectionContentPadded,
					sectionContentRow(toggleable),
					paddings,
				]}
				id={`container-${sectionId}`}
			>
				{children}
			</div>

			<div
				css={[
					sectionContentPadded,
					sectionBottomContent,
					bottomPadding,
				]}
			>
				{isString(targetedTerritory) &&
				isAustralianTerritory(targetedTerritory) ? (
					<Island deferUntil="visible">
						<AustralianTerritorySwitcher
							targetedTerritory={targetedTerritory}
						/>
					</Island>
				) : showMore ? (
					<Island deferUntil="interaction">
						<ShowMore
							title={title}
							sectionId={sectionId}
							collectionId={collectionId}
							pageId={pageId}
							ajaxUrl={ajaxUrl}
							editionId={editionId}
							containerPalette={containerPalette}
							showAge={!hideAge.includes(title)}
							discussionApiUrl={discussionApiUrl}
						/>
					</Island>
				) : null}
				{pagination && (
					<FrontPagination
						sectionName={pagination.sectionName}
						totalContent={pagination.totalContent}
						currentPage={pagination.currentPage}
						lastPage={pagination.lastPage}
						pageId={pagination.pageId}
					/>
				)}
			</div>

			{treats && !hasPageSkin && (
				<div css={[sectionTreats, paddings]}>
					<Treats
						treats={treats}
						borderColour={overrides?.border.container}
						fontColour={overrides?.text.container ?? neutral[7]}
					/>
				</div>
			)}
		</section>
	);
};

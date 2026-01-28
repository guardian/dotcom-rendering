import { css } from '@emotion/react';
import {
	between,
	from,
	space,
	textSans14,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { submitComponentEvent } from '../client/ophan/ophan';
import { type EditionId, isNetworkFront } from '../lib/edition';
import { palette as schemePalette } from '../palette';
import type { DCRContainerLevel, DCRContainerPalette } from '../types/front';
import type { TagPagePagination } from '../types/tagPage';
import { ContainerOverrides } from './ContainerOverrides';
import { ContainerTitle } from './ContainerTitle';
import { Footer } from './ExpandableAtom/Footer';
import { FrontPagination } from './FrontPagination';
import { FrontSectionTitle } from './FrontSectionTitle';
import { ShowHideButton } from './ShowHideButton';

type Props = {
	/** This text will be used as the h2 shown in the left column for the section */
	title?: string;
	/** This text shows below the title */
	description?: string;
	/** The title can be made into a link using this property */
	url?: string;
	// collectionId?: string;
	pageId?: string;
	/** Defaults to `true`. If we should render the top border */
	showTopBorder?: boolean;
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
	/** Fronts containers can have their styling overridden using a `containerLevel`.
	 * If used, this can be either "Primary" or "Secondary", both of which have different styles */
	containerLevel?: DCRContainerLevel;
	/** Fronts containers spacing rules vary depending on the size of their container spacing which is derived from if the next container is a primary or secondary. */
	toggleable?: boolean;
	/** Defaults to `false`. If true and `editionId` is also passed, then a date string is
	 * shown under the title. Typically only used on Headlines containers on fronts
	 */
	showDateHeader?: boolean;
	/** Used in partnership with `showDateHeader` to localise the date string */
	editionId: EditionId;
	isTagPage?: boolean;
	hasNavigationButtons?: boolean;
	likeHandler?: () => void;
	dislikeHandler?: () => void;
	/** Puts pagination at the bottom of the container allowing the user to navigate to other pages,
	 * usually used on the last container on a page */
	pagination?: TagPagePagination;
};

const width = (columns: number, columnWidth: number, columnGap: number) =>
	`width: ${columns * columnWidth + (columns - 1) * columnGap}px;`;

const borderColourStyles = (
	title?: string,
	showSectionColours?: boolean,
): string => {
	if (!showSectionColours) {
		return schemePalette('--section-border-primary');
	}

	switch (title) {
		case 'News':
			return schemePalette('--section-border-news');
		case 'Opinion':
			return schemePalette('--section-border-opinion');
		case 'Sport':
		case 'Sports':
			return schemePalette('--section-border-sport');
		case 'Lifestyle':
			return schemePalette('--section-border-lifestyle');
		case 'Culture':
			return schemePalette('--section-border-culture');
		default:
			return schemePalette('--section-border-primary');
	}
};

const articleSectionTitleStyles = (
	title?: string,
	showSectionColours?: boolean,
): string => {
	if (!showSectionColours) {
		return schemePalette('--article-section-title');
	}

	switch (title) {
		case 'News':
			return schemePalette('--article-section-title-news');
		case 'Opinion':
			return schemePalette('--article-section-title-opinion');
		case 'Sport':
		case 'Sports':
			return schemePalette('--article-section-title-sport');
		case 'Lifestyle':
			return schemePalette('--article-section-title-lifestyle');
		case 'Culture':
			return schemePalette('--article-section-title-culture');
		default:
			return schemePalette('--article-section-title');
	}
};

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
		[headline-start controls-start] auto
		[controls-end headline-end content-toggleable-start content-start] auto
		[content-end content-toggleable-end bottom-content-start] auto
		[bottom-content-end pagination-start] auto
		[pagination-end];

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

const containerScrollableStylesFromLeftCol = css`
	${between.leftCol.and.wide} {
		grid-template-rows:
			[headline-start controls-start] auto
			[controls-end content-toggleable-start content-start] auto
			[headline-end treats-start] auto
			[content-end content-toggleable-end treats-end bottom-content-start] auto
			[bottom-content-end pagination-start] auto
			[pagination-end];
	}

	${from.wide} {
		grid-template-rows:
			[headline-start content-start content-toggleable-start controls-start] auto
			[headline-end treats-start] auto
			[content-end content-toggleable-end treats-end controls-end bottom-content-start] auto
			[bottom-content-end pagination-start] auto
			[pagination-end];
	}
`;

const containerStylesFromLeftCol = css`
	${from.leftCol} {
		grid-template-rows:
			[headline-start controls-start content-start] auto
			[controls-end content-toggleable-start] auto
			[headline-end treats-start] auto
			[content-end content-toggleable-end treats-end bottom-content-start] auto
			[bottom-content-end pagination-start] auto
			[pagination-end];

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
			[headline-start content-start content-toggleable-start controls-start] auto
			[controls-end] auto
			[headline-end treats-start] auto
			[content-end content-toggleable-end treats-end bottom-content-start] auto
			[bottom-content-end pagination-start] auto
			[pagination-end];

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

const topPadding = css`
	padding-top: ${space[2]}px;
`;

const sectionControls = css`
	grid-row: controls;
	grid-column: hide;
	justify-self: end;
	display: flex;
	padding-top: ${space[2]}px;
	${from.wide} {
		flex-direction: column-reverse;
		justify-content: flex-end;
		align-items: flex-end;
		gap: ${space[2]}px;
		/* we want to add space between the items in the controls section only when there are at least 2 children and neither are hidden */
		:has(> :not(.hidden):nth-of-type(2)) {
			justify-content: space-between;
		}
	}
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

const sectionContentHorizontalMargins = css`
	${from.tablet} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const sectionContentBorderFromLeftCol = css`
	position: relative;
	${from.leftCol} {
		::before {
			content: '';
			position: absolute;
			top: ${space[2]}px;
			bottom: 0;
			border-left: 1px solid ${schemePalette('--section-border')};
			transform: translateX(-50%);
			/** Keeps the vertical divider ontop of carousel item dividers */
			z-index: 1;
		}
	}
`;

const decoration = css`
	/** element which contains border and inner background colour, if set */
	grid-row: 1 / -1;
	grid-column: decoration;

	border-width: 1px;
	border-color: ${schemePalette('--section-border')};
	border-style: none;
`;

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

const primaryLevelTopBorder = (
	title?: string,
	showSectionColours?: boolean,
) => css`
	grid-row: 1;
	grid-column: 1 / -1;
	border-top: 2px solid ${borderColourStyles(title, showSectionColours)};
	/** Ensures the top border sits above the side borders */
	z-index: 1;
	height: fit-content;
`;

const secondaryLevelTopBorder = css`
	grid-row: 1;
	grid-column: content;
	border-top: 1px solid ${schemePalette('--section-border-secondary')};
	${from.tablet} {
		grid-column: decoration;
	}
`;

const carouselNavigationPlaceholder = css`
	.hidden & {
		display: none;
	}
`;

const sectionPaginationBackground = css`
	grid-row: pagination;
	grid-column: decoration;
	background-color: white;
	${from.tablet} {
		margin: 0 -20px;
		border-left-style: solid;
		border-right-style: solid;
		border-width: 1px;
		border-color: ${schemePalette('--section-border')};
	}
	.hidden > & {
		display: none;
	}
`;

const sectionPagination = css`
	grid-row: pagination;
	grid-column: content;
	.hidden > & {
		display: none;
	}
`;

const bottomPaddingBetaContainer = css`
	${until.tablet} {
		padding-bottom: ${space[10]}px;
	}
	${from.tablet} {
		padding-bottom: ${space[10]}px;
	}
`;

/**
 * # Front Container
 *
 * A container for the storylines content on tag pages,
 * which contains sets of cards.
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
 * │AI Note│
 * │Context│
 * │Footer │
 * └───────┘
 *
 * from `tablet` (740) to `desktop` (980)
 *
 *  1 2 3 4 5 6 7 8 9 a b c (12)
 * ┌───────────────────────┐
 * │Title                  │
 * ├───────────────────────┤
 * │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * ├───────────────────────┤
 * │AI note,context,footer │
 * └───────────────────────┘
 *
 * on `leftCol` (1140) if component is toggleable
 *
 *  1 2 3 4 5 6 7 8 9 a b c d e (14)
 * ┌───┬───────────────────┬─┐
 * │Tit│                   │X│
 * │AI ├───────────────────┴─┤
 * ├───┤▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │   │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │Foo│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │ter│Content context info │
 * ├───┼─────────────────────┤
 *
 * on `leftCol` (1140) if component is not toggleable
 *
 *  1 2 3 4 5 6 7 8 9 a b c d e (14)
 * ┌───┬──────────────────────┐
 * │Tit│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │AI │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * ├───┤▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │   │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │Foo│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │ter│Content context info  │
 * ├───┼──────────────────────┤
 *
 * on `wide` (1300)
 *
 *  1 2 3 4 5 6 7 8 9 a b c d e f g (16)
 * ┌──────┬───────────────────────┬─┐
 * │Title │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│X│
 * │AI    │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒└─┤
 * │Notice│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  │
 * ├─────-┤▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  │
 * │      │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  │
 * │      │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  │
 * │Footer│Content context info	    │
 * ├────────────────────────────────┤
 *
 */

/**
 * This is based on @see {FrontSection.tsx} but with some modifications:
 * - Some text has been added regarding the use of AI in this section
 * - In a frontsection, the background normally takes up the full width of the page, but we want just the section to have the grey background
 * - Instead of treats, we have a footer with like/dislike buttons
 * - A portion of the props and logic in frontsection aren't relevant here
 */
export const StorylinesSection = ({
	title,
	children,
	containerName,
	containerPalette,
	containerLevel,
	description,
	editionId,
	ophanComponentLink,
	ophanComponentName,
	pageId,
	showDateHeader = false,
	showTopBorder = true,
	toggleable = false,
	url,
	isTagPage = false,
	hasNavigationButtons = false,
	dislikeHandler,
	likeHandler,
	pagination,
}: Props) => {
	const sectionId = 'storylines-section';
	const isToggleable = toggleable && !!sectionId;
	const isBetaContainer = !!containerLevel;

	const showSectionColours = isNetworkFront(pageId ?? '');

	/**
	 * In a front section, id is being used to set the containerId in @see {ShowMore.importable.tsx}
	 * We don't use show more here, however as noted in the front section component:
	 * this id pre-existed showMore so is probably also being used for something else.
	 */
	return (
		<ContainerOverrides containerPalette={containerPalette}>
			<section
				id={sectionId}
				data-link-name={ophanComponentLink}
				data-component={ophanComponentName}
				data-container-name={containerName}
				data-container-level={containerLevel}
				css={[
					fallbackStyles,
					containerStylesUntilLeftCol,
					containerStylesFromLeftCol,
					hasNavigationButtons &&
						containerScrollableStylesFromLeftCol,
				]}
			>
				{isBetaContainer && showTopBorder && (
					<div
						css={[
							containerLevel === 'Secondary'
								? secondaryLevelTopBorder
								: primaryLevelTopBorder(
										title,
										showSectionColours,
								  ),
						]}
					/>
				)}

				<div
					css={[
						decoration,
						sideBorders,
						showTopBorder && !isBetaContainer && topBorder,
					]}
					style={{
						backgroundColor: schemePalette(
							'--front-container-background',
						),
					}}
				/>

				<div
					css={[
						sectionHeadlineUntilLeftCol(
							title?.toLowerCase() === 'opinion',
						),
					]}
				>
					<FrontSectionTitle
						title={
							<>
								<ContainerTitle
									title={title}
									lightweightHeader={isTagPage}
									description={description}
									fontColour={
										containerLevel === 'Secondary'
											? schemePalette(
													'--article-section-secondary-title',
											  )
											: articleSectionTitleStyles(
													title,
													showSectionColours,
											  )
									}
									url={url}
									showDateHeader={showDateHeader}
									editionId={editionId}
									containerLevel={'Primary'}
								/>
								<div
									css={css`
										${textSans14};
									`}
								>
									Dive deeper into the Guardian's archive.{' '}
									<Hide until="leftCol">
										<span>
											This product uses GenAI. Learn more
											about how it works{' '}
											<a href="https://www.theguardian.com/help/insideguardian/2023/jun/16/the-guardians-approach-to-generative-ai">
												here.
											</a>
										</span>

										<div
											css={css`
												margin-top: ${space[2]}px;
											`}
										>
											<Footer
												dislikeHandler={
													dislikeHandler ??
													(() =>
														submitComponentEvent(
															{
																component: {
																	componentType:
																		'STORYLINES',
																	id: sectionId,
																	products:
																		[],
																	labels: [],
																},
																action: 'DISLIKE',
															},
															'Web',
														))
												}
												likeHandler={
													likeHandler ??
													(() =>
														submitComponentEvent(
															{
																component: {
																	componentType:
																		'STORYLINES',
																	id: sectionId,
																	products:
																		[],
																	labels: [],
																},
																action: 'LIKE',
															},
															'Web',
														))
												}
												storylinesStyle={true}
											></Footer>
										</div>
									</Hide>
								</div>
							</>
						}
						sectionId={sectionId}
						collectionBranding={undefined}
					/>
				</div>

				{(isToggleable || hasNavigationButtons) && (
					<div css={sectionControls}>
						{isToggleable && (
							<ShowHideButton sectionId={sectionId} />
						)}
						{hasNavigationButtons && (
							<div
								css={carouselNavigationPlaceholder}
								className="carouselNavigationPlaceholder"
								id={`${sectionId}-carousel-navigation`}
							></div>
						)}
					</div>
				)}

				<div
					css={[
						sectionContent,
						sectionContentHorizontalMargins,
						sectionContentRow(toggleable),
						topPadding,
						isBetaContainer && sectionContentBorderFromLeftCol,
					]}
					id={`container-${sectionId}`}
				>
					{children}
				</div>

				{pagination && (
					<>
						<div css={sectionPaginationBackground} />
						<div
							id="pagination"
							css={[
								sectionContentHorizontalMargins,
								sectionPagination,
								bottomPaddingBetaContainer,
							]}
						>
							<FrontPagination
								sectionName={pagination.sectionName}
								totalContent={pagination.totalContent}
								currentPage={pagination.currentPage}
								lastPage={pagination.lastPage}
								pageId={pagination.pageId}
							/>
						</div>
					</>
				)}
			</section>
		</ContainerOverrides>
	);
};

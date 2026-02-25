import { css } from '@emotion/react';
import { between, from, space, textSans14 } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { submitComponentEvent } from '../client/ophan/ophan';
import { type EditionId } from '../lib/edition';
import { palette as schemePalette } from '../palette';
import type { DCRContainerPalette } from '../types/front';
import type { TagPagePagination } from '../types/tagPage';
import { ContainerOverrides } from './ContainerOverrides';
import { ContainerTitle } from './ContainerTitle';
import { Footer } from './ExpandableAtom/Footer';
import { FrontPagination } from './FrontPagination';
import { FrontSectionTitle } from './FrontSectionTitle';
import { SvgBetaLabel } from './SvgBetaLabel';

type Props = {
	/** This text will be used as the h2 shown in the left column for the section */
	title?: string;
	/** The title can be made into a link using this property */
	url?: string;
	children?: React.ReactNode;
	/** The string used to set the `data-component` Ophan attribute */
	ophanComponentName?: string;
	/** The string used to set the `data-link-name` Ophan attribute */
	ophanComponentLink?: string;
	/** Fronts containers can have their styling overridden using a `containerPalette` */
	containerPalette?: DCRContainerPalette;
	/** Used in partnership with `showDateHeader` to localise the date string */
	editionId: EditionId;
	isTagPage?: boolean;
	/** Puts pagination at the bottom of the container allowing the user to navigate to other pages,
	 * usually used on the last container on a page */
	pagination?: TagPagePagination;
};

const width = (columns: number, columnWidth: number, columnGap: number) =>
	`width: ${columns * columnWidth + (columns - 1) * columnGap}px;`;

const articleSectionTitleStyles = schemePalette('--article-section-title');

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

const sectionHeadlineUntilLeftCol = css`
	grid-row: headline;
	grid-column: title;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	${between.tablet.and.leftCol} {
		${flexRowStyles}
	}
`;

const topPadding = css`
	padding-top: ${space[2]}px;
`;

const sectionContent = css`
	margin: 0;

	.hidden > & {
		display: none;
	}

	grid-column: content;
`;

const sectionContentRow = css`
	grid-row: content;
`;

const sectionContentHorizontalMargins = css`
	${from.tablet} {
		margin-left: -10px;
		margin-right: -10px;
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
	padding-bottom: ${space[10]}px;
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
	containerPalette,
	editionId,
	ophanComponentLink,
	ophanComponentName,
	url,
	isTagPage = false,
	pagination,
}: Props) => {
	const sectionId = 'storylines-section';

	return (
		<ContainerOverrides containerPalette={containerPalette}>
			<section
				id={sectionId}
				data-link-name={ophanComponentLink}
				data-component={ophanComponentName}
				css={[
					fallbackStyles,
					containerStylesUntilLeftCol,
					containerStylesFromLeftCol,
				]}
			>
				<div
					css={[decoration, sideBorders, topBorder]}
					style={{
						backgroundColor: schemePalette(
							'--front-container-background',
						),
					}}
				/>

				<div css={sectionHeadlineUntilLeftCol}>
					<FrontSectionTitle
						title={
							<>
								<ContainerTitle
									title={title}
									lightweightHeader={isTagPage}
									fontColour={articleSectionTitleStyles}
									url={url}
									editionId={editionId}
									containerLevel={'Primary'}
								/>
								<div
									css={css`
										${textSans14};
									`}
								>
									<Hide until="leftCol">
										<span>
											Storylines is an experimental
											feature we are showing to a limited
											audience as a Beta test.
											<br /> It uses generative AI to
											identify three key storylines within
											this topic and show valuable
											articles from our archive. The aim
											is to give readers a better
											understanding of a topic and access
											to a wider variety of our
											journalism. The only text
											automatically generated is the short
											description of each storyline. It
											has been created in line with the
											Guardian’s{' '}
											<a href="https://www.theguardian.com/help/insideguardian/2023/jun/16/the-guardians-approach-to-generative-ai">
												generative AI principles
											</a>
											.{' '}
										</span>

										<div
											css={css`
												margin-top: ${space[2]}px;
											`}
										>
											<Footer
												dislikeHandler={() => {
													void submitComponentEvent(
														{
															component: {
																componentType:
																	'STORYLINES',
																id: sectionId,
																products: [],
																labels: [],
															},
															action: 'DISLIKE',
														},
														'Web',
													);
												}}
												likeHandler={() => {
													void submitComponentEvent(
														{
															component: {
																componentType:
																	'STORYLINES',
																id: sectionId,
																products: [],
																labels: [],
															},
															action: 'LIKE',
														},
														'Web',
													);
												}}
												isStorylines={true}
											></Footer>
											<div
												css={css`
													display: inline-block;
													vertical-align: middle;
													width: 75px;
												`}
											>
												<SvgBetaLabel />
											</div>
										</div>
									</Hide>
								</div>
							</>
						}
						sectionId={sectionId}
						collectionBranding={undefined}
					/>
					<Hide from="leftCol">
						<div
							css={css`
								display: flex;
								align-items: center;
								height: 100%;
								width: 48px;
								padding: ${space[1]}px;
							`}
						>
							<SvgBetaLabel />
						</div>
					</Hide>
				</div>

				<div
					css={[
						sectionContent,
						sectionContentHorizontalMargins,
						sectionContentRow,
						topPadding,
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

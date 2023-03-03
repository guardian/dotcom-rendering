import { css, jsx } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, neutral, space } from '@guardian/source-foundations';
import type { DCRContainerPalette, TreatType } from '../../types/front';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import type { EditionId } from '../lib/edition';
import { ContainerTitle } from './ContainerTitle';
import { ShowHideButton } from './ShowHideButton';
import { Treats } from './Treats';

type Props = {
	/** This text will be used as the h2 shown in the left column for the section */
	title?: string;
	/** Allows the colour of the title to be changed */
	fontColour?: string;
	/** This text shows below the title */
	description?: string;
	/** The title can be made into a link using this property */
	url?: string;
	/** The html `id` property of the element */
	sectionId?: string;
	/** Defaults to `true`. If we should render the left and right borders */
	showSideBorders?: boolean;
	centralBorder?: 'partial' | 'full';
	/** Defaults to `true`. If we should render the top border */
	showTopBorder?: boolean;
	/** The html tag used by Section defaults to `section` but can be overridden here */
	element?:
		| 'div'
		| 'article'
		| 'aside'
		| 'nav'
		| 'main'
		| 'header'
		| 'section'
		| 'footer';
	/** Defaults to `true`. Adds margins to the top and bottom */
	verticalMargins?: boolean;
	/** Applies a background colour to the entire width */
	backgroundColour?: string;
	/** The colour of borders can be overriden */
	borderColour?: string;
	/** A React component can be passed to be inserted inside the left column */
	leftContent?: React.ReactNode;
	children?: React.ReactNode;
	/** Defaults to `false`. If true, `children` is rendered all the way right */
	stretchRight?: boolean;
	/** Defaults to `compact`. Some page types have a different left column width */
	leftColSize?: LeftColSize;
	/** @deprecated no longer used */
	format?: ArticleFormat;
	/** The string used to set the `data-component` Ophan attribute */
	ophanComponentName?: string;
	/** The string used to set the `data-link-name` Ophan attribute */
	ophanComponentLink?: string;
	/**
	 * 🛠️ DEBUG ONLY 🛠️
	 * Used to highlight the name of a container when DCR debug mode is enabled
	 *
	 * @see https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/web/browser/debug/README.md
	 */
	containerName?: string;
	/** Fronts containers can have their styling overridden using a `containerPalette` */
	containerPalette?: DCRContainerPalette;
	/** Defaults to `false`. If true a Hide button is show top right allowing this section
	 * to be collapsed
	 */
	toggleable?: boolean;
	/** Applies a background colour only to the content inside the left and right borders */
	innerBackgroundColour?: string;
	/** Defaults to `false`. If true and `editionId` is also passed, then a date string is
	 * shown under the title. Typically only used on Headlines containers on fronts
	 */
	showDateHeader?: boolean;
	/** Used in partnership with `showDateHeader` to localise the date string */
	editionId?: EditionId;
	/** A list of related links that appear in the bottom of the left column on fronts */
	treats?: TreatType[];
};

const width = (columns: number, columnWidth: number, columnGap: number) =>
	`width: ${columns * columnWidth + (columns - 1) * columnGap}px;`;

/** Not all browsers support CSS grid, so we set explicit width as a fallback */
const fallbackStyles = css`
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

	@supports (display: grid) {
		width: 100%;
		padding: 0;
		margin: 0;
	}
`;

const containerStyles = css`
	display: grid;
	grid-template-columns:
		[viewport-start] 0px
		[content-start title-start]
		repeat(3, minmax(0, 1fr))
		[title-end hide-start]
		minmax(0, 1fr)
		[content-end hide-end]
		0px [viewport-end];
	column-gap: 10px;

	${from.mobileLandscape} {
		column-gap: 20px;
	}

	${from.tablet} {
		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[content-start title-start]
			repeat(11, 40px)
			[title-end hide-start]
			40px
			[content-end hide-end]
			minmax(0, 1fr) [viewport-end];
	}

	${from.desktop} {
		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[content-start title-start]
			repeat(11, 60px)
			[title-end hide-start]
			60px
			[content-end hide-end]
			minmax(0, 1fr) [viewport-end];
	}

	${from.leftCol} {
		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[title-start]
			repeat(2, 60px)
			[title-end content-start]
			repeat(11, 60px)
			[hide-start]
			60px
			[hide-end content-end]
			minmax(0, 1fr) [viewport-end];
	}

	${from.wide} {
		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[title-start]
			repeat(3, 60px)
			[title-end content-start]
			repeat(12, 60px)
			[content-end hide-start]
			60px
			[hide-end]
			minmax(0, 1fr) [viewport-end];
	}

	grid-auto-flow: dense;
	grid-template-rows: auto [content-start] auto;

	${from.leftCol} {
		grid-template-rows: [content-start] repeat(2, auto);
	}
`;

const wideLeftColumn = css`
	${from.leftCol} {
		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[title-start]
			repeat(3, 60px)
			[title-end content-start]
			repeat(10, 60px)
			[hide-start]
			60px
			[hide-end content-end] minmax(0, 1fr) [viewport-end];
	}
`;

const sectionContentStretchedRight = css`
	${from.wide} {
		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[title-start]
			repeat(3, 60px)
			[title-end content-start]
			repeat(12, 60px)
			[hide-start]
			60px
			[hide-end content-end]
			minmax(0, 1fr) [viewport-end];
	}
`;

const containerStylesToggleable = css`
	${from.leftCol} {
		grid-template-rows: auto [content-start] repeat(2, auto);
	}
	${from.wide} {
		grid-template-rows: [content-start] repeat(3, auto);
	}
`;

const headlineContainerStyles = css`
	grid-row-start: 1;
	grid-column: title;
	${from.leftCol} {
		grid-row-end: span 2;
	}

	display: flex;
	flex-direction: column;
`;

const headlineContainerBorders = css`
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
			background-color: ${neutral[86]};
		}
	}
`;

const paddings = css`
	padding-top: ${space[2]}px;
	padding-bottom: ${space[9]}px;
`;

const sectionShowHide = css`
	grid-row-start: 1;
	grid-column: hide;
	justify-self: end;
`;

const sectionContent = css`
	margin: 0;

	.hidden > & {
		display: none;
	}

	grid-column: content;

	grid-row-start: content-start;
	${from.leftCol} {
		grid-row-end: span 2;
	}
	${from.wide} {
		grid-row-end: -1;
	}
`;

const sectionContentBorder = css`
	position: relative;

	${from.leftCol} {
		::before {
			content: '';
			display: block;
			width: 1px;
			top: 0;
			bottom: 0;
			left: -10px;
			position: absolute;
			background-color: ${neutral[86]};
		}
	}
`;

const sectionContentPadded = css`
	${from.tablet} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const sectionTreats = css`
	display: none;

	${from.leftCol} {
		display: block;
		align-self: end;
		grid-row-start: -2;
		grid-column: title;
	}

	.hidden > & {
		display: none;
	}
`;

/** element which contains border and inner background colour, if set */
const decoration = css`
	grid-row: 1 / -1;

	grid-column: 1 / -1;
	${from.tablet} {
		grid-column: 2 / -2;
	}

	border-width: 1px;
	border-color: ${neutral[86]};
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
 * ┌─────┬─┐
 * │Title│X│
 * ├─────┴─┤
 * │▒▒▒▒▒▒▒│
 * │▒▒▒▒▒▒▒│
 * └───────┘
 *
 * from `tablet` (740) to `desktop` (980)
 *
 *  1 2 3 4 5 6 7 8 9 a b c (12)
 * ┌─────────────────────┬─┐
 * │Title                │X│
 * │Date                 │ │
 * ├─────────────────────┴─┤
 * │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
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
 * └─────┴─────────────────────────┘
 *
 * on `wide` (1300) with `stretchRight`
 *
 *  1 2 3 4 5 6 7 8 9 a b c d e f g (16)
 * ┌─────┬─────────────────────────┐
 * │Title│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │Date │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * ├─────┤▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │     │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │     │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * │Treat│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
 * └─────┴─────────────────────────┘
 *
 */
export const FrontSection = ({
	element = 'section',
	title,
	children,
	backgroundColour,
	borderColour,
	centralBorder,
	containerName,
	containerPalette,
	description,
	editionId,
	fontColour,
	innerBackgroundColour,
	leftColSize = 'compact',
	leftContent,
	ophanComponentLink,
	ophanComponentName,
	sectionId,
	showDateHeader = false,
	showSideBorders = true,
	showTopBorder = true,
	stretchRight = false,
	toggleable = false,
	treats,
	url,
	verticalMargins = true,
}: Props) => {
	const overrides =
		containerPalette && decideContainerOverrides(containerPalette);

	const isToggleable = toggleable && !!sectionId;

	const showDecoration =
		showTopBorder || showSideBorders || !!innerBackgroundColour;

	const childrenContainerStyles = [
		sectionContent,
		sectionContentPadded,
		centralBorder === 'full' && sectionContentBorder,
		verticalMargins && paddings,
	];

	return jsx(
		element,
		{
			/**
			 * id is being used to set the containerId in @see {ShowMore.importable.tsx}
			 * this id pre-existed showMore so is probably also being used for something else.
			 */
			id: sectionId,
			'data-link-name': ophanComponentLink,
			'data-component': ophanComponentName,
			'data-container-name': containerName,
			css: [
				fallbackStyles,
				containerStyles,
				leftColSize === 'wide' && wideLeftColumn,
				isToggleable && containerStylesToggleable,
				stretchRight && sectionContentStretchedRight,
				css`
					background-color: ${backgroundColour ??
					overrides?.background.container};
				`,
			],
		},
		<>
			{showDecoration && (
				<div
					css={[
						decoration,
						showSideBorders && sideBorders,
						showTopBorder && topBorder,
						innerBackgroundColour &&
							css`
								background-color: ${innerBackgroundColour};
							`,
					]}
				/>
			)}
			<div
				css={[
					headlineContainerStyles,
					centralBorder === 'partial' && headlineContainerBorders,
				]}
			>
				<ContainerTitle
					title={title}
					fontColour={fontColour ?? overrides?.text.container}
					description={description}
					url={url}
					containerPalette={containerPalette}
					showDateHeader={showDateHeader}
					editionId={editionId}
				/>
				{leftContent}
			</div>
			{isToggleable ? (
				<>
					<div css={sectionShowHide}>
						<ShowHideButton
							sectionId={`container-${sectionId}`}
							overrideContainerToggleColour={
								overrides?.text.containerToggle
							}
						/>
					</div>
					<div
						css={childrenContainerStyles}
						id={`container-${sectionId}`}
					>
						{children}
					</div>
				</>
			) : (
				<div css={childrenContainerStyles}>{children}</div>
			)}

			{treats && (
				<div css={[sectionTreats, verticalMargins && paddings]}>
					<Treats
						treats={treats}
						borderColour={
							borderColour ?? overrides?.border.container
						}
					/>
				</div>
			)}
		</>,
	);
};

import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { from, neutral, space, until } from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import type { DCRContainerPalette, TreatType } from '../../types/front';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import type { EditionId } from '../lib/edition';
import { ContainerTitle } from './ContainerTitle';
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
	 * @see https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/web/client/debug/README.md
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
	badge?: EmotionJSX.Element;
	/** Enable the "Show More" button on this container to allow readers to load more cards */
	canShowMore?: boolean;
	ajaxUrl?: string;
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

const containerStyles = css`
	display: grid;

	grid-template-rows:
		[headline-start show-hide-start] auto
		[show-hide-end headline-end content-toggleable-start content-start] auto
		[content-end content-toggleable-end show-more-start] auto
		[show-more-end];

	grid-template-columns:
		[viewport-start] 0px
		[content-start title-start]
		repeat(3, minmax(0, 1fr))
		[hide-start]
		minmax(0, 1fr)
		[content-end title-end hide-end]
		0px [viewport-end];

	grid-auto-flow: dense;
	column-gap: 10px;

	${from.mobileLandscape} {
		column-gap: 20px;
	}

	${from.tablet} {
		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[content-start title-start]
			repeat(11, 40px)
			[hide-start]
			40px
			[content-end title-end hide-end]
			minmax(0, 1fr) [viewport-end];
	}

	${from.desktop} {
		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[content-start title-start]
			repeat(11, 60px)
			[hide-start]
			60px
			[content-end title-end hide-end]
			minmax(0, 1fr) [viewport-end];
	}

	${from.leftCol} {
		grid-template-rows:
			[headline-start show-hide-start content-start] auto
			[show-hide-end content-toggleable-start] auto
			[headline-end treats-start] auto
			[content-end content-toggleable-end treats-end show-more-start] auto
			[show-more-end];

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
		grid-template-rows:
			[headline-start content-start content-toggleable-start show-hide-start] auto
			[show-hide-end] auto
			[headline-end treats-start] auto
			[content-end content-toggleable-end treats-end show-more-start] auto
			[show-more-end];

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
`;

const sectionHeadline = css`
	grid-row: headline;
	grid-column: title;

	display: flex;
	flex-direction: column;

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

const sectionShowMore = css`
	grid-row: show-more;
	grid-column: content;
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

const bottomPadding = css`
	padding-bottom: ${space[9]}px;
`;

const titleStyle = css`
	${until.leftCol} {
		max-width: 74%;
	}
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
				containerStyles,
				css`
					background-color: ${overrides?.background.container};
				`,
			]}
		>
			<div css={[decoration, sideBorders, showTopBorder && topBorder]} />

			<div css={[sectionHeadline]}>
				<Hide until="leftCol">{badge}</Hide>
				<div css={titleStyle}>
					<Hide from="leftCol">{badge}</Hide>
					<ContainerTitle
						title={title}
						fontColour={overrides?.text.container}
						description={description}
						url={url}
						containerPalette={containerPalette}
						showDateHeader={showDateHeader}
						editionId={editionId}
					/>
				</div>
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

			<div css={[sectionContentPadded, sectionShowMore, bottomPadding]}>
				{showMore && (
					<Island deferUntil="interaction">
						<ShowMore
							title={title}
							sectionId={sectionId}
							collectionId={collectionId}
							pageId={pageId}
							ajaxUrl={ajaxUrl}
							editionId={editionId}
							containerPalette={containerPalette}
							showAge={title === 'Headlines'}
						/>
					</Island>
				)}
			</div>

			{treats && (
				<div css={[sectionTreats, paddings]}>
					<Treats
						treats={treats}
						borderColour={overrides?.border.container}
					/>
				</div>
			)}
		</section>
	);
};

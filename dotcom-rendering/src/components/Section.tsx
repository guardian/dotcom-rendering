import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { background, from, space, until } from '@guardian/source-foundations';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import type { EditionId } from '../lib/edition';
import { hiddenStyles } from '../lib/hiddenStyles';
import type { DCRContainerPalette, TreatType } from '../types/front';
import type { ContainerOverrides } from '../types/palette';
import { ContainerTitle } from './ContainerTitle';
import { ElementContainer } from './ElementContainer';
import { Flex } from './Flex';
import { Hide } from './Hide';
import { LeftColumn } from './LeftColumn';
import { ShowHideButton } from './ShowHideButton';
import { Treats } from './Treats';

/**
 * ----- First time here? -----
 * If you're unsure how to use this component, check out `Section.stories.tsx` and
 * try running it in storybook to get an idea of how this component is used!
 */
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
	/** Defaults to `true`. If we should add padding around the outer left and right edges */
	padSides?: boolean;
	/** Defaults to `false`. If we should add padding around the outer left and right edges */
	padBottom?: boolean;
	/** Defaults to `true`. If we should add padding to the left and right of `children` */
	padContent?: boolean;
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
	/** Sets a max width and margin auto to center children */
	shouldCenter?: boolean;
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
	/** Some page types have a different left column width */
	leftColSize?: LeftColSize;
	format?: ArticleFormat;
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
	/** Applies a background colour only to the content inside the left and right borders */
	innerBackgroundColour?: string;
	/** Defaults to `false`. If true and `editionId` is also passed, then a date string is
	 * shown under the title. Typically only used on Headlines containers on fronts
	 */
	showDateHeader?: boolean;
	/** Used in parnership with `showDateHeader` to localise the date string */
	editionId?: EditionId;
	/** A list of related links that appear in the bottom of the left column on fronts */
	treats?: TreatType[];
	/** Defaults to `false`. If true, a simplified version of the section is rendered
	 * without a left column
	 */
	fullWidth?: boolean;
	/** Indicates if the page has a page skin advert
	 * When a page skin advert is active:
	 * - containers are constrained to a max width of 'desktop'
	 * - media queries above desktop are not applied
	 * - if no background colour is specified use the default body background colour to prevent
	 *   the page skin background showing through the containers
	 */
	hasPageSkin?: boolean;
	/** When there is a page skin in some special cases we still want the container to take full
	 * width but the content to constrain itself e.g. Header */
	hasPageSkinContentSelfConstrain?: boolean;
	/**
	 * @deprecated Do not use
	 *
	 * Legacy className prop only used for supporting old interactives
	 */
	className?: string;
};

const containerStyles = css`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	width: 100%;
`;

const headlineContainerStyles = css`
	display: flex;
	justify-content: flex-end;

	${until.leftCol} {
		justify-content: space-between;
	}
`;

const headlineContainerStylesWithPageSkin = css`
	display: flex;
	justify-content: space-between;
`;

const margins = css`
	margin-top: ${space[2]}px;
	/*
		Keep spacing at the bottom of the container consistent at 36px, regardless of
		breakpoint, based on chat with Harry Fisher
	*/
	margin-bottom: ${space[9]}px;
`;

const rightMargin = css`
	${from.wide} {
		margin-right: 68px;
	}
`;

const padding = (format?: ArticleFormat) => {
	switch (format?.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return css`
				padding: 0;

				${from.desktop} {
					padding: 0 10px;
				}
			`;
		default:
			return css`
				padding: 0 10px;
			`;
	}
};

const Content = ({
	children,
	padded,
	verticalMargins,
	stretchRight,
	format,
}: {
	children: React.ReactNode;
	padded: boolean;
	verticalMargins: boolean;
	stretchRight: boolean;
	format?: ArticleFormat;
}) => (
	<div
		css={[
			containerStyles,
			padded && padding(format),
			verticalMargins && margins,
			!stretchRight && rightMargin,
		]}
	>
		{children}
	</div>
);

const ContainerTitleWithHide = ({
	title,
	fontColour,
	description,
	url,
	containerPalette,
	showDateHeader,
	editionId,
	overrides,
	hasPageSkin,
}: {
	title?: string;
	fontColour?: string;
	description?: string;
	url?: string;
	containerPalette?: DCRContainerPalette;
	showDateHeader?: boolean;
	editionId?: EditionId;
	overrides?: ContainerOverrides | undefined;
	hasPageSkin?: boolean;
}) => {
	const containerTitle = (
		<ContainerTitle
			title={title}
			fontColour={fontColour ?? overrides?.text.container}
			description={description}
			url={url}
			containerPalette={containerPalette}
			showDateHeader={showDateHeader}
			editionId={editionId}
		/>
	);
	if (hasPageSkin) {
		return containerTitle;
	}
	return (
		<Hide when="above" breakpoint="leftCol">
			{containerTitle}
		</Hide>
	);
};

const decideBackgroundColour = (
	backgroundColour: string | undefined,
	overrideBackgroundColour: string | undefined,
	hasPageSkin: boolean,
) => {
	if (backgroundColour) {
		return backgroundColour;
	}
	if (overrideBackgroundColour) {
		return overrideBackgroundColour;
	}
	if (hasPageSkin) {
		return background.primary;
	}
	return undefined;
};

/**
 *
 * A Section component represents a horizontal slice of a page. It defaults to
 * a html section tag but this can be overridden using the `element` prop
 *
 *
 * It provides borders, spacing, colours, a title and also some front specific
 * features like showing a hide button. By default `children` is placed in the center
 * with a leftCol and spacing on the right - this represents a classic Guardian
 * page - but if `fullWidth={true}` is passed then both the leftCol and right spacing
 * are omitted
 */
export const Section = ({
	title,
	fontColour,
	description,
	url,
	sectionId,
	showSideBorders = true,
	centralBorder,
	showTopBorder = true,
	padSides = true,
	padBottom = false,
	padContent = true,
	verticalMargins = true,
	borderColour,
	backgroundColour,
	children,
	leftContent,
	stretchRight = false,
	leftColSize,
	format,
	ophanComponentLink,
	ophanComponentName,
	containerPalette,
	toggleable = false,
	innerBackgroundColour,
	showDateHeader = false,
	editionId,
	containerName,
	treats,
	fullWidth = false,
	element = 'section',
	shouldCenter,
	hasPageSkin = false,
	hasPageSkinContentSelfConstrain = false,
	className,
}: Props) => {
	const overrides =
		containerPalette && decideContainerOverrides(containerPalette);

	if (fullWidth) {
		return (
			<ElementContainer
				sectionId={sectionId}
				showSideBorders={showSideBorders}
				showTopBorder={showTopBorder}
				padSides={padSides}
				padBottom={padBottom}
				format={format}
				borderColour={borderColour ?? overrides?.border.container}
				backgroundColour={decideBackgroundColour(
					backgroundColour,
					overrides?.background.container,
					hasPageSkin,
				)}
				ophanComponentLink={ophanComponentLink}
				ophanComponentName={ophanComponentName}
				containerName={containerName}
				innerBackgroundColour={innerBackgroundColour}
				className={className}
				element={element}
				shouldCenter={shouldCenter}
				hasPageSkin={hasPageSkin}
				hasPageSkinContentSelfConstrain={
					hasPageSkinContentSelfConstrain
				}
			>
				{children}
			</ElementContainer>
		);
	}

	return (
		<ElementContainer
			sectionId={sectionId}
			showSideBorders={showSideBorders}
			showTopBorder={showTopBorder}
			padSides={padSides}
			format={format}
			borderColour={borderColour ?? overrides?.border.container}
			backgroundColour={decideBackgroundColour(
				backgroundColour,
				overrides?.background.container,
				hasPageSkin,
			)}
			element="section"
			ophanComponentLink={ophanComponentLink}
			ophanComponentName={ophanComponentName}
			containerName={containerName}
			innerBackgroundColour={innerBackgroundColour}
			hasPageSkin={hasPageSkin}
			hasPageSkinContentSelfConstrain={hasPageSkinContentSelfConstrain}
		>
			<Flex>
				<LeftColumn
					borderType={centralBorder}
					borderColour={borderColour ?? overrides?.border.container}
					size={leftColSize}
					verticalMargins={verticalMargins}
					hasPageSkin={hasPageSkin}
				>
					<div
						css={css`
							display: flex;
							height: 100%;
							flex-direction: column;
							justify-content: space-between;
						`}
					>
						<div>
							<ContainerTitle
								title={title}
								fontColour={
									fontColour ?? overrides?.text.container
								}
								description={description}
								url={url}
								containerPalette={containerPalette}
								showDateHeader={showDateHeader}
								editionId={editionId}
							/>
							{leftContent}
						</div>
						{treats && (
							<Treats
								treats={treats}
								borderColour={
									borderColour ?? overrides?.border.container
								}
								fontColour={
									fontColour ?? overrides?.text.container
								}
							/>
						)}
					</div>
				</LeftColumn>
				<Content
					padded={padContent}
					verticalMargins={verticalMargins}
					stretchRight={stretchRight}
					format={format}
				>
					<div
						css={
							hasPageSkin
								? headlineContainerStylesWithPageSkin
								: headlineContainerStyles
						}
					>
						<ContainerTitleWithHide
							title={title}
							fontColour={fontColour ?? overrides?.text.container}
							description={description}
							url={url}
							containerPalette={containerPalette}
							showDateHeader={showDateHeader}
							editionId={editionId}
							hasPageSkin={hasPageSkin}
						/>
						{toggleable && !!sectionId && (
							<ShowHideButton
								sectionId={sectionId}
								overrideContainerToggleColour={
									overrides?.text.containerToggle
								}
							/>
						)}
					</div>
					{toggleable && sectionId ? (
						<div css={hiddenStyles} id={`container-${sectionId}`}>
							{children}
						</div>
					) : (
						children
					)}
				</Content>
			</Flex>
		</ElementContainer>
	);
};

import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { from, space, until } from '@guardian/source-foundations';
import type { DCRContainerPalette, TreatType } from '../../types/front';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import { hiddenStyles } from '../lib/hiddenStyles';
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
	/** Defaults to `true`. If we should add padding around the outter left and right edges */
	padSides?: boolean;
	/** Defaults to `true`. If we should add padding around the outter left and right edges */
	padBottom?: boolean;
	/** Defaults to `false`. If we should add padding to the bottom of `children` */
	padContent?: boolean;
	/** The html tag used by Section defaults to `section` but can be overidden here */
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
	 * @see https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/web/browser/debug/README.md
	 */
	containerName?: string;
	/** Fronts containers can have their styling overidden using a `containerPalette` */
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
	/**
	 * @deprecated Do not use
	 *
	 * Legacy className prop only used for supporting old interactives
	 */
	className?: string;
	/**
	 *
	 * Temporary A/B test
	 */
	isMainMediaTest?: boolean;
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
	className,
	isMainMediaTest,
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
				borderColour={borderColour || overrides?.border.container}
				backgroundColour={
					backgroundColour || overrides?.background.container
				}
				ophanComponentLink={ophanComponentLink}
				ophanComponentName={ophanComponentName}
				containerName={containerName}
				innerBackgroundColour={innerBackgroundColour}
				className={className}
				element={element}
				shouldCenter={shouldCenter}
				format={format}
				isMainMediaTest={isMainMediaTest}
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
			borderColour={borderColour || overrides?.border.container}
			backgroundColour={
				backgroundColour || overrides?.background.container
			}
			element="section"
			ophanComponentLink={ophanComponentLink}
			ophanComponentName={ophanComponentName}
			containerName={containerName}
			innerBackgroundColour={innerBackgroundColour}
			format={format}
			isMainMediaTest={isMainMediaTest}
		>
			<Flex>
				<LeftColumn
					borderType={centralBorder}
					borderColour={borderColour || overrides?.border.container}
					size={leftColSize}
					verticalMargins={verticalMargins}
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
									fontColour || overrides?.text.container
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
					<div css={headlineContainerStyles}>
						<Hide when="above" breakpoint="leftCol">
							<ContainerTitle
								title={title}
								fontColour={
									fontColour || overrides?.text.container
								}
								description={description}
								url={url}
								containerPalette={containerPalette}
								showDateHeader={showDateHeader}
								editionId={editionId}
							/>
						</Hide>
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

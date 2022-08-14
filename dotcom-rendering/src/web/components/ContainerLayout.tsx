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

type Props = {
	title?: string;
	fontColour?: string;
	description?: string;
	url?: string;
	sectionId?: string;
	showSideBorders?: boolean;
	centralBorder?: 'partial' | 'full';
	showTopBorder?: boolean;
	padSides?: boolean;
	padContent?: boolean;
	element?:
		| 'div'
		| 'article'
		| 'aside'
		| 'nav'
		| 'main'
		| 'header'
		| 'section'
		| 'footer';
	shouldCenter?: boolean;
	verticalMargins?: boolean;
	backgroundColour?: string;
	borderColour?: string;
	leftContent?: React.ReactNode;
	children?: React.ReactNode;
	stretchRight?: boolean;
	leftColSize?: LeftColSize;
	format?: ArticleFormat;
	ophanComponentName?: string;
	ophanComponentLink?: string;
	containerName?: string;
	containerPalette?: DCRContainerPalette;
	toggleable?: boolean;
	innerBackgroundColour?: string;
	showDateHeader?: boolean;
	editionId?: EditionId;
	treats?: TreatType[];
	fullWidth?: boolean;
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

const Container = ({
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

export const ContainerLayout = ({
	title,
	fontColour,
	description,
	url,
	sectionId,
	showSideBorders = true,
	centralBorder,
	showTopBorder = true,
	padSides = true,
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
	showDateHeader,
	editionId,
	containerName,
	treats,
	fullWidth,
	element = 'section',
	shouldCenter,
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
				padded={padSides}
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
			padded={padSides}
			borderColour={borderColour || overrides?.border.container}
			backgroundColour={
				backgroundColour || overrides?.background.container
			}
			element="section"
			ophanComponentLink={ophanComponentLink}
			ophanComponentName={ophanComponentName}
			containerName={containerName}
			innerBackgroundColour={innerBackgroundColour}
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
				<Container
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
				</Container>
			</Flex>
		</ElementContainer>
	);
};

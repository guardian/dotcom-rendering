import { css, jsx } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, palette, space } from '@guardian/source-foundations';
import { pageSkinContainer } from '../layouts/lib/pageSkin';
import { center } from '../lib/center';
import { transparentColour } from '../lib/transparentColour';

const sidePadding = css`
	padding-left: 10px;
	padding-right: 10px;

	${from.mobileLandscape} {
		padding-left: 20px;
		padding-right: 20px;
	}
`;

const bottomPadding = css`
	padding-bottom: ${space[9]}px;
`;

const sideBorderStyles = (colour: string) => css`
	${from.tablet} {
		border-left: 1px solid ${colour};
		border-right: 1px solid ${colour};
	}
`;

const topBorderStyles = (colour: string) => css`
	border-top: 1px solid ${colour};
`;

const setBackgroundColour = (colour: string) => css`
	background-color: ${colour};
`;

//Previously, borderColour would be set to palette.neutral[86] if the parameter being passed was undefined. We still want this as a fallback, but not for ArticleDesign.Picture pages (and probably not for any future pages with a similar design).
const decideFallbackBorderColour = (format: ArticleFormat | undefined) => {
	return format?.design === ArticleDesign.Picture
		? transparentColour(palette.neutral[60], 0.5)
		: palette.neutral[86];
};

type Props = {
	sectionId?: string;
	showSideBorders?: boolean;
	showTopBorder?: boolean;
	padSides?: boolean;
	padBottom?: boolean;
	backgroundColour?: string;
	innerBackgroundColour?: string;
	borderColour?: string;
	children?: React.ReactNode;
	shouldCenter?: boolean;
	element?:
		| 'div'
		| 'article'
		| 'aside'
		| 'nav'
		| 'main'
		| 'header'
		| 'section'
		| 'footer'; // ElementContainer is generally a top-level wrapper
	className?: string;
	ophanComponentName?: string;
	ophanComponentLink?: string;
	containerName?: string;
	hasPageSkin?: boolean;
	hasPageSkinContentSelfConstrain?: boolean;
	format?: ArticleFormat;
};

/**
 * Create a react element from the tagName passed in OR
 * default to <div>
 *
 * @deprecated please use Section fullWidth={true}  instead
 */
export const ElementContainer = ({
	sectionId,
	showSideBorders = true,
	showTopBorder = true,
	padSides = true,
	padBottom = false,
	format,
	borderColour = decideFallbackBorderColour(format),
	backgroundColour,
	innerBackgroundColour,
	shouldCenter = true,
	children,
	element = 'div',
	className,
	ophanComponentName,
	ophanComponentLink,
	containerName,
	hasPageSkin = false,
	hasPageSkinContentSelfConstrain = false,
}: Props) =>
	jsx(element, {
		id: ophanComponentName,
		'data-link-name': ophanComponentLink,
		'data-component': ophanComponentName,
		'data-container-name': containerName,
		css: [
			backgroundColour && setBackgroundColour(backgroundColour),
			hasPageSkin &&
				!hasPageSkinContentSelfConstrain &&
				pageSkinContainer,
		],
		className,
		children: (
			<div
				/**
				 * id is being used to set the containerId in @see {ShowMore.importable.tsx}
				 * this id pre-existed showMore so is probably also being used for something else.
				 */
				id={sectionId}
				css={[
					shouldCenter && center,
					showSideBorders && sideBorderStyles(borderColour),
					showTopBorder && topBorderStyles(borderColour),
					innerBackgroundColour &&
						setBackgroundColour(innerBackgroundColour),
					padSides && sidePadding,
					padBottom && bottomPadding,
					hasPageSkin && pageSkinContainer,
				]}
			>
				{children}
			</div>
		),
	});

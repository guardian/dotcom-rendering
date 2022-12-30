import { ClassNames, css as emoCss } from '@emotion/react';
import { border, from, space } from '@guardian/source-foundations';
// @ts-expect-error
import { jsx as _jsx } from 'react/jsx-runtime';
import { center } from '../lib/center';

const sidePadding = emoCss`
	padding-left: 10px;
	padding-right: 10px;

	${from.mobileLandscape} {
		padding-left: 20px;
		padding-right: 20px;
	}
`;

const bottomPadding = emoCss`
	padding-bottom: ${space[9]}px;
`;

const sideBorderStyles = (colour: string) => emoCss`
	${from.tablet} {
		border-left: 1px solid ${colour};
		border-right: 1px solid ${colour};
	}
`;

const topBorderStyles = (colour: string) => emoCss`
	border-top: 1px solid ${colour};
`;

const setBackgroundColour = (colour: string) => emoCss`
	background-color: ${colour};
`;

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
};

/**
 * @deprecated please use Section fullWidth={true}  instead
 */
export const ElementContainer = ({
	sectionId,
	showSideBorders = true,
	showTopBorder = true,
	padSides = true,
	padBottom = false,
	borderColour = border.secondary,
	backgroundColour,
	innerBackgroundColour,
	shouldCenter = true,
	children,
	element = 'div',
	className,
	ophanComponentName,
	ophanComponentLink,
	containerName,
}: Props) => (
	<ClassNames>
		{({ css }) => {
			const child = (
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
						innerBackgroundColour && setBackgroundColour(innerBackgroundColour),
						padSides && sidePadding,
						padBottom && bottomPadding,
					]}
				>
					{children}
				</div>
			);
			const style = css`
				${backgroundColour && setBackgroundColour(backgroundColour)};
			`;
			// Create a react element from the tagName passed in OR
			// default to <div>
			return _jsx(`${element}`, {
				'data-link-name': ophanComponentLink,
				'data-component': ophanComponentName,
				'data-container-name': containerName,
				className: className ? `${style} ${className}` : style,
				children: child,
			});
		}}
	</ClassNames>
);

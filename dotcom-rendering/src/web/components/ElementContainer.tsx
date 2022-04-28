import { ClassNames, css as emoCss } from '@emotion/react';

import { border, from } from '@guardian/source-foundations';
// @ts-ignore
import { jsx as _jsx } from 'react/jsx-runtime';
import { center } from '../lib/center';

const padding = emoCss`
	padding: 0 10px;

	${from.mobileLandscape} {
		padding: 0 20px;
	}
`;

const sideBorders = (colour: string) => emoCss`
	${from.tablet} {
		border-left: 1px solid ${colour};
		border-right: 1px solid ${colour};
	}
`;

const topBorder = (colour: string) => emoCss`
	border-top: 1px solid ${colour};
`;

const setBackgroundColour = (colour: string) => emoCss`
	background-color: ${colour};
`;

const setHeight = (height: number) => emoCss`
	min-height: ${height}px;
`;

type Props = {
	sectionId?: string;
	showSideBorders?: boolean;
	showTopBorder?: boolean;
	padded?: boolean;
	backgroundColour?: string;
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
	fixedHeight?: number;
};

export const ElementContainer = ({
	sectionId,
	showSideBorders = true,
	showTopBorder = true,
	padded = true,
	borderColour = border.secondary,
	backgroundColour,
	shouldCenter = true,
	children,
	element = 'div',
	className,
	ophanComponentName,
	ophanComponentLink,
	fixedHeight,
}: Props) => (
	<ClassNames>
		{({ css }) => {
			const child = (
				<div
					id={sectionId}
					css={[
						shouldCenter && center,
						showSideBorders && sideBorders(borderColour),
						showTopBorder && topBorder(borderColour),
						padded && padding,
						fixedHeight && setHeight(fixedHeight),
					]}
				>
					{children && children}
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
				className: className ? `${style} ${className}` : style,
				children: child,
			});
		}}
	</ClassNames>
);

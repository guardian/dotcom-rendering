import { ClassNames, css as emoCss } from '@emotion/react';
import { border, from } from '@guardian/source-foundations';
// @ts-expect-error
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

type Props = {
	sectionId?: string;
	showSideBorders?: boolean;
	showTopBorder?: boolean;
	padded?: boolean;
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

export const ElementContainer = ({
	sectionId,
	showSideBorders = true,
	showTopBorder = true,
	padded = true,
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
					id={sectionId}
					css={[
						shouldCenter && center,
						showSideBorders && sideBorders(borderColour),
						showTopBorder && topBorder(borderColour),
						innerBackgroundColour &&
							setBackgroundColour(innerBackgroundColour),
						padded && padding,
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

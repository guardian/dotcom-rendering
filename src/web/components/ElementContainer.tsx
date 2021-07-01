import { ClassNames, css as emoCss } from '@emotion/react';

import { border } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { center } from '@root/src/web/lib/center';
// @ts-ignore-start
import { jsx as _jsx } from 'react/jsx-runtime';
// @ts-ignore-end

const padding = emoCss`
	padding: 0 10px;

	${from.mobileLandscape} {
		padding: 0 20px;
	}
`;

const adStyles = emoCss`
	& .ad-slot.ad-slot--collapse {
		display: none;
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
	borderColour?: string;
	children?: React.ReactNode;
	shouldCenter?: boolean;
	element?: 'div' | 'article' | 'aside' | 'nav'; // ElementContainer is generally a top-level wrapper
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
					]}
				>
					{children && children}
				</div>
			);
			const style = css`
				${adStyles}
				${backgroundColour && setBackgroundColour(backgroundColour)}
			`;
			// Create a react element from the tagName passed in OR
			// default to <div>
			return _jsx(`${element}`, {
				className: style,
				children: child,
			});
		}}
	</ClassNames>
);

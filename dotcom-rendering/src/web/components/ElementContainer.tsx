import { ClassNames, css as emoCss } from '@emotion/react';

import { border } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { center } from '@root/src/web/lib/center';
// @ts-ignore-start
import { jsx as _jsx } from 'react/jsx-runtime';
// @ts-ignore-end
import { labelStyles as adLabelStyles } from './AdSlot';

const padding = emoCss`
	padding: 0 10px;

	${from.mobileLandscape} {
		padding: 0 20px;
	}
`;

const adStylesDynamic = emoCss`
	& .ad-slot.ad-slot--collapse {
		display: none;
	}

	${from.tablet} {
		.mobile-only .ad-slot {
			display: none;
		}
	}

	${until.tablet} {
		.hide-until-tablet .ad-slot {
			display: none;
		}

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

const bottomBorder = (colour: string) => emoCss`
	border-bottom: 1px solid ${colour};
`;

const setBackgroundColour = (colour: string) => emoCss`
	background-color: ${colour};
`;

type Props = {
	sectionId?: string;
	showSideBorders?: boolean;
	showTopBorder?: boolean;
	showBottomBorder?: boolean;
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
	showBottomBorder = false,
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
						showBottomBorder && bottomBorder(borderColour),
						padded && padding,
					]}
				>
					{children && children}
				</div>
			);
			// Apply ad styles to dynamic ad slots (i.e. slots that are not fixed), e.g. ads inserted
			// by spacefinder and ads in interactive articles
			const style = css`
				${adStylesDynamic}
				${adLabelStyles}
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

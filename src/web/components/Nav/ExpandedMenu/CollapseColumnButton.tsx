import { css } from '@emotion/react';

import { from } from '@guardian/src-foundations/mq';
import { brandText, brandAlt } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';

const hideDesktop = css`
	${from.desktop} {
		display: none;
	}
`;

const showColumnLinksStyle = (columnInputId: string) => css`
	/*
        IMPORTANT NOTE:
        we need to specify the adjacent path to the a (current) tag
        to apply styles to the nested tabs due to the fact we use ~
        to support NoJS
    */
	/* stylelint-disable-next-line selector-type-no-unknown */
	${`#${columnInputId}`}:checked ~ & {
		:before {
			margin-top: 8px;
			transform: rotate(-135deg);
		}
	}
`;

const collapseColumnButton = css`
	user-select: none;
	background-color: transparent;
	border: 0;
	box-sizing: border-box;
	cursor: pointer;
	color: ${brandText.primary};
	display: block;
	${headline.xsmall()};
	font-weight: 700;
	outline: none;
	padding: 6px 34px 18px 50px;
	position: relative;
	text-align: left;
	width: 100%;
	> * {
		pointer-events: none;
	}
	text-transform: capitalize;
	:before {
		margin-top: 4px;
		left: 25px;
		position: absolute;
		border: 2px solid currentColor;
		border-top: 0;
		border-left: 0;
		content: '';
		display: inline-block;
		height: 10px;
		transform: rotate(45deg);
		width: 10px;
	}
	:hover,
	:focus {
		color: ${brandAlt[400]};
	}
`;

export const CollapseColumnButton: React.FC<{
	title: string;
	columnInputId: string;
	collapseColumnInputId: string;
	ariaControls: string;
}> = ({ title, columnInputId, collapseColumnInputId, ariaControls }) => (
	/* eslint-disable @typescript-eslint/ban-ts-comment, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role */
	// @ts-ignore
	<label
		id={collapseColumnInputId}
		className="selectableMenuItem"
		css={[
			collapseColumnButton,
			showColumnLinksStyle(columnInputId),
			hideDesktop,
		]}
		aria-label={`Toggle ${title}`}
		htmlFor={columnInputId}
		aria-haspopup="true"
		aria-controls={ariaControls}
		// @ts-ignore
		tabIndex={-1}
		role="menuitem"
		data-cy={`column-collapse-${title}`}
		data-link-name={`nav2 : column-toggle-${title}: show`}
	>
		{title}
	</label>
	/* eslint-enable @typescript-eslint/ban-ts-comment, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role  */
);

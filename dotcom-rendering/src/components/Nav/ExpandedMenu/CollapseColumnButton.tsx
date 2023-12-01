import { css } from '@emotion/react';
import {
	brandText,
	from,
	headline,
	palette as sourcePalette,
	textSans,
} from '@guardian/source-foundations';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';

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
		color: ${sourcePalette.brandAlt[400]};
	}
`;

const editionStyle = css`
	text-transform: none;
	${textSans.medium()};
`;
type Props = {
	title: string;
	columnInputId: string;
	collapseColumnInputId: string;
	ariaControls: string;
};

export const CollapseColumnButton = ({
	title,
	columnInputId,
	collapseColumnInputId,
	ariaControls,
}: Props) => (
	<label
		id={collapseColumnInputId}
		className="selectableMenuItem"
		css={[
			collapseColumnButton,
			title.includes('edition') && editionStyle,
			showColumnLinksStyle(columnInputId),
			hideDesktop,
		]}
		aria-label={`Toggle ${title}`}
		htmlFor={columnInputId}
		aria-haspopup="true"
		aria-controls={ariaControls}
		tabIndex={-1}
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- we’re using this label for a CSS-only toggle
		role="menuitem"
		data-testid={`column-collapse-${title}`}
		data-link-name={nestedOphanComponents('nav2', `secondary`, title)}
	>
		{title}
	</label>
);

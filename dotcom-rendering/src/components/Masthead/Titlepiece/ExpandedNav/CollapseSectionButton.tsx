/**
 * @file
 * This file was largely copied from src/components/Nav/ExpandedMenu/CollapseColumButton.tsx
 */
import { css } from '@emotion/react';
import {
	headlineBold24,
	space,
	textSans17,
} from '@guardian/source/foundations';
import { nestedOphanComponents } from '../../../../lib/ophan-helpers';
import { expandedNavLinkStyles, hideFromDesktop } from '../commonStyles';

type Props = {
	title: string;
	columnInputId: string;
	collapseColumnInputId: string;
	ariaControls: string;
};

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
			margin-top: ${space[2]}px;
			transform: rotate(-135deg);
		}
	}
`;

const collapseColumnButton = css`
	${headlineBold24};

	${expandedNavLinkStyles};
	padding: ${space[2]}px ${space[8]}px ${space[2]}px ${space[12]}px;

	display: block;

	user-select: none;
	text-transform: capitalize;

	:before {
		margin-top: ${space[1]}px;
		left: ${space[6]}px;
		position: absolute;
		border: 2px solid currentColor;
		border-top: 0;
		border-left: 0;
		content: '';
		display: inline-block;
		transform: rotate(45deg);
		height: 10px;
		width: 10px;
	}
`;

const editionStyle = css`
	text-transform: none;
	${textSans17};
`;

/**
 * Mobile only button to collapse a pillar section
 */
export const CollapseSectionButton = ({
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
			hideFromDesktop,
		]}
		aria-label={`Toggle ${title}`}
		htmlFor={columnInputId}
		aria-haspopup="true"
		aria-controls={ariaControls}
		tabIndex={-1}
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- we’re using this label for a CSS-only toggle
		role="menuitem"
		data-testid={`column-collapse-${title}`}
		data-link-name={nestedOphanComponents('header', 'secondary', title)}
	>
		{title}
	</label>
);

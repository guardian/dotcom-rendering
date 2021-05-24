import { css } from '@emotion/react';

import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { from } from '@guardian/src-foundations/mq';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';

import { Display } from '@guardian/types';
import { getZIndex } from '@root/src/web/lib/getZIndex';
import { navInputCheckboxId, veggieBurgerId } from '../config';

const screenReadable = css`
	${visuallyHidden};
`;

const beforeAfterStyles = css`
	content: '';
	background-color: currentColor;
`;

const lineStyles = css`
	height: 2px;
	left: 0;
	position: absolute;
	width: 20px;
`;
const veggieBurgerIconStyles = css`
	background-color: currentColor;
	/*
            IMPORTANT NOTE:
            we need to specify the adjacent path to the a (current) tag
            to apply styles to the nested tabs due to the fact we use ~
            to support NoJS
        */
	/* stylelint-disable-next-line selector-type-no-unknown */
	${`#${navInputCheckboxId}`}:checked ~ div & {
		background-color: transparent;
	}

	top: 50%;
	right: 0;
	margin-top: -1px;
	margin-left: auto;
	margin-right: auto;
	${lineStyles};

	:before {
		${lineStyles};
		${beforeAfterStyles};
		top: -6px;
		/* refer to comment above */
		/* stylelint-disable-next-line selector-type-no-unknown */
		${`#${navInputCheckboxId}`}:checked ~ div & {
			top: 0;
			transform: rotate(-45deg);
		}
	}
	:after {
		${lineStyles};
		${beforeAfterStyles};
		bottom: -6px;
		/* refer to comment above */
		/* stylelint-disable-next-line selector-type-no-unknown */
		${`#${navInputCheckboxId}`}:checked ~ div & {
			bottom: 0;
			transform: rotate(45deg);
		}
	}
`;

const veggieBurgerStyles = (display: Display) => css`
	background-color: ${brandAlt[400]};
	color: ${neutral[7]};
	cursor: pointer;
	height: 42px;
	min-width: 42px;
	position: absolute;
	border: 0;
	border-radius: 50%;

	${getZIndex('burger')}

	right: 5px;
	bottom: 48px;
	${from.mobileMedium} {
		bottom: ${display === Display.Immersive ? '3px' : '-3px'};
		right: 5px;
	}
	${from.mobileLandscape} {
		right: 18px;
	}
	${from.tablet} {
		bottom: 3px;
	}
	${from.desktop} {
		display: none;
	}

	:focus {
		outline: none;
	}
`;

export const VeggieBurgerMenu: React.FC<{
	display: Display;
}> = ({ display }) => {
	return (
		/* eslint-disable @typescript-eslint/ban-ts-comment, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role */
		// @ts-ignore
		<label
			id={veggieBurgerId}
			css={veggieBurgerStyles(display)}
			aria-label="Toggle main menu"
			key="OpenExpandedMenuButton"
			htmlFor={navInputCheckboxId}
			data-link-name="nav2 : veggie-burger: show"
			// @ts-ignore
			tabIndex={0}
			role="button"
			data-cy="veggie-burger"
		>
			<span css={screenReadable}>Show More</span>
			<span css={veggieBurgerIconStyles} />
		</label>
		/* eslint-enable @typescript-eslint/ban-ts-comment, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role  */
	);
};

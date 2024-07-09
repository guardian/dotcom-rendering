import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { palette } from '../../../palette';

/**
 * Removes bullet points from unordered list elements
 * and adds zero width space for screen readers
 */
export const listAccessibility = css`
	list-style: none;
	/* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns */
	/* Needs double escape char: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#es2018_revision_of_illegal_escape_sequences */
	&::before {
		content: '\\200B'; /* Zero width space */
		display: block;
		height: 0;
		width: 0;
	}
`;

/** Hides element from view from desktop breakpoint */
export const hideFromDesktop = css`
	${from.desktop} {
		display: none;
	}
`;

export const expandedNavLinkStyles = css`
	position: relative;
	display: inline-block;
	text-align: left;
	box-sizing: border-box;
	border: 0;
	outline: none;
	cursor: pointer;
	width: 100%;
	color: ${palette('--masthead-nav-link-text')};
	text-decoration: none;
	padding: ${space[2]}px ${space[8]}px ${space[2]}px ${space[12]}px;

	> * {
		pointer-events: none;
	}

	${from.tablet} {
		padding-left: 60px;
	}

	${from.desktop} {
		padding: 6px 0;
	}
	:hover,
	:focus {
		color: ${palette('--masthead-nav-link-text-hover')};
	}
`;

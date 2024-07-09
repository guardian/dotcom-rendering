import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { palette } from '../../../../palette';

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
export const hideDesktop = css`
	${from.desktop} {
		display: none;
	}
`;

export const pointerEventsNone = css`
	> * {
		pointer-events: none;
	}
`;

export const mobilePillarStyles = css`
	padding: ${space[2]}px ${space[8]}px ${space[2]}px ${space[12]}px;
`;

export const sharedLiStyles = css`
	:hover,
	:focus {
		color: ${palette('--masthead-nav-link-text-hover')};
	}
`;

export const sharedHoverStyles = css`
	:hover,
	:focus {
		color: ${palette('--masthead-nav-link-text-hover')};
	}
`;

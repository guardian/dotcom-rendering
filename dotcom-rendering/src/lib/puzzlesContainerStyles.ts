import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { palette as themePalette } from '../palette';

/** Match the masthead/subnav container at each layout breakpoint. */
export const puzzlesContainerStyles = css`
	box-sizing: border-box;
	width: 100%;
	margin: 0 auto;
	${from.tablet} {
		max-width: 740px;
	}
	${from.desktop} {
		max-width: 980px;
		border-right: 1px solid ${themePalette('--puzzles-border-colour')};
		border-left: 1px solid ${themePalette('--puzzles-border-colour')};
	}
	${from.leftCol} {
		max-width: 1140px;
	}
	${from.wide} {
		max-width: 1300px;
	}
`;

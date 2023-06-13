import { css, keyframes } from '@emotion/react';

/**
 * Sometimes we want to animate in new content using plain
 * javascript. We use these classes to do that.
 */
export const revealStyles = css`
	/* We're using classnames here because we add and remove these classes
	   using plain javascript */
	.reveal {
		animation: ${keyframes`
			0% { opacity: 0; }
			100% { opacity: 1; }
		`} 1s ease-out;
	}
	.reveal-slowly {
		animation: ${keyframes`
			0% { opacity: 0; }
			100% { opacity: 1; }
		`} 4s ease-out;
	}
	.pending {
		display: none;
	}
`;

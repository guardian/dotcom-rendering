// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	brandAlt,
	brandAltBackground,
	from,
	neutral,
	remSpace,
	textSans17,
	headlineMedium24,
	article17,
} from '@guardian/source-foundations';
import { darkModeCss } from 'styles';

// ----- Styles ----- //

const styles: SerializedStyles = css`
	& > div {
		${from.wide} {
			margin: ${remSpace[3]} 0;
		}

		border-top: 1px solid ${brandAltBackground.primary};
		background: ${neutral[97]};
		padding: ${remSpace[3]};
		${article17};
		clear: left;
	}

	h1:first-of-type {
		margin-top: 0;
		${headlineMedium24}
	}

	button {
		margin: 0 ${remSpace[3]} ${remSpace[3]} 0;
	}

	.button-container {
		margin-top: ${remSpace[9]};
	}

	mark {
		background: ${brandAltBackground.primary};
		padding: 0.1rem 0.125rem;
	}

	// Source Button styles
	.button-container svg {
		margin-right: -4px;
		flex: 0 0 auto;
		display: block;
		fill: currentColor;
		position: relative;
		width: 30px;
		height: auto;
	}

	.src-button-space {
		width: 12px;
	}

	button {
		display: inline-flex;

		justify-content: space-between;

		align-items: center;
		box-sizing: border-box;
		border: none;
		background: transparent;
		cursor: pointer;
		transition: 0.3s ease-in-out;
		text-decoration: none;
		white-space: nowrap;
		${textSans17};
		line-height: 1.5;
		font-weight: 700;
		height: 44px;
		min-height: 44px;
		padding: 0 20px;
		border-radius: 44px;
		padding-bottom: 2px;
		background-color: #ffe500;
		color: #052962;

		margin: 0 ${remSpace[3]} ${remSpace[3]} 0;
	}
`;

const darkStyles: SerializedStyles = darkModeCss`
	& > div {
		color: ${neutral[93]};
		background-color: ${neutral[20]};
		border-top: 1px solid ${brandAlt[200]};

		mark {
			background: ${brandAlt[200]};
		}

		.button-container button {
			background: ${brandAlt[200]};
		}
	}

`;

function Epic(): React.ReactElement {
	return <div css={[styles, darkStyles]} id="js-epic-placeholder"></div>;
}

// ----- Exports ----- //

export default Epic;

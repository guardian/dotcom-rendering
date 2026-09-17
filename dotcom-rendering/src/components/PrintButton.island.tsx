import { css } from '@emotion/react';
import { remSpace } from '@guardian/source/foundations';

const printButtonStyles = css`
	background: none;
	border: 1px solid currentColor;
	border-radius: 100px;
	padding: 4px 12px;
	margin: ${remSpace[2]}px 0;
	cursor: pointer;
	font-size: inherit;
	color: inherit;

	@media print {
		display: none;
	}
`;

/**
 * `window.print()` only runs client-side, so this must be hydrated via
 * `Island` (see `PuzzlePageLayout.tsx`) rather than rendered inline - a
 * plain server-rendered `onClick` never gets attached in the browser.
 */
export const PrintButton = () => (
	<button
		type="button"
		css={printButtonStyles}
		onClick={() => alert('window.print()')}
	>
		Print
	</button>
);

import { css } from '@emotion/react';
import { Button, SvgShareWeb } from '@guardian/source/react-components';
import { palette as themePalette } from '../palette';

const buttonStyles = (sizeXSmall: boolean) => css`
	transition: none;
	border: 1px solid ${themePalette('--share-button-border')};
	color: ${themePalette('--share-button')};
	padding: ${sizeXSmall && '0 10px'};
	svg {
		fill: ${themePalette('--share-button')};
	}
	:hover {
		background-color: ${themePalette('--share-button')};
		border-color: ${themePalette('--share-button')};
		color: ${themePalette('--share-button-hover')};
		svg {
			fill: ${themePalette('--share-button-hover')};
		}
	}
`;

/**
 * `window.print()` only runs client-side, so this must be hydrated via
 * `Island` (see `PuzzlePageLayout.tsx`) rather than rendered inline - a
 * plain server-rendered `onClick` never gets attached in the browser.
 */
export const PrintButton = () => {
	return (
		<Button
			onClick={() => window.print()}
			size="small"
			type="button"
			priority="tertiary"
			iconSide="left"
			icon={<SvgShareWeb />}
			cssOverrides={css([buttonStyles(true)])}
		>
			Print version
		</Button>
	);
};

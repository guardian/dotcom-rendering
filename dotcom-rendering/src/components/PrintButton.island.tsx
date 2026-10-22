import { css } from '@emotion/react';
import {
	Button,
	LinkButton,
	SvgDocument,
} from '@guardian/source/react-components';
import { palette as themePalette } from '../palette';

const buttonStyles = css`
	transition: none;
	border: 1px solid ${themePalette('--share-button-border')};
	color: ${themePalette('--share-button')};
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
	:focus {
		/* stylelint-disable-next-line declaration-no-important */
		outline: 0 !important;
	}
`;

/**
 * Without `href`, `window.print()` only runs client-side, so this must be
 * hydrated via `Island` (see `PuzzlePageLayout.tsx`) rather than rendered
 * inline - a plain server-rendered `onClick` never gets attached in the
 * browser.
 *
 * With `href` (e.g. a crossword's PDF) it renders as a plain link, which
 * needs no hydration.
 */
export const PrintButton = ({ href }: { href?: string }) => {
	if (href !== undefined) {
		return (
			<LinkButton
				href={href}
				target="_blank"
				rel="noreferrer"
				size="small"
				priority="tertiary"
				iconSide="left"
				icon={<SvgDocument />}
				cssOverrides={css(buttonStyles)}
			>
				Print version
			</LinkButton>
		);
	}

	return (
		<Button
			onClick={() => window.print()}
			size="small"
			type="button"
			priority="tertiary"
			iconSide="left"
			icon={<SvgDocument />}
			cssOverrides={css(buttonStyles)}
		>
			Print version
		</Button>
	);
};

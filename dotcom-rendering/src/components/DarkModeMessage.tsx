import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';

export const DarkModeMessage = () => (
	<aside
		css={css`
			display: none;
			@media (prefers-color-scheme: dark) {
				padding: ${space[4]}px;
				${textSans.medium()}
				display: block;
				background-color: ${palette.neutral[7]};
				color: ${palette.neutral[97]};
			}
		`}
	>
		<p
			css={css`
				max-width: 60ch;
			`}
		>
			As part of this beta release, we are currently lacking support for
			“dark mode.” We hope to make it available in the coming weeks. In
			the meantime, you can use the main app or see articles in “light
			mode.”
		</p>
	</aside>
);

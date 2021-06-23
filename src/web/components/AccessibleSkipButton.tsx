import { css } from '@emotion/react';

import { brand } from '@guardian/src-foundations/palette';

export const AccessibleSkipButton = () => {
	return (
		<a
			href="#maincontent"
			css={css`
				border: 0;
				clip: rect(0 0 0 0);
				height: 0.0625rem;
				margin: -0.0625rem;
				overflow: hidden;
				padding: 0;
				position: absolute;
				width: 0.0625rem;
				&:focus,
				&:active {
					font-size: 80%;
					display: block;
					color: ${brand[300]};
					text-decoration: none;
					position: static;
					width: 100%;
					height: 1.125rem;
					text-align: center;
				}
			`}
		>
			Skip to main content
		</a>
	);
};

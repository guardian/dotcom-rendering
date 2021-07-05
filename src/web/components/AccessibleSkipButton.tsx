import { css } from '@emotion/react';
import { textSans } from '@guardian/src-foundations/typography';
import { neutral, border } from '@guardian/src-foundations/palette';

export const AccessibleSkipButton = () => {
	return (
		<a
			href="#maincontent"
			css={css`
				${textSans.xlarge()}
				height: 65px;
				top: -65px;
				line-height: 55px;
				overflow: hidden;
				padding: 0;
				position: absolute;
				background: ${neutral[100]};
				display: block;
				text-align: center;
				margin: 0;
				overflow: hidden;
				text-decoration: none;
				&:focus,
				&:active {
					border: 5px solid ${border.focusHalo};
					position: static;
				}
			`}
		>
			Skip to main content
		</a>
	);
};

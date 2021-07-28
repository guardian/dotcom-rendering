import { css } from '@emotion/react';
import { textSans } from '@guardian/src-foundations/typography';
import { neutral, border } from '@guardian/src-foundations/palette';

export const AccessibleSkipButton = () => {
	return (
		<a
			href="#maincontent"
			css={css`
				${textSans.medium()}
				height: 40px;
				top: -40px;
				line-height: 30px;
				overflow: hidden;
				padding: 0;
				position: absolute;
				background: ${neutral[100]};
				display: block;
				text-align: center;
				margin: 0;
				text-decoration: none;
				color: ${neutral[0]};
				&:focus,
				&:active {
					border: 5px solid ${border.focusHalo};
					position: static;
				}
				&:visited,
				&:active {
					color: ${neutral[0]};
				}
			`}
		>
			Skip to main content
		</a>
	);
};

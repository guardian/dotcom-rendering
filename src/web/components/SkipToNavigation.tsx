import { css } from '@emotion/react';
import { textSans } from '@guardian/src-foundations/typography';
import { neutral, border } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';

export const SkipToNavigation = () => {
	return (
		<>
			<a
				href="#veggie-burger"
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
					display: block;
					${from.desktop} {
						display: none;
					}
				`}
			>
				Skip to navigation
			</a>
			<a
				href="#show-more-button"
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
					display: none;
					${from.desktop} {
						display: block;
					}
				`}
			>
				Skip to navigation
			</a>
		</>
	);
};

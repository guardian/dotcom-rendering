import { css, keyframes } from '@emotion/react';
import { palette } from '@guardian/source-foundations';

const flash = keyframes`
	0% {
		background-color: ${palette.neutral[46]};
		box-shadow: 26px 0 ${palette.neutral[46]}, -26px 0 ${palette.neutral[100]};
	}
	50% {
		background-color: ${palette.neutral[100]};
		box-shadow: 26px 0 ${palette.neutral[46]}, -26px 0 ${palette.neutral[46]};
	}
	100% {
		background-color: ${palette.neutral[46]};
		box-shadow: 26px 0 ${palette.neutral[100]}, -26px 0 ${palette.neutral[46]};
	}
`;

/**
 * Three pulsing pamplemouse pips
 *
 * This component is designed to look like the pamplemouse loader in frontend.
 * @see https://github.com/guardian/frontend/blob/main/static/src/stylesheets/module/_loader.scss
 *
 * Pamplemouse? Pretty sure it was only called this to ensure the classnames were unique
 */
export const LightboxLoader = () => {
	return (
		<div
			css={css`
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: ${palette.neutral[10]};
				position: absolute;
				top: 0;
				left: 0;
			`}
		>
			<span
				css={css`
					width: 12px;
					height: 12px;
					border-radius: 50%;
					background-color: ${palette.neutral[100]};
					box-shadow:
						26px 0 ${palette.neutral[100]},
						-26px 0 ${palette.neutral[100]};
					position: relative;
					animation: ${flash} 0.5s ease-out infinite alternate;
					@media (prefers-reduced-motion) {
						animation: none;
					}
				`}
			></span>
		</div>
	);
};

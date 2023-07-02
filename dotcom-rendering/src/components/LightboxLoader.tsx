import { css, keyframes } from '@emotion/react';
import { neutral } from '@guardian/source-foundations';

const flash = keyframes`
	0% {
		background-color: #fff2;
		box-shadow: 26px 0 #fff2, -26px 0 #fff;
	}
	50% {
		background-color: #fff;
		box-shadow: 26px 0 #fff2, -26px 0 #fff2;
	}
	100% {
		background-color: #fff2;
		box-shadow: 26px 0 #fff, -26px 0 #fff2;
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
export const LightboxLoader = ({ position }: { position: number }) => {
	return (
		<div
			id={`lightbox-loader-${position}`}
			css={css`
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: ${neutral[10]};
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
					background-color: #fff;
					box-shadow: 26px 0 #fff, -26px 0 #fff;
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

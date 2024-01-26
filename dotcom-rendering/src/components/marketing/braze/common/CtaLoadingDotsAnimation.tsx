import { css, keyframes } from '@emotion/react';
import type { LoadingDotsColorStyles } from '../styles/colorData';

// CTA dots animation
// -------------------------------------------------------
const loadingAnimKeyframes = keyframes`
    0% {
        transform: scale(1);
        filter: brightness(1);
    }
    15% {
        transform: scale(1.333);
        filter: brightness(0.7);
    }
    30% {
        transform: scale(1);
        filter: brightness(1);
    }
`;

const loadingAnimCss = css`
	circle {
		animation: ${loadingAnimKeyframes} 1.5s ease infinite;
	}
	#dot_1 {
		animation-delay: 0ms;
		transform-origin: 3px 3.5px;
	}
	#dot_2 {
		animation-delay: 400ms;
		transform-origin: 17.4px 3.5px;
	}
	#dot_3 {
		animation-delay: 800ms;
		transform-origin: 31.7px 3.5px;
	}
`;

export const LoadingDots = ({
	styleReminderAnimation,
}: LoadingDotsColorStyles) => (
	<svg
		width="50"
		height="17"
		viewBox="-5 -5 45 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		css={loadingAnimCss}
	>
		<g id="Dots step 1">
			<g id="Group 660">
				<circle
					id="dot_1"
					opacity="0.5"
					cx="3.0152"
					cy="3.56641"
					r="3"
					fill={styleReminderAnimation}
				/>
				<circle
					id="dot_2"
					opacity="0.5"
					cx="17.3748"
					cy="3.56641"
					r="3"
					fill={styleReminderAnimation}
				/>
				<circle
					id="dot_3"
					opacity="0.5"
					cx="31.7348"
					cy="3.56641"
					r="3"
					fill={styleReminderAnimation}
				/>
			</g>
		</g>
	</svg>
);

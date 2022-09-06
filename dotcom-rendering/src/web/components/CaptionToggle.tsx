import { css } from '@emotion/react';

const captionToggleStyles = css`
	#the-checkbox {
		/* Never show the input */
		display: none;
	}
	#the-caption {
		/* Hide caption by default */
		display: none;
	}
	#the-checkbox:checked + #the-caption {
		/* Show the caption if the input is checked */
		display: block;
	}
`;

const toggleStyles = css`
	position: absolute;
	bottom: 5px;
	right: 5px;
	width: 32px;
	height: 32px;
	z-index: 1;
	/* We're using rgba here for the opactiy */
	background-color: rgba(18, 18, 18, 0.6);
	border-radius: 50%;
	border: none;
	cursor: pointer;

	svg {
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto;
		position: absolute;
		fill: white;
	}
`;

export const CaptionToggle = ({ children }: { children: React.ReactNode }) => (
	<div css={captionToggleStyles}>
		{/* Toggle contains the input with id #the-checkbox */}
		<>
			<label htmlFor="the-checkbox" css={[toggleStyles]}>
				<svg width="6" height="14" fill="white" viewBox="0 0 6 14">
					<path d="M4.6 12l-.4 1.4c-.7.2-1.9.6-3 .6-.7 0-1.2-.2-1.2-.9 0-.2 0-.3.1-.5l2-6.7H.7l.4-1.5 4.2-.6h.2L3 12h1.6zm-.3-9.2c-.9 0-1.4-.5-1.4-1.3C2.9.5 3.7 0 4.6 0 5.4 0 6 .5 6 1.3c0 1-.8 1.5-1.7 1.5z" />
				</svg>
			</label>
			{/* Hidden input used to toggle the caption using css */}
			<input type="checkbox" id="the-checkbox" />
		</>
		<div id="the-caption">{children}</div>
	</div>
);

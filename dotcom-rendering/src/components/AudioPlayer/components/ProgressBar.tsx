import { css } from '@emotion/react';
import { from, palette } from '@guardian/source/foundations';

const cursorWidth = '4px';

export const ProgressBar = ({
	progress,
	...props
}: React.ComponentPropsWithoutRef<'div'> & { progress: number }) => (
	<div
		css={css`
			grid-area: progress-bar;
			background-color: ${palette.neutral[46]};
			border-top: 1px solid ${palette.neutral[46]};
			padding: 0 10px;
			position: relative;
			cursor: pointer;

			${from.leftCol} {
				border-top: none;
				padding: 0;
			}
		`}
		{...props}
	>
		<div
			css={css`
				width: 100%;
				height: 100%;
				background-color: ${palette.neutral[38]};
				pointer-events: none;
				transition: transform 50ms ease-out;
				/* this is the yellow '|' cursor */
				border-left: ${cursorWidth} solid ${palette.brandAlt[400]};
			`}
			style={{
				transform: `translateX(clamp(0px, ${progress}%, calc(${progress}% - ${cursorWidth})))`,
			}}
		></div>
	</div>
);

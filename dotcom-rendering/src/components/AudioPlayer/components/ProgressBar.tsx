import { css } from '@emotion/react';
import { from, palette } from '@guardian/source/foundations';

const cursorWidth = '4px';

export const ProgressBar = ({
	progress,
	isScrubbing,
	...props
}: React.ComponentPropsWithoutRef<'div'> & {
	isScrubbing: boolean;
	progress: number;
}) => {
	return (
		<div
			css={css`
				grid-area: progress-bar;
				background-color: ${palette.neutral[46]};
				border-top: 1px solid ${palette.neutral[46]};
				padding: 0 10px;
				position: relative;
				overflow: hidden;
				cursor: ${isScrubbing ? 'grabbing' : 'pointer'};

				${from.leftCol} {
					border-top: none;
					padding: 0;
				}
			`}
			{...props}
		>
			<button
				type="button"
				css={css`
					width: 100%;
					height: 100%;
					background-color: ${palette.neutral[38]};

					transition: transform 10ms ease-out;
					position: relative;

					cursor: ${isScrubbing ? 'grabbing' : 'pointer'};

					border: none;
					/* this is the yellow '|' cursor */

					border-left: ${cursorWidth} solid ${palette.brandAlt[400]};

					::before {
						content: '';
						position: absolute;
						top: 0;
						left: -8px;
						width: 12px;
						height: 100%;
						cursor: ${isScrubbing ? 'grabbing' : 'grab'};
					}
				`}
				style={{
					transform: `translateX(clamp(0px, ${progress}%, calc(${progress}% - ${cursorWidth})))`,
				}}
			></button>
		</div>
	);
};

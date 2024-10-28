import { css } from '@emotion/react';
import { from, palette } from '@guardian/source/foundations';
import { WaveForm } from './WaveForm';

const cursorWidth = '4px';

const Cursor = ({
	isScrubbing,
	canJumpToPoint,
	progress,
}: {
	isScrubbing: boolean;
	canJumpToPoint: boolean;
	progress: number;
}) => (
	<div
		css={css`
			width: 100%;
			height: 100%;
			transition: transform 10ms ease-out;
			position: relative;
			cursor: ${isScrubbing
				? 'grabbing'
				: canJumpToPoint
				? 'pointer'
				: 'default'};

			/* this is the yellow '|' cursor */
			border-left: ${cursorWidth} solid ${palette.brandAlt[400]};

			/* a wider 'grabbable' area */
			::before {
				content: '';
				position: absolute;
				top: 0;
				left: -8px;
				width: 12px;
				height: 100%;
				cursor: ${isScrubbing
					? 'grabbing'
					: canJumpToPoint
					? 'grab'
					: 'default'};
			}
		`}
		style={{
			transform: `translateX(clamp(0%, ${progress}%, 100% - ${cursorWidth}))`,
		}}
	></div>
);

export const ProgressBar = ({
	progress,
	buffer,
	src,
	isScrubbing,
	canJumpToPoint,
	...props
}: React.ComponentPropsWithoutRef<'div'> & {
	isScrubbing: boolean;
	canJumpToPoint: boolean;
	src: string;
	buffer: number;
	progress: number;
}) => {
	return (
		<div
			aria-hidden={true}
			css={css`
				grid-area: progress-bar;
				background-color: ${palette.neutral[38]};
				border-top: 1px solid ${palette.neutral[46]};
				position: relative;
				overflow: hidden;
				cursor: ${isScrubbing
					? 'grabbing'
					: canJumpToPoint
					? 'pointer'
					: 'default'};

				${from.leftCol} {
					border-top: none;
				}
			`}
			{...props}
		>
			<WaveForm
				bars={175}
				src={src}
				progress={progress}
				buffer={buffer}
				theme={{
					progress: palette.neutral[100],
					buffer: palette.neutral[60],
					wave: palette.neutral[46],
				}}
				css={css`
					position: absolute;
					height: 100%;
					width: 100%;
				`}
			/>

			<Cursor
				isScrubbing={isScrubbing}
				canJumpToPoint={canJumpToPoint}
				progress={progress}
			/>
		</div>
	);
};

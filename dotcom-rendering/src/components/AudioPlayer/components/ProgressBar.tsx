import { css } from '@emotion/react';
import { from, palette } from '@guardian/source/foundations';

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
			background-color: ${palette.neutral[60]};
			transition: transform 10ms ease-out;
			position: relative;
			cursor: ${isScrubbing
				? 'grabbing'
				: canJumpToPoint
				? 'pointer'
				: 'default'};

			/* this is the yellow '|' cursor */
			border-right: ${cursorWidth} solid ${palette.brandAlt[400]};

			::after {
				content: '';
				position: absolute;
				top: 0;
				right: -8px;
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
			transform: `translateX(clamp(-100% + ${cursorWidth}, ${
				-100 + progress
			}%, 0%))`,
		}}
	></div>
);

const Buffer = ({ buffer = 0 }: { buffer: number }) => (
	<div
		css={css`
			position: absolute;
			top: 0;
			left: 4px;
			width: 100%;
			height: 100%;
			background-color: ${palette.neutral[46]};
			transition: transform 300ms ease-in;
		`}
		style={{
			transform: `translateX(${-100 + buffer}%)`,
		}}
	></div>
);

export const ProgressBar = ({
	progress,
	buffer,
	isScrubbing,
	canJumpToPoint,
	...props
}: React.ComponentPropsWithoutRef<'div'> & {
	isScrubbing: boolean;
	canJumpToPoint: boolean;
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
			<Buffer buffer={buffer} />
			<Cursor
				isScrubbing={isScrubbing}
				canJumpToPoint={canJumpToPoint}
				progress={progress}
			/>
		</div>
	);
};

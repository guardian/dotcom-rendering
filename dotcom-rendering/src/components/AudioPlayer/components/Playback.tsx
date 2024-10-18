import { css } from '@emotion/react';
import { from, palette } from '@guardian/source/foundations';
import {
	Spinner,
	SvgMediaControlsPause,
	SvgMediaControlsPlay,
} from '@guardian/source/react-components';
import SkipBackIcon from '../../../static/icons/audio/skip-backward-15.svg';
import SkipForwardIcon from '../../../static/icons/audio/skip-forward-15.svg';
import { buttonBaseCss } from '../styles';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

const SkipButton = (props: ButtonProps) => {
	return (
		<button
			type="button"
			css={[
				buttonBaseCss,
				css`
					svg {
						width: 31px;
						height: 30px;
					}
					fill: ${palette.neutral[100]};

					:active {
						fill: ${palette.brandAlt[400]};
					}

					:disabled {
						fill: ${palette.neutral[46]};
					}
				`,
			]}
			{...props}
		/>
	);
};

export const Playback = (props: React.ComponentPropsWithoutRef<'div'>) => (
	<div
		css={css`
			grid-area: playback;
			display: flex;
			align-items: center;
			justify-content: center;
		`}
		{...props}
	/>
);

Playback.Play = ({
	isWaiting,
	isPlaying,
	...props
}: {
	isWaiting: boolean;
	isPlaying: boolean;
} & ButtonProps) => {
	return (
		<button
			type="button"
			css={[
				buttonBaseCss,
				css`
					margin: 0 50px;
					width: 70px;
					height: 70px;
					background-color: ${isWaiting
						? 'none'
						: palette.brandAlt[400]};
					border-radius: 50%;

					${from.leftCol} {
						margin: 0 60px;
						width: 60px;
						height: 60px;
					}

					svg {
						width: 60px;
					}
				`,
			]}
			{...props}
		>
			{isWaiting ? (
				<Spinner
					theme={{
						background: palette.neutral[20],
						color: palette.brandAlt[400],
					}}
				/>
			) : isPlaying ? (
				<SvgMediaControlsPause theme={{ fill: palette.neutral[7] }} />
			) : (
				<SvgMediaControlsPlay theme={{ fill: palette.neutral[7] }} />
			)}
		</button>
	);
};

Playback.SkipBack = (props: Pick<ButtonProps, 'onClick' | 'disabled'>) => (
	<SkipButton aria-label="skip backwards by 15 seconds" {...props}>
		<SkipBackIcon />
	</SkipButton>
);

Playback.SkipForward = (props: Pick<ButtonProps, 'onClick' | 'disabled'>) => (
	<SkipButton aria-label="skip forwards by 15 seconds" {...props}>
		<SkipForwardIcon />
	</SkipButton>
);

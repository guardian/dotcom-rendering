import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source/foundations';
import type { ThemeIcon } from '@guardian/source/react-components';
import { SvgMediaControlsPlay as WidePlayIcon } from '@guardian/source/react-components';
import { SvgMediaControlsPlay as NarrowPlayIcon } from '../../../components/SvgMediaControlsPlay';
import { palette } from '../../../palette';

const wideIconStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: rgba(18, 18, 18, 0.6);
	border-radius: 50%;
	width: 80px;
	height: 80px;

	svg {
		transform: translateX(1px);
		width: 72px;
		height: 72px;
	}
`;

export const narrowPlayIconDiameter = 56;
const narrowStyles = css`
	width: ${narrowPlayIconDiameter}px;
	height: ${narrowPlayIconDiameter}px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${palette('--narrow-play-icon-background')};
	border-radius: 50%;
	border: 1px solid ${palette('--narrow-play-icon-border')};
	fill: ${palette('--narrow-play-icon-fill')};
`;

const theme = {
	fill: sourcePalette.neutral[100],
} satisfies Partial<ThemeIcon>;

type Props = {
	iconWidth: 'wide' | 'narrow';
};

export const PlayIcon = ({ iconWidth }: Props) => {
	return (
		<div
			className="play-icon"
			css={[
				iconWidth === 'narrow' && narrowStyles,
				iconWidth === 'wide' && wideIconStyles,
			]}
		>
			{iconWidth === 'narrow' ? (
				<NarrowPlayIcon width={40} theme={theme} />
			) : (
				<WidePlayIcon theme={theme} />
			)}
		</div>
	);
};

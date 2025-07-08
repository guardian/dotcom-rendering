import { css } from '@emotion/react';
import { from, palette as sourcePalette } from '@guardian/source/foundations';
import type { ThemeIcon } from '@guardian/source/react-components';
import { SvgMediaControlsPlay as WidePlayIcon } from '@guardian/source/react-components';
import { SvgMediaControlsPlay as NarrowPlayIcon } from '../../../components/SvgMediaControlsPlay';
import { palette } from '../../../palette';

export type PlayButtonSize = keyof typeof sizes;

const sizes = {
	small: { button: 40, icon: 32 },
	large: { button: 80, icon: 72 },
} as const satisfies Record<string, { button: number; icon: number }>;

const wideIconStyles = (
	size: PlayButtonSize,
	sizeOnMobile: Extract<PlayButtonSize, 'small' | 'large'>,
) => css`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: rgba(18, 18, 18, 0.6);
	border-radius: 50%;
	width: ${sizes[sizeOnMobile].button}px;
	height: ${sizes[sizeOnMobile].button}px;
	${from.tablet} {
		width: ${sizes[size].button}px;
		height: ${sizes[size].button}px;
	}

	svg {
		transform: translateX(1px);
		width: ${sizes[sizeOnMobile].icon}px;
		height: ${sizes[sizeOnMobile].icon}px;
		${from.tablet} {
			width: ${sizes[size].icon}px;
			height: ${sizes[size].icon}px;
		}
	}
`;

export const narrowPlayIconWidth = 56;
const narrowStyles = css`
	width: ${narrowPlayIconWidth}px;
	height: ${narrowPlayIconWidth}px;
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

type Props =
	| {
			iconWidth: 'wide';
			iconSizeOnDesktop: PlayButtonSize;
			iconSizeOnMobile: PlayButtonSize;
	  }
	| {
			iconWidth: 'narrow';
			iconSizeOnDesktop?: never;
			iconSizeOnMobile?: never;
	  };

export const PlayIcon = ({
	iconWidth,
	iconSizeOnDesktop,
	iconSizeOnMobile,
}: Props) => {
	return (
		<div
			className="play-icon"
			css={[
				iconWidth === 'narrow' && narrowStyles,
				iconWidth === 'wide' &&
					wideIconStyles(iconSizeOnDesktop, iconSizeOnMobile),
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

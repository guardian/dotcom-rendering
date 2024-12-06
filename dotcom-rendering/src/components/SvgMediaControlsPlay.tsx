/**
 * TODO: This is a local copy of the updated `SvgMediaControlsPlay` icon which
 * is required by the new media card designs and can be removed once the Source
 * icon library has been updated and published.
 */
import { css } from '@emotion/react';
import { iconSize, visuallyHidden } from '@guardian/source/foundations';
import { type IconProps } from '@guardian/source/react-components';

const Svg = ({ size, theme }: IconProps) => (
	<svg
		width={size ? iconSize[size] : undefined}
		height={undefined}
		viewBox="-3 -3 30 30"
		xmlns="http://www.w3.org/2000/svg"
		focusable={false}
		aria-hidden={true}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.2 12.39v-.72L8.59 5 8 5.36v13.23l.59.41z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgMediaControlsPlay = ({
	size,
	theme,
	isAnnouncedByScreenReader = false,
}: IconProps) => (
	<>
		<Svg size={size} theme={theme} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				Stop
			</span>
		) : (
			''
		)}
	</>
);

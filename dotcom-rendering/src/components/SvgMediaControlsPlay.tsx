/**
 * TODO: This is a local copy of the updated `SvgMediaControlsPlay` icon which
 * is required by the new media card designs and can be removed once the Source
 * icon library has been updated and published.
 */
import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';
import { type IconProps } from '@guardian/source/react-components';

const Svg = ({ width, theme }: Props) => (
	<svg
		width={width}
		height={width}
		viewBox="0 0 18 18"
		xmlns="http://www.w3.org/2000/svg"
		focusable={false}
		aria-hidden={true}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.4 9.2925V8.7525L6.4425 3.75L6 4.02V13.9425L6.4425 14.25L14.4 9.2925Z"
			fill={theme?.fill}
		/>
	</svg>
);

type Props = {
	width: 18 | 40;
} & IconProps;

export const SvgMediaControlsPlay = ({
	width,
	theme,
	isAnnouncedByScreenReader = false,
}: Props) => (
	<>
		<Svg width={width} theme={theme} />
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

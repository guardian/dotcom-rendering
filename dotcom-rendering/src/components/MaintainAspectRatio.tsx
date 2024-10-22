import { css } from '@emotion/react';
import { AspectRatio } from './CardPicture';

type Props = {
	height: number;
	width: number;
	aspectRatio?: AspectRatio;
	children: React.ReactNode;
};

export const MaintainAspectRatio = ({
	height,
	width,
	aspectRatio,
	children,
}: Props) => {
	/* https://css-tricks.com/aspect-ratio-boxes/ */
	const paddingBottom =
		aspectRatio === '5:4'
			? `${(4 / 5) * 100}%`
			: `${(height / width) * 100}%`;

	return (
		<div
			css={css`
				/* position relative to contain the absolutely positioned iframe plus any Overlay image */
				position: relative;
				padding-bottom: ${paddingBottom};
				& > iframe,
				& > video {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
				}
			`}
		>
			{children}
		</div>
	);
};

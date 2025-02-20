import { css } from '@emotion/react';
import type { AspectRatio } from '../types/front';
import { getAspectRatioPadding } from './CardPicture';
import { until } from 'node_modules/@guardian/source/dist/foundations';

type Props = {
	height: number;
	width: number;
	aspectRatio?: AspectRatio;
	mobileAspectRatio?: AspectRatio;
	children: React.ReactNode;
};

export const MaintainAspectRatio = ({
	height,
	width,
	aspectRatio,
	mobileAspectRatio,
	children,
}: Props) => {
	/* https://css-tricks.com/aspect-ratio-boxes/ */
	const paddingBottom = aspectRatio
		? getAspectRatioPadding(aspectRatio)
		: `${(height / width) * 100}%`;

	return (
		<div
			css={[
				css`
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
				`,
				mobileAspectRatio &&
					css`
						${until.tablet} {
							padding-bottom: ${getAspectRatioPadding(
								mobileAspectRatio,
							)};
						}
					`,
			]}
		>
			{children}
		</div>
	);
};

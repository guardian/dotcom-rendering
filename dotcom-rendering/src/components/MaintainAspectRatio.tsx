import { css } from '@emotion/react';
import { until } from '@guardian/source/foundations';
import type { AspectRatio } from '../types/front';

type Props = {
	height: number;
	width: number;
	aspectRatio?: AspectRatio;
	mobileAspectRatio?: AspectRatio;
	children: React.ReactNode;
};

const getAspectRatioPadding = (aspectRatio: AspectRatio): string => {
	switch (aspectRatio) {
		case '5:4':
			return '80%';
		case '4:5':
			return '125%';
		case '1:1':
			return '100%';
		case '5:3':
			return '60%';
	}
};

const mobileAspectRatioStyles = (aspectRatio: AspectRatio) => {
	return css`
		${until.tablet} {
			padding-bottom: ${getAspectRatioPadding(aspectRatio)};
		}
	`;
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
				mobileAspectRatio && mobileAspectRatioStyles(mobileAspectRatio),
			]}
		>
			{children}
		</div>
	);
};

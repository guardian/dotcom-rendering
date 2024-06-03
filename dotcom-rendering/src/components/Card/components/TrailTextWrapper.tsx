import { css } from '@emotion/react';
import { textSans14, until } from '@guardian/source/foundations';
import { palette } from '../../../palette';
import type { ImagePositionType, ImageSizeType } from './ImageWrapper';

type Props = {
	children: string | React.ReactNode;
	imagePositionOnDesktop?: ImagePositionType;
	imageSize?: ImageSizeType;
	imageType?: CardImageType | undefined;
};

const showTrailText = (
	imagePosition?: ImagePositionType,
	imageSize?: ImageSizeType,
	imageType?: CardImageType | undefined,
) => {
	if (
		imageSize === 'large' &&
		imagePosition === 'right' &&
		imageType !== 'avatar'
	) {
		return css`
			${until.desktop} {
				display: none;
			}
		`;
	}
	return css`
		${until.tablet} {
			display: none;
		}
	`;
};

export const TrailTextWrapper = ({
	children,
	imagePositionOnDesktop,
	imageSize,
	imageType,
}: Props) => {
	return (
		<div
			css={[
				css`
					display: flex;
					flex-direction: column;
					color: ${palette('--card-headline-trail-text')};
					${textSans14};
					padding-left: 5px;
					padding-right: 5px;
					padding-bottom: 8px;
					strong {
						font-weight: bold;
					}
				`,
				showTrailText(imagePositionOnDesktop, imageSize, imageType),
			]}
		>
			{children}
		</div>
	);
};

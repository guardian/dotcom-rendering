import { css } from '@emotion/react';
import { body, until } from '@guardian/source-foundations';
import { decidePalette } from '../../../lib/decidePalette';
import type { DCRContainerPalette } from '../../../types/front';
import type { ImagePositionType, ImageSizeType } from './ImageWrapper';

type Props = {
	children: string | React.ReactNode;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	imagePosition?: ImagePositionType;
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
	)
		return css`
			${until.desktop} {
				display: none;
			}
		`;
	return css`
		${until.tablet} {
			display: none;
		}
	`;
};

export const TrailTextWrapper = ({
	children,
	format,
	containerPalette,
	imagePosition,
	imageSize,
	imageType,
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	return (
		<div
			css={[
				css`
					display: flex;
					flex-direction: column;
					color: ${palette.text.cardStandfirst};
					${body.small({ lineHeight: 'regular' })};
					font-size: 14px;
					padding-left: 5px;
					padding-right: 5px;
					padding-bottom: 8px;
					strong {
						font-weight: bold;
					}
				`,
				showTrailText(imagePosition, imageSize, imageType),
			]}
		>
			{children}
		</div>
	);
};

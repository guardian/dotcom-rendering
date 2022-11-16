import { css } from '@emotion/react';
import { body, until } from '@guardian/source-foundations';
import type { DCRContainerPalette } from '../../../../types/front';
import { decidePalette } from '../../../lib/decidePalette';

type Props = {
	children: string | React.ReactNode;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	imagePosition?: ImagePositionType;
	imageSize?: ImageSizeType;
};

const showTrailText = (
	imagePosition?: ImagePositionType,
	imageSize?: ImageSizeType,
) => {
	if (imageSize === 'large' && imagePosition === 'right')
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
				`,
				showTrailText(imagePosition, imageSize),
			]}
		>
			{children}
		</div>
	);
};

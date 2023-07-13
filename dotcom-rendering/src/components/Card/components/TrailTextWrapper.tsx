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
			style={
				imageSize === 'large' &&
				imagePosition === 'right' &&
				imageType !== 'avatar'
					? { '--hide-until-desktop': 'none' }
					: { '--hide-until-tablet': 'none' }
			}
			css={css`
				display: flex;
				flex-direction: column;
				color: ${palette.text.cardStandfirst};

				${body.small({ lineHeight: 'regular' })};
				font-size: 14px;

				padding-left: 5px;
				padding-right: 5px;
				padding-bottom: 8px;

				${until.tablet} {
					display: var(--hide-until-tablet, unset);
				}

				${until.desktop} {
					display: var(--hide-until-desktop, unset);
				}
			`}
		>
			{children}
		</div>
	);
};

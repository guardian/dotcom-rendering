import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import { SvgCamera, SvgVideo } from '@guardian/source-react-components';
import { fill } from 'palette';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

enum CaptionIconVariant {
	Image,
	Video,
}

interface IconProps {
	format: ArticleFormat;
	variant: CaptionIconVariant;
}

const iconStyles = css`
	display: inline-block;
	width: 1.2rem;
	margin-right: ${remSpace[1]};
	fill: ${fill.cameraCaptionIcon()};
	position: relative;

	::before {
		content: ' ';
		display: block;
		padding-top: 0.85rem;
	}

	svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	${darkModeCss`
        fill: ${fill.cameraCaptionIconDark()};
    `}
`;

const CaptionIcon: FC<IconProps> = ({ format, variant }) => {
	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return null;
		default:
			return (
				<span css={iconStyles}>
					{variant === CaptionIconVariant.Image ? (
						<SvgCamera />
					) : (
						<SvgVideo />
					)}
				</span>
			);
	}
};

export default CaptionIcon;
export { CaptionIconVariant };

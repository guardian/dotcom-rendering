import { css } from '@emotion/react';
import { ArticleDesign, type ArticleFormat } from '../../articleFormat';
import { remSpace } from '@guardian/source/foundations';
import { SvgCamera, SvgVideo } from '@guardian/source/react-components';
import { fill } from 'palette';
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

const CaptionIcon = ({ format, variant }: IconProps) => {
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

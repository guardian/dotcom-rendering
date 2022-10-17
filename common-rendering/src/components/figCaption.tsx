// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/source-foundations';
import { neutral } from '@guardian/source-foundations';
import { textSans } from '@guardian/source-foundations';
import { SvgCamera, SvgVideo } from '@guardian/source-react-components';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import type { Option } from '@guardian/types';
import { OptionKind } from '@guardian/types';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from '../lib';
import { fill, text } from '@guardian/common-rendering/src/editorialPalette';

// ----- Sub-Components ----- //

enum IconVariant {
	Image,
	Video,
}

interface IconProps {
	format: ArticleFormat;
	supportsDarkMode: boolean;
	variant: IconVariant;
}

const iconStyles = (supportsDarkMode: boolean): SerializedStyles => css`
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

	${darkModeCss(supportsDarkMode)`
        fill: ${fill.cameraCaptionIconDark()};
    `}
`;

const Icon: FC<IconProps> = ({ format, supportsDarkMode, variant }) => {
	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return null;
		default:
			return (
				<span css={iconStyles(supportsDarkMode)}>
					{variant === IconVariant.Image ? (
						<SvgCamera />
					) : (
						<SvgVideo />
					)}
				</span>
			);
	}
};

// ----- Component ----- //

type Props = {
	format: ArticleFormat;
	supportsDarkMode: boolean;
	children: Option<ReactNode>;
	className?: string;
	css?: SerializedStyles;
	variant?: IconVariant;
};

const styles = (format: ArticleFormat, supportsDarkMode: boolean) => css`
	${textSans.xsmall({ lineHeight: 'regular' })}
	padding-top: ${remSpace[1]};
	color: ${text.figCaption(format)};

	${darkModeCss(supportsDarkMode)`
    	color: ${text.figCaptionDark(format)};
  	`}
`;

const mediaStyles = (supportsDarkMode: boolean) => css`
	color: ${neutral[86]};

	${darkModeCss(supportsDarkMode)`
    color: ${neutral[86]};
  `}
`;

const getStyles = (
	format: ArticleFormat,
	supportsDarkMode: boolean,
): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return css(
				styles(format, supportsDarkMode),
				mediaStyles(supportsDarkMode),
			);
		default:
			return styles(format, supportsDarkMode);
	}
};

const FigCaption: FC<Props> = ({
	format,
	supportsDarkMode,
	children,
	className,
	variant = IconVariant.Image,
}) => {
	switch (children.kind) {
		case OptionKind.Some:
			return (
				<figcaption
					className={className}
					css={getStyles(format, supportsDarkMode)}
				>
					<Icon
						format={format}
						supportsDarkMode={supportsDarkMode}
						variant={variant}
					/>
					{children.value}
				</figcaption>
			);

		default:
			return null;
	}
};

// ----- Exports ----- //

export default FigCaption;

export { IconVariant, Icon as CaptionIcon };

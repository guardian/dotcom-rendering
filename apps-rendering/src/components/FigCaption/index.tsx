// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { CaptionIconVariant } from 'components/CaptionIcon';
import CaptionIcon from 'components/CaptionIcon';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import { darkModeCss } from '@guardian/common-rendering/src/lib';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { neutral, remSpace, textSans } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { OptionKind } from '@guardian/types';
import type { Styleable } from 'lib';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

type Props = Styleable<{
	format: ArticleFormat;
	supportsDarkMode: boolean;
	children: Option<ReactNode>;
	variant: CaptionIconVariant;
}>;

const styles = (
	format: ArticleFormat,
	supportsDarkMode: boolean,
): SerializedStyles => css`
	${textSans.xsmall({ lineHeight: 'regular' })}
	padding-top: ${remSpace[1]};
	color: ${text.figCaption(format)};

	${darkModeCss(supportsDarkMode)`
    	color: ${text.figCaptionDark(format)};
  	`}
`;

const mediaStyles = (supportsDarkMode: boolean): SerializedStyles => css`
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
	variant,
}) => {
	switch (children.kind) {
		case OptionKind.Some:
			return (
				<figcaption
					className={className}
					css={getStyles(format, supportsDarkMode)}
				>
					<CaptionIcon
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

// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign, type ArticleFormat } from '../../articleFormat';
import { neutral, remSpace, textSans14 } from '@guardian/source/foundations';
import CaptionIcon from 'components/CaptionIcon';
import type { CaptionIconVariant } from 'components/CaptionIcon';
import type { Styleable } from 'lib';
import type { Optional } from 'optional';
import { text } from 'palette';
import type { ReactNode } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

type Props = Styleable<{
	format: ArticleFormat;
	children: Optional<ReactNode>;
	variant: CaptionIconVariant;
}>;

const styles = (format: ArticleFormat): SerializedStyles => css`
	${textSans14};
	padding-top: ${remSpace[1]};
	color: ${text.figCaption(format)};

	${darkModeCss`
    	color: ${text.figCaptionDark(format)};
  	`}
`;

const mediaStyles = css`
	color: ${neutral[86]};

	${darkModeCss`
    color: ${neutral[86]};
  `}
`;

const getStyles = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return css(styles(format), mediaStyles);
		default:
			return styles(format);
	}
};

const FigCaption = ({
	format,
	children: maybeChildren,
	className,
	variant,
}: Props) =>
	maybeChildren.maybeRender((children) => (
		<figcaption className={className} css={getStyles(format)}>
			<CaptionIcon format={format} variant={variant} />
			{children}
		</figcaption>
	));

// ----- Exports ----- //

export default FigCaption;

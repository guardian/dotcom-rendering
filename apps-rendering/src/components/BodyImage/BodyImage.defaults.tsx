// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import FigCaption from '@guardian/common-rendering/src/components/figCaption';
import { darkModeCss } from '@guardian/common-rendering/src/lib';
import { ArticleElementRole } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { from, remSpace } from '@guardian/source-foundations';
import type { Breakpoint } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { none, some, withDefault } from '@guardian/types';
import Img from 'components/ImgAlt';
import type { Image } from 'image/image';
import type { Lightbox } from 'image/lightbox';
import type { Sizes } from 'image/sizes';
import type { FC, ReactNode } from 'react';

const width = '100%';
const phabletWidth = '620px';
const thumbnailWidth = '8.75rem';

export const getDefaultSizes = (role: ArticleElementRole): Sizes => {
	switch (role) {
		case ArticleElementRole.Thumbnail:
			return {
				mediaQueries: [],
				default: thumbnailWidth,
			};
		default:
			return {
				mediaQueries: [{ breakpoint: 'phablet', size: phabletWidth }],
				default: width,
			};
	}
};

export const getDefaultThumbnailStyles = (
	leftColumnBreakpoint: Breakpoint,
): SerializedStyles => css`
	float: left;
	width: ${thumbnailWidth};
	margin: 0 ${remSpace[3]} 0 0;

	${from[leftColumnBreakpoint]} {
		position: absolute;
		transform: translateX(calc(-100% - ${remSpace[4]}));
	}
`;

const styles = css`
	margin: ${remSpace[4]} 0;
	width: ${width};

	${from.phablet} {
		width: ${phabletWidth};
	}
`;

export const getDefaultStyles = (
	role: ArticleElementRole,
	leftColumnBreakpoint: Option<Breakpoint>,
): SerializedStyles => {
	switch (role) {
		case ArticleElementRole.Thumbnail:
			return getDefaultThumbnailStyles(
				withDefault<Breakpoint>('leftCol')(leftColumnBreakpoint),
			);
		default:
			return styles;
	}
};

export const getDefaultImgStyles = (
	role: ArticleElementRole,
	supportsDarkMode: boolean,
): Option<SerializedStyles> => {
	switch (role) {
		case ArticleElementRole.Thumbnail:
			return some(css`
				background-color: transparent;

				${darkModeCss(supportsDarkMode)`
                    background-color: transparent;
                `}
			`);
		default:
			return none;
	}
};

export type BodyImageProps = {
	image: Image;
	format: ArticleFormat;
	supportsDarkMode: boolean;
	lightbox: Option<Lightbox>;
	caption: Option<ReactNode>;
};

const DefaultBodyImage: FC<
	BodyImageProps & {
		wrapperStyles: SerializedStyles;
		imgStyles: Option<SerializedStyles>;
		captionStyles: Option<SerializedStyles>;
	}
> = ({
	image,
	format,
	supportsDarkMode,
	lightbox,
	caption,
	wrapperStyles,
	imgStyles,
	captionStyles,
}) => (
	<figure css={wrapperStyles}>
		<Img
			image={image}
			sizes={getDefaultSizes(image.role)}
			className={imgStyles}
			format={format}
			supportsDarkMode={supportsDarkMode}
			lightbox={lightbox}
		/>
		<FigCaption
			css={withDefault<SerializedStyles | undefined>(undefined)(
				captionStyles,
			)}
			format={format}
			supportsDarkMode={supportsDarkMode}
		>
			{caption}
		</FigCaption>
	</figure>
);

export default DefaultBodyImage;

// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import FigCaption from 'components/FigCaption';
import { darkModeCss } from '@guardian/common-rendering/src/lib';
import { ArticleDesign, ArticleFormat } from '@guardian/libs';
import { ArticleElementRole } from '@guardian/libs';
import { Breakpoint } from '@guardian/source-foundations';
import { from, remSpace } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { none, some, withDefault } from '@guardian/types';
import Img from 'components/ImgAlt';
import { grid } from 'grid/grid';
import type { Image } from 'image/image';
import type { Lightbox } from 'image/lightbox';
import type { Sizes } from 'image/sizes';
import type { FC, ReactNode } from 'react';

// ----- Setup ----- //

const width = '100%';
const phabletWidth = '620px';
const thumbnailWidth = '8.75rem';

// ----- Functions ----- //

const getSizes = (role: ArticleElementRole): Sizes => {
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

// ----- Component ----- //

type Props = {
	image: Image;
	format: ArticleFormat;
	supportsDarkMode: boolean;
	lightbox: Option<Lightbox>;
	caption: Option<ReactNode>;
	leftColumnBreakpoint: Option<Breakpoint>;
};

const styles = css`
	margin: ${remSpace[4]} 0;
	width: ${width};

	${from.phablet} {
		width: ${phabletWidth};
	}
`;

const thumbnailStyles = (
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

const imgStyles = (
	role: ArticleElementRole,
	supportsDarkMode: boolean,
	format: ArticleFormat,
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

const getStyles = (
	role: ArticleElementRole,
	leftColumnBreakpoint: Option<Breakpoint>,
	format: ArticleFormat,
): SerializedStyles => {
	if (format.design === ArticleDesign.Gallery) {
		return css`
			${grid.container}
		`;
	}

	switch (role) {
		case ArticleElementRole.Thumbnail:
			return thumbnailStyles(
				withDefault<Breakpoint>('leftCol')(leftColumnBreakpoint),
			);
		default:
			return styles;
	}
};

const BodyImage: FC<Props> = ({
	image,
	format,
	supportsDarkMode,
	lightbox,
	caption,
	leftColumnBreakpoint,
}) => (
	<figure css={getStyles(image.role, leftColumnBreakpoint, format)}>
		<Img
			image={image}
			sizes={getSizes(image.role)}
			className={imgStyles(image.role, supportsDarkMode, format)}
			format={format}
			supportsDarkMode={supportsDarkMode}
			lightbox={lightbox}
			isWrapperClassName={format.design === ArticleDesign.Gallery}
		/>
		<FigCaption format={format} supportsDarkMode={supportsDarkMode}>
			{caption}
		</FigCaption>
	</figure>
);

// ----- Exports ----- //

export default BodyImage;

// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/source-foundations';
import { brandAltText, neutral, text } from '@guardian/source-foundations';
import { textSans } from '@guardian/source-foundations';
import { SvgCamera } from '@guardian/source-react-components';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import type { Option } from '@guardian/types';
import { OptionKind } from '@guardian/types';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from '../lib';

// ----- Sub-Components ----- //

interface CameraProps {
	format: ArticleFormat;
	supportsDarkMode: boolean;
}

const cameraStyles = (supportsDarkMode: boolean): SerializedStyles => css`
	display: inline-block;
	height: 1.2rem;
	vertical-align: middle;
	padding-right: ${remSpace[1]};

	svg {
		height: 100%;
		fill: ${text.supporting};
	}

	${darkModeCss(supportsDarkMode)`
        fill: ${brandAltText.supporting};
    `}
`;

const Camera: FC<CameraProps> = ({ format, supportsDarkMode }) => {
	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return null;
		default:
			return (
				<span css={cameraStyles(supportsDarkMode)}>
					<SvgCamera />
				</span>
			);
	}
};

// ----- Component ----- //

type Props = {
	format: ArticleFormat;
	supportsDarkMode: boolean;
	children: Option<ReactNode>;
};

const styles = (supportsDarkMode: boolean) => css`
	${textSans.xsmall({ lineHeight: 'regular' })}
	padding-top: ${remSpace[1]};
	color: ${text.supporting};

	${darkModeCss(supportsDarkMode)`
    color: ${brandAltText.supporting};
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
			return css(styles(supportsDarkMode), mediaStyles(supportsDarkMode));
		default:
			return styles(supportsDarkMode);
	}
};

const FigCaption: FC<Props> = ({ format, supportsDarkMode, children }) => {
	switch (children.kind) {
		case OptionKind.Some:
			return (
				<figcaption css={getStyles(format, supportsDarkMode)}>
					<Camera
						format={format}
						supportsDarkMode={supportsDarkMode}
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

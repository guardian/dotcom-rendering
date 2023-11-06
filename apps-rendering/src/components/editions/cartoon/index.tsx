import type { FC } from 'react';
import { Cartoon } from '../../../cartoon';
import type { ArticleFormat } from '@guardian/libs';
import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import {
	articlePaddingStyles,
	desktopArticleMargin,
	tabletArticleMargin,
	tabletContentWidth, wideArticleMargin,
	wideContentWidth
} from '../styles';
import { none } from "@guardian/types";
import Img from "../../ImgAlt";

const cartoonId = 'multi-panel-cartoon-figure';

interface Props {
	cartoon: Cartoon;
	format: ArticleFormat;
}

const layoutStyles = css`
	position: relative;
	width: 100%;
	${from.tablet} {
		width: ${tabletContentWidth + tabletArticleMargin + 12}px;
		${from.desktop} {
			width: ${wideContentWidth + desktopArticleMargin + 12}px;
			${from.wide} {
				width: ${wideContentWidth + wideArticleMargin + 12}px;
			}
		}
	}
`;

const imageSizes = {
	mediaQueries: [],
	default: '100%',
}

const Cartoon: FC<Props> = ({
	cartoon: { images },
	format,
}) => {
	return (
		<div css={[articlePaddingStyles, layoutStyles]}>
			<figure aria-labelledby={cartoonId}>
				{ images.map((image, key) => {
					return (<Img
						image={image}
						sizes={imageSizes}
						format={format}
						className={none}
						lightbox={none}
						key={key}
					/>)
				})}
			</figure>
		</div>
	);
}

export default Cartoon;
